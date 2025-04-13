import { Ionicons } from "@expo/vector-icons";

export const icon: Record<'index' | 'scavengerHunt', (props: any) => JSX.Element> = {
    scavengerHunt: (props: any) => <Ionicons name='home' size={24} {...props} />,
    index: (props: any) => <Ionicons name='home' size={24} {...props} />,
};