import { View, SafeAreaView, Text, TouchableOpacity } from 'react-native'
import { Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function ScavengerHuntScreen() {
    return (
        <Stack>
            <Stack.Screen name='index' options={{ headerShown: false }}/>
            <Stack.Screen name='camera' options={{ headerShown: false }}/>
        </Stack>
    );
};