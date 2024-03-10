import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchTeamPokemonList } from "../utils/api";
import PokemonCard from "../components/PokemonCard";

export default function TeamScreen() {
    const [team, setTeam] = useState([]);
    const [pokemonList, setPokemonList] = useState([]);
    const [nextPageUrl, setNextPageUrl] = useState(null);

    useEffect(() => {
        loadTeam().then(r => console.log("Equipe chargée"));
        loadAllPokemon().then(r => console.log("Pokemon chargés"));
    }, []);

    async function loadTeam(){
        try {
            const teamData = await AsyncStorage.getItem('team');

            if (teamData) {
                setTeam(JSON.parse(teamData));
            }
        } catch (error) {
            console.error('Erreur lors du chargement de l\'équipe:', error);
        }
    }

    const loadAllPokemon = useCallback(async () => {
        try {
            const { nextPageUrl, pokemonList } = await fetchTeamPokemonList(nextPageUrl, { timeout: 10000 });

            setNextPageUrl(nextPageUrl);
            setPokemonList((prevList) => [...prevList, ...pokemonList]);
        } catch (error) {
            console.error('Erreur lors du chargement des Pokémon:', error);
        }
    }, [nextPageUrl]);

    function addToTeam(pokemon) {
        if (!team.find((p) => p.id === pokemon.id)) {
            const newTeam = [...team, pokemon];
            setTeam(newTeam);
            saveTeam(newTeam).then(r => console.log("Sauvegardé"));
        }
    }

    function removeAllFromTeam() {
        setTeam([]);
        saveTeam([]).then(r => console.log("Retiré"));
    }

    function removeFromTeam(pokemon)  {
        const newTeam = team.filter((p) => p.id !== pokemon.id);
        setTeam(newTeam);
        saveTeam(newTeam).then(r => console.log("Retiré"));
    }

    async function saveTeam(newTeam) {
        try {
            await AsyncStorage.setItem('team', JSON.stringify(newTeam));
        } catch (error) {
            console.error('Erreur lors de la sauvegarde de l\'équipe:', error);
        }
    }

    function renderTeamPokemonCard({ item }) {
        return (
            <PokemonCard
                item={item}
                onPress={() => {}}
                isTeamCard
                onRemoveFromTeam={() => removeFromTeam(item)}
            />
        );
    }

    function renderAddPokemonCard({ item }) {
        return (
            <PokemonCard
                item={item}
                onPress={() => addToTeam(item)}
            />
        );
    }

    function infiniteScroll() {
        if (nextPageUrl) {
            loadAllPokemon().then(r => console.log("Pokemon chargés"));
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.titlePage}>Équipes</Text>
            </View>
            <View style={styles.teamSection}>
                <Text style={styles.title}>Mon équipe</Text>
                <TouchableOpacity onPress={removeAllFromTeam}>
                    <Text style={styles.removeAllButton}>Supprimer l'équipe</Text>
                </TouchableOpacity>
                <FlatList
                    data={team}
                    renderItem={renderTeamPokemonCard}
                    keyExtractor={(item, index) => `add-${item.id}-${index}`}
                />
            </View>
            <View style={styles.listContainer}>
                <Text style={styles.title}>Pokémons :</Text>
                <FlatList
                    data={pokemonList}
                    renderItem={renderAddPokemonCard}
                    keyExtractor={(item, index) => `add-${item.id}-${index}`}
                    onEndReached={infiniteScroll}
                    onEndReachedThreshold={0.1}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        marginTop: 34,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
    },
    addButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    addButtonThumbnail: {
        width: 40,
        height: 40,
        marginRight: 10,
    },
    addButton: {
        color: 'white',
        fontSize: 16,
    },
    removeButton: {
        color: 'red',
        padding: 5,
        borderRadius: 5,
        borderColor: 'red',
        borderWidth: 2,
    },
    teamPokemonCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: '#000',
        borderWidth: 2,
        borderRadius: 5,
        padding: 5,
        marginBottom: 10,
    },
    addPokemonCard: {
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        borderColor: '#3757ba',
        borderWidth: 5,
    },
    removeAllButton: {
        color: 'red',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        borderWidth: 2,
        borderColor: 'red',
        padding: 5,
        borderRadius: 5,
    },
    listContainer: {
        flex: 1,
        padding: 10,
    },
    teamSection: {
        marginBottom: 20,
        paddingRight: 10,
        paddingLeft: 10,
        height : 200,
    },
    titlePage: {
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
});
