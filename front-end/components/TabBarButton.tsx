import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { icon } from '@/constants/icon';
import Animated, { useSharedValue, withSpring, useAnimatedStyle, interpolate } from 'react-native-reanimated';

interface TabBarButtonProps {
    onPress: any;
    onLongPress: any;
    isFocused: boolean;
    routeName: string;
    color: string;
    label: string;
}

export default function TabBarButton({
    onPress,
    onLongPress,
    isFocused,
    routeName,
    color,
    label
}: TabBarButtonProps) {
    const scale = useSharedValue(0);

    useEffect(() => {
        scale.value = withSpring(typeof isFocused === 'boolean' ? (isFocused ? 1 : 0) : isFocused, {duration: 350})
    }, [scale, isFocused])

    const animatedIconStyle = useAnimatedStyle(() => {
        const scaleValue = interpolate(scale.value, [0, 1], [1, 1.2]);

        return {
            transform: [{
                scale: scaleValue
            }]
        }
    });

    const animatedTextStyle = useAnimatedStyle(() => {
        const opacity = interpolate(scale.value, [0, 1], [1, 0])
        return {
            opacity
        }
    });

    const IconComponent = icon[routeName as 'index' | 'scavengerHunt']; // Type assertion here
    
    return (
        <Pressable
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabbarItem}
        >
            {IconComponent && (
                <Animated.View style={animatedIconStyle}>
                    <IconComponent color={isFocused ? '#673ab7' : '#222'} />
                </Animated.View>
            )}
            <Animated.Text style={[{ color: isFocused ? '#673ab7' : '#222' }, animatedTextStyle]}>
                {label}
            </Animated.Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    tabbarItem: {
        flex: 1,
        alignItems: 'center',
        gap: 5,
    }
})