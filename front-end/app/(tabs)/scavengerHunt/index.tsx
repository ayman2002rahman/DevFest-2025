import { useContext } from 'react';
import { View, SafeAreaView, Text, TouchableOpacity } from 'react-native'
import { TextField } from 'react-native-ui-lib';
import { useRouter } from "expo-router";
import { useScavengerHuntContext } from '@/contexts/ScavengerHuntProvider';

// current issue, gps coords are slightly innacurate from gemini, 

// get the scavenger hunt data from the context provider 
// use transformations to rotate the cards to give illusion that its thrown out onto the screen like a table
// After a hunt is solved, animate the next card to fly in
export default function ScavengerHuntScreen() {
    const router = useRouter();
    const { scavengerHunt, currentIndex } = useScavengerHuntContext();

    return (
        <SafeAreaView className='flex-1 '>
            <Text className='font-semibold text-[48px]'> Clue {currentIndex+1}</Text>
            <View className='flex flex-col gap-'>
                <Text>{scavengerHunt[currentIndex].clue}</Text>
            </View>
            <View className='absolute bottom-[500px] w-full'>
                <View className='flex-1 justify-center items-center px-[50px]'>
                    <TouchableOpacity 
                        className='flex justify-center items-center w-full bg-black py-[20px] rounded-full'
                        onPress={() => {router.push('/(tabs)/scavengerHunt/camera')}}
                    >
                        <Text className='text-white'>Snap!</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};