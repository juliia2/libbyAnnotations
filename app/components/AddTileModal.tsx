import React from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type NewFileData = {
  name: string;
  uri: string;
  content: string; 
};
type NewTileData = {
  name: string;
  description: string;
  file: NewFileData;
};

type AddTileModalProps = {
  setNewFileData: NewFileData;
  newTileData: NewTileData;
  visible: boolean;
  onClose: () => void;
  onSave: () => void;
  onChangeName: (text: string) => void;
  onChangeTempDescription: (text: string) => void;
  onSelectFile?: () => void;
  customFileName: string;
  customTempFileDescription: string;
};

export default function AddTileModal({
  visible,
  onClose,
  onSave,
  onChangeName,
  onChangeTempDescription,
  setNewFileData,
  newTileData,
  onSelectFile,
  customFileName,
  customTempFileDescription,
}: AddTileModalProps) {
  const handleDescriptionChange = (text: string) => {
    if (text.trim() === "") {
      // If the description is empty, set it to "No description"
      text = "No description";
    }
    onChangeTempDescription(text);
  };

  const handleNameChange = (text: string) => {
    console.log("Name changed to:", text);
    if (text.trim() === "") {
      // if empty say no name
      text = "No name";
      console.warn("No name provided, setting to 'No name'");
    }
    onChangeName(text);
  };
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <Text style={styles.textHeader}>Add New Annotation File</Text>

          <Pressable
            style={[styles.button, { alignSelf: "center" }]} // center the button
            onPress={onSelectFile}
          >
            <Text style={styles.buttonText}>Select File</Text>
          </Pressable>

          <Text style={styles.inputLabel}>Name:</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleNameChange}
            value={customFileName}
            placeholder="Enter name"
          ></TextInput>

          <Text style={styles.inputLabel}>Description:</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleDescriptionChange}
            value={customTempFileDescription}
            placeholder="Enter description"
          />
          <Text style={styles.text}>
            Selected File: {newTileData?.file?.name || "No file selected"}
          </Text>

          {/* those (custom name, description) are kind of place holders in a way? like, once i have the program reading the json, it should extract from there, and then user can change if they wish */}
          {/* also, remember to add a thumbnail photo? for tile i guess */}

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <Pressable
              style={styles.button} // add margin to the right
              onPress={() => onSave()} // close modal and save changes
            >
              <Text style={styles.buttonText}>Save</Text>
            </Pressable>
            <Pressable
              style={[styles.button, { backgroundColor: "#d93434" }]} // red color for close button
              onPress={() => onClose()} // close modal without saving
            >
              <Text style={styles.buttonText}>Close Modal</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
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
    alignSelf: "flex-end",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
