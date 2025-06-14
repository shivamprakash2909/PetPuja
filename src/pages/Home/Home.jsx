import React, { useState } from "react";
import "./Home.css";
import Header from "../../component/Header/Header";
import ExploreMenu from "../../component/ExploreMenu/ExploreMenu";
import DisplayFood from "../../component/DisplayFood/DisplayFood";
const Home = () => {
  const [category, setCategory] = useState("All");
  return (
    <div>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <DisplayFood category={category} />
    </div>
  );
};

export default Home;
