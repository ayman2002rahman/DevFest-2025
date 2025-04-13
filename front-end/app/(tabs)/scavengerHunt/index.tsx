import { useEffect } from "react";
import { View, SafeAreaView, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useScavengerHuntContext } from "@/contexts/ScavengerHuntProvider";
import Background from '@/assets/backgrounds/purple_bg.svg';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolate,
  Easing,
} from 'react-native-reanimated';

export default function ScavengerHuntScreen() {
  const router = useRouter();
  const { scavengerHunt, currentIndex } = useScavengerHuntContext();

  // Animation shared values
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);
  const rotate = useSharedValue(-5); // degrees

  // Animate in when currentIndex changes
  useEffect(() => {
    opacity.value = 0;
    translateY.value = 20;
    rotate.value = -5;

    opacity.value = withTiming(1, { duration: 400 });
    translateY.value = withTiming(0, { duration: 400, easing: Easing.out(Easing.exp) });
    rotate.value = withTiming(0, { duration: 400, easing: Easing.out(Easing.exp) });
  }, [currentIndex]);

  // Card style
  const animatedCardStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { translateY: translateY.value },
      { rotate: `${rotate.value}deg` }
    ],
  }));

  return (
    <View className="flex-1 bg-purple">
      <Background
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      />
      <SafeAreaView className="flex-1">
        <Animated.View style={[animatedCardStyle]} className="flex-1 justify-center items-center px-6">
          <Text className="text-[#F9F8F5] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] font-[Verdana] text-[40px] font-bold leading-normal text-center">
            Clue {currentIndex + 1}
          </Text>
          <Text className="mt-4 text-[#F9F8F5] font-[Verdana] text-[28px] italic font-normal leading-normal text-center">
            {scavengerHunt[currentIndex].clue}
          </Text>
        </Animated.View>

        <View className="absolute bottom-[200px] w-full">
          <View className="flex-1 justify-center items-center px-[50px]">
            <TouchableOpacity
              className="flex justify-center items-center w-full bg-yellow py-[20px] rounded-full"
              onPress={() => {
                router.push({
                  pathname: "/(tabs)/scavengerHunt/camera",
                  params: { quest: scavengerHunt[currentIndex].clue },
                });
              }}
            >
              <Text className="text-textPurple text-lg font-semibold">Snap!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
