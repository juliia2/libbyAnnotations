import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export const options = {
  title: "Details",
};

export default function DetailsPage() {
  const router = useRouter();
  const { name, description, fileUri } = useLocalSearchParams();

  // also have function to delete tile
  const handleDeleteTile = async () => {
    if (!name) return;

    try { 
    const storedTiles = await AsyncStorage.getItem("tiles");
    if (!storedTiles) {
      console.error("No tiles found in local storage");
      return;
    }
    const tiles = JSON.parse(storedTiles);
    const updatedTiles = tiles.filter((tile: any) => tile.name !== name);
    await AsyncStorage.setItem("tiles", JSON.stringify(updatedTiles));

    console.log("Tile deleted"); // also do that little alert thing when you find that
    router.back(); // Navigate back after deletion

  } catch (error) {
    console.error("Error deleting tile:", error);
  }
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Text style={styles.textHeader}>Tile Details</Text>
        <Text style={styles.text}>Name: {name}</Text>
        <Text style={styles.text}>Description: {description}</Text>
        <Text style={styles.text}>File URI: {fileUri}</Text>

        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#ddd" : "#3673d6",
            },
            styles.button,
          ]}
          onPress={handleDeleteTile}
          
        >
          <Text style={styles.text}>Delete Tile</Text>
        </Pressable>
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

  button: {
    backgroundColor: "#4d83db",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
});
