import { View, StyleSheet, Button } from "react-native";
import React from "react";
import NewsScreen from "../Screen/News";
import DetailNewsScreen from "../Screen/DetailNews";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="News"
        component={NewsScreen}
        options={{
          title: "News Pages",
          headerStyle: {
            backgroundColor: "gray",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerRight: () => (
            <Button
              onPress={() => alert("This is a button!")}
              title="Info"
              color="#000"
            />
          ),
        }}
      />
      <Stack.Screen name="NewsDetail" component={DetailNewsScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default Navigation;
