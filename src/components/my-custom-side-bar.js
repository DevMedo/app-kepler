import React from "react";
import "./my-custom-side-bar.css";
import { useSelector } from "react-redux";

const MyCustomSideBar = () => {
  //   console.log("I am inside mycsb");
  //   console.log(props);

  const show = useSelector((state) => state.isLayerClicked);
  if (show) {
    return <div className="my_csb">Hello</div>;
  } else {
    return <div></div>;
  }
};

export default MyCustomSideBar;
