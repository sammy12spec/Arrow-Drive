import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function NotificationSettingsScreen() {
    const [toggles, setToggles] = useState({
        hazard: true,
        weather: true,
        roadClosure: true,
        tripSummary: true,
        savedRoute: true,
        speeding: true,
        comments: true,
        communityPosts: true,
        sound: true,
        vibration: true,
    });

    const toggleSwitch = (key: keyof typeof toggles) => {
        setToggles(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const renderToggle = (title: string, subtitle: string | null, key: keyof typeof toggles, isLast: boolean = false) => (
        <View style={[styles.optionRow, isLast && styles.optionRowLast]}>
            <View style={styles.optionTextCol}>
                <Text style={styles.optionTitle}>{title}</Text>
                {subtitle && <Text style={styles.optionSubtitle}>{subtitle}</Text>}
            </View>
            <Switch
                trackColor={{ false: '#e5e7eb', true: '#blue' }} // Adjusted below for active color
                thumbColor="#fff"
                ios_backgroundColor="#e5e7eb"
                onValueChange={() => toggleSwitch(key)}
                value={toggles[key]}
                style={[styles.switchToggle, toggles[key] && styles.switchTrackActive]}
            />
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Ionicons name="chevron-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Notification Settings</Text>
                <View style={{ width: 32 }} />
            </View>

            <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>

                {/* Safety & Hazard Alerts */}
                <View style={styles.sectionCard}>
                    <Text style={styles.sectionHeader}>Safety & Hazard Alerts</Text>
                    {renderToggle("Hazard Alerts", "Get notified when hazards are detected on your route", 'hazard')}
                    {renderToggle("Severe Weather Alerts", "Storm, floods, heavy rain warnings", 'weather')}
                    {renderToggle("Road Closure Alerts", "Construction, blocked roads, accidents", 'roadClosure', true)}
                </View>

                {/* Trip Notifications */}
                <View style={styles.sectionCard}>
                    <Text style={styles.sectionHeader}>Trip Notifications</Text>
                    {renderToggle("Trip Summary", "Receive summaries after each trips", 'tripSummary')}
                    {renderToggle("Saved Route Updates", "Get updates when conditions change on your saved route", 'savedRoute')}
                    {renderToggle("Speeding Alerts", "Gentle reminder when you exceed recommended limits", 'speeding', true)}
                </View>

                {/* Community Notifications */}
                <View style={styles.sectionCard}>
                    <Text style={styles.sectionHeader}>Community Notifications</Text>
                    {renderToggle("Comments on your reports", null, 'comments')}
                    {renderToggle("Community posts & tips", null, 'communityPosts', true)}
                </View>

                {/* Notification Style */}
                <View style={styles.sectionCard}>
                    <Text style={styles.sectionHeader}>Notification Style</Text>
                    {renderToggle("Sound", null, 'sound')}
                    {renderToggle("Vibration", null, 'vibration', true)}
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
    sectionCard: {
        backgroundColor: '#f9fafb',
        borderRadius: 16,
        paddingTop: 16,
        marginBottom: 20,
    },
    sectionHeader: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000',
        paddingHorizontal: 16,
        marginBottom: 12,
    },
    optionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        marginHorizontal: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderRadius: 12,
        marginBottom: 8,
    },
    optionRowLast: {
        marginBottom: 12,
    },
    optionTextCol: {
        flex: 1,
        paddingRight: 16,
    },
    optionTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000',
        marginBottom: 2,
    },
    optionSubtitle: {
        fontSize: 11,
        color: '#666',
    },
    switchToggle: {
        transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
    },
    switchTrackActive: {
        // Native switches can sometimes be overridden with CSS in web but on Native we inject backgroundColor
        backgroundColor: '#3b82f6',
        borderRadius: 16,
    }
});
