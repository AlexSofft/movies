import reducer from './movies.reducer';

const testObj = {
  id: 1,
  title: "stan",
}
const testObj2 = {
  id: 2,
  title: "cartman",
}

const stateBefore = {
  selected_movie: undefined,
  data: [testObj, testObj2],
  totalAmount: 0,
  offset: 0,
  limit: 10,
  sortBy: 'Release date',
  sortOrder: 'desc',
  filter: 'All',
  searchBy: 'title',
  search: '',
}

describe('movies reducer', () => { 
  it('should set limit', () => {
      const action = {
      type: 'movies:set',
      payload: {limit: 20}  
    }
    expect(reducer(stateBefore, action)).toEqual({
      ...stateBefore,
    ...action.payload, 
    })
  })

  it('sholud add new movies to data', () => { 
    const action = {
      type: 'movies:add',
      payload: [testObj, testObj2]
    }
    expect(reducer(stateBefore, action)).toEqual({
        ...stateBefore,
        data: [...stateBefore.data, action.payload], 
    })    
  })

  it('sholud edit movie', () => { 
    const action = {
      type: 'movies:edit',
      payload: {data: {id: 1, title: 'newTitle'}}
    }
    expect(reducer(stateBefore, action).data[0]).toEqual({
        id: 1, 
        title: 'newTitle'
    })    
  })

  it('sholud delete movie', () => { 
    const action = {
      type: 'movies:delete',
      payload:  {id: 1}
    }
  
    expect(reducer(stateBefore, action).data.length).toEqual(
      stateBefore.data.length - 1 
    )    
  })

  it('sholud select movie', () => { 
    const action = {
      type: 'movies:select',
      payload:  {id: 1}
    }
    expect(reducer(stateBefore, action).selected_movie).toEqual({
     id: 1, 
     "title": "stan",
    })    
  })

  it('sholud reset state', () => { 
    const action = {
      type: 'movies:reset',
    }
    expect(reducer(stateBefore, action)).toEqual({
  ...stateBefore
    })    
  })

})