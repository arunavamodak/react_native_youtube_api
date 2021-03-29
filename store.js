import { createStore, combineReducers, applyMiddleware } from "redux";
import channelReducer from "./reducers/channelReducer";
import thunk from "redux-thunk";

//Combines Reducers into one, was not required in this case, but is helpful for further development
const rootReducers = combineReducers({
  channels: channelReducer,
});

const configureStore = () => createStore(rootReducers, applyMiddleware(thunk)); //Redux Thunk is used as a middleware

export default configureStore;
