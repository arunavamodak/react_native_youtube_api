import React, { useState, useEffect, useCallback } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import Search from "./Search";
import axios from "axios";
import ChannelList from "./ChannelList";
import { debounce } from "lodash";

export default function Home() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({});
  const [refresh, setRefresh] = useState(false);

  const API_KEY = "AIzaSyCOhiEHI1v6JwAE4XT4vNg1dXhQKUoe37U";

  useEffect(() => {
    reload(search);
  }, [search]);

  const reload = useCallback(
    debounce((search) => fetchData(search), 300),
    []
  );

  const fetchData = (text) => {
    setLoading(true);
    axios
      .get(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${text}&maxResults=15&type=channel&key=${API_KEY}`
      )
      .then((res) => {
        setData(res.data["items"]);
        const pagination = {
          length: res.data["pageInfo"]["resultsPerPage"],
          total: res.data["pageInfo"]["totalResults"],
          nextPageToken: res.data["nextPageToken"],
        };
        setPagination(pagination);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        alert("Error in Fetching Data");
        setData([]);
        setPagination({});
        setLoading(false);
      });
  };

  const nextPage = () => {
    console.log("next page called");
    axios
      .get(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${search}&pageToken=${pagination.nextPageToken}&maxResults=10&type=channel&key=${API_KEY}`
      )
      .then((res) => {
        const newData = data.concat(res.data["items"]);
        setData(newData);
        const pagination = {
          length: res.data["pageInfo"]["resultsPerPage"],
          total: res.data["pageInfo"]["totalResults"],
          nextPageToken: res.data["nextPageToken"],
        };
        setPagination(pagination);
        setRefresh(false);
      })
      .catch((error) => {
        console.log(error);
        alert("Error in Fetching Data");
      });
  };

  return (
    <View styles={styles.container}>
      <Search search={search} setSearch={setSearch} />
      <ChannelList
        data={data}
        loading={loading}
        nextPage={nextPage}
        refresh={refresh}
        setRefresh={setRefresh}
        fetchData={fetchData}
        search={search}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  main: {
    justifyContent: "center",
    flex: 1,
  },
});
