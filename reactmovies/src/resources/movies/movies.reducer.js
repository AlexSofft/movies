const initialState = {
  movie_list: [
    {
      id: 269149,
      title: "Zootopia",
      tagline: "Welcome to the urban jungle.",
      vote_average: 7.7,
      vote_count: 6795,
      release_date: "2016-02-11",
      poster_path:
        "https://2.bp.blogspot.com/-Xa5tySFx_yU/WZ_XP8QtlyI/AAAAAAAAASA/KRnaP_6kpaki3IYjSNLuiwrXKsLIR7QrQCLcBGAs/s1600/bladerunner2049.jpg",
      overview:
        "Determined to prove herself, Officer Judy Hopps, the first bunny on Zootopia's police force, jumps at the chance to crack her first case - even if it means partnering with scam-artist fox Nick Wilde to solve the mystery.",
      budget: 150000000,
      revenue: 1023784195,
      genres: ["Animation", "Adventure", "Family", "Comedy"],
      runtime: 108,
    },
    {
      id: 337167,
      title: "Fifty Shades Freed",
      tagline: "Don't miss the climax",
      vote_average: 6.1,
      vote_count: 1195,
      release_date: "2018-02-07",
      poster_path:
        "https://2.bp.blogspot.com/-Xa5tySFx_yU/WZ_XP8QtlyI/AAAAAAAAASA/KRnaP_6kpaki3IYjSNLuiwrXKsLIR7QrQCLcBGAs/s1600/bladerunner2049.jpg",
      overview:
        "Believing they have left behind shadowy figures from their past, newlyweds Christian and Ana fully embrace an inextricable connection and shared life of luxury. But just as she steps into her role as Mrs. Grey and he relaxes into an unfamiliar stability, new threats could jeopardize their happy ending before it even begins.",
      budget: 55000000,
      revenue: 136906000,
      genres: ["Drama", "Romance"],
      runtime: 106,
    },
    {
      id: 337168,
      title: "Fifty Shades Freed",
      tagline: "Don't miss the climax",
      vote_average: 6.1,
      vote_count: 1195,
      release_date: "2018-02-07",
      poster_path:
        "https://2.bp.blogspot.com/-Xa5tySFx_yU/WZ_XP8QtlyI/AAAAAAAAASA/KRnaP_6kpaki3IYjSNLuiwrXKsLIR7QrQCLcBGAs/s1600/bladerunner2049.jpg",
      overview:
        "Believing they have left behind shadowy figures from their past, newlyweds Christian and Ana fully embrace an inextricable connection and shared life of luxury. But just as she steps into her role as Mrs. Grey and he relaxes into an unfamiliar stability, new threats could jeopardize their happy ending before it even begins.",
      budget: 55000000,
      revenue: 136906000,
      genres: ["Drama", "Romance"],
      runtime: 106,
    },
    {
      id: 337169,
      title: "Fifty Shades Freed",
      tagline: "Don't miss the climax",
      vote_average: 6.1,
      vote_count: 1195,
      release_date: "2018-02-07",
      poster_path:
        "https://2.bp.blogspot.com/-Xa5tySFx_yU/WZ_XP8QtlyI/AAAAAAAAASA/KRnaP_6kpaki3IYjSNLuiwrXKsLIR7QrQCLcBGAs/s1600/bladerunner2049.jpg",
      overview:
        "Believing they have left behind shadowy figures from their past, newlyweds Christian and Ana fully embrace an inextricable connection and shared life of luxury. But just as she steps into her role as Mrs. Grey and he relaxes into an unfamiliar stability, new threats could jeopardize their happy ending before it even begins.",
      budget: 55000000,
      revenue: 136906000,
      genres: ["Drama", "Romance"],
      runtime: 106,
    },
    {
      id: 337170,
      title: "Fifty Shades Freed",
      tagline: "Don't miss the climax",
      vote_average: 6.1,
      vote_count: 1195,
      release_date: "2018-02-07",
      poster_path:
        "https://2.bp.blogspot.com/-Xa5tySFx_yU/WZ_XP8QtlyI/AAAAAAAAASA/KRnaP_6kpaki3IYjSNLuiwrXKsLIR7QrQCLcBGAs/s1600/bladerunner2049.jpg",
      overview:
        "Believing they have left behind shadowy figures from their past, newlyweds Christian and Ana fully embrace an inextricable connection and shared life of luxury. But just as she steps into her role as Mrs. Grey and he relaxes into an unfamiliar stability, new threats could jeopardize their happy ending before it even begins.",
      budget: 55000000,
      revenue: 136906000,
      genres: ["Drama", "Romance"],
      runtime: 106,
    },
  ],
};

// invoke in movieslist (onle default)
export default (state = initialState, action) => {
  switch (action.type) {
    case "movies:set": {
      return {
        ...state,
        movies: action.payload,
      };
    }

    case "movies:reset":
      return state;

    default:
      return state;
  }
};
