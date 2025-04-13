import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native'
import { TextField } from 'react-native-ui-lib'; 
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DisabilityQuestionScreen() {
    const router = useRouter();

    const [name, setName] = useState<string>('');

    const hanldleButton = () => {
        const saveName = async () => {
            try {
                await AsyncStorage.setItem('@name', name);
            } catch (error) {
                console.log(error);
            }
        }
        saveName();
        router.push('/quiz');
    };

    return (
        <View className='flex-1'>
            <View className='flex-1 justify-center items-center gap-[20px]'>
                <Text className='font-bold text-[20px] w-[200px]'>
                    To know someone, is to begin with a name
                </Text>
                <TextField
                    placeholder={'Name'}
                    floatingPlaceholder={false}
                    onChangeText={text => setName(text)}
                    enableErrorshell
                    validateOnChange
                    validate={['required']}
                    validationMessage={['Name is required']}
                    maxLength={30}
                    fieldStyle={{
                        //borderBottomWidth: 1,
                        borderBottomColor: '#9E9E9E',
                        paddingVertical: 5,
                        //fontSize: 18,
                    }}
                    style={{
                        fontSize: 16,
                        paddingVertical: 5,
                        paddingHorizontal: 0,
                        color: '#333'
                    }}
                    containerStyle={{
                        //width: 200,
                        marginVertical: 10,
                    }}
                />
            </View>
            <View className='absolute bottom-[65px] w-full'>
                <View className='flex-1 justify-center items-center px-[50px]'>
                    <TouchableOpacity 
                        className='flex justify-center items-center w-full bg-black py-[20px] rounded-full'
                        onPress={hanldleButton}
                    >
                        <Text className='text-white'>Next</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};