import { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from '@/assets/images/sensAI_logo.svg';
import Background from '@/assets/backgrounds/welcome_bg';

export default function ChoiceScreen() {
  const router = useRouter();
  const [name, setName] = useState('');

  useEffect(() => {
    const loadName = async () => {
      try {
        const storedName = await AsyncStorage.getItem('userName');
        if (storedName) {
          setName(storedName);
        }
      } catch (error) {
        console.error('Failed to load name from storage:', error);
      }
    };

    loadName();
  }, []);

  return (
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
      <View className="flex-1">
        <View className="flex-1 justify-center items-center gap-[50px] mt-[-130px]">
          <Logo />
          <Text className="justify-left text-[#866448] text-[30px] font-[700] text-center">
            {name ? `${name}, choose your path wisely` : 'Loading...'}
          </Text>
          <View className="flex flex-row gap-[30px]">
            <TouchableOpacity
              className="w-fill h-fill flex justify-center items-center gap-[10px]"
              onPress={() => {
                router.push('/accessibility');
              }}
            >
              <Image
                source={require('@/assets/images/glass.png')}
                style={{ width: 150, height: 150 }}
              />
              <Text>Accessibility</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="w-fill h-fill flex justify-center items-center gap-[10px]"
              onPress={() => {
                router.push('/location');
              }}
            >
              <Image
                source={require('@/assets/images/clock.png')}
                style={{ width: 150, height: 150 }}
              />
              <Text>Adventure</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="absolute bottom-[65px] w-full">
          <View className="flex-1 justify-center items-center px-[50px]">
            {/* Optional button area */}
          </View>
        </View>
      </View>
    </View>
  );
}
