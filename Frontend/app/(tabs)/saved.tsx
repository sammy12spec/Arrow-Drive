import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import {
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function SavedScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" translucent={false} />

            <View style={styles.header}>
                <Text style={styles.headerTitle}>Saved Trips</Text>
            </View>

            <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>

                {/* Search & Filter */}
                <View style={styles.searchRow}>
                    <View style={styles.searchBar}>
                        <Ionicons name="search-outline" size={20} color="#999" />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search here"
                            placeholderTextColor="#999"
                        />
                        <TouchableOpacity style={styles.clearBtn}>
                            <Ionicons name="close-circle" size={16} color="#ccc" />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.filterBtn}>
                        <Ionicons name="funnel-outline" size={20} color="#666" />
                    </TouchableOpacity>
                </View>

                {/* Quick Add Blocks */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.quickAddScroll}>
                    <TouchableOpacity style={styles.quickAddCard}>
                        <View style={styles.quickAddIconBox}>
                            <Ionicons name="home-outline" size={16} color="#000" />
                        </View>
                        <View style={styles.quickAddTextCol}>
                            <Text style={styles.quickAddTitle}>Home</Text>
                            <Text style={styles.quickAddSubtitle}>Set location</Text>
                        </View>
                        <Ionicons name="close" size={14} color="#ccc" style={styles.quickAddClose} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.quickAddCard}>
                        <View style={styles.quickAddIconBox}>
                            <Ionicons name="briefcase-outline" size={16} color="#000" />
                        </View>
                        <View style={styles.quickAddTextCol}>
                            <Text style={styles.quickAddTitle}>Work</Text>
                            <Text style={styles.quickAddSubtitle}>Set location</Text>
                        </View>
                        <Ionicons name="close" size={14} color="#ccc" style={styles.quickAddClose} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.quickAddCard}>
                        <View style={styles.quickAddIconBox}>
                            <Ionicons name="location-outline" size={16} color="#000" />
                        </View>
                        <View style={styles.quickAddTextCol}>
                            <Text style={styles.quickAddTitle}>Custom</Text>
                            <Text style={styles.quickAddSubtitle}>Set location</Text>
                        </View>
                        <Ionicons name="close" size={14} color="#ccc" style={styles.quickAddClose} />
                    </TouchableOpacity>
                </ScrollView>

                {/* Saved Trips Section */}
                <View style={styles.sectionHeaderWrap}>
                    <Text style={styles.sectionTitle}>Saved trips</Text>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.savedGridScroll}>

                    {/* Trip Card */}
                    <View style={styles.savedCard}>
                        <View style={styles.savedCardTopRow}>
                            <Text style={styles.savedCardTitle}>Morning Office Route</Text>
                            <TouchableOpacity>
                                <Ionicons name="ellipsis-vertical" size={18} color="#666" />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.savedCardDesc}>From Ijebu to Lekki<Text style={styles.savedCardTime}> 25m</Text></Text>
                        <Text style={styles.savedCardData}>2 days time . 4pm</Text>
                        <TouchableOpacity style={styles.mapBtn}>
                            <Text style={styles.mapBtnText}>View on map</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.savedCard}>
                        <View style={styles.savedCardTopRow}>
                            <Text style={styles.savedCardTitle}>Morning Office Route</Text>
                            <TouchableOpacity>
                                <Ionicons name="ellipsis-vertical" size={18} color="#666" />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.savedCardDesc}>From Ijebu to Lekki<Text style={styles.savedCardTime}> 25m</Text></Text>
                        <Text style={styles.savedCardData}>2 days time . 4pm</Text>
                        <TouchableOpacity style={styles.mapBtn}>
                            <Text style={styles.mapBtnText}>View on map</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Add New Trip */}
                    <TouchableOpacity style={styles.addCardBlock}>
                        <View style={styles.addIconDashed}>
                            <Ionicons name="add" size={24} color="#666" />
                        </View>
                        <Text style={styles.addTextAction}>Add new trip</Text>
                    </TouchableOpacity>

                </ScrollView>

                {/* Saved Places Section */}
                <View style={[styles.sectionHeaderWrap, { marginTop: 32 }]}>
                    <Text style={styles.sectionTitle}>Saved places</Text>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.savedGridScroll}>

                    {/* Place Card */}
                    <View style={styles.savedCard}>
                        <View style={styles.savedCardTopRow}>
                            <Text style={styles.savedCardTitle}>Grand Horizon Hotel</Text>
                            <TouchableOpacity>
                                <Ionicons name="ellipsis-vertical" size={18} color="#666" />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.savedCardData}>6 min drive . 2.5km away</Text>
                        <TouchableOpacity style={styles.mapBtn}>
                            <Text style={styles.mapBtnText}>View on map</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.savedCard}>
                        <View style={styles.savedCardTopRow}>
                            <Text style={styles.savedCardTitle}>Grand Horizon Hotel</Text>
                            <TouchableOpacity>
                                <Ionicons name="ellipsis-vertical" size={18} color="#666" />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.savedCardData}>6 min drive . 2.5km away</Text>
                        <TouchableOpacity style={styles.mapBtn}>
                            <Text style={styles.mapBtnText}>View on map</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Add New Place */}
                    <TouchableOpacity style={styles.addCardBlock}>
                        <View style={styles.addIconDashed}>
                            <Ionicons name="add" size={24} color="#666" />
                        </View>
                        <Text style={styles.addTextAction}>Add new trip</Text>
                    </TouchableOpacity>

                </ScrollView>

            </ScrollView>

            {/* Bottom Navigation */}

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
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
    },
    content: {
        flex: 1,
    },
    searchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 20,
        marginBottom: 16,
    },
    searchBar: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#e5e7eb',
        borderRadius: 30,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginRight: 12,
    },
    searchInput: {
        flex: 1,
        marginLeft: 8,
        fontSize: 14,
        color: '#000',
    },
    clearBtn: {
        marginLeft: 8,
    },
    filterBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#f9fafb',
        borderWidth: 1,
        borderColor: '#e5e7eb',
        alignItems: 'center',
        justifyContent: 'center',
    },
    quickAddScroll: {
        paddingHorizontal: 20,
        gap: 12,
        paddingBottom: 24,
    },
    quickAddCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f9fafb',
        borderWidth: 1,
        borderColor: '#f3f4f6',
        borderRadius: 12,
        paddingLeft: 12,
        paddingRight: 8,
        paddingVertical: 10,
        width: 140,
    },
    quickAddIconBox: {
        width: 28,
        height: 28,
        borderRadius: 8,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    quickAddTextCol: {
        flex: 1,
    },
    quickAddTitle: {
        fontSize: 13,
        fontWeight: '600',
        color: '#000',
    },
    quickAddSubtitle: {
        fontSize: 10,
        color: '#666',
    },
    quickAddClose: {
        marginLeft: 4,
    },
    sectionHeaderWrap: {
        paddingHorizontal: 20,
        marginBottom: 12,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
    },
    savedGridScroll: {
        paddingHorizontal: 20,
        gap: 12,
        paddingBottom: 10,
    },
    savedCard: {
        width: 200,
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 4,
        marginBottom: 10, // Shadow spacing
        borderWidth: 1,
        borderColor: '#f9fafb',
    },
    savedCardTopRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 6,
    },
    savedCardTitle: {
        flex: 1,
        fontSize: 14,
        fontWeight: '700',
        color: '#000',
        marginRight: 8,
    },
    savedCardDesc: {
        fontSize: 10,
        color: '#666',
        marginBottom: 4,
    },
    savedCardTime: {
        fontWeight: '600', // Making time pop inside desc
    },
    savedCardData: {
        fontSize: 10,
        color: '#999',
        marginBottom: 16,
    },
    mapBtn: {
        backgroundColor: '#057D4B',
        borderRadius: 6,
        paddingVertical: 10,
        alignItems: 'center',
    },
    mapBtnText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
    },
    addCardBlock: {
        width: 140,
        backgroundColor: '#fff',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        marginBottom: 10,
    },
    addIconDashed: {
        width: 48,
        height: 48,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderStyle: 'dashed',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
        backgroundColor: '#f9fafb',
    },
    addTextAction: {
        fontSize: 12,
        color: '#666',
        fontWeight: '500',
    },
    bottomNavigation: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingVertical: 8,
        paddingBottom: Platform.OS === 'ios' ? 24 : 12,
        paddingHorizontal: 10,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        justifyContent: 'space-around',
    },
    navItem: {
        alignItems: 'center',
        gap: 4,
        width: 70,
    },
    navText: {
        fontSize: 11,
        color: '#999',
        fontWeight: '500',
    },
    navTextActive: {
        fontSize: 11,
        color: '#057D4B',
        fontWeight: '600',
    },
    navActiveIndicator: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#057D4B',
        marginTop: 2,
    }
});
