import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
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

export default function ProviderStep1Screen() {
    const [selectedService, setSelectedService] = useState('');
    const [otherService, setOtherService] = useState('');

    const services = [
        { id: 'Mechanic', title: 'Mechanic', icon: () => <MaterialCommunityIcons name="wrench" size={16} color="#000" /> },
        { id: 'Tow Truck', title: 'Tow Truck', icon: () => <MaterialCommunityIcons name="tow-truck" size={16} color="#000" /> },
        { id: 'Fuel Delivery', title: 'Fuel Delivery', icon: () => <MaterialCommunityIcons name="gas-station" size={16} color="#000" /> },
        { id: 'Battery Jumpstart', title: 'Battery Jumpstart', icon: () => <MaterialCommunityIcons name="car-battery" size={16} color="#000" /> },
        { id: 'Tyre Repair', title: 'Tyre Repair', icon: () => <MaterialCommunityIcons name="tire" size={16} color="#000" /> },
    ];

    const canContinue = !!selectedService || !!otherService.trim();

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <KeyboardAvoidingView style={styles.keyboardView} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                        <Ionicons name="chevron-back" size={24} color="#000" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Become a service provider</Text>
                    <View style={{ width: 32 }} />
                </View>

                <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
                    <Text style={styles.questionLabel}>What service do you provide?</Text>

                    <View style={styles.optionsList}>
                        {services.map((svc) => {
                            const isSelected = selectedService === svc.id;
                            return (
                                <TouchableOpacity
                                    key={svc.id}
                                    style={[styles.optionRow, isSelected && styles.optionRowSelected]}
                                    onPress={() => setSelectedService(svc.id)}
                                    activeOpacity={0.7}
                                >
                                    <View style={styles.optionIconBox}>
                                        {svc.icon()}
                                    </View>
                                    <Text style={styles.optionText}>{svc.title}</Text>
                                    <View style={styles.radioWrapper}>
                                        {isSelected ? (
                                            <Ionicons name="checkmark-circle" size={20} color="#000" />
                                        ) : (
                                            <Ionicons name="ellipse-outline" size={20} color="#999" />
                                        )}
                                    </View>
                                </TouchableOpacity>
                            );
                        })}
                    </View>

                    <Text style={styles.otherLabel}>Other</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Input services"
                        placeholderTextColor="#999"
                        value={otherService}
                        onChangeText={(text) => {
                            setOtherService(text);
                            if (text.trim() && selectedService) {
                                setSelectedService(''); // Deselect radio if typing in 'Other' to naturally act like an exclusive group, or at least logically
                            }
                        }}
                        onFocus={() => setSelectedService('')}
                    />
                </ScrollView>

                <View style={styles.footer}>
                    <TouchableOpacity
                        style={[styles.continueBtn, !canContinue && styles.continueBtnDisabled]}
                        disabled={!canContinue}
                        activeOpacity={0.8}
                        onPress={() => router.push('/provider-step2')}
                    >
                        <Text style={styles.continueBtnText}>Continue</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    keyboardView: {
        flex: 1,
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
    questionLabel: {
        fontSize: 15,
        fontWeight: '600',
        color: '#000',
        marginBottom: 20,
        marginTop: 10,
    },
    optionsList: {
        gap: 12,
        marginBottom: 24,
    },
    optionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f9fafb',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 14,
    },
    optionRowSelected: {
        backgroundColor: '#f3f4f6',
    },
    optionIconBox: {
        marginRight: 12,
        width: 20,
        alignItems: 'center',
    },
    optionText: {
        flex: 1,
        fontSize: 14,
        fontWeight: '500',
        color: '#333',
    },
    radioWrapper: {
        marginLeft: 12,
    },
    otherLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000',
        marginBottom: 10,
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#e5e7eb',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 14,
        color: '#000',
        backgroundColor: '#fff',
    },
    footer: {
        paddingHorizontal: 20,
        paddingBottom: Platform.OS === 'ios' ? 32 : 24,
        paddingTop: 16,
        backgroundColor: '#fff',
    },
    continueBtn: {
        backgroundColor: '#057D4B',
        paddingVertical: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    continueBtnDisabled: {
        opacity: 0.5,
    },
    continueBtnText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '600',
    }
});
