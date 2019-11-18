import { Map, List } from "immutable";

const initialState = Map({
  getPending: false,
  getError: null,
  getAllPending: false,
  getAllError: null,
  createPending: false,
  createError: null,
  item: null,
  list: List([]),
  paginatedList: Map({})
});

export default initialState;
