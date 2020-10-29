import React from "react";

import HeroArea from "./hero-area";
import MovieList from "./movie-list";

function Home() {
  return (
    <div>
      <HeroArea movie={null} />
      <MovieList />
    </div>
  );
}

export default Home;
