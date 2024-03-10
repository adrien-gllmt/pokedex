import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, ActivityIndicator, FlatList, TouchableWithoutFeedback, Keyboard, StyleSheet,} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { searchPokemons, fetchPokemonDetails } from "../utils/api";

export default function SearchScreen() {
    const navigation = useNavigation();

    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [searchResults, setSearchResults] = useState([]);

    async function search() {
        if (searchTerm.trim() === '') {
            setSearchResults([]);
            return;
        }

        setIsLoading(true);

        try {
            const results = await searchPokemons(searchTerm);
            setSearchResults(results);
        } catch (error) {
            console.error('Error fetching Pokemon data:', error);
            Alert.alert('Erreur', 'Erreur lors de la recherche du Pokémon.');
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        search().then(r => console.log("Recherche effectuée"));
    }, [searchTerm]);

    const handleSelectPokemon = async (pokemonUrl) => {
        setIsLoading(true);

        try {
            const pokemonDetails = await fetchPokemonDetails(pokemonUrl, { timeout: 10000 });
            navigation.navigate('PokemonDetail', pokemonDetails);
        } catch (error) {
            console.error('Error fetching Pokemon data:', error);
            Alert.alert('Erreur', 'Erreur lors de la recherche du Pokémon.');
        } finally {
            setIsLoading(false);
            setSearchResults([]);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Recherche</Text>
                </View>
                <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Rechercher un pokémon..."
                    value={searchTerm}
                    onChangeText={(text) => setSearchTerm(text)}
                />
                </View>
                {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
                {searchResults.length === 0 && !isLoading && (
                    <Text style={styles.noResults}>Aucun résultat</Text>
                )}
                <FlatList
                    data={searchResults}
                    keyExtractor={(item) => item.name}
                    renderItem={({ item }) => (
                        <Button
                            title={item.name}
                            onPress={() => handleSelectPokemon(item.url)}
                            style={styles.button}
                        />
                    )}
                />
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 34,
    },
    title: {
        fontSize: 34,
        color: "#000",
        fontWeight: "700",
        textTransform: "uppercase",
    },
    titleContainer: {
        alignItems: "center",
        display: "absolute",
        width: "100%",
    },
    input: {
        height: 50,
        width: '100%',
        borderColor: '#000',
        borderWidth: 2,
        borderRadius: 5,
        marginVertical: 10,
        padding: 10,
        fontSize: 16,
    },
    inputContainer: {
        width: '80%',
        marginBottom: 5,
        marginTop: 30,
    },
    noResults: {
        fontSize: 16,
        marginTop: 20,
    },
    button: {
        borderColor: '#000',
        borderWidth: 2,
        borderRadius: 5,
        width: 150
    }
});
