import { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from '@/assets/images/sensAI_logo.svg';
import Background from '@/assets/backgrounds/welcome_bg';


export default function WelcomeScreen() {
    const router = useRouter();

    const [onboarded, setOnboarded] = useState<boolean | null>(null);

    useEffect(() => {
        const checkOnboardingStatus = async () => {
            try {
                const value = await AsyncStorage.getItem('@onboarded');
                setOnboarded(value === 'true');
            } catch (error) {
                console.error('Error reading onboarding status:', error);
            }
        };
        
        checkOnboardingStatus();
    }, [])

    if (onboarded === null) {
        return (
            <View className='flex-1 justify-center items-center'>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View className='flex-1 bg-[#FAF6F6]'>
            <Background
                style={{ 
                    position: 'absolute', 
                    top: 0, 
                    left: 0, 
                    width: '100%', 
                    height: '100%' 
                }}
            />
            <View className='flex-1'>
                <View className='flex-1 justify-center items-center'>
                    <View className='mt-[-60px] flex flex-col gap-[25px]'>
                        <Logo/>
                        <Text
                            className='justify-left text-[#866448] text-[48px]'
                        >
                            {'Koala-fy\n Your \n Envionrment \n Where Your Needs \n Matter'}
                        </Text>
                    </View>
                </View>
                <View className='absolute bottom-[65px] w-full'>
                    <View className='flex-1 justify-center items-center px-[50px]'>
                        <TouchableOpacity 
                            className='flex justify-center items-center w-full bg-black py-[20px] rounded-full'
                            onPress={() => {router.push('/name')}}
                        >
                            <Text className='text-white'>Get Started!</Text>
                        </TouchableOpacity>
                        {/*
                        <TouchableOpacity 
                            className='flex justify-center items-center w-full bg-black py-[20px] rounded-full'
                            onPress={() => {router.push('/(tabs)')}}
                        >
                            <Text className='text-white'>TEST!</Text>
                        </TouchableOpacity>*/}
                    </View>
                </View>
            </View>
        </View>
    );
};