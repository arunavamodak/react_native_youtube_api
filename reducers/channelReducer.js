import { FETCH_DATA, UPDATE_DATA } from "../actions/types";

const initialState = {
  channels: [],
};

const channelReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA:
      return {
        ...state,
        channels: action.payload,
      };
    case UPDATE_DATA:
      return {
        ...state,
        channels: state.channels.concat(action.payload),
      };
    default:
      return state;
  }
};

export default channelReducer;
