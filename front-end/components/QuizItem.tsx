import React, { ComponentType } from 'react';
import { View, Text, StyleSheet, Image, useWindowDimensions } from 'react-native';

interface QuizItemProps {
    children: React.ReactNode;
}; 

export default function QuizItem({ children }: QuizItemProps) {
    const { width } = useWindowDimensions();

    return (
        <View style={[styles.container, { width }]}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center'
    }
});