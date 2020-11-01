const initialState = {
  movie_list: [
    {
      "id": 269149,
      "title": "Zootopia",
      "tagline": "Welcome to the urban jungle.",
      "vote_average": 7.7,
      "vote_count": 6795,
      "release_date": "2016-02-11",
      "poster_path": "https://images-na.ssl-images-amazon.com/images/I/619U%2BXN6krL.jpg",
      "overview": "Determined to prove herself, Officer Judy Hopps, the first bunny on Zootopia's police force, jumps at the chance to crack her first case - even if it means partnering with scam-artist fox Nick Wilde to solve the mystery.",
      "budget": 150000000,
      "revenue": 1023784195,
      "genres": [
          "Animation",
          "Adventure",
          "Family",
          "Comedy"
      ],
      "runtime": 108
    },
    {
      "id": 335984,
      "title": "Blade Runner 2049",
      "tagline": "There's still a page left.",
      "vote_average": 7.3,
      "vote_count": 3955,
      "release_date": "2017-10-04",
      "poster_path": "https://2.bp.blogspot.com/-Xa5tySFx_yU/WZ_XP8QtlyI/AAAAAAAAASA/KRnaP_6kpaki3IYjSNLuiwrXKsLIR7QrQCLcBGAs/s1600/bladerunner2049.jpg",
      "overview": "Thirty years after the events of the first film, a new blade runner, LAPD Officer K, unearths a long-buried secret that has the potential to plunge what's left of society into chaos. K's discovery leads him on a quest to find Rick Deckard, a former LAPD blade runner who has been missing for 30 years.",
      "budget": 150000000,
      "revenue": 259239658,
      "genres": [
          "Mystery",
          "Science Fiction",
          "Thriller"
      ],
      "runtime": 163
  },
  {
    "id": 181808,
      "title": "Star Wars: The Last Jedi",
      "tagline": "The Saga Continues",
      "vote_average": 7.1,
      "vote_count": 4732,
      "release_date": "2018-12-13",
      "poster_path": "https://image.tmdb.org/t/p/w500/kOVEVeg59E0wsnXmF9nrh6OmWII.jpg",
      "overview": "Rey develops her newly discovered abilities with the guidance of Luke Skywalker, who is unsettled by the strength of her powers. Meanwhile, the Resistance prepares to do battle with the First Order.",
      "budget": 200000000,
      "revenue": 1325937250,
      "genres": [
          "Fantasy",
          "Adventure",
          "Science Fiction"
      ],
    "runtime": 152
},
{
  "id": 245891,
  "title": "John Wick",
  "tagline": "Don't set him off.",
  "vote_average": 7,
  "vote_count": 7175,
  "release_date": "2014-10-22",
  "poster_path": "https://i5.walmartimages.com/asr/8574dd01-227a-4a34-a0a0-34db43b18db6_1.3e8a510bb7a5630a6a192875e7974730.jpeg?odnHeight=450&odnWidth=450&odnBg=ffffff",
  "overview": "Ex-hitman John Wick comes out of retirement to track down the gangsters that took everything from him.",
  "budget": 20000000,
  "revenue": 88761661,
  "genres": [
      "Action",
      "Thriller"
  ],
  "runtime": 101
},
{
  "id": 122917,
  "title": "The Hobbit: The Battle of the Five Armies",
  "tagline": "Witness the defining chapter of the Middle-Earth saga",
  "vote_average": 7.2,
  "vote_count": 6067,
  "release_date": "2015-12-10",
  "poster_path": "https://cdn.shopify.com/s/files/1/1416/8662/products/hobbit_the_battle_of_the_five_armies_2014_french_original_film_art_5000x.jpg?v=1569080234",
  "overview": "Immediately after the events of The Desolation of Smaug, Bilbo and the dwarves try to defend Erebor's mountain of treasure from others who claim it: the men of the ruined Laketown and the elves of Mirkwood. Meanwhile an army of Orcs led by Azog the Defiler is marching on Erebor, fueled by the rise of the dark lord Sauron. Dwarves, elves and men must unite, and the hope for Middle-Earth falls into Bilbo's hands.",
  "budget": 250000000,
  "revenue": 956019788,
  "genres": [
      "Action",
      "Adventure",
      "Fantasy"
  ],
  "runtime": 144
},
  ]
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'movies:set': {
      return {
        ...state,
        movies: action.payload,
      }
    }

    case 'movies:add': {
      return {
        ...state,
        movie_list: [
          ...state.movie_list,
          action.payload,
        ]
      }
    }

    case 'movies:edit': {
      const updatedList = state.movie_list.map(movie => {
        if (movie.id === action.payload.id) {
          return action.payload.data
        }

        return movie;
      });

      return {
        ...state,
        movie_list: updatedList
      }
    }

    case 'movies:delete': {
      return {
        ...state,
        movie_list: state.movie_list.filter(movie => movie.id !== action.payload.id)
      }
    }

    case 'movies:reset':
      return state;

    default:
      return state;
  }
};
