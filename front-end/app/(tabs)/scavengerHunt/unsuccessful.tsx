import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function Unsuccessful() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Unsuccessful</Text>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../../assets/images/Unsuccessful_picture.png")}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.description}>
        I'm sorry, that was not the right image, please go back and try again.
      </Text>
      <TouchableOpacity style={styles.button} onPress={() => router.back()}>
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fffaf5",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#731c1c",
    marginBottom: 16,
  },
  imageContainer: {
    borderRadius: 20,
    backgroundColor: "#5a1e1e",
    padding: 12,
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 24,
    color: "#5a1e1e",
  },
  button: {
    backgroundColor: "#e25e5e",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 18,
  },
});
