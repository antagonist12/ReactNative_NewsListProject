import React, { Component } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import moment from "moment";

class DetailNews extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      title,
      description,
      urlToImage,
      author,
      publishedAt,
      content,
      url,
    } = this.props.route.params;

    const { name } = this.props.route.params.source;

    return (
      <View>
        <Image source={{ uri: urlToImage }} style={styles.images} />
        <Text style={{ color: "gray", marginVertical: 8 }}>{name}</Text>
        <Text
          style={{ fontWeight: "bold", fontSize: 20, textAlign: "justify" }}
        >
          {title}
        </Text>
        <Text style={{ marginVertical: 15, fontSize: 12 }}>
          {author} | {moment(publishedAt).format("LL")}
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: "gray",
            textAlign: "justify",
            marginBottom: 15,
          }}
        >
          {description}
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: "gray",
            textAlign: "justify",
            marginBottom: 15,
          }}
          numberOfLines={6}
        >
          {content}
        </Text>
        <Text style={{ color: "blue" }}>{url}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  images: {
    marginTop: 20,
    resizeMode: "contain",
    height: 200,
  },
});

export default DetailNews;
