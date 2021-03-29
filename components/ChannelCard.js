import React from "react";
import { StyleSheet } from "react-native";
import { Image } from "react-native-elements";
import { View, Text, Linking, ActivityIndicator } from "react-native";

export default function ChannelCard({ data }) {
  return (
    // The card component : currently Channel Name, Channel Description and Channel Picture in shown
    <View style={styles.card}>
      <View style={styles.cardImgWrapper}>
        <Image
          //Clicking on the image is going to take the user to the youtube app
          onPress={async () => {
            const supported = await Linking.canOpenURL(
              `https://www.youtube.com/channel/${data["snippet"]["channelId"]}`
            );
            if (supported) {
              await Linking.openURL(
                `https://www.youtube.com/channel/${data["snippet"]["channelId"]}` //Opening the channel on the youtube app with the "ChannelId"
              );
            }
          }}
          source={{ uri: data["snippet"]["thumbnails"]["high"]["url"] }}
          resizeMode="cover"
          style={styles.cardImg}
          PlaceholderContent={<ActivityIndicator />}
        />
      </View>
      <View style={styles.cardInfo}>
        <Text style={styles.cardTitle}>{data.snippet.channelTitle}</Text>
        <Text numberOfLines={5} style={styles.cardDetails}>
          {data.snippet.description}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 110,
    marginVertical: 10,
    flexDirection: "row",
    shadowColor: "#999",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  cardImgWrapper: {
    flex: 1,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomLeftRadius: 8,
    borderTopLeftRadius: 8,
  },
  cardImg: {
    height: "100%",
    width: "100%",
    alignSelf: "center",
    borderRadius: 8,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },
  cardInfo: {
    flex: 2,
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: "#fff",
  },
  cardTitle: {
    fontWeight: "bold",
  },
  cardDetails: {
    fontSize: 12,
    color: "#444",
  },
});
