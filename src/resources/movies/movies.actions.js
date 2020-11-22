import apiHelper from 'helpers/api.helper';

export const getMovieList = async (params) => {
  const data = await apiHelper.get('/movies', { params });

  return { type: 'movies:set', payload: { ...data, ...params } };
}

export const addMovie = async (data) => {
  const result = await apiHelper.post('/movies', { data });

  return { type: 'movies:add', payload: result };
}

export const editMovie = async (data) => {
  const result = await apiHelper.put('/movies', { data });

  return { type: 'movies:edit', payload: { data: result } };
}

export const deleteMovie = async (id) => {
  await apiHelper.delete(`/movies/${id}`);

  return { type: 'movies:delete', payload: { id } };
}

export const selectMovie = id => {
  return { type: 'movies:select', payload: { id } };
}