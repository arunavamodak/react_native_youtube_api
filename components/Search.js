import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, FlatList } from "react-native";
import { SearchBar } from "react-native-elements";

const Search = ({ search, setSearch }) => {
  return (
    <View style={styles.container}>
      <SearchBar
        round
        placeholder="Search"
        onChangeText={(text) => {
          setSearch(text);
        }}
        value={search}
        lightTheme={true}
        onClear={() => {
          setSearch("");
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    marginTop: 40,
  },
  itemStyle: {
    padding: 10,
  },
});

export default Search;
