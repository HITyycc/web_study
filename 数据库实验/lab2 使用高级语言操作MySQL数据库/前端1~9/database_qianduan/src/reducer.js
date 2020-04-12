const de = {data:[]};
const UPDATE_DATA = 'update data';
function reducer(state = de, action){
  console.log(state);
  if(action.type === UPDATE_DATA){
    return {data: action.data};
  }
  return state;
}
export default reducer;
