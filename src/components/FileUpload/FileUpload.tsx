import React, { useContext } from "react";
import { StateContext } from "../../provider/StateProvider";
import Input from "../../../node_modules/@material-ui/core/Input";
import { Link } from "react-router-dom";
// @ts-ignore
import "react-awesome-button/dist/styles.scss";
import "./FileUpload.scss";
// @ts-ignore
import { AwesomeButton, AwesomeButtonProgress } from "react-awesome-button";

const { remote } = window.require("electron");
const fs = remote.require("fs");
let current: string = "";
let directoryArray;
let fileArray;
let cancelled = false;

const FileUpload = () => {
  function nameSetter(name) {
    return name[name.length - 1];
  }
  const { userPath, fileTreeHandler, pathHandler }: any = useContext(
    StateContext
  );
  const { activePortHandler }: any = useContext(StateContext);
  const projectName = nameSetter(userPath.split("/"));

  const exportTestFile = (dir) => {
    if (!fs.existsSync(`${dir}/__tests__`)) fs.mkdirSync(`${dir}/__tests__`);
  };

  const setPort = (e) => {
    e.preventDefault();
    activePortHandler(e.target.value);
  };

  const getPath = () => {
    remote.dialog
      .showOpenDialog({
        properties: ["openDirectory"],
        message: "Please choose your project folder",
      })
      .then((files: any) => {
        if (files.cancelled) {
          cancelled = true;
        } else !files.cancelled;
        current = files.filePaths[0];
        exportTestFile(current);
        pathHandler(files.filePaths[0]);
        generateFileTree(current);
      });
  };

  const generateFileTree = (dir) => {
    let getDirectory = (current) => {
      directoryArray = fs
        .readdirSync(current)
        .filter((file) => file !== "node_modules" && file[0] !== ".");
      if (directoryArray.filter((file, i) => !file.includes("")) == []) {
        return directoryArray;
      }
    };
    getDirectory(dir);

    fileArray = directoryArray.map((name: string) => {
      let path = dir;
      path = `${path}/${name}`;
      const file: any = { path, name, files: [] };

      if (!file.name.includes(".")) {
        file.files = generateFileTree(file.path);
      }
      return file;
    });
    fileTreeHandler(fileArray);
    return fileArray;
  };

  if (fileArray) {
    return (
      <div id="file-upload-footer">
        <div id="file-upload-head">
          <Input
            placeholder="8080"
            className="port-input"
            type="number"
            onChange={(e) => setPort(e)}
            inputProps={{ "aria-label": "description" }}
          />
          <AwesomeButtonProgress
            type="secondary"
            ripple={true}
            action={(element, next) => {
              getPath();
              setTimeout(() => {
                next();
              }, 1000);
            }}
            loadingLabel="..."
            resultLabel={projectName || "UPLOAD"}
          >
            {projectName || <i className="fas fa-file"></i>}
          </AwesomeButtonProgress>
          <Link to="/home">
            <AwesomeButton type="primary" ripple={true}>
              GO
            </AwesomeButton>
          </Link>
        </div>
      </div>
    );
  } else
    return (
      <div id="file-upload-footer">
        <div id="file-upload-head">
          <Input
            placeholder="8080 "
            type="number"
            onChange={(e) => setPort(e)}
            inputProps={{ "aria-label": "description" }}
          />
          <AwesomeButtonProgress
            type="secondary"
            ripple={true}
            action={(element, next) => {
              getPath();
              setTimeout(() => {
                next();
              }, 1000);
            }}
            loadingLabel="..."
            resultLabel={projectName || "UPLOAD"}
          >
            {projectName || <i className="fas fa-file"></i>}
          </AwesomeButtonProgress>
          <Link to="/home">
            <AwesomeButton type="primary" ripple={true}>
              GO
            </AwesomeButton>
          </Link>
        </div>
      </div>
    );
};

export default FileUpload;
