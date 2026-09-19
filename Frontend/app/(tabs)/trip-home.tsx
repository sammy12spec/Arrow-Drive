import { FontAwesome5, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Dimensions,
    Image,
    Modal,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

export default function TripHomeScreen() {
    const [showNotification, setShowNotification] = useState(false);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fdfdfd" translucent={false} />

            {/* Map Content area */}
            <View style={styles.mapContainer}>
                <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&auto=format&fit=crop&q=60' }}
                    style={StyleSheet.absoluteFillObject}
                    blurRadius={1}
                />

                {/* Search Bar */}
                <View style={styles.topSection}>
                    <View style={styles.searchBar}>
                        <MaterialIcons name="search" size={24} color="#666" />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search here"
                            placeholderTextColor="#999"
                        />
                        <TouchableOpacity style={styles.notificationButton}>
                            <Ionicons name="notifications-outline" size={22} color="#000" />
                            <View style={styles.notificationDot} />
                        </TouchableOpacity>
                    </View>

                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={styles.categoriesContainer}
                    >
                        <TouchableOpacity style={[styles.categoryButton, styles.activeCategory]}>
                            <MaterialIcons name="bed" size={14} color="#000" />
                            <Text style={styles.categoryTextActive}>Hotels</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.categoryButton}>
                            <FontAwesome5 name="gas-pump" size={12} color="#000" />
                            <Text style={styles.categoryText}>Gas</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.categoryButton}>
                            <MaterialIcons name="restaurant" size={14} color="#000" />
                            <Text style={styles.categoryText}>Restaurants</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.categoryButton}>
                            <FontAwesome5 name="hospital" size={12} color="#000" />
                            <Text style={styles.categoryText}>Hospital</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.categoryButton}>
                            <MaterialIcons name="build" size={14} color="#000" />
                            <Text style={styles.categoryText}>Mechanics</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>

                {/* Map Overlays: Progress & Hazard */}
                <View style={styles.mapOverlays}>
                    {/* Center crosshair */}
                    <TouchableOpacity style={styles.recenterButton}>
                        <MaterialIcons name="my-location" size={20} color="#000" />
                    </TouchableOpacity>

                    {/* Red Danger alert */}
                    <TouchableOpacity style={styles.alertButton} onPress={() => setShowNotification(true)}>
                        <View style={styles.alertIconBg}>
                            <Ionicons name="warning" size={24} color="#e11d48" />
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Mocking the Route Line on map */}
                <View style={styles.routeMockupContainer}>
                    <View style={styles.routeLineMock}>
                        <Text style={styles.routeCity}>Ekiti</Text>
                        <View style={styles.routeBarOuter}>
                            <View style={styles.routeBarInner} />
                            <View style={styles.routeCarPill}>
                                <FontAwesome5 name="car-side" size={12} color="#000" />
                                <Text style={styles.routeDistanceText}>
                                    <Text style={styles.routeDistanceBold}>4km</Text>/12km
                                </Text>
                            </View>
                        </View>
                        <Text style={styles.routeCity}>Lagos</Text>
                    </View>
                </View>
            </View>

            {/* Trip Dashboard Bottom Sheet */}
            <View style={styles.bottomSheet}>
                {/* Drag Handle Mock */}
                <View style={styles.dragHandle} />

                <View style={styles.sheetContent}>
                    {/* Origin & Destination Block */}
                    <View style={styles.tripStopsRow}>
                        <View style={styles.stopsIndicator}>
                            <View style={[styles.stopDotOuter, { borderColor: '#4b5563' }]}>
                                <View style={[styles.stopDotInner, { backgroundColor: '#4b5563' }]} />
                            </View>
                            <View style={styles.stopsLine} />
                            <View style={[styles.stopDotOuter, { borderColor: '#057D4B' }]}>
                                <View style={[styles.stopDotInner, { backgroundColor: '#057D4B' }]} />
                            </View>
                        </View>

                        <View style={styles.stopsTextCol}>
                            <View style={styles.stopBlock}>
                                <Text style={styles.stopLabel}>Departure</Text>
                                <Text style={styles.stopValue}>Ekiti state</Text>
                            </View>
                            <View style={styles.stopBlock}>
                                <Text style={styles.stopLabel}>Destination</Text>
                                <Text style={styles.stopValue}>Lagos International Airport</Text>
                            </View>
                        </View>

                        <View style={styles.stopsActions}>
                            <TouchableOpacity style={styles.stopArrowBtn}>
                                <MaterialIcons name="turn-right" size={20} color="#fff" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.stopEditBtn}>
                                <MaterialIcons name="edit" size={16} color="#666" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Stats Row */}
                    <View style={styles.statsRow}>
                        <Text style={styles.statMain}>12km</Text>
                        <Text style={styles.statMain}>25mins</Text>
                        <Text style={styles.statMain}>9:25 AM</Text>
                    </View>

                    {/* Hazards Row */}
                    <View style={styles.hazardsRow}>
                        <Text style={styles.hazardsLabel}>Hazards on Route</Text>
                        <View style={styles.hazardBadgeRed}>
                            <FontAwesome5 name="hard-hat" size={12} color="#e11d48" />
                            <Text style={[styles.hazardCountText, { color: '#e11d48' }]}>2</Text>
                        </View>
                        <View style={styles.hazardBadge}>
                            <FontAwesome5 name="directions" size={12} color="#000" />
                            <Text style={styles.hazardCountText}>0</Text>
                        </View>
                        <View style={styles.hazardBadge}>
                            <FontAwesome5 name="fire" size={12} color="#ea580c" />
                            <Text style={styles.hazardCountText}>0</Text>
                        </View>
                        <View style={styles.hazardBadge}>
                            <MaterialCommunityIcons name="alert-circle" size={18} color="#e11d48" />
                            <Text style={styles.hazardCountText}>0</Text>
                        </View>
                    </View>

                    {/* Preferences Row */}
                    <View style={styles.preferencesRow}>
                        <Text style={styles.prefLabel}>Route Options</Text>
                        <View style={styles.prefPillGreen}>
                            <Text style={styles.prefPillTextGreen}>Fastest</Text>
                        </View>
                        <Text style={[styles.prefLabel, { marginLeft: 'auto' }]}>Traffic Status</Text>
                        <View style={styles.prefPillGrey}>
                            <Text style={styles.prefPillTextGrey}>Moderate</Text>
                        </View>
                    </View>
                </View>

                {/* Bottom Navigation */}
            </View>

            {/* Notification Popup Modal */}
            <Modal
                visible={showNotification}
                transparent
                animationType="fade"
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeaderDecor}>
                            {/* Subtle red fade at the top */}
                            <View style={styles.redBlurryTop} />

                            <TouchableOpacity style={styles.modalCloseButton} onPress={() => setShowNotification(false)}>
                                <Ionicons name="close" size={20} color="#000" />
                            </TouchableOpacity>

                            <View style={styles.modalIconBox}>
                                <FontAwesome5 name="hard-hat" size={24} color="#000" />
                                <View style={styles.modalBadge}>
                                    <Text style={styles.modalBadgeText}>2</Text>
                                </View>
                            </View>
                        </View>

                        <Text style={styles.modalTitle}>Road Construction Ahead</Text>
                        <Text style={styles.modalSubtitle}>
                            Lane closed, traffic may be slow - drive carefully or take an alternate route
                        </Text>

                        <View style={styles.pinsList}>
                            <View style={styles.pinItem}>
                                <MaterialIcons name="location-pin" size={16} color="#e11d48" />
                                <Text style={styles.pinText}>500m ahead on King&apos;s Road</Text>
                            </View>
                            <View style={styles.pinItem}>
                                <MaterialIcons name="location-pin" size={16} color="#e11d48" />
                                <Text style={styles.pinText}>800m ahead on King&apos;s Road</Text>
                            </View>
                        </View>

                        <View style={styles.modalActions}>
                            <TouchableOpacity style={styles.redBtn}>
                                <Text style={styles.redBtnText}>Alternate route</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.greyBtn}>
                                <Text style={styles.greyBtnText}>Show in map</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    mapContainer: {
        flex: 1,
        position: 'relative',
        backgroundColor: '#e8f4fd',
    },
    topSection: {
        position: 'absolute',
        top: 16,
        left: 0,
        right: 0,
        zIndex: 10,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 30,
        marginHorizontal: 16,
        paddingHorizontal: 16,
        paddingVertical: 14,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 8,
        marginBottom: 16,
    },
    searchInput: {
        flex: 1,
        marginLeft: 12,
        fontSize: 15,
        color: '#000',
    },
    notificationButton: {
        padding: 4,
        position: 'relative',
    },
    notificationDot: {
        position: 'absolute',
        top: 4,
        right: 4,
        width: 8,
        height: 8,
        backgroundColor: '#e11d48',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#fff',
    },
    categoriesContainer: {
        paddingHorizontal: 16,
    },
    categoryButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
        marginRight: 10,
        gap: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
    activeCategory: {
        borderStyle: 'dashed',
        borderColor: '#d1d5db',
    },
    categoryText: {
        fontSize: 12,
        color: '#333',
        fontWeight: '500',
    },
    categoryTextActive: {
        fontSize: 12,
        color: '#000',
        fontWeight: '500',
    },
    mapOverlays: {
        position: 'absolute',
        right: 20,
        bottom: 50,
        alignItems: 'flex-end',
        gap: 16,
    },
    recenterButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 4,
    },
    alertButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#e11d48',
        borderWidth: 1,
        shadowColor: '#e11d48',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 6,
    },
    alertIconBg: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    routeMockupContainer: {
        position: 'absolute',
        bottom: 60,
        left: 20,
        right: 80,
    },
    routeLineMock: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    routeCity: {
        fontSize: 12,
        fontWeight: '600',
        color: '#333',
    },
    routeBarOuter: {
        flex: 1,
        height: 3,
        backgroundColor: '#e5e7eb',
        position: 'relative',
        justifyContent: 'center',
    },
    routeBarInner: {
        position: 'absolute',
        left: 0,
        width: '30%',
        height: '100%',
        backgroundColor: '#057D4B',
    },
    routeCarPill: {
        position: 'absolute',
        left: '25%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        gap: 6,
    },
    routeDistanceText: {
        fontSize: 11,
        color: '#666',
    },
    routeDistanceBold: {
        color: '#000',
        fontWeight: '700',
    },
    bottomSheet: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -6 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 10,
        marginTop: -20, // Cover map edge natively
        paddingTop: 10,
    },
    dragHandle: {
        width: 40,
        height: 4,
        backgroundColor: '#e5e7eb',
        borderRadius: 2,
        alignSelf: 'center',
        marginBottom: 16,
    },
    sheetContent: {
        paddingHorizontal: 20,
    },
    tripStopsRow: {
        flexDirection: 'row',
        alignItems: 'stretch',
        marginBottom: 20,
    },
    stopsIndicator: {
        alignItems: 'center',
        marginRight: 12,
        marginTop: 4,
    },
    stopDotOuter: {
        width: 14,
        height: 14,
        borderRadius: 7,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    stopDotInner: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    stopsLine: {
        width: 1,
        flex: 1,
        borderLeftWidth: 1,
        borderLeftColor: '#057D4B',
        borderStyle: 'dashed',
        marginVertical: 4,
    },
    stopsTextCol: {
        flex: 1,
        justifyContent: 'space-between',
    },
    stopBlock: {
        marginBottom: 16,
    },
    stopLabel: {
        fontSize: 11,
        color: '#999',
        marginBottom: 4,
    },
    stopValue: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
    },
    stopsActions: {
        justifyContent: 'space-between',
        paddingVertical: 4,
    },
    stopArrowBtn: {
        width: 32,
        height: 32,
        borderRadius: 8,
        backgroundColor: '#057D4B',
        alignItems: 'center',
        justifyContent: 'center',
    },
    stopEditBtn: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#f3f4f6',
        alignItems: 'center',
        justifyContent: 'center',
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f3f4f6',
        marginBottom: 16,
    },
    statMain: {
        fontSize: 14,
        fontWeight: '500',
        color: '#333',
    },
    hazardsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 16,
    },
    hazardsLabel: {
        fontSize: 12,
        color: '#666',
        marginRight: 4,
    },
    hazardBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f9fafb',
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        gap: 6,
    },
    hazardBadgeRed: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fef2f2',
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#fecaca',
        gap: 6,
    },
    hazardCountText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#000',
    },
    preferencesRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 16,
    },
    prefLabel: {
        fontSize: 12,
        color: '#666',
        marginRight: 8,
    },
    prefPillGreen: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#057D4B',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
    },
    prefPillTextGreen: {
        color: '#057D4B',
        fontSize: 11,
        fontWeight: '500',
    },
    prefPillGrey: {
        backgroundColor: '#f3f4f6',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
    },
    prefPillTextGrey: {
        color: '#333',
        fontSize: 11,
        fontWeight: '500',
    },
    bottomNavigation: {
        flexDirection: 'row',
        paddingVertical: 12,
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
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
    },
    modalContent: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 24,
        overflow: 'hidden',
        padding: 24,
        paddingTop: 0, // Header takes care of top portion
        alignItems: 'center',
    },
    modalHeaderDecor: {
        height: 100,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        marginLeft: -24,
        marginRight: -24,
        paddingHorizontal: 24,
        width: Dimensions.get('window').width - 48,
    },
    redBlurryTop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#ffe4e6',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
    },
    modalCloseButton: {
        position: 'absolute',
        top: 16,
        right: 16,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        zIndex: 10,
    },
    modalIconBox: {
        width: 64,
        height: 64,
        backgroundColor: '#fff',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#e11d48',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
        elevation: 8,
        marginTop: 20,
        borderWidth: 2,
        borderColor: '#ffe4e6',
    },
    modalBadge: {
        position: 'absolute',
        top: -8,
        right: -8,
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#e5e7eb',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalBadgeText: {
        fontSize: 10,
        fontWeight: '700',
        color: '#000',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
        marginBottom: 8,
        textAlign: 'center',
    },
    modalSubtitle: {
        fontSize: 13,
        color: '#666',
        textAlign: 'center',
        lineHeight: 18,
        marginBottom: 24,
    },
    pinsList: {
        width: '100%',
        gap: 12,
        marginBottom: 24,
        alignItems: 'center',
    },
    pinItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    pinText: {
        fontSize: 13,
        color: '#000',
        fontStyle: 'italic',
        fontWeight: '500',
    },
    modalActions: {
        flexDirection: 'row',
        width: '100%',
        gap: 12,
    },
    redBtn: {
        flex: 1,
        backgroundColor: '#e11d48',
        borderRadius: 8,
        paddingVertical: 14,
        alignItems: 'center',
    },
    redBtnText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
    greyBtn: {
        flex: 1,
        backgroundColor: '#e5e7eb',
        borderRadius: 8,
        paddingVertical: 14,
        alignItems: 'center',
    },
    greyBtnText: {
        color: '#374151',
        fontSize: 14,
        fontWeight: '600',
    },
});
