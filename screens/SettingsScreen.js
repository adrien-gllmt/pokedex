import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Button } from 'react-native';

export default function SettingsScreen() {
    const [LocationModal, setLocationModalVisible] = useState(false);
    const [CameraModal, setCameraModalVisible] = useState(false);
    const [GalleryModal, setGalleryModalVisible] = useState(false);

    function openLocationModal() {
        setLocationModalVisible(true);
    }

    function closeLocationModal() {
        setLocationModalVisible(false);
    }

    function openCameraModal() {
        setCameraModalVisible(true);
    }

    function closeCameraModal() {
        setCameraModalVisible(false);
    }

    function openGalleryModal() {
        setGalleryModalVisible(true);
    }

    function closeGalleryModal() {
        setGalleryModalVisible(false);
    }

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.titlePage}>Paramètres</Text>
            </View>
            <View style={styles.settingSection}>
            <View style={styles.section}>
                <TouchableOpacity style={styles.button} onPress={openLocationModal}>
                    <Text style={styles.buttonText}>Demander l'accès à la localisation</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <TouchableOpacity style={styles.button} onPress={openCameraModal}>
                    <Text style={styles.buttonText}>Demander l'accès à la caméra</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={openGalleryModal}>
                    <Text style={styles.buttonText}>Demander l'accès à la galerie d'images</Text>
                </TouchableOpacity>
            </View>

            <Modal visible={LocationModal} onRequestClose={closeLocationModal} transparent>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Demande d'accès à la localisation</Text>
                        <Text style={styles.modalText}>
                            Afin d'utiliser la fonctionnalité de la localisation, veuillez autoriser
                            l'accès dans les paramètres de votre téléphone.
                        </Text>
                        <Button title="Fermer" onPress={closeLocationModal} />
                    </View>
                </View>
            </Modal>

            <Modal visible={CameraModal} onRequestClose={closeCameraModal} transparent>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Demande d'accès à la caméra</Text>
                        <Text style={styles.modalText}>
                            Afin d'utiliser la fonctionnalité de la caméra, veuillez autoriser l
                            'accès dans les paramètres de votre téléphone.
                        </Text>
                        <Button title="Fermer" onPress={closeCameraModal} />
                    </View>
                </View>
            </Modal>

            <Modal visible={GalleryModal} onRequestClose={closeGalleryModal} transparent>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Demande d'accès à la galerie d'images</Text>
                        <Text style={styles.modalText}>
                            Afin de sélectionner des images, veuillez autoriser l'accès à votre galerie
                            dans les paramètres de votre téléphone.
                        </Text>
                        <Button title="Fermer" onPress={closeGalleryModal} />
                    </View>
                </View>
            </Modal>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        marginTop: 40,
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    button: {
        padding: 10,
        borderRadius: 5,
        marginBottom: 15,
        borderWidth: 2,
        borderColor: '#000',
    },
    buttonText: {
        color: '#000',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: '#000'
    },
    modalText: {
        fontSize: 16,
        marginBottom: 15,
        textAlign: 'center',
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
    settingSection: {
        marginTop: 15,
        marginBottom: 20,
        paddingLeft: 16,
        paddingRight: 16,
    },
});
