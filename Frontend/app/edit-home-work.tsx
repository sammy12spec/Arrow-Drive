import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Modal,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';

export default function EditHomeWorkScreen() {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState<string | null>(null);

    const openDropdown = (itemId: string) => {
        setSelectedItem(itemId);
        setDropdownVisible(true);
    };

    const closeDropdown = () => {
        setDropdownVisible(false);
        setSelectedItem(null);
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />

            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Ionicons name="chevron-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Edit Home or Work</Text>
                <View style={{ width: 32 }} />
            </View>

            <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>

                {/* Home Option */}
                <View style={styles.card}>
                    <View style={styles.iconBox}>
                        <Ionicons name="home-outline" size={18} color="#000" />
                    </View>
                    <View style={styles.cardTextCol}>
                        <Text style={styles.cardTitle}>Home</Text>
                        <Text style={styles.cardSubtitle}>14 Admiralty Way, Lekki Phase 1, Lagos, 105102</Text>
                    </View>
                    <TouchableOpacity style={styles.menuDotsBtn} onPress={() => openDropdown('home')}>
                        <Ionicons name="ellipsis-vertical" size={20} color="#666" />
                    </TouchableOpacity>
                </View>

                {/* Work Option */}
                <View style={styles.card}>
                    <View style={styles.iconBox}>
                        <Ionicons name="briefcase-outline" size={18} color="#000" />
                    </View>
                    <View style={styles.cardTextCol}>
                        <Text style={styles.cardTitle}>Work</Text>
                        <Text style={styles.cardSubtitle}>15 Allen Avenue, Ikeja, Lagos, 1002818</Text>
                    </View>
                    <TouchableOpacity style={styles.menuDotsBtn} onPress={() => openDropdown('work')}>
                        <Ionicons name="ellipsis-vertical" size={20} color="#666" />
                    </TouchableOpacity>
                </View>

                {/* Custom Create Block */}
                <View style={styles.customContainer}>
                    <TouchableOpacity style={styles.customCard} activeOpacity={0.7}>
                        <View style={styles.iconBoxScaleDown}>
                            <Ionicons name="location-outline" size={14} color="#000" />
                        </View>
                        <View>
                            <Text style={styles.customTitle}>Custom</Text>
                            <Text style={styles.customSubtitle}>Create a place</Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </ScrollView>

            {/* Dropdown Menu Modal */}
            {dropdownVisible && (
                <Modal transparent visible={dropdownVisible} animationType="fade">
                    <TouchableWithoutFeedback onPress={closeDropdown}>
                        <View style={styles.dropdownOverlay}>
                            <View style={[styles.dropdownMenu, { top: selectedItem === 'home' ? 140 : 250 }]}>
                                <TouchableOpacity style={styles.dropdownItem} onPress={closeDropdown}>
                                    <Text style={styles.dropdownText}>Show on Map</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.dropdownItem} onPress={closeDropdown}>
                                    <Text style={styles.dropdownText}>Copy address</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.dropdownItem} onPress={closeDropdown}>
                                    <Text style={styles.dropdownText}>Share</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.dropdownItem} onPress={closeDropdown}>
                                    <Text style={styles.dropdownText}>Edit</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.dropdownItemLast} onPress={closeDropdown}>
                                    <Text style={styles.dropdownText}>Delete</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            )}

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 14,
    },
    backButton: {
        padding: 4,
    },
    headerTitle: {
        flex: 1,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f9fafb',
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 20,
        marginBottom: 16,
    },
    iconBox: {
        width: 36,
        height: 36,
        borderRadius: 12,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
    },
    cardTextCol: {
        flex: 1,
        paddingRight: 16,
    },
    cardTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: '#000',
        marginBottom: 4,
    },
    cardSubtitle: {
        fontSize: 12,
        color: '#666',
        lineHeight: 16,
    },
    menuDotsBtn: {
        padding: 4,
    },
    customContainer: {
        alignItems: 'center',
        marginTop: 8,
    },
    customCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f9fafb',
        borderRadius: 16,
        paddingHorizontal: 20,
        paddingVertical: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 1,
    },
    iconBoxScaleDown: {
        width: 24,
        height: 24,
        borderRadius: 8,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    customTitle: {
        fontSize: 13,
        fontWeight: '600',
        color: '#000',
    },
    customSubtitle: {
        fontSize: 11,
        color: '#666',
    },
    dropdownOverlay: {
        flex: 1,
        position: 'relative',
    },
    dropdownMenu: {
        position: 'absolute',
        right: 20,
        backgroundColor: '#fff',
        borderRadius: 12,
        width: 160,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 8,
        borderWidth: 1,
        borderColor: '#f0f0f0',
        paddingVertical: 8,
    },
    dropdownItem: {
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    dropdownItemLast: {
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    dropdownText: {
        fontSize: 13,
        color: '#333',
        fontWeight: '500',
    }
});
