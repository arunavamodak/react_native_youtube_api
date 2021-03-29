import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import Search from "./Search";
import axios from "axios";
import ChannelList from "./ChannelList";
import { debounce } from "lodash";
import { connect } from "react-redux";
import { fetchData, updateData } from "../actions/channelAction";

const Home = (props) => {
  const [search, setSearch] = useState(""); //Search Text
  const [loading, setLoading] = useState(false); //Loading Status
  const [nextPageToken, setNextPageToken] = useState(""); //Token to fetch next page
  const [refresh, setRefresh] = useState(false); //Refresh Status

  useEffect(() => {
    reload(search);
  }, [search]);

  const reload = useCallback(
    debounce((search) => fetchData(search), 300),
    []
  );

  //Changes to make after initial Fetch
  const afterFetch = (token) => {
    setLoading(false);
    setNextPageToken(token);
  };

  //Changes to make after each new page data loads after the first page
  const afterRefresh = (token) => {
    setRefresh(false);
    setNextPageToken(token);
  };

  const fetchData = (text) => {
    setLoading(true);
    props.fetchData(text, afterFetch); //Action to fetch data initially
  };

  const nextPage = () => {
    props.updateData(nextPageToken, afterRefresh); //Action to get data after the initial data has loaded
  };

  return (
    <View styles={styles.container}>
      {/* Searchbar component */}
      <Search search={search} setSearch={setSearch} />

      {/* List of the channel Cards */}
      <ChannelList
        data={props.channels}
        loading={loading}
        nextPage={nextPage}
        refresh={refresh}
        setRefresh={setRefresh}
        fetchData={fetchData}
        search={search}
      />
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    channels: state.channels.channels,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (data, afterFetch) => dispatch(fetchData(data, afterFetch)),
    updateData: (token, afterRefresh) =>
      dispatch(updateData(token, afterRefresh)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

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
