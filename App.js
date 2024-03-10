import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FontAwesome } from '@expo/vector-icons';
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import TeamScreen from './screens/TeamScreen';
import SettingsScreen from './screens/SettingsScreen';
import PokemonDetailScreen from './screens/PokemonDetailScreen';
import { Text, View, StatusBar, TouchableOpacity, StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => (
    <Stack.Navigator>
        <Stack.Screen
            name="HomeStack"
            component={HomeScreen}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="PokemonDetail"
            component={PokemonDetailScreen}
            options={{ title: 'Détails du pokémon' }}
        />
    </Stack.Navigator>
);

function CustomTabBar({ state, descriptors, navigation }) {
    const getIconName = (routeName) => {
        if (routeName === 'Home') return 'home';
        if (routeName === 'Search') return 'search';
        if (routeName === 'Team') return 'users';
        if (routeName === 'Settings') return 'gear';
    };

    return (
        <View style={styles.tabContainer}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label = options.tabBarLabel || options.title || route.name;
                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TouchableOpacity
                        key={route.key}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={styles.tabItem}
                    >
                        <FontAwesome
                            name={getIconName(route.name)}
                            size={30}
                            color={isFocused ? '#3757ba' : 'black'}
                        />
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
                <Tab.Screen name="Home" component={HomeStack} options={{ headerShown: false }} />
                <Tab.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
                <Tab.Screen name="Team" component={TeamScreen} options={{ headerShown: false }} />
                <Tab.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    tabItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginHorizontal: 0,
        marginVertical: 20
    },
});
