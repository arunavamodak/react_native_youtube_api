import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from "react-native";
import ChannelCard from "./ChannelCard";

const ChannelList = React.memo(
  ({ data, loading, nextPage, refresh, setRefresh, fetchData, search }) => {
    //Rendering each channel data in the "Channel Card component"
    const renderItem = ({ item }) => <ChannelCard data={item} />;

    if (loading) {
      return (
        <View style={styles.loaderBox}>
          <ActivityIndicator size="large" color="black" />
        </View>
      );
    } else if (data.length) {
      return (
        <View style={{ padding: 5, paddingBottom: 220 }}>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) => `${item["etag"] + index}`}
            onEndReached={() => {
              setRefresh(true);
              nextPage();
            }}
            onEndThreshold={0.3}
            loading={loading}
            refreshing={refresh}
            onRefresh={() => {
              fetchData(search);
            }}
            scrollEnabled={!refresh}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.loaderBox}>
          <Text>No Data Available</Text>
        </View>
      );
    }
  }
);

export default ChannelList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  loaderBox: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
});
