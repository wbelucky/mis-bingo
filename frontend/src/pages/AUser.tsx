import React from "react";
import { useParams, Route } from "react-router-dom";

interface RouteParams {
  id: string;
}

const Container: React.FC<{}> = (props) => {
  const { id: userId } = useParams<RouteParams>();
  return <div>{userId}</div>;
};

export default Container;
