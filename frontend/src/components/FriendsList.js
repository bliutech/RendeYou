import React from "react"
import FriendCard from "./FriendCard.js"
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from "react-native"
const FriendsList = () => {
    const dispList = [
        {
            id: "1782637",
            firstname: "Bobber",
            lastname: "Cob",
            email: "jabbapen@gmail.com",
        },
        {
            id: "182637",
            firstname: "Bobber",
            lastname: "Cob",
            email: "jabbapen@gmail.com",
        },
        {
            id: "178237",
            firstname: "Bobber",
            lastname: "Cob",
            email: "jabbapen@gmail.com",
        },
        {
            id: "178637",
            firstname: "Bobber",
            lastname: "Cob",
            email: "jabbapen@gmail.com",
        },
    ];

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          marginTop: StatusBar.currentHeight || 5,
        },
        item: {
          backgroundColor: '#f9c2ff',
          padding: 20,
          marginVertical: 8,
          marginHorizontal: 16,
        },
        title: {
          fontSize: 32,
        },
    });

    const renderItem = ({item}) => (
        <FriendCard firstname={item.firstname} lastname={item.lastname} email={item.email}/>
    );

    return (
      <>
      <SafeAreaView style={styles.container}>
      <FlatList
      data={dispList}
      renderItem={renderItem}
      />
      </SafeAreaView>
      </>
    );
  }
  
  export default FriendsList;
  