import { Feather, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Image,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

export default function ProfileScreen() {
    const [unitMode, setUnitMode] = useState('Kilometers'); // 'Kilometers' or 'Miles'

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" translucent={false} />

            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Profile</Text>
            </View>

            <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>

                {/* User Identity Block */}
                <View style={styles.userIdentityCard}>
                    <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop' }}
                        style={styles.avatarImg}
                    />
                    <View style={styles.userInfo}>
                        <Text style={styles.userName}>Alexander Pierce</Text>
                        <View style={styles.handleRow}>
                            <Text style={styles.userHandle}>@theurbanvoyager</Text>
                            <Feather name="edit-2" size={12} color="#666" style={{ marginLeft: 4 }} />
                        </View>
                        <View style={styles.planPill}>
                            <Text style={styles.planPillText}>Free Plan</Text>
                        </View>
                    </View>
                </View>

                {/* Action Card: Become a Provider */}
                <TouchableOpacity style={styles.providerCard} activeOpacity={0.8} onPress={() => router.push('/provider-step1')}>
                    <View style={styles.providerCardTextCol}>
                        <Text style={styles.providerCardTitle}>Become a Roadside Services Provider</Text>
                        <Text style={styles.providerCardSub}>Offer help to drivers nearby</Text>
                    </View>
                    <View style={styles.providerCardIconBox}>
                        <Ionicons name="arrow-forward" size={18} color="#000" />
                    </View>
                </TouchableOpacity>

                {/* Section 1: Preference and Settings */}
                <View style={styles.sectionWrapper}>
                    <Text style={styles.sectionTitle}>Preference and Settings</Text>
                    <View style={styles.sectionContainer}>

                        <TouchableOpacity style={styles.rowItem} onPress={() => router.push('/notification-settings')} activeOpacity={0.7}>
                            <Ionicons name="settings" size={20} color="#777" style={styles.rowIcon} />
                            <Text style={styles.rowText}>Notification Settings</Text>
                            <Ionicons name="chevron-forward" size={18} color="#aaa" />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.rowItem} onPress={() => router.push('/voice-guidance')} activeOpacity={0.7}>
                            <MaterialIcons name="record-voice-over" size={20} color="#777" style={styles.rowIcon} />
                            <Text style={styles.rowText}>Voice Guidance</Text>
                            <Ionicons name="chevron-forward" size={18} color="#aaa" />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.rowItem} onPress={() => router.push('/edit-home-work')} activeOpacity={0.7}>
                            <MaterialCommunityIcons name="pencil" size={20} color="#777" style={styles.rowIcon} />
                            <Text style={styles.rowText}>Edit Home or Work</Text>
                            <Ionicons name="chevron-forward" size={18} color="#aaa" />
                        </TouchableOpacity>

                        <View style={[styles.rowItem, { borderBottomWidth: 0 }]}>
                            <MaterialCommunityIcons name="ruler" size={20} color="#777" style={styles.rowIcon} />
                            <Text style={styles.rowText}>Display Units</Text>

                            {/* Segmented Control Pill */}
                            <View style={styles.unitToggle}>
                                <TouchableOpacity
                                    style={[styles.unitBtn, unitMode === 'Kilometers' && styles.unitBtnActive]}
                                    onPress={() => setUnitMode('Kilometers')}
                                >
                                    <Text style={[styles.unitBtnText, unitMode === 'Kilometers' && styles.unitBtnTextActive]}>
                                        Kilometers
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.unitBtn, unitMode === 'Miles' && styles.unitBtnActive]}
                                    onPress={() => setUnitMode('Miles')}
                                >
                                    <Text style={[styles.unitBtnText, unitMode === 'Miles' && styles.unitBtnTextActive]}>
                                        Miles
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Section 2: Activity */}
                <View style={styles.sectionWrapper}>
                    <Text style={styles.sectionTitle}>Activity</Text>
                    <View style={styles.sectionContainer}>
                        <TouchableOpacity style={styles.rowItem}>
                            <Ionicons name="bookmark" size={20} color="#777" style={styles.rowIcon} />
                            <Text style={styles.rowText}>Saved Routes</Text>
                            <Ionicons name="chevron-forward" size={18} color="#aaa" />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.rowItem, { borderBottomWidth: 0 }]}>
                            <Ionicons name="search" size={20} color="#777" style={styles.rowIcon} />
                            <Text style={styles.rowText}>Recent Search</Text>
                            <Ionicons name="chevron-forward" size={18} color="#aaa" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Section 3: Support and Others */}
                <View style={styles.sectionWrapper}>
                    <Text style={styles.sectionTitle}>Support and Others</Text>
                    <View style={styles.sectionContainer}>
                        <TouchableOpacity style={styles.rowItem}>
                            <Ionicons name="help-circle" size={20} color="#777" style={styles.rowIcon} />
                            <Text style={styles.rowText}>Help & FAQs</Text>
                            <Ionicons name="chevron-forward" size={18} color="#aaa" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.rowItem}>
                            <Ionicons name="document-text" size={20} color="#777" style={styles.rowIcon} />
                            <Text style={styles.rowText}>Terms & Privacy Policy</Text>
                            <Ionicons name="chevron-forward" size={18} color="#aaa" />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.rowItem, { borderBottomWidth: 0 }]}>
                            <Ionicons name="log-out-outline" size={20} color="#e11d48" style={styles.rowIcon} />
                            <Text style={[styles.rowText, { color: '#e11d48' }]}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </ScrollView>

            {/* Custom Bottom Navbar matching Profile Active state */}
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
        borderBottomColor: '#f9f9f9',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
    },
    userIdentityCard: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 24,
    },
    avatarImg: {
        width: 72,
        height: 72,
        borderRadius: 36,
        marginRight: 16,
    },
    userInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    userName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
        marginBottom: 4,
    },
    handleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    userHandle: {
        fontSize: 13,
        color: '#666',
    },
    planPill: {
        alignSelf: 'flex-start',
        backgroundColor: '#f3f4f6',
        borderWidth: 1,
        borderColor: '#e5e7eb',
        borderRadius: 6,
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    planPillText: {
        fontSize: 10,
        fontWeight: '700',
        color: '#333',
    },
    providerCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 16,
        padding: 20,
        marginBottom: 32,
    },
    providerCardTextCol: {
        flex: 1,
        paddingRight: 16,
    },
    providerCardTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: '#000',
        marginBottom: 4,
    },
    providerCardSub: {
        fontSize: 13,
        color: '#666',
    },
    providerCardIconBox: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: '#f3f4f6',
        alignItems: 'center',
        justifyContent: 'center',
    },
    sectionWrapper: {
        marginBottom: 28,
    },
    sectionTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: '#000',
        marginBottom: 12,
        marginLeft: 4,
    },
    sectionContainer: {
        backgroundColor: '#f9fafb',
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    rowItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        marginBottom: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.02,
        shadowRadius: 2,
        elevation: 1,
    },
    rowIcon: {
        marginRight: 12,
    },
    rowText: {
        flex: 1,
        fontSize: 14,
        fontWeight: '500',
        color: '#333',
    },
    unitToggle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f3f4f6',
        borderRadius: 8,
        padding: 4,
    },
    unitBtn: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 6,
    },
    unitBtnActive: {
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    unitBtnText: {
        fontSize: 10,
        fontWeight: '500',
        color: '#666',
    },
    unitBtnTextActive: {
        color: '#000',
        fontWeight: '600',
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
