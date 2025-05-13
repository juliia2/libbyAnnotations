import { Stack } from "expo-router";
import { StyleSheet } from "react-native";

export default function RootLayout() {
  return <Stack>
    <Stack.Screen name="index" options={{ 
      title: "Libby Annotations 📝",
      headerTintColor: "#333",
      headerTitleStyle: styles.header,
        
      headerShown: true }} />
    
    {/* <Stack.Screen name="index" options={{ headerShown: false }} /> */}
  </Stack>;
}

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    backgroundColor: "#f0f0f0",
  }
});

