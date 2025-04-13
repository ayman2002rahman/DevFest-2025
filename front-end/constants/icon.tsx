import { Ionicons } from "@expo/vector-icons";

export const icon: Record<'index' | 'scavengerHunt', (props: any) => JSX.Element> = {
    scavengerHunt: (props: any) => <Ionicons name='document-text-outline' size={24} {...props} />,
    index: (props: any) => <Ionicons name='trophy-outline' size={24} {...props} />,
};