import { useLocalSearchParams, useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export const options = {
  title: "Details",
};

export default function DetailsPage() {
  const router = useRouter();
  const { name, description, fileUri } = useLocalSearchParams();

  // also have function to delete tile


return (
  <SafeAreaProvider>
    <View style={styles.container}>
      <Text style={styles.textHeader}>Tile Details</Text>
      <Text style={styles.text}>Name: {name}</Text>
      <Text style={styles.text}>Description: {description}</Text>
      <Text style={styles.text}>File URI: {fileUri}</Text>
    </View>
  </SafeAreaProvider>
);
}


  const styles = StyleSheet.create({
    container: {
        flex: 1,    
        padding: 20,
        backgroundColor: "#fff", 
    },
    text: {
        fontSize: 16,
        color: "#333", 
    },
    textHeader: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
});
