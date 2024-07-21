import React from "react";
import "./JokesItem.css";

function JokesItem(props) {
  return <li className="jokesItemWrapper">{props.text}</li>;
}
export default JokesItem;
