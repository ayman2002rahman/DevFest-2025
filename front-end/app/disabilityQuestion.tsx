import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router';

export default function DisabilityQuestionScreen() {
    const router = useRouter();

    //const use

    return (
        <View className='flex-1'>
            <View className='flex-1 justify-center items-center'>
                <Text>Whats you're disability?</Text>
                <TextInput 
                    placeholder='Email'
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