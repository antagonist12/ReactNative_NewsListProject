import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import axios from "axios";

class News extends Component {
  //! Use State pada class component
  constructor(props) {
    super(props);
    this.state = { btnSelected: 1, value: "us", pageCurrent: 1, request: [] };
  }

  render() {
    return (
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
});

export default News;
