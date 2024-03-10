import React from "react";
import { TouchableOpacity, StyleSheet, Image, Text } from "react-native";

export default function PokemonListCard({ item, onPress }) {
    return (
        <TouchableOpacity style={styles.pokemonContainer} onPress={onPress}>
            <Image style={styles.pokemonSprite} source={{ uri: item.image }} />
            <Text style={styles.pokemonTitle}>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    pokemonContainer: {
        marginTop: 20,
        margin: 10,
        padding: 5,
        borderRadius: 10,
        alignItems: "center",
        borderWidth: 2,
        borderColor: "#3757ba",
    },
    pokemonTitle: {
        fontSize: 16,
        marginTop: 10,
        fontWeight: "bold",
    },
    pokemonSprite: {
        width: 150,
        height: 150,
        borderRadius: 10,
    },
});
