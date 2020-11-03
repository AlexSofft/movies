export const addMovie = data => {
  return { type: 'movies:add', payload: data };
}

export const editMovie = (id, data) => {
  return { type: 'movies:edit', payload: { id, data } };
}

export const deleteMovie = id => {
  return { type: 'movies:delete', payload: { id } };
}