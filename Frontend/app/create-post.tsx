import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

export default function CreatePostScreen() {
    const [inputText, setInputText] = useState('');
    const [isUrgent, setIsUrgent] = useState(false);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" translucent={false} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Ionicons name="chevron-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Create post</Text>
                <TouchableOpacity style={styles.postBtn}>
                    <Text style={styles.postBtnText}>Post</Text>
                </TouchableOpacity>
            </View>

            <KeyboardAvoidingView
                style={styles.keyboardView}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 40 }}>
                    {/* Top Selector Block */}
                    <View style={styles.selectorBlock}>
                        <Image
                            source={{ uri: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop' }}
                            style={styles.avatarImg}
                        />

                        <View style={styles.chipGrid}>
                            <TouchableOpacity style={[styles.chip, styles.activeChip]}>
                                <Text style={styles.activeChipText}>Hazard</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.chip}>
                                <Text style={styles.chipText}>Route Tips</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.chip}>
                                <Text style={styles.chipText}>Questions</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.chip}>
                                <Text style={styles.chipText}>Announcements</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Input Element */}
                    <TextInput
                        style={styles.inputArea}
                        placeholder="What's happening?"
                        placeholderTextColor="#999"
                        multiline
                        maxLength={500}
                        value={inputText}
                        onChangeText={setInputText}
                    />

                    {/* Attachments Section pushed down roughly */}
                    <View style={styles.attachmentsSection}>

                        {/* Location Tags Row */}
                        <View style={styles.tagsRow}>
                            <TouchableOpacity style={styles.actionTagGreen}>
                                <MaterialIcons name="location-on" size={14} color="#fff" />
                                <Text style={styles.actionTagGreenText}>Auto-tag current location</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.actionTagGrey}>
                                <Ionicons name="search-outline" size={14} color="#000" />
                                <Text style={styles.actionTagGreyText}>Search location</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Media Scroller */}
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.mediaScroll}>
                            <TouchableOpacity style={styles.cameraBox}>
                                <Ionicons name="camera-outline" size={28} color="#000" />
                            </TouchableOpacity>

                            <Image style={styles.mediaItem} source={{ uri: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=400&q=80' }} />
                            <Image style={styles.mediaItem} source={{ uri: 'https://images.unsplash.com/photo-1574068468668-a05a11f871da?w=400&q=80' }} />
                            <Image style={styles.mediaItem} source={{ uri: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&q=80' }} />
                            <Image style={styles.mediaItem} source={{ uri: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400&q=80' }} />
                        </ScrollView>
                    </View>
                </ScrollView>

                {/* Footer Toggle */}
                <View style={styles.footerRow}>
                    <Switch
                        trackColor={{ false: '#e5e7eb', true: '#3b82f6' }}
                        thumbColor="#fff"
                        ios_backgroundColor="#e5e7eb"
                        onValueChange={setIsUrgent}
                        value={isUrgent}
                        style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
                    />
                    <View style={styles.urgentWrap}>
                        <Ionicons name="warning" size={18} color="#ef4444" />
                        <Text style={styles.urgentText}>Mark as urgent</Text>
                    </View>
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
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 14,
    },
    backButton: {
        padding: 4,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
    },
    postBtn: {
        backgroundColor: '#057D4B',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
    },
    postBtnText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
        marginTop: 10,
    },
    selectorBlock: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 24,
    },
    avatarImg: {
        width: 44,
        height: 44,
        borderRadius: 22,
        marginRight: 16,
    },
    chipGrid: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    chip: {
        borderWidth: 1,
        borderColor: '#e5e7eb',
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 14,
        paddingVertical: 8,
    },
    activeChip: {
        borderColor: '#057D4B',
    },
    chipText: {
        fontSize: 13,
        color: '#666',
        fontWeight: '500',
    },
    activeChipText: {
        fontSize: 13,
        color: '#000',
        fontWeight: '600',
    },
    inputArea: {
        fontSize: 18,
        color: '#000',
        minHeight: 150,
        textAlignVertical: 'top',
        paddingTop: 10,
    },
    attachmentsSection: {
        marginTop: 60, // Push things down to replicate open space
    },
    tagsRow: {
        flexDirection: 'row',
        marginBottom: 20,
        gap: 12,
    },
    actionTagGreen: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#057D4B',
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 8,
        gap: 6,
    },
    actionTagGreenText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '500',
    },
    actionTagGrey: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        borderWidth: 1,
        borderColor: '#e5e7eb',
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 8,
        gap: 6,
    },
    actionTagGreyText: {
        color: '#333',
        fontSize: 12,
        fontWeight: '500',
    },
    mediaScroll: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    cameraBox: {
        width: 80,
        height: 80,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    mediaItem: {
        width: 80,
        height: 80,
        borderRadius: 16,
        marginRight: 12,
    },
    footerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        paddingBottom: Platform.OS === 'ios' ? 32 : 20,
        gap: 12,
    },
    urgentWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    urgentText: {
        color: '#ef4444',
        fontSize: 14,
        fontWeight: '600',
    }
});
