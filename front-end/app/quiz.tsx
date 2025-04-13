import { useState, useEffect } from 'react';
import { ImageBackground, View, Text } from 'react-native';
import Background from '../assets/backgrounds/quiz_bg.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function QuizScreen() {
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
        <View className='flex-1 bg-[#334CCA]'>
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
        </View>
    );
};