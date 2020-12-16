import { GENRES, SORT_OPTIONS } from 'constants/movie-filters';

const initialState = {
  selected_movie: undefined,
  data: [],
  totalAmount: 0,
  offset: 0,
  limit: 10,
  sortBy: SORT_OPTIONS[0],
  sortOrder: 'desc',
  filter: GENRES[0],
  searchBy: 'title',
  search: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'movies:set': {
      return {
        ...state,
        ...action.payload,
      }
    }

    case 'movies:add': {
      return {
        ...state,
        data: [
          ...state.data,
          action.payload,
        ]
      }
    }

    case 'movies:edit': {
      const updatedList = state.data.map(movie => {
        if (movie.id === action.payload.data.id) {
          return {
            ...movie,
            ...action.payload.data
          }
        }

        return movie;
      });

      return {
        ...state,
        data: updatedList
      }
    }

    case 'movies:delete': {
      return {
        ...state,
        data: state.data.filter(movie => movie.id !== action.payload.id)
      }
    }

    case 'movies:select': {
      return {
        ...state,
        selected_movie: state.data.find(movie => movie.id === +action.payload.id)
      }
    }

    case 'movies:reset':
      return state;

    default:
      return state;
  }
};
