import React from "react";

import Tree from "./Tree";

import s from "./Home.module.scss";

const Home = () => {
  return (
    <div className={s.container}>
      <Tree />
    </div>
  );
};

export default Home;
