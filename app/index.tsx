import { getDocumentAsync } from "expo-document-picker";
import { useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AddTile from "./components/AddTile";

export const unstable_settings = {
  initialRouteName: "index",
};

export default function Index() {
  const [modalVisible, setModalVisible] = useState(false);
  const [customFileName, onChangeName] = useState("Enter name");
  const [customFileDescription, onChangeDescription] = useState(
    "Enter description"
  );
  const [newFileData, setNewFileData] = useState({
    name: "",
    uri: "",
  });
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.textHeader}>
            here will eventually be cool stuff!
          </Text>
          {/* <NotesFile name="Sample Name" description="Sample Description" /> */}
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalView}>
                <Text style={styles.textHeader}>Add New Annotation File</Text>

                <Pressable
                  style={[styles.button, { alignSelf: "center" }]} // center the button
                  onPress={async () => {
                    try {
                      const result = await getDocumentAsync({
                        type: "application/json", // only json files
                        copyToCacheDirectory: true, // file copied to cache, can get uri
                      });
                      if (result.canceled) {
                        console.log("User cancelled file picker");
                        return;
                      }

                      const file = result.assets[0];

                      console.log("(check) File selected:", file); //currently just to console, but will need a user visual too
                      setNewFileData((prev) => ({
                        ...prev,
                        name: file.name,
                        uri: file.uri,
                      }));
                    } catch (error) {
                      console.error("Error picking file:", error);
                    }
                  }}
                >
                  <Text style={styles.buttonText}>Select File</Text>
                </Pressable>

                <Text style={styles.inputLabel}>Name:</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={onChangeName}
                  value={customFileName}
                  placeholder="Enter name"
                ></TextInput>

                <Text style={styles.inputLabel}>Description:</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={onChangeDescription}
                  value={customFileDescription}
                  placeholder="Enter description"
                ></TextInput> 
                {/* those (custom name, description) are kind of place holders in a way? like, once i have the program reading the json, it should extract from there, and then user can change if they wish */}
                  {/* also, remember to add a thumbnail photo? for tile i guess */}
                <Text style={styles.text}>(This is a modal)</Text>
                <Text>
                  {" "}
                  ill eventually be putting the file opener here + wtv else is
                  needed to create a new File View thingy (wtv ill end up
                  calling it)
                </Text>
                <Pressable
                  style={styles.button}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.buttonText}>Close Modal</Text>
                </Pressable>
              </View>
            </View>
          </Modal>

          <AddTile onPress={() => setModalVisible(true)} />
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
});
