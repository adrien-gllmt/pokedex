import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { fetchPokemons, fetchPokemonDetails } from "../utils/api";
import PokemonListCard from "../components/PokemonListCard";

const limit = 10;

export default function HomeScreen() {
    const navigation = useNavigation();

    const [pokemonList, setPokemonList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);

    const locallyFetchPokemons = async () => {
        try {
            const pokemons = await fetchPokemons(limit, (page - 1) * limit);
            const pokemonDetails = await Promise.all(pokemons.map((pokemon) => fetchPokemonDetails(pokemon.url, { timeout: 10000 })));

            const newPokemonDetails = pokemonDetails.filter(
                (newDetail) => !pokemonList.some((prevDetail) => prevDetail.id === newDetail.id)
            );

            setPokemonList((prevDetails) => [...prevDetails, ...newPokemonDetails]);
            setLoading(false);
        } catch (error) {
            console.error("Error while fetching data:", error);
        }
    };

    useEffect(() => {
        locallyFetchPokemons().then(r => console.log("Pokemons chargés"));
    }, [page]);

    const renderPokemonList = ({ item }) => (
        <PokemonListCard item={item} onPress={() => navigation.navigate("PokemonDetail", { ...item })} />
    );

    const infiniteScroll = () => {
        setPage((prevPage) => prevPage + 1);
    };

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Pokédex</Text>
            </View>
                <FlatList
                    data={pokemonList}
                    renderItem={renderPokemonList}
                    numColumns={2}
                    keyExtractor={(item, index) => `add-${item.id}-${index}`}
                    contentContainerStyle={styles.flatListContainer}
                    onEndReachedThreshold={0.1}
                    onEndReached={infiniteScroll}
                />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8f8f8",
        marginTop: 34
    },
    titleContainer: {
        alignItems: "center",
        display: "absolute",
        width: "100%",
    },
    title: {
        fontSize: 34,
        color: "#030303",
        fontWeight: "700",
        textTransform: "uppercase",
    },
    flatListContainer: {
        alignItems: "center",
    },
});
