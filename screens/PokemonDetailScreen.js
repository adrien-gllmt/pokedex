import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function PokemonDetailScreen({ route }) {
    const { name, image, id, types, abilities } = route.params;

    return (
        <View style={styles.container}>

            <Image style={styles.pokemonImage} source={{ uri: image }} />
            <View style={styles.pokemonDetails}>
                <Text style={styles.pokemonName}>{name}</Text>
                <Text>ID: {id}</Text>
                {types && (
                    <Text>Types : {types.length > 0 ? types.join(", ") : 'n/a'}</Text>
                )}
                {abilities && (
                    <Text>Capacités : {abilities.length > 0 ? abilities.join(", ") : 'n/a'}</Text>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8f8f8',
    },
    pokemonImage: {
        width: 350,
        height: 350,
        borderRadius: 10,
        shadowColor: '#000'
    },
    pokemonName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
        textTransform: 'uppercase',
    },
    pokemonDetails: {
        marginTop: 20,
        width: 350,
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
    }
});
