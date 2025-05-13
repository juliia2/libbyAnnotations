import { Text, View } from "react-native";
import { StyleSheet } from "react-native";

export const unstable_settings = {
  initialRouteName: "index",
};
export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.textHeader}>here will eventuall be cool stuff!</Text>
        <Text style={styles.text}></Text>
      </View>
    </View>
  );
}

// stylesheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: "center",
    // alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  textContainer: {
    marginBottom: 20,
    padding: 10,
    //backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  textHeader: {
    fontSize: 20,
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
    color: "#333",  
  }
});
