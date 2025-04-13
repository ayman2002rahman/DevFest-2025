import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native'
import { TextField } from 'react-native-ui-lib'; 
import { useRouter } from 'expo-router';

export default function DisabilityQuestionScreen() {
    const router = useRouter();

    const [name, setName] = useState<string>('');

    const hanldleButton = () => {

    };

    return (
        <View className='flex-1'>
            <View className='flex-1 justify-center items-center'>
                <Text>To know someone, is to begin with a name</Text>
                <TextField
                    placeholder={'Placeholder'}
                    floatingPlaceholder
                    onChangeText={text => setName(text)}
                    enableErrors
                    validateOnChange
                    validate={['required']}
                    validationMessage={['Name is required']}
                    showCharCounter
                    maxLength={30}
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