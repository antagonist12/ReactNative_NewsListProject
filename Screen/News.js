import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import moment from "moment";

let isScrolling = true;
class News extends Component {
  //! Use State pada class component
  constructor(props) {
    super(props);
    this.state = {
      btnSelected: 1,
      value: "us",
      pageCurrent: 1,
      request: [],
      isLoading: false,
    };
  }

  sendGetRequest = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.state.value}&page=${this.state.pageCurrent}&category=business&pageSize=5&apiKey=ea33d968f47a4cc0bd636c342873214f`;
    try {
      const resp = await axios.get(url);

      let { data } = resp;

      if (this.state.pageCurrent > 1) {
        data["articles"] = [...this.state.request.articles, ...data.articles];
      }

      this.setState({ request: resp.data });
    } catch (err) {
      console.error(err);
    }
  };

  // Component first render
  componentDidMount() {
    this.sendGetRequest();
  }

  // component update rendered
  componentDidUpdate(prevState, prevProps) {
    console.log(this.state.value);
    // if (prevState != this.state) {
    // this.handleLoadMore();
    // }
    // this.sendGetRequest();
  }

  renderItem = ({ item, index }) => {
    if (index === 0) {
      return (
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("NewsDetail", item)}
        >
          <View key={index} style={styles.itemWrapperTop}>
            <Image style={styles.images} source={{ uri: item.urlToImage }} />
            <Text style={{ color: "gray" }}>{item.source.name}</Text>
            <Text
              style={{ fontWeight: "bold", fontSize: 19, marginVertical: 5 }}
            >
              {item.title}
            </Text>
            <Text numberOfLines={1} style={{ color: "gray" }}>
              {item.description}
            </Text>
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("NewsDetail", item)}
        >
          <View key={index} style={styles.itemWrapperBottom}>
            <Image
              style={styles.imageBottom}
              source={{ uri: item.urlToImage }}
            />
            <View style={styles.contentWrapper}>
              <Text style={{ color: "gray", marginBottom: 5 }}>
                {item.source.name}
              </Text>
              <Text
                style={{ fontWeight: "bold", fontSize: 14, marginBottom: 5 }}
              >
                {item.title}
              </Text>
              <Text>{moment(item.publishedAt).format("LL")}</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
  };

  renderFooter = () => {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  };

  renderEmpty = () => {
    return (
      <Text style={{ padding: 10, fontSize: 18, textAlign: "center" }}>
        No Data
      </Text>
    );
  };

  handleLoadMore = async () => {
    this.setState({ isLoading: true, pageCurrent: this.state.pageCurrent + 1 });
    this.setState({ isLoading: false });
    console.log(this.state.pageCurrent);
  };

  render() {
    return (
      <View>
        <View
          style={{
            marginVertical: 15,
            marginHorizontal: 15,
            flexDirection: "row",
          }}
        >
          <ScrollView horizontal={true}>
            <TouchableOpacity
              style={
                this.state.btnSelected === 1
                  ? styles.btnSelected
                  : styles.notSelected
              }
              onPress={() => this.setState({ btnSelected: 1, value: "us" })}
            >
              <Text style={styles.textBtnSelected}>United State</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={
                this.state.btnSelected === 2
                  ? styles.btnSelected
                  : styles.notSelected
              }
              onPress={() => this.setState({ btnSelected: 2, value: "uk" })}
            >
              <Text style={styles.textBtnSelected}>United Kingdom</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={
                this.state.btnSelected === 3
                  ? styles.btnSelected
                  : styles.notSelected
              }
              onPress={() => this.setState({ btnSelected: 3, value: "au" })}
            >
              <Text style={styles.textBtnSelected}>Australia</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={
                this.state.btnSelected === 4
                  ? styles.btnSelected
                  : styles.notSelected
              }
              onPress={() => this.setState({ btnSelected: 4, value: "sg" })}
            >
              <Text style={styles.textBtnSelected}>Singapore</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={this.state.request.articles}
          renderItem={this.renderItem}
          ListFooterComponent={this.renderFooter}
          ListEmptyComponent={this.renderEmpty}
          // onEndReachedThreshold={0.1}
          onMomentumScrollEnd={() => {
            isScrolling = true;
          }}
          onEndReached={() => {
            if (isScrolling) this.handleLoadMore();
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  btnSelected: {
    alignItems: "center",
    backgroundColor: "gray",
    padding: 10,
    borderRadius: 5,
    marginLeft: 5,
  },
  textBtnSelected: {
    color: "white",
  },
  notSelected: {
    alignItems: "center",
    borderWidth: 1,
    borderColor: "gray",
    backgroundColor: "black",
    padding: 10,
    borderRadius: 5,
    marginLeft: 5,
  },
  itemWrapperTop: {
    paddingHorizontal: 10,
    // paddingBottom: "2%",
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  itemWrapperBottom: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  images: {
    marginTop: 20,
    resizeMode: "contain",
    height: 200,
  },
  imageBottom: {
    width: 50,
    height: 50,
    marginRight: 16,
    marginTop: 16,
  },
  contentWrapper: {
    flex: 1,
    justifyContent: "space-around",
  },
  loader: {
    marginVertical: 16,
    alignItems: "center",
    height: 100,
  },
});

export default News;
