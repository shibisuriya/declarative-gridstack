import React, { useEffect } from "react";

export default function GridstackLayout() {
  useEffect(() => {
    // perform initialization or setup here
    console.log("Component mounted!");

    // return a cleanup function if necessary
    return () => {
      // perform cleanup here if necessary
      console.log("Component unmounted!");
    };
  }, []); // empty dependency array to ensure it only runs once

  return <div>Hello</div>;
}
