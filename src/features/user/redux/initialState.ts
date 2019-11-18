import { Map, List } from "immutable";

const initialState = Map({
  getPending: false,
  getError: null,
  getAllPending: false,
  getAllError: null,
  inactivePending: false,
  inactiveError: null,
  item: null,
  list: List([]),
  paginatedList: Map({})
});

export default initialState;
