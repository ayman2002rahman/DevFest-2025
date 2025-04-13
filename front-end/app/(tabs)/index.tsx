import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as FileSystem from "expo-file-system";

const API_URL = process.env.EXPO_PUBLIC_API_URL || "http://10.232.192.233:3000";

export default function EnvScanner() {
  const cameraRef = useRef<CameraView | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, [permission]);

  const recordVideo = async () => {
    if (!cameraRef.current) return;

    setIsRecording(true);
    const video = await cameraRef.current.recordAsync(); // returns { uri: string }
    setIsRecording(false);
    if (video) await uploadVideo(video.uri);
  };

  const stopRecording = () => {
    if (cameraRef.current && isRecording) {
      cameraRef.current.stopRecording();
    }
  };

  const uploadVideo = async (uri: string) => {
    setIsLoading(true);

    const fileUri = Platform.OS === "ios" ? uri.replace("file://", "") : uri;

    const formData = new FormData();
    formData.append("video", {
      uri: fileUri,
      name: "video.mp4",
      type: "video/mp4",
    } as any);

    try {
      const res = await fetch(`${API_URL}/video`, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });

      const result = await res.json();
      setResponse(result.success ? result.data : `Error: ${result.error}`);
    } catch (error: any) {
      setResponse("Error: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!permission) return <Text>Checking permissions...</Text>;
  if (!permission.granted)
    return (
      <View style={styles.container}>
        <Text>Camera access required.</Text>
        <TouchableOpacity onPress={requestPermission}>
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <CameraView
        ref={cameraRef}
        style={{ height: 300, borderRadius: 12 }}
        facing="back"
        mode="video"
        enableTorch={false}
      />

      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: isRecording ? "red" : "green" },
        ]}
        onPress={isRecording ? stopRecording : recordVideo}
      >
        <Text style={styles.buttonText}>
          {isRecording ? "Stop Recording" : "Record Video"}
        </Text>
      </TouchableOpacity>

      {isLoading && <Text style={{ marginTop: 12 }}>Processing video...</Text>}

      {response && (
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>Response:</Text>
          <Text>{response}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  button: {
    marginTop: 12,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
