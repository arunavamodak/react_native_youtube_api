import { FETCH_DATA, UPDATE_DATA } from "./types";
import axios from "axios";
import { API_KEY } from "@env";

// const API_KEY = "AIzaSyDNkyz-KDdMHe5w8xVQJwXh8iTq2bPIqms";

export const fetchData = (text, changeCompState) => (dispatch) => {
  return axios
    .get(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${text}&maxResults=15&type=channel&key=${API_KEY}`
    )
    .then((res) => {
      dispatch(changeData(res.data["items"]));
      changeCompState(res.data["nextPageToken"]);
    })
    .catch((error) => {
      console.log(error);
      dispatch(changeData([]));
      changeCompState("");
    });
};

export const changeData = (data) => {
  return {
    type: FETCH_DATA,
    payload: data,
  };
};

export const updateData = (token, changeCompState) => (dispatch) => {
  return axios
    .get(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&pageToken=${token}&maxResults=10&type=channel&key=${API_KEY}`
    )
    .then((res) => {
      dispatch(nextData(res.data["items"]));
      changeCompState(res.data["nextPageToken"]);
    })
    .catch((error) => {
      console.log(error);
      dispatch(nextData([]));
      changeCompState("");
      Alert("Error");
    });
};

export const nextData = (data) => ({
  type: UPDATE_DATA,
  payload: data,
});
