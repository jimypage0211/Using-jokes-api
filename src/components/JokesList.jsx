import React from "react";
import "./JokesList.css";
import JokesItem from "./JokesItem";
function JokesList(props) {
  const jokes = props.jokes.map((joke) => (
    <JokesItem key={joke.id} text={joke.text} />
  ));
  return <ul className="jokesListWrapper">{jokes}</ul>;
}
export default JokesList;
