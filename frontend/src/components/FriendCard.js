import { View, Text, Image, StyleSheet } from "react-native"

const styles = StyleSheet.create({
    item: {
      backgroundColor: '#ffbd95',
      borderColor: "#fc6a01",
      borderWidth: 4,
      borderRadius: 16,
      padding: 40,
      marginVertical: 8,
      marginHorizontal: 16,
      flexDirection: "row",
    },
    subitem: {
        backgroundColor: '#ffbd95',
        padding: 10,
        marginVertical: 6,
        marginHorizontal: 12,
        flexDirection: "column",
      },
    title: {
      fontSize: 20,
      fontFamily: "sans-serif",
      fontWeight: "bold",
      flexDirection: "column",
      alignSelf: "flex-end",
    },
    body: {
      fontSize: 10,
      fontFamily: "sans-serif",
      padding: 6,
      color: "#ffffff",
      shadowColor: "#222222",
      backgroundColor: "#fc6a01",
      borderRadius: 8,
      // flexDirection: "column",
      alignSelf: "flex-start",
      
    },
    image: {
        width: 50,
        height: 50,
        marginHorizontal: 5,
        // justifyContent: "flex-end",
        alignSelf: "center",
        // alignItems: "flex-end",
        // flexWrap: "wrap",
    }
  });

const FriendCard = ({  // Maybe profile pic?
    id,
    firstname,
    lastname,
    email,
    image,
  }) => {
      return (
      <View style={styles.item}> 
      <Image style={styles.image} source={{uri: image,}}/>
      <View style={styles.subitem}>
      <Text style={styles.title}>{firstname} {lastname}</Text>
      <Text style={styles.body}>{email}</Text>
      </View>
      </View>
      );
  };
  
  export default FriendCard
  