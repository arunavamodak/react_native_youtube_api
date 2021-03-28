import React, { useState, useEffect, useCallback } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import Search from "./Search";
import axios from "axios";
import ChannelList from "./ChannelList";
import { debounce } from "lodash";
import { connect } from "react-redux";
import { fetchData, updateData } from "../actions/channelAction";

const Home = (props) => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [nextPageToken, setNextPageToken] = useState("");
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    reload(search);
  }, [search]);

  const reload = useCallback(
    debounce((search) => fetchData(search), 300),
    []
  );

  const afterFetch = (token) => {
    setLoading(false);
    setNextPageToken(token);
  };

  const afterRefresh = (token) => {
    setRefresh(false);
    setNextPageToken(token);
  };

  const fetchData = (text) => {
    setLoading(true);
    props.fetchData(text, afterFetch);
  };

  const nextPage = () => {
    props.updateData(nextPageToken, afterRefresh);
  };

  return (
    <View styles={styles.container}>
      <Search search={search} setSearch={setSearch} />
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
