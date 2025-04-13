import { useState, useEffect } from 'react';
import { ImageBackground, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Background from '../assets/backgrounds/quiz_bg.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function QuizScreen() {
    const router = useRouter();

    const [name, setName] = useState<string | null>('');

    useEffect(() => {
        const getName = async () => {
            try {
                const value = await AsyncStorage.getItem('@onboarded');
                setName(value);
            } catch (error) {
                console.log(error);
            }
        };
        getName();
    }, [])

    return (
        <View className='flex-1 bg-blue'>
            <Background
                style={{ 
                    position: 'absolute', 
                    top: 0, 
                    left: 0, 
                    width: '100%', 
                    height: '100%' 
                }}
            />
            <View className='flex-1 justify-center items-center gap-[45px]'>
                <View className='text-left'>
                    <Text className='text-white font-bold text-[34px]'>
                        Know your
                    </Text>
                    <Text className='text-white font-bold text-[34px]'>
                        Disability
                    </Text>
                </View>
                <View className='gap-[10px]'>
                    <Text className='text-white italic text-[24px]'>
                        The first step to better
                    </Text>
                    <Text className='text-white italic text-[24px]'>
                        Accessibility
                    </Text>
                </View>
            </View>
            <View className='absolute bottom-[65px] w-full'>
                <View className='flex-1 justify-center items-center px-[50px]'>
                    <TouchableOpacity 
                        className='flex justify-center items-center w-full bg-yellow py-[20px] rounded-full'
                        onPress={() => {router.push('/nameQuestion')}}
                    >
                        <View className='flex flex-row justify-center items-center gap-[8px]'>
                            <Text className='text-blue font-extrabold text-[22px]'>START</Text>
                            <Ionicons name='chevron-forward' size={24} color='blue'/>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};