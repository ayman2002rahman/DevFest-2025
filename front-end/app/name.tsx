import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from '@/assets/images/sensAI_logo.svg';
import Background from '@/assets/backgrounds/welcome_bg';

export default function ChoiceScreen() {
  const router = useRouter();
  const [name, setName] = useState('');

  const handlePress = async () => {
    if (!name.trim()) {
      Alert.alert('Name Required', 'Please enter your name to continue.');
      return;
    }

    try {
      await AsyncStorage.setItem('userName', name.trim());
      router.push('/choice');
    } catch (error) {
      Alert.alert('Error', 'Failed to save your name. Please try again.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1">
          <Background
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
            }}
          />
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
          >
            <View className="flex-1 justify-center items-center gap-[50px] mt-[-130px] px-6">
              <Logo />
              <Text className="text-[#866448] text-[30px] font-[700] text-center">
                To know someone is to begin with a name
              </Text>
              <TextInput
                placeholder="Enter your name"
                value={name}
                onChangeText={setName}
                className="w-full bg-white rounded-xl p-4 text-lg border border-gray-300"
                placeholderTextColor="#999"
              />
            </View>
            <View className="items-center px-[50px] mt-12 mb-[65px]">
              <TouchableOpacity
                className="flex justify-center items-center w-full bg-black py-[20px] rounded-full"
                onPress={handlePress}
              >
                <Text className="text-white text-lg font-semibold">
                  Next
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
