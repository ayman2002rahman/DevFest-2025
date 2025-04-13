import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
const API = "http://10.232.192.233:3000";
import { useLocalSearchParams } from "expo-router";

export default function CameraScreen() {
  const { quest } = useLocalSearchParams();

  const [permission, requestPermission] = useCameraPermissions();
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const cameraRef = useRef<CameraView | null>(null);

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, [permission]);

  // Function to capture a photo
  const takePicture = async () => {
    if (!cameraRef.current) return;

    const photo = await cameraRef.current.takePictureAsync?.();
    if (photo && photo.uri) {
      setCapturedPhoto(photo.uri);
    } else {
      console.warn("Photo capture failed or no URI.");
    }
  };

  // Function to delete the captured photo and try again
  const retakePhoto = () => {
    setCapturedPhoto(null);
  };

  const submitPhoto = async () => {
    console.log(quest);
    if (!capturedPhoto) {
      console.warn("No photo to submit.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("photo", {
        uri: capturedPhoto,
        name: "photo.jpg",
        type: "image/jpeg",
      } as any); // `as any` helps avoid React Native type complaints
      formData.append("quest", quest.toString());

      const response = await fetch(`${API}/upload`, {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const data = await response.json();
      console.log("Server response:", data);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {capturedPhoto ? (
        // Show the captured photo (frozen image)
        <Image source={{ uri: capturedPhoto }} style={styles.cameraPreview} />
      ) : (
        // Show live camera preview
        <CameraView ref={cameraRef} style={styles.cameraPreview} />
      )}

      {/* Floating text prompt on top */}
      <View style={styles.promptContainer}>
        <Text style={styles.promptText}>Capture your moment!</Text>
      </View>

      {/* Bottom control area */}
      <View style={styles.bottomContainer}>
        {capturedPhoto ? (
          // When a photo is captured, display two side action buttons
          <>
            <TouchableOpacity onPress={retakePhoto} style={styles.sideButton}>
              <Ionicons name="trash" size={36} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.captureButtonDisabled}>
              <Ionicons name="camera" size={36} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={submitPhoto} style={styles.sideButton}>
              <Ionicons name="checkmark-circle" size={36} color="white" />
            </TouchableOpacity>
          </>
        ) : (
          // When no photo is captured, display a big capture button in the center
          <TouchableOpacity onPress={takePicture} style={styles.captureButton}>
            <Ionicons name="camera" size={36} color="white" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cameraPreview: {
    flex: 1,
  },
  promptContainer: {
    position: "absolute",
    top: 50,
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  promptText: {
    color: "white",
    fontSize: 20,
  },
  bottomContainer: {
    position: "absolute",
    bottom: 30,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
  },
  captureButton: {
    backgroundColor: "black",
    borderRadius: 50,
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  captureButtonDisabled: {
    backgroundColor: "gray", // Gray to indicate inactive capture button after taking photo.
    borderRadius: 50,
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  sideButton: {
    padding: 10,
  },
});
