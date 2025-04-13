import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { SegmentedControl } from 'react-native-ui-lib';
import { useRouter } from 'expo-router';

export default function DisabilityQuestionScreen() {
    const router = useRouter();

    const [visualDisabiltiy, setVisualDisibility] = useState<boolean>(false);

    const handleChange = (index: number) => {
        if (index == 0) {
            setVisualDisibility(false);
        } else {
            setVisualDisibility(true);
        }
    };

    return (
        <View className='flex-1'>
            <View className='flex-1 justify-center items-center'>
                <Text>What sense do you most struggle with??</Text>
                <SegmentedControl 
                    segments={[{label: 'Audio'}, {label: 'Visual'}]}
                    onChangeIndex={handleChange}
                />
            </View>
            <View className='absolute bottom-[65px] w-full'>
                <View className='flex-1 justify-center items-center px-[50px]'>
                    <TouchableOpacity 
                        className='flex justify-center items-center w-full bg-black py-[20px] rounded-full'
                        onPress={() => {router.push('/(tabs)')}}
                    >
                        <Text className='text-white'>Get Started!</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};