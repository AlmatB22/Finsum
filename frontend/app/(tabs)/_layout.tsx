import { HeaderTitle } from "@react-navigation/elements";
import { Tabs } from "expo-router";
import { StatusBar } from "react-native";
import Feather from "@expo/vector-icons/Feather";

export default function TabsLayout() {
    return (
        <Tabs screenOptions={{ headerShown: false}}>
            <Tabs.Screen
                name="index"
                options={{
                title: 'Home',
                tabBarIcon: ({ color, size }) => (
                    <Feather name="home" size={size} color={color} />
                ),
                }}
            />
            <Tabs.Screen
                name="favorites"
                options={{
                title: 'Favorites',
                tabBarIcon: ({ color, size }) => (
                    <Feather name="heart" size={size} color={color} />
                ),
                }}
            />
        </Tabs>
    )
}