import { app, BrowserWindow } from "electron";
import * as path from "path";
import * as url from "url";

// currentWindow represents our current rendered page in electron app
let currentWindow;

// create a function that opens a create a new window
function newWindow() {
  currentWindow = new BrowserWindow({
    title: "eeQL",
    // to be determined
    icon: null,
    // eeql-blue
    backgroundColor: "##1c90f5",
    // starting dimensions of new window
    height: 800,
    width: 800,
    // allow integration of node modules in build.
    webPreferences: { nodeIntegration: true },
  });

  // check if dist folder exists by running a test on the node environmnet
  // if in development mode, serve the local server to electron
  if (process.env.NODE_ENV === "development") {
    currentWindow.loadURL("http://localhost:4000");
    currentWindow.webContents.openDevTools();
  }
  // otherwise, serve the compile dist folder for render
  else {
    currentWindow.loadURL(
      // tried implementing WhatWG URL, it's current non-functional, see dicussion reference for more details.
      // https://github.com/nodejs/node/issues/25099
      url.format({
        // allow electron to render a file (html), in our dist folder
        pathname: path.resolve(__dirname, "../dist/index.html"),
        // set type
        protocol: "file:",
        // allow for propper formating of directory name.
        slashes: true,
      })
    );
  }
  // set window to null after app is closed.
  // create IPC event listener on browserRouter
  currentWindow.on("closed", () => {
    currentWindow = null;
  });
}
// after IPC event listener is triggered "ready"
// invoke our create new window by invoking "newWindow()"
app.on("ready", newWindow);
// electron, by default, refreshes every navigation
// since we're using node modules outside of our dist folder, we have to disable auto refresh
app.allowRendererProcessReuse = true;
