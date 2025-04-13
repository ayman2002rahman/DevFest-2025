import { useState, useEffect } from 'react';
import { ImageBackground, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Background from '../assets/backgrounds/quiz_bg.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

import QuizItem from '@/components/QuizItem';

import QuizStart from '@/components/QuizStart';
import QuizAudio from '@/components/QuizAudio';
import QuizVisual from '@/components/QuizVisual';

// list of components (represented as functions)
const slides = [
    <QuizStart/>,
    <QuizAudio/>,
    <QuizVisual/>
];

export default function QuizScreen() {
    const router = useRouter();

    const [name, setName] = useState<string | null>('');

    useEffect(() => {
        const getName = async () => {
            try {
                const value = await AsyncStorage.getItem('@name');
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
            <View className='flex-1 justify-center items-center pl-[100px] gap-[45px]'>
                <FlatList 
                    data={slides} 
                    renderItem={({ item }) => (
                        <QuizItem>
                            {item}
                        </QuizItem>
                    )}
                    horizontal
                    showsHorizontalScrollIndicator
                    pagingEnabled
                    bounces={false}
                />
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