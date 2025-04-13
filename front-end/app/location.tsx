import { useState } from 'react';
import { View, SafeAreaView, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { TextField } from 'react-native-ui-lib';
import { useRouter } from 'expo-router';
import { useScavengerHuntContext } from '@/contexts/ScavengerHuntProvider';
import { GoogleGenAI } from '@google/genai';
import Background from '@/assets/backgrounds/purple_bg.svg';

// Replace with your actual API key
const ai = new GoogleGenAI({ apiKey: process.env.EXPO_PUBLIC_GEMINI_API_KEY });

export default function LocationScreen() {
  const router = useRouter();
  const [location, setLocation] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const { setScavengerHunt } = useScavengerHuntContext();

  const handlePress = async () => {
    setLoading(true);
    try {
      // Create your prompt for Gemini. For example, here we include the user-entered location in the prompt.
        const prompt = `
            The user provides a location input (can be a campus, city, inside an amusement park) Generate a scavenger hunt around this location. The places should either be landmarks, food spots, or activity places. Give a total of 3 spots to go to for this scavenger hunt. Let each spot be considered as a "hunt". For each hunt, provide the name of place/landmark, photoObject, engaging clue/riddle, exact gps coordinates, and radius. Each should have a specific name to it. The clue should hint what kind of photo that the user will need to take. THe photoObject will need to be the object or description of what should be in the photo such that the photo is valid. Output the response in JSON like this:

            {
                "scavengerHunts": [
                    {
                        "name": "The name of the hunt",
                        "clue": "The short description of what the user needs to take a photo of to pass this hunt",
                        "photoObject": "What object and/or description should be in the photo to pass the test",
                        "gps": "The exact coordinates ",
                        "radius": "The radius of location in which user should be in in order to pass this hunt",
                    },
                    {
                        "name": "The name of the hunt",
                        "clue": "The short description of what the user needs to take a photo of to pass this hunt",
                        "gps": "The exact coordinates ",
                        "radius": "The radius of location in which user should be in in order to pass this hunt",
                    },
                    {
                        "name": "The name of the hunt",
                        "clue": "The short description of what the user needs to take a photo of to pass this hunt",
                        "gps": "The exact coordinates ",
                        "radius": "The radius of location in which user should be in in order to pass this hunt",
                    }
                ]
            }

            Here is the user location input: "${location}"
        `;

      // Call GoogleGenAI's generateContent method with your model and prompt.
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
      });

      console.log("GoogleGenAI Response:", response.text);

      if (typeof response.text !== 'string') {
        console.error("Response text is undefined or not a string.");
      } else {
        // Remove markdown code fences if present.
        const cleanedText = response.text
          .replace(/```json/g, '')
          .replace(/```/g, '')
          .trim();

        try {
          const obj = JSON.parse(cleanedText);
          console.log("Parsed JSON:", obj);
          setScavengerHunt(obj.scavengerHunts);
          // Navigate to the next screen, passing the parsed result.
          router.push('/(tabs)/scavengerHunt');
        } catch (jsonError) {
          console.error("Invalid JSON string:", jsonError);
        }
      }
    } catch (error) {
      console.error("Error calling GoogleGenAI:", error);
      // Handle the error appropriately, e.g., show an alert to the user.
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className='flex-1 bg-[#9853D7]'>
        <Background
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        />
      <SafeAreaView className='flex-1'>
        <View className='mt-[100px]'>
          <Text className='py-[50px] w-[300px] text-bold pl-[25px] text-[#F9F8F5] text-[34px] font-bold font-[Verdana] shadow-[0px_4px_4px_rgba(0,0,0,0.25)]'>
            Where would you like to explore today?
          </Text>
        </View>
        <View className='w-full px-[20px]'>
          <TextField
            placeholder="Enter location"
            floatingPlaceholder={false}
            onChangeText={setLocation}
            value={location}
            fieldStyle={{
              borderBottomWidth: 5,
              borderBottomColor: 'white',
              paddingVertical: 5,
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
              className='flex justify-center items-center w-full bg-yellow py-[20px] rounded-full'
              onPress={handlePress}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text className='text-textPurple font-[Verdana] text-[22px] font-bold leading-normal'>Adventure Time!</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}