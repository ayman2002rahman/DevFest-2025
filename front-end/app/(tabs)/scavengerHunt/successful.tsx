import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useScavengerHuntContext } from "@/contexts/ScavengerHuntProvider";

export default function Successful() {
  const router = useRouter();
  const { currentIndex, setCurrentIndex } = useScavengerHuntContext();

  const handleChange = () => {
    setCurrentIndex(prev => prev + 1);
    router.back();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Successful</Text>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../../assets/images/Successful_picture.png")}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.description}>
        Yay, that is the correct image! You are able to continue.
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleChange}>
        <Text style={styles.buttonText}>Continue</Text>
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
    color: "#1f452f",
    marginBottom: 16,
  },
  imageContainer: {
    borderRadius: 20,
    backgroundColor: "#123c23",
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
    color: "#333",
  },
  button: {
    backgroundColor: "#4caf50",
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
