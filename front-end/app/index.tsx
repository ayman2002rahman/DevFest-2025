import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Logo from '@/assets/images/sensAI_logo.svg'; 

export default function WelcomeScreen() {
    const router = useRouter();

    return (
        <View className='flex-1'>
            <View className='flex-1 justify-center items-center'>
                <Logo/>
            </View>
            <View className='absolute bottom-[65px] w-full'>
                <View className='flex-1 justify-center items-center px-[50px]'>
                    <TouchableOpacity 
                        className='flex justify-center items-center w-full bg-black py-[20px] rounded-full'
                        onPress={() => {router.push('/disabilityQuestion')}}
                    >
                        <Text className='text-white'>Get Started!</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};