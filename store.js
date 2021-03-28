import { createStore, combineReducers, applyMiddleware } from "redux";
import channelReducer from "./reducers/channelReducer";
import thunk from "redux-thunk";

const rootReducers = combineReducers({
  channels: channelReducer,
});

const configureStore = () => createStore(rootReducers, applyMiddleware(thunk));

export default configureStore;
