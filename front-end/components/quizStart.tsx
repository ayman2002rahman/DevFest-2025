import { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function QuizStart() {

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
        <View>
            <View className='text-left'>
                    <Text className='text-white font-bold text-[34px]'>
                        Welcome
                    </Text>
                    <Text className='text-white font-bold text-[34px]'>
                        {name}
                    </Text>
                </View>
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
    );
}