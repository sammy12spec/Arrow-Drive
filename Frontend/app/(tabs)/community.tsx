import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
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

export default function CommunityScreen() {
    const posts = [
        {
            id: 1,
            author: 'Jordan',
            handle: '@streetdriver_001',
            time: '15min',
            category: 'Hazard',
            content: 'Massive porthole on Adebayo Road, avoid left lane',
            distance: '2.3km away from your route',
            likes: '17.3K',
            comments: '350',
            reposts: '1.4K',
            views: '3.5M',
            images: [
                'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=800&auto=format&fit=crop&q=60',
                'https://images.unsplash.com/photo-1574068468668-a05a11f871da?w=800&auto=format&fit=crop&q=60',
                'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop&q=60',
                'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&auto=format&fit=crop&q=60'
            ]
        },
        {
            id: 2,
            author: 'Jordan',
            handle: '@streetdriver_001',
            time: '15min',
            category: 'Hazard',
            content: 'Massive porthole on Adebayo Road, avoid left lane',
            distance: '2.3km away from your route',
            likes: '17.3K',
            comments: '350',
            reposts: '1.4K',
            views: '3.5M',
            images: [
                'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=800&auto=format&fit=crop&q=60',
                'https://images.unsplash.com/photo-1574068468668-a05a11f871da?w=800&auto=format&fit=crop&q=60',
                'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop&q=60',
                'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&auto=format&fit=crop&q=60'
            ]
        }
    ];

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" translucent={false} />

            {/* Header */}
            <View style={styles.header}>
                <View style={styles.avatarPlaceholder}>
                    <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop' }}
                        style={styles.avatarImg}
                    />
                </View>
                <Text style={styles.headerTitle}>Community</Text>
                <TouchableOpacity style={styles.searchBtn}>
                    <Ionicons name="search-outline" size={24} color="#000" />
                </TouchableOpacity>
            </View>

            {/* Tabs */}
            <View style={styles.categoriesWrapper}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesContainer}>
                    <TouchableOpacity style={[styles.categoryPill, styles.activeCategoryPill]}>
                        <Text style={styles.activeCategoryText}>All</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.categoryPill}>
                        <Text style={styles.categoryText}>Hazard</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.categoryPill}>
                        <Text style={styles.categoryText}>Route Tips</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.categoryPill}>
                        <Text style={styles.categoryText}>Questions</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.categoryPill}>
                        <Text style={styles.categoryText}>Announcements</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>

            {/* Posts Feed */}
            <ScrollView style={styles.feed} contentContainerStyle={{ paddingBottom: 100 }}>
                {posts.map((post) => (
                    <View key={post.id} style={styles.postCard}>
                        {/* Post Header */}
                        <View style={styles.postHeader}>
                            <Image
                                source={{ uri: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop' }}
                                style={styles.postAvatar}
                            />
                            <View style={styles.postMetaLine}>
                                <Text style={styles.postAuthor}>{post.author}</Text>
                                <Text style={styles.postHandle}>{post.handle}</Text>
                                <Text style={styles.postTime}>{post.time}</Text>
                            </View>

                            <TouchableOpacity style={styles.mapIconBtn}>
                                <FontAwesome5 name="map-marked-alt" size={14} color="#fff" />
                            </TouchableOpacity>
                        </View>

                        {/* Post Category Badge */}
                        <View style={styles.postBadgeWrapper}>
                            <View style={styles.hazardBadge}>
                                <Text style={styles.hazardBadgeText}>{post.category}</Text>
                            </View>
                        </View>

                        {/* Post Content */}
                        <Text style={styles.postText}>{post.content}</Text>

                        {/* Post Images Grid */}
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.postImagesScroll}>
                            <View style={styles.postImagesRow}>
                                {post.images.map((img, idx) => (
                                    <Image key={idx} source={{ uri: img }} style={styles.postImg} />
                                ))}
                            </View>
                        </ScrollView>

                        <Text style={styles.postDistanceText}>{post.distance}</Text>

                        {/* Actions Bar */}
                        <View style={styles.postActions}>
                            <TouchableOpacity style={styles.actionBtn}>
                                <Ionicons name="thumbs-up-outline" size={18} color="#000" />
                                <Text style={styles.actionText}>{post.likes}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.actionBtn}>
                                <Ionicons name="chatbubble-outline" size={18} color="#000" />
                                <Text style={styles.actionText}>{post.comments}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.actionBtn}>
                                <Ionicons name="repeat-outline" size={18} color="#000" />
                                <Text style={styles.actionText}>{post.reposts}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.actionBtn}>
                                <Ionicons name="eye-outline" size={18} color="#000" />
                                <Text style={styles.actionText}>{post.views}</Text>
                            </TouchableOpacity>

                            <View style={{ flex: 1 }} />

                            <TouchableOpacity style={styles.actionBtnRight}>
                                <Ionicons name="bookmark-outline" size={18} color="#000" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.actionBtnRight}>
                                <Ionicons name="arrow-redo-outline" size={18} color="#000" />
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>

            {/* Floating Action Button */}
            <TouchableOpacity
                style={styles.fab}
                onPress={() => router.push('/create-post')}
                activeOpacity={0.8}
            >
                <Ionicons name="add" size={32} color="#fff" />
            </TouchableOpacity>

            {/* Custom Bottom Navbar matching Community Active state */}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 12,
    },
    avatarPlaceholder: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#eee',
        overflow: 'hidden',
    },
    avatarImg: {
        width: '100%',
        height: '100%',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
    },
    searchBtn: {
        padding: 4,
    },
    categoriesWrapper: {
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        paddingBottom: 12,
    },
    categoriesContainer: {
        paddingHorizontal: 16,
        gap: 10,
    },
    categoryPill: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        backgroundColor: '#fff',
    },
    activeCategoryPill: {
        borderColor: '#057D4B',
    },
    categoryText: {
        fontSize: 14,
        color: '#333',
        fontWeight: '500',
    },
    activeCategoryText: {
        fontSize: 14,
        color: '#000',
        fontWeight: '600',
    },
    feed: {
        flex: 1,
        backgroundColor: '#fff',
    },
    postCard: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    postHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    postAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12,
    },
    postMetaLine: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        flexWrap: 'wrap',
        gap: 6,
    },
    postAuthor: {
        fontSize: 15,
        fontWeight: '700',
        color: '#000',
    },
    postHandle: {
        fontSize: 13,
        color: '#666',
    },
    postTime: {
        fontSize: 11,
        color: '#999',
    },
    mapIconBtn: {
        width: 28,
        height: 28,
        borderRadius: 6,
        backgroundColor: '#057D4B',
        alignItems: 'center',
        justifyContent: 'center',
    },
    postBadgeWrapper: {
        marginLeft: 52,
        marginBottom: 8,
    },
    hazardBadge: {
        alignSelf: 'flex-start',
        backgroundColor: '#f3f4f6',
        borderWidth: 1,
        borderColor: '#e5e7eb',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    hazardBadgeText: {
        fontSize: 11,
        color: '#333',
        fontWeight: '500',
    },
    postText: {
        fontSize: 14,
        color: '#000',
        lineHeight: 20,
        marginBottom: 12,
    },
    postImagesScroll: {
        marginBottom: 12,
        marginHorizontal: -20, // Negative margin to allow full edge-to-edge scroll bleed
        paddingHorizontal: 20, // Add padding back for internal offset
    },
    postImagesRow: {
        flexDirection: 'row',
        gap: 12,
        paddingRight: 40, // Space at the end of scroll
    },
    postImg: {
        width: 260,
        height: 180,
        borderRadius: 16,
        backgroundColor: '#eee',
    },
    postDistanceText: {
        fontSize: 12,
        color: '#666',
        marginBottom: 16,
    },
    postActions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
        gap: 4,
    },
    actionBtnRight: {
        marginLeft: 16,
    },
    actionText: {
        fontSize: 13,
        color: '#000',
        fontWeight: '500',
    },
    fab: {
        position: 'absolute',
        bottom: Platform.OS === 'ios' ? 140 : 130,
        right: 20,
        width: 54,
        height: 54,
        borderRadius: 32,
        backgroundColor: '#057D4B',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 8,
        zIndex: 1000,
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
