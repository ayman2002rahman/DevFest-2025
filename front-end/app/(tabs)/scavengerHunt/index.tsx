import { useContext } from "react";
import { View, SafeAreaView, Text, TouchableOpacity } from "react-native";
import { TextField } from "react-native-ui-lib";
import { useRouter } from "expo-router";
import { useScavengerHuntContext } from "@/contexts/ScavengerHuntProvider";
import Background from '@/assets/backgrounds/purple_bg.svg';

// current issue, gps coords are slightly innacurate from gemini,

// get the scavenger hunt data from the context provider
// use transformations to rotate the cards to give illusion that its thrown out onto the screen like a table
// After a hunt is solved, animate the next card to fly in
export default function ScavengerHuntScreen() {
  const router = useRouter();
  const { scavengerHunt, currentIndex } = useScavengerHuntContext();

  return (
    <View className='flex-1 bg-purple'>
      <Background
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
            }}
      />
      <SafeAreaView className="flex-1 ">
        <View className='pl-[20px]'>
          <Text className="text-[#F9F8F5] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] font-[Verdana] text-[40px] font-bold leading-normal">
            {" "}
            Clue {currentIndex + 1}
          </Text>    
            <Text className="text-[#F9F8F5] font-[Verdana] text-[28px] italic font-normal leading-normal"
            >{scavengerHunt[currentIndex].clue}</Text>
        </View>
        <View className="absolute bottom-[500px] w-full">
          <View className="flex-1 justify-center items-center px-[50px]">
            <TouchableOpacity
              className="flex justify-center items-center w-full bg-black py-[20px] rounded-full"
              onPress={() => {
                router.push({
                  pathname: "/(tabs)/scavengerHunt/camera",
                  params: { quest: scavengerHunt[currentIndex].clue },
                });
              }}
            >
              <Text className="text-white">Snap!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
