import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDocumentAsync } from "expo-document-picker";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AddTile from "./components/AddTile";
import AddTileModal from "./components/AddTileModal";

import { useRouter } from "expo-router";

export const options = {
  title: "index",
};

type NewFileData = {
  name: string;
  uri: string;
};
type NewTileData = {
  name: string;
  description: string;
  file: NewFileData;
};
export default function Index() {

  const router = useRouter();


  const [modalVisible, setModalVisible] = useState(false);
  const [customFileName, setCustomFileName] = useState("");
  const [customTempFileDescription, setCustomTempFileDescription] =
    useState("");
  const [newTileData, setNewTileData] = useState<NewTileData>({
    name: "",
    description: "",
    file: {
      name: "",
      uri: "",
    },
  });

  const [newFileData, setNewFileData] = useState<NewFileData>({
    name: "",
    uri: "",
  });

  useEffect(() => {
    const loadTiles = async () => {
      try {
        const storedTiles = await AsyncStorage.getItem("tiles");
        if (storedTiles) {
          setTiles(JSON.parse(storedTiles));
          console.log(
            "Tiles loaded from AsyncStorage:",
            JSON.parse(storedTiles)
          );
        }
      } catch (e) {
        console.error("Error loading tiles from AsyncStorage:", e);
      }
    };

    loadTiles();
    console.log("attempting to load tiles from AsyncStorage");
    console.log("Tiles:", tiles); // temp thing
  }, []);

  const handleSelectFile = async () => {
    console.log("Opening file picker...");
    try {
      const result = await getDocumentAsync({
        type: "application/json",
        copyToCacheDirectory: true,
        multiple: false, // only one file
      });

      if (result.canceled) {
        console.log("User cancelled file picker");
        return;
      }

      const file = result.assets[0];
      console.log("File selected:", file);

      setNewTileData((prev) => ({
        ...prev,
        file: {
          name: file.name,
          uri: file.uri,
        },
      }));
    } catch (error) {
      console.error("Error picking file:", error);
    }
  };

  const handleSave = async () => {
    // for some reason only one of the tiles saved. check that. other thing: when tiles open another page, make an option to delete the tile

    const newTile = {
      name: customFileName || newTileData.file.name,
      description: customTempFileDescription,
      file: newTileData.file,
    };

    const updatedTiles = [...tiles, newTile];
    setTiles(updatedTiles);

    console.log("New tile added:", newTile);

    try {
      await AsyncStorage.setItem("tiles", JSON.stringify(updatedTiles));
      console.log("Tiles saved to AsyncStorage");
      console.log("Current tiles:", tiles);
    } catch (e) {
      console.error("Error saving tiles to AsyncStorage:", e);
    }
    setModalVisible(false);
    
    setCustomFileName("");
    setCustomTempFileDescription("");
    setNewTileData({
      name: "",
      description: "",
      file: {
        name: "",
        uri: "",
      },
    });
    setNewFileData({
      name: "",
      uri: "",
    });
    console.log("Modal closed and state reset");
  };

  const [tiles, setTiles] = useState<NewTileData[]>([]);

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.textHeader}>
            here will eventually be cool stuff!
          </Text>
          {/* <NotesFile name="Sample Name" description="Sample Description" /> */}

          <View style={styles.tilesContainer}>
            {tiles
              .slice(0)
              .reverse()
              .map((tile, index) => (
                <Pressable
                  key={index}
                  style={styles.tile}
                  onPress={() => {
                    router.push({
                      pathname: "/details",
                      params: {
                        name: tile.name,
                        description: tile.description,
                        fileUri: tile.file.uri,
                      },
                    });
                    // Here you can navigate to a new screen or show the tile details
                  }}
                >
                  <Text style={styles.text}>{tile.name}</Text>
                </Pressable>
              ))}

            <AddTile onPress={() => setModalVisible(true)} />
          </View>
          <AddTileModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            onChangeName={setCustomFileName}
            onChangeTempDescription={setCustomTempFileDescription}
            setNewFileData={newFileData}
            onSelectFile={handleSelectFile}
            customFileName={customFileName}
            customTempFileDescription={customTempFileDescription}
            newTileData={newTileData}
            onSave={handleSave}
          />
          <Text style={styles.text}>
            {" "}
            below modal text (in reality there shoulldnt be anything here i
            think){" "}
          </Text>
        </View>
      </View>
    </SafeAreaProvider>
  );
}

// stylesheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: "center",
    // alignItems: "center",
    padding: 10,
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
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    color: "#4d83db",
  },
  input: {
    height: 40,
    borderColor: "#4d83db",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginTop: 5,
    marginBottom: 10,
    backgroundColor: "#f0f0f0",
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    //alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 15,
    paddingBottom: 15,
    //alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,

    maxHeight: "90%",
    overflow: "scroll", // allows scrolling if content is too long
    flexShrink: 1, // allows the modal to shrink if needed
    //flexGrow: 1, // allows the modal to grow if needed
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "#3473d9",
    marginTop: 10,
    width: "auto",
    alignSelf: "flex-end", //woah this is a super helpful thing lol
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },

  tilesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  tile: {
    width: 95,
    height: 95,
    backgroundColor: "#a8c7f7",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    margin: 8,
    borderWidth: 1,
    borderColor: "#3673d6",
  },
});
