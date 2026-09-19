import { FontAwesome5, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default function RoadInsightScreen() {
  const destination = '14 Admiralty Way, Lekki Phase 1, Lagos, 105102';
  const routeStatus = 'Mostly Smooth Route';

  const keyHighlights = [
    {
      id: 1,
      icon: 'barrier', // MaterialCommunityIcons
      iconPack: 'MaterialCommunityIcons',
      iconColor: '#f59e0b', // orange
      text: 'Road surface mostly clear and smooth',
    },
    {
      id: 2,
      icon: 'warning-outline', // Ionicons
      iconPack: 'Ionicons',
      iconColor: '#ef4444', // red
      text: 'Few or no hazards reported recently',
    },
    {
      id: 3,
      icon: 'traffic-light', // MaterialCommunityIcons
      iconPack: 'MaterialCommunityIcons',
      iconColor: '#22c55e', // green
      text: 'Minimal traffic reported on this route',
    },
    {
      id: 4,
      icon: 'cloud-showers-heavy', // FontAwesome5 for rain/cloud
      iconPack: 'FontAwesome5',
      iconColor: '#6b7280', // gray
      text: 'Weather rarely affects this route',
    },
  ];

  const smartSuggestions = [
    {
      text: 'Maintain current route — traffic conditions are stable',
      icon: 'car-side',
      pack: 'FontAwesome5'
    },
    {
      text: 'Flexible departure time — minimal impact throughout the day',
      icon: 'time-outline',
      pack: 'Ionicons'
    },
    {
      text: 'Cruise speed recommended — helps maintain ETA accuracy',
      icon: 'car-outline',
      pack: 'Ionicons'
    }
  ];

  // Community experience percentages for "Mostly smooth route"
  const positivePercentage = 88;
  const negativePercentage = 12;

  const [isLoading, setIsLoading] = useState(false);

  const handleStartTrip = () => {
    setIsLoading(true);
    // Simulate loading a route configuration before starting the trip
    setTimeout(() => {
      setIsLoading(false);
      router.push('/trip-home');
    }, 1500);
  };

  const renderHighlightIcon = (highlight: any) => {
    if (highlight.iconPack === 'MaterialCommunityIcons') {
      return <MaterialCommunityIcons name={highlight.icon as any} size={20} color={highlight.iconColor} />;
    } else if (highlight.iconPack === 'Ionicons') {
      return <Ionicons name={highlight.icon as any} size={20} color={highlight.iconColor} />;
    } else if (highlight.iconPack === 'FontAwesome5') {
      return <FontAwesome5 name={highlight.icon as any} size={16} color={highlight.iconColor} />;
    }
    return <MaterialIcons name="info" size={20} color="#000" />;
  };

  const renderSuggestionIcon = (suggestion: any) => {
    if (suggestion.pack === 'FontAwesome5') {
      return <FontAwesome5 name={suggestion.icon as any} size={14} color="#000" />;
    } else if (suggestion.pack === 'Ionicons') {
      return <Ionicons name={suggestion.icon as any} size={16} color="#000" />;
    }
    return <Ionicons name="ellipse" size={10} color="#000" />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" translucent={false} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Road Insight</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 110 }}
      >
        {/* Destination */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Destination</Text>
          <View style={styles.destinationCard}>
            <Ionicons name="location-outline" size={18} color="#666" />
            <Text style={styles.destinationText}>{destination}</Text>
          </View>
        </View>

        {/* Route Present Status */}
        <View style={styles.section}>
          <View style={styles.statusRow}>
            <Text style={styles.sectionLabel}>Route Present Status</Text>
            <View style={[styles.statusBadge, { borderColor: '#22c55e' }]}>
              <Ionicons name="checkmark-circle" size={18} color="#22c55e" />
              <Text style={[styles.statusText, { color: '#22c55e' }]}>{routeStatus}</Text>
            </View>
          </View>
        </View>

        {/* Key Highlights */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Key Highlights</Text>
          <View style={styles.highlightsContainer}>
            {keyHighlights.map((highlight) => (
              <View key={highlight.id} style={styles.highlightCard}>
                <View style={styles.highlightIconContainer}>
                  {renderHighlightIcon(highlight)}
                </View>
                <Text style={styles.highlightText}>{highlight.text}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Community Experience Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Community Experience summary</Text>

          {/* Circular Chart Representation */}
          <View style={styles.chartContainer}>
            <View style={styles.circularChart}>
              <View style={styles.circleOuterConfigured}>
                <View style={styles.circleInner} />
              </View>
            </View>
          </View>

          {/* Legend */}
          <View style={styles.legendContainer}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#22c55e' }]} />
              <Text style={styles.legendText}>
                <Text style={styles.legendTextBold}>{positivePercentage}% </Text>
                of drivers completed this route smoothly
              </Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#ef4444' }]} />
              <Text style={styles.legendText}>
                <Text style={styles.legendTextBold}>{negativePercentage}% </Text>
                reported minor delays or hazards
              </Text>
            </View>
          </View>
        </View>

        {/* Smart Suggestions */}
        <View style={[styles.section, { marginBottom: 20 }]}>
          <View style={styles.suggestionHeader}>
            <Text style={styles.suggestionTitle}>Smart Suggestion</Text>
            <MaterialCommunityIcons name="star-four-points" size={14} color="#000" />
          </View>

          <View style={styles.suggestionsContainer}>
            {smartSuggestions.map((suggestion, index) => (
              <View key={index} style={styles.suggestionItem}>
                <View style={styles.suggestionIconWrapper}>
                  {renderSuggestionIcon(suggestion)}
                </View>
                <Text style={styles.suggestionText}>{suggestion.text}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Action Buttons - Fixed at bottom */}
      <View style={styles.bottomButtonContainer}>
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.alternateButton}>
            <Text style={styles.alternateButtonText}>View alternate route</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.startButton} onPress={handleStartTrip} disabled>
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.startButtonText}>Start trip</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
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
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  headerRight: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  section: {
    marginTop: 24,
  },
  sectionLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
    marginBottom: 14,
  },
  destinationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 10,
  },
  destinationText: {
    flex: 1,
    fontSize: 13,
    color: '#333',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9', // subtle background if needed, but white + border matches
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 6,
    gap: 6,
  },
  statusText: {
    fontSize: 13,
    fontWeight: '500',
  },
  highlightsContainer: {
    gap: 10,
  },
  highlightCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  highlightIconContainer: {
    width: 24,
    alignItems: 'center',
  },
  highlightText: {
    flex: 1,
    fontSize: 13,
    color: '#333',
  },
  chartContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  circularChart: {
    width: 120,
    height: 120,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // We use borders instead of complicated masks for a green circle with a small red gap
  circleOuterConfigured: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 12,
    borderColor: '#22c55e', // Green
    borderRightColor: '#ef4444', // Red on the right edge roughly mimicking "12%"
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '45deg' }] // Adjust the red gap position
  },
  circleInner: {
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: '#fff',
  },
  legendContainer: {
    gap: 8,
    alignItems: 'center',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginTop: 4,
  },
  legendText: {
    fontSize: 12,
    color: '#333',
    lineHeight: 18,
  },
  legendTextBold: {
    fontWeight: '600',
    color: '#000',
  },
  suggestionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },
  suggestionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
    fontStyle: 'italic',
  },
  suggestionsContainer: {
    gap: 8,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  suggestionIconWrapper: {
    width: 16,
    alignItems: 'center',
    marginTop: 3,
  },
  suggestionText: {
    flex: 1,
    fontSize: 13,
    color: '#333',
    lineHeight: 18,
    fontStyle: 'italic',
  },
  bottomButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: Platform.OS === 'ios' ? 32 : 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  alternateButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  alternateButtonText: {
    fontSize: 15,
    color: '#333',
    fontWeight: '600',
  },
  startButton: {
    flex: 1,
    backgroundColor: '#057D4B',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  startButtonText: {
    fontSize: 15,
    color: '#fff',
    fontWeight: '600',
  },
});