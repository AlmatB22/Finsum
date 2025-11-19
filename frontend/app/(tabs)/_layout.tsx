import { HeaderTitle } from "@react-navigation/elements";
import { Tabs } from "expo-router";
import { StatusBar } from "react-native";
import Feather from "@expo/vector-icons/Feather";

export default function TabsLayout() {
    return (
        <Tabs screenOptions={{
            headerShown: false,
            tabBarStyle: {
                position: 'absolute',
                bottom: 30,
                marginLeft: 20,
                marginRight: 20,

                elevation: 0,
                backgroundColor: 'white',
                borderRadius: 40,
                height: 70,

                shadowColor: '#000',
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.1,
                shadowRadius: 10,

                borderTopWidth: 0,
            },
            tabBarShowLabel: true,
            tabBarLabelStyle: {
                fontSize: 12,
                fontWeight: '500',
                marginBottom: 5,
            },
            tabBarIconStyle: {
                marginTop: 5,
            }
        }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Feather name="home" size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="favorites"
                options={{
                    title: 'Updates',
                    tabBarIcon: ({ color, size }) => (
                        <Feather name="heart" size={24} color={color} />
                    ),
                }}
            />
        </Tabs>
    )
}