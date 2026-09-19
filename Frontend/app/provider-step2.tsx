import { Ionicons } from '@expo/vector-icons';
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

export default function ProviderStep2Screen() {
    const [serviceName, setServiceName] = useState('');
    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const [otherServices, setOtherServices] = useState('');
    const [serviceArea, setServiceArea] = useState('');
    const [availability, setAvailability] = useState('');

    const offeredServices = ['Engine repair', 'Brake issues', 'Emergency fixes'];
    const availabilityOptions = ['24/7', 'Daytime only', 'Night only'];

    const toggleOfferedService = (svc: string) => {
        setSelectedServices(prev =>
            prev.includes(svc) ? prev.filter(s => s !== svc) : [...prev, svc]
        );
    };

    const isServicesValid = selectedServices.length > 0 || otherServices.trim().length > 0;
    const canContinue = serviceName.trim().length > 0 && isServicesValid && serviceArea.trim().length > 0 && availability.length > 0;

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <KeyboardAvoidingView style={styles.keyboardView} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                        <Ionicons name="chevron-back" size={24} color="#000" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Service details</Text>
                    <View style={{ width: 32 }} />
                </View>

                <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>

                    <Text style={styles.inputLabel}>Service Name</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="e.g. Mike Auto Repairs"
                        placeholderTextColor="#999"
                        value={serviceName}
                        onChangeText={setServiceName}
                    />

                    <Text style={styles.inputLabelTopSpace}>Services Offered</Text>
                    <View style={styles.optionsList}>
                        {offeredServices.map((svc) => {
                            const isSelected = selectedServices.includes(svc);
                            return (
                                <TouchableOpacity
                                    key={svc}
                                    style={styles.optionRow}
                                    onPress={() => toggleOfferedService(svc)}
                                    activeOpacity={0.7}
                                >
                                    <Text style={styles.optionText}>{svc}</Text>
                                    <View style={styles.checkboxWrapper}>
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

                    <TextInput
                        style={styles.textInput}
                        placeholder="Input other services"
                        placeholderTextColor="#999"
                        value={otherServices}
                        onChangeText={setOtherServices}
                    />

                    <Text style={styles.inputLabelTopSpace}>Service Area</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="e.g. Ikeja, Maryland, Yaba"
                        placeholderTextColor="#999"
                        value={serviceArea}
                        onChangeText={setServiceArea}
                    />

                    <Text style={styles.inputLabelTopSpace}>Availability</Text>
                    <View style={styles.optionsList}>
                        {availabilityOptions.map((opt) => {
                            const isSelected = availability === opt;
                            return (
                                <TouchableOpacity
                                    key={opt}
                                    style={styles.optionRow}
                                    onPress={() => setAvailability(opt)}
                                    activeOpacity={0.7}
                                >
                                    <Text style={styles.optionText}>{opt}</Text>
                                    <View style={styles.checkboxWrapper}>
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

                </ScrollView>

                <View style={styles.footer}>
                    <TouchableOpacity
                        style={[styles.continueBtn, !canContinue && styles.continueBtnDisabled]}
                        disabled={!canContinue}
                        activeOpacity={0.8}
                        onPress={() => router.push('/provider-step3')}
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
    inputLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000',
        marginBottom: 8,
        marginTop: 10,
    },
    inputLabelTopSpace: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000',
        marginBottom: 8,
        marginTop: 24,
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
    optionsList: {
        gap: 8,
        marginBottom: 8,
    },
    optionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f9fafb',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 14,
    },
    optionText: {
        flex: 1,
        fontSize: 14,
        fontWeight: '500',
        color: '#333',
    },
    checkboxWrapper: {
        marginLeft: 12,
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
