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

export default function ProviderStep3Screen() {
    const [phone, setPhone] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [experience, setExperience] = useState('');

    const canSubmit = phone.trim().length > 0 && experience.trim().length > 0;

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <KeyboardAvoidingView style={styles.keyboardView} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                        <Ionicons name="chevron-back" size={24} color="#000" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Contact & trust</Text>
                    <View style={{ width: 32 }} />
                </View>

                <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>

                    <Text style={styles.inputLabel}>Phone Number</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="e.g. 09178253627"
                        placeholderTextColor="#999"
                        keyboardType="phone-pad"
                        value={phone}
                        onChangeText={setPhone}
                    />

                    <Text style={styles.inputLabelTopSpace}>WhatsApp (optional)</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="e.g. 09178253627"
                        placeholderTextColor="#999"
                        keyboardType="phone-pad"
                        value={whatsapp}
                        onChangeText={setWhatsapp}
                    />

                    <Text style={styles.inputLabelTopSpace}>Years of Experience</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="5+ years"
                        placeholderTextColor="#999"
                        value={experience}
                        onChangeText={setExperience}
                    />

                    <Text style={styles.inputLabelTopSpace}>Upload Proof</Text>
                    <TouchableOpacity style={styles.uploadBlock} activeOpacity={0.7}>
                        <Text style={styles.uploadText}>ID / Workshop photo</Text>
                        <View style={styles.uploadIconWrap}>
                            <Ionicons name="add" size={20} color="#fff" />
                        </View>
                    </TouchableOpacity>

                </ScrollView>

                <View style={styles.footer}>
                    <TouchableOpacity
                        style={[styles.continueBtn, !canSubmit && styles.continueBtnDisabled]}
                        disabled={!canSubmit}
                        activeOpacity={0.8}
                        onPress={() => router.push('/trip-home')} // Assuming it loops back or completes setup
                    >
                        <Text style={styles.continueBtnText}>Submit for Review</Text>
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
        borderColor: '#000', // Following Figma tight borders
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 14,
        color: '#000',
        backgroundColor: '#fff',
    },
    uploadBlock: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: '#fff',
    },
    uploadText: {
        flex: 1,
        fontSize: 14,
        color: '#999',
    },
    uploadIconWrap: {
        backgroundColor: '#000',
        borderRadius: 6,
        padding: 4,
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
