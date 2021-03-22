import React, { useContext } from "react";
import { Graph } from "react-d3-graph";
import { Link } from "react-router-dom";
import { DataContext } from "../../provider/DataProvider";
import "./Visualize.scss";

const Visualize = () => {
  const { database }: any = useContext(DataContext);
  console.log(database);
  const data = {
    nodes: [{ id: "Harry" }, { id: "Sally" }, { id: "Alice" }],
    focusedNodeId: "nodeIdToTriggerZoomAnimation",
    links: [
      { source: "Harry", target: "Sally" },
      { source: "Harry", target: "Alice" },
    ],
  };

  const myConfig = {
    automaticRearrangeAfterDropNode: false,
    collapsible: true,
    directed: false,
    focusAnimationDuration: 0.75,
    focusZoom: 1,
    freezeAllDragEvents: false,
    height: 400,
    highlightDegree: 1,
    highlightOpacity: 1,
    linkHighlightBehavior: false,
    maxZoom: 8,
    minZoom: 0.1,
    nodeHighlightBehavior: false,
    panAndZoom: false,
    staticGraph: false,
    staticGraphWithDragAndDrop: false,
    width: 800,
    d3: {
      alphaTarget: 0.05,
      gravity: -100,
      linkLength: 100,
      linkStrength: 1,
      disableLinkForce: false,
    },
    node: {
      color: "#32c2b5",
      fontColor: "white",
      fontSize: 10,
      fontWeight: "normal",
      highlightColor: "SAME",
      highlightFontSize: 8,
      highlightFontWeight: "normal",
      highlightStrokeColor: "SAME",
      highlightStrokeWidth: "SAME",
      labelProperty: "id",
      mouseCursor: "pointer",
      opacity: 1,
      renderLabel: true,
      size: 200,
      strokeColor: "none",
      strokeWidth: 1.5,
      svg: "",
      symbolType: "circle",
    },
    link: {
      color: "#d3d3d3",
      fontColor: "black",
      fontSize: 8,
      fontWeight: "normal",
      highlightColor: "SAME",
      highlightFontSize: 8,
      highlightFontWeight: "normal",
      labelProperty: "label",
      mouseCursor: "pointer",
      opacity: 1,
      renderLabel: false,
      semanticStrokeWidth: false,
      strokeWidth: 1.5,
      markerHeight: 6,
      markerWidth: 6,
      strokeDasharray: 0,
      strokeDashoffset: 0,
      strokeLinecap: "butt",
    },
  };

  const onClickNode = function(nodeId) {
    console.log(`Clicked node ${nodeId}`);
  };

  const onClickLink = function(source, target) {
    console.log(`Clicked link between ${source} and ${target}`);
  };

  return (
    <div id="graph">
      <Graph
        id="graph-id"
        data={data}
        config={myConfig}
        onClickNode={onClickNode}
        onClickLink={onClickLink}
      />
      ;
      <Link to="/">
        <button>home</button>
      </Link>
    </div>
  );
};

export default Visualize;
