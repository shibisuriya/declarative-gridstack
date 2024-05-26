import React, { Fragment } from "react";

function ItemContainer({ children, remove }) {
  return (
    <Fragment>
      <div
        style={{
          display: "flex",
          justifyContent: "right",
          border: "1px solid black",
        }}
      >
        <button
          style={{
            color: "red",
            border: "1px solid black",
            width: "30px",
            height: "100%",
          }}
          onClick={remove}
        >
          X
        </button>
      </div>
      {children}
    </Fragment>
  );
}

export default ItemContainer;
