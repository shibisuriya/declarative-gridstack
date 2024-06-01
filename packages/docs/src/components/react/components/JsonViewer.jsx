import React from "react";

import loadable from "@loadable/component";
const ReactJson = loadable(() => import("react-json-view"));

function JsonViewer(props) {
  const { json } = props;
  return (
    <div className="m-4">
      <ReactJson
        src={json}
        theme={"twilight"}
        displayDataTypes={false}
        enableClipboard={false}
        enableAdd={false}
        enableEdit={false}
        displayObjectSize={false}
        iconStyle={"circle"}
        indentWidth={5}
      />
    </div>
  );
}

export default JsonViewer;
