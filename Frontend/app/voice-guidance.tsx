import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function VoiceGuidanceScreen() {
    const [voice, setVoice] = useState('Male');
    const [frequency, setFrequency] = useState('Full guidance');
    const [bgMode, setBgMode] = useState(false);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Ionicons name="chevron-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Voice Guidance</Text>
                <View style={{ width: 32 }} />
            </View>

            <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>

                {/* Guidance Voice */}
                <View style={styles.sectionGroup}>
                    <Text style={styles.groupHeadTitle}>Guidance Voice</Text>
                    <View style={styles.groupCard}>
                        <TouchableOpacity style={styles.checkRow} onPress={() => setVoice('Male')} activeOpacity={0.8}>
                            <Ionicons name="person" size={18} color="#000" style={styles.checkIconHead} />
                            <Text style={styles.checkRowText}>Male</Text>
                            {voice === 'Male' ? <Ionicons name="checkmark-circle" size={24} color="#000" /> : <Ionicons name="ellipse-outline" size={24} color="#999" />}
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.checkRow} onPress={() => setVoice('Female')} activeOpacity={0.8}>
                            <Ionicons name="person" size={18} color="#000" style={styles.checkIconHead} />
                            <Text style={styles.checkRowText}>Female</Text>
                            {voice === 'Female' ? <Ionicons name="checkmark-circle" size={24} color="#000" /> : <Ionicons name="ellipse-outline" size={24} color="#999" />}
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Voice Volume */}
                <View style={styles.sectionGroup}>
                    <Text style={styles.groupHeadTitle}>Voice Volume</Text>
                    <View style={styles.volumeRow}>
                        <Ionicons name="volume-low" size={20} color="#999" />
                        <View style={styles.sliderTrackLine}>
                            <View style={styles.sliderTrackActive} />
                            <View style={styles.sliderThumb} />
                        </View>
                        <Ionicons name="volume-high" size={20} color="#999" />
                    </View>
                </View>

                {/* Guidance Frequency */}
                <View style={styles.sectionGroup}>
                    <Text style={styles.groupHeadTitle}>Guidance Frequency</Text>
                    <View style={styles.groupCard}>
                        {['Full guidance (turn-by-turn instructions)', 'Essential only (major turns & alerts)', 'Minimal (alerts & hazards only)'].map(freq => (
                            <TouchableOpacity key={freq} style={styles.checkRow} onPress={() => setFrequency(freq)} activeOpacity={0.8}>
                                <Text style={styles.checkRowText}>{freq}</Text>
                                {frequency === freq ? <Ionicons name="checkmark-circle" size={24} color="#000" /> : <Ionicons name="ellipse-outline" size={24} color="#999" />}
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Background Mode */}
                <View style={styles.sectionGroup}>
                    <View style={styles.bgModeHeadRow}>
                        <Text style={styles.groupHeadTitleBgMode}>Background Mode</Text>
                        <Ionicons name="information-circle-outline" size={16} color="#666" style={{ marginTop: -8 }} />
                    </View>
                    <View style={styles.groupCard}>
                        <TouchableOpacity style={styles.checkRow} onPress={() => setBgMode(!bgMode)} activeOpacity={0.8}>
                            <Text style={styles.checkRowText}>Continue voice guidance when screen is off</Text>
                            {bgMode ? <Ionicons name="checkmark-circle" size={24} color="#000" /> : <Ionicons name="ellipse-outline" size={24} color="#999" />}
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Banner */}
                <View style={styles.bannerBlock}>
                    <View style={styles.bannerTextCol}>
                        <Text style={styles.bannerTitle}>Unlock smart adaptive voice</Text>
                        <Text style={styles.bannerSubtext}>It talks less when roads are clear and warns faster in danger</Text>
                    </View>
                    <TouchableOpacity style={styles.bannerUnlockBtn}>
                        <Text style={styles.bannerUnlockBtnText}>Unlock Now</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
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
    },
    sectionGroup: {
        marginBottom: 24,
    },
    groupHeadTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000',
        marginBottom: 12,
    },
    bgModeHeadRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    groupHeadTitleBgMode: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
        marginBottom: 12,
    },
    groupCard: {
        backgroundColor: '#f9fafb',
        borderRadius: 16,
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    checkRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderRadius: 12,
        marginBottom: 8,
    },
    checkIconHead: {
        marginRight: 10,
    },
    checkRowText: {
        flex: 1,
        fontSize: 14,
        fontWeight: '500',
        color: '#000',
        paddingRight: 16,
    },
    volumeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    sliderTrackLine: {
        flex: 1,
        height: 4,
        backgroundColor: '#e5e7eb',
        marginHorizontal: 16,
        borderRadius: 2,
        position: 'relative',
        justifyContent: 'center',
    },
    sliderTrackActive: {
        position: 'absolute',
        left: 0,
        height: '100%',
        width: '30%',
        backgroundColor: '#000',
        borderRadius: 2,
    },
    sliderThumb: {
        position: 'absolute',
        left: '30%',
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: '#000',
        marginLeft: -8, // center offset
    },
    bannerBlock: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#000', // Dark solid map for now
        borderRadius: 20,
        padding: 24,
        marginTop: 10,
        marginBottom: 30,
        overflow: 'hidden',
    },
    bannerTextCol: {
        flex: 1,
        paddingRight: 20,
    },
    bannerTitle: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '700',
        marginBottom: 4,
    },
    bannerSubtext: {
        color: '#999',
        fontSize: 12,
        lineHeight: 18,
    },
    bannerUnlockBtn: {
        borderColor: '#333',
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: '#111',
    },
    bannerUnlockBtnText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
    }
});
