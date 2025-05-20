import React from "react";
import { StyleSheet, Text, View } from "react-native";

// placeholder for notesfile - basically the thing that actually shows the libby exports

// might want a button to open the component though
    type NotesFileProps = {
        name: string;
        description: string;
        
    };

    const NotesFile: React.FC<NotesFileProps> = ({ name, description }) => {
  return (


    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.textHeader}>
          here will eventually be cool stuff!
        </Text>
        <Text style={styles.text}> djskfdsjnd</Text>
        <Text style={styles.text}>Name: {name}</Text>
      </View>
    </View>
  );
};

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
});

export default NotesFile;