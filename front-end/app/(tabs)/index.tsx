import { View, Text, TouchableOpacity } from 'react-native'
import MapBackground from '@/components/MapSVG';
import { Ionicons } from "@expo/vector-icons";
import { useScavengerHuntContext } from '@/contexts/ScavengerHuntProvider';

export default function QuestScreen() {
    const { currentIndex } = useScavengerHuntContext();

    return (
        <View className="flex-1">
          <MapBackground currentIndex={0} />
          {/* other screen content */}
        </View>
    );
}; 