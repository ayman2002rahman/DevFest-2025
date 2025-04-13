import { useState } from 'react';
import { View, SafeAreaView, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { TextField } from 'react-native-ui-lib';
import { useRouter } from 'expo-router';
import { GoogleGenAI } from '@google/genai';

// Replace with your actual API key
const ai = new GoogleGenAI({ apiKey: "YOUR_API_KEY" });

export default function LocationScreen() {
  const router = useRouter();
  const [location, setLocation] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handlePress = async () => {
    setLoading(true);
    try {
      // Create your prompt for Gemini. For example, here we include the user-entered location in the prompt.
      const prompt = `User location: ${location}. Please provide details for an awesome scavenger hunt location.`;

      // Call GoogleGenAI's generateContent method with your model and prompt.
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
      });

      console.log("GoogleGenAI Response:", response.text);

      // Once you have the response, navigate to the next screen
      // For example, passing the response text as a parameter.
      router.push({
        pathname: '/(tabs)/scavengerHunt',
        params: { geminiResult: response.text },
      });
    } catch (error) {
      console.error("Error calling GoogleGenAI:", error);
      // Handle the error appropriately, e.g., show an alert to the user.
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className='flex-1'>
      <Text className='py-[50px] text-bold text-[36px] pl-[10px]'>
        Where would you like to explore today?
      </Text>
      <View className='w-full px-[20px]'>
        <TextField
          placeholder="Enter location"
          floatingPlaceholder={false}
          onChangeText={setLocation}
          value={location}
          fieldStyle={{
            borderBottomWidth: 1,
            borderBottomColor: '#9E9E9E',
            paddingVertical: 5,
          }}
          textInputProps={{
            style: {
              fontSize: 24,
              color: '#333',
              paddingVertical: 8,
            },
          }}
          containerStyle={{
            marginVertical: 10,
          }}
          showCharCounter={true}
        />
      </View>
      <View className='absolute bottom-[65px] w-full'>
        <View className='flex-1 justify-center items-center px-[50px]'>
          <TouchableOpacity
            className='flex justify-center items-center w-full bg-black py-[20px] rounded-full'
            onPress={handlePress}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Text className='text-white'>Adventure Time!</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
