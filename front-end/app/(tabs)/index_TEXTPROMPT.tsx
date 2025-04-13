import { useState } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

// Change this to point to your actual API server
const API_URL = process.env.EXPO_PUBLIC_API_URL || "http://10.232.192.233:3000";

export default function EnvScanner() {
  const [inputText, setInputText] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendText = async () => {
    if (!inputText.trim()) return;

    setIsLoading(true);
    try {
      // Using the full URL instead of a relative path
      const response = await fetch(`${API_URL}/text`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ promptText: inputText }),
      });

      const result = await response.json();
      setResponse(result.success ? result.data : "Error: " + result.error);
    } catch (error) {
      setResponse("Error: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <HelloWave />
        <ThemedText style={styles.title}>EnvScanner</ThemedText>
      </View>

      <ThemedView style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Enter your prompt text..."
          multiline
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleSendText}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? "Sending..." : "Send"}
          </Text>
        </TouchableOpacity>
      </ThemedView>

      {response ? (
        <ThemedView style={styles.responseContainer}>
          <ThemedText style={styles.responseTitle}>Response:</ThemedText>
          <ThemedText style={styles.responseText}>{response}</ThemedText>
        </ThemedView>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  inputContainer: {
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    minHeight: 100,
    color: "white",
  },
  button: {
    backgroundColor: "#2196F3",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  responseContainer: {
    padding: 16,
    borderRadius: 8,
  },
  responseTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  responseText: {
    fontSize: 16,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
