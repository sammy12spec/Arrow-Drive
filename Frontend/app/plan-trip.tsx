import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';

type TransportMode = 'car' | 'bus' | 'bike' | 'walk' | 'truck' | 'train' | 'bicycle' | 'aeroplane';
type RouteOption = 'fastest' | 'safest' | 'eco-friendly';
type RoutePreference = 'avoid-tolls' | 'avoid-highways';
type VoiceGuidance = 'normal' | 'hazard-only' | 'mute';

export default function PlanTripScreen() {
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [selectedTransport, setSelectedTransport] = useState<TransportMode>('car');
  const [selectedRoute, setSelectedRoute] = useState<RouteOption>('fastest');
  const [selectedPreferences, setSelectedPreferences] = useState<RoutePreference[]>(['avoid-tolls']);
  const [voiceGuidance, setVoiceGuidance] = useState<VoiceGuidance>('hazard-only');
  const [showTransportDropdown, setShowTransportDropdown] = useState(false);

  const transportModes = [
    { id: 'car' as TransportMode, icon: 'directions-car' as const, pack: 'MaterialIcons' },
    { id: 'bus' as TransportMode, icon: 'bus-outline' as const, pack: 'Ionicons' },
    { id: 'bike' as TransportMode, icon: 'motorcycle' as const, pack: 'FontAwesome5' },
    { id: 'walk' as TransportMode, icon: 'person-outline' as const, pack: 'Ionicons' },
  ];

  const additionalTransportModes = [
    { id: 'truck' as TransportMode, icon: 'local-shipping' as const, label: 'Trucks', pack: 'MaterialIcons' },
    { id: 'train' as TransportMode, icon: 'train-outline' as const, label: 'Train', pack: 'Ionicons' },
    { id: 'bicycle' as TransportMode, icon: 'bicycle-outline' as const, label: 'Bicycle', pack: 'Ionicons' },
    { id: 'aeroplane' as TransportMode, icon: 'airplane-outline' as const, label: 'Aeroplane', pack: 'Ionicons' },
  ];

  const routeOptions = [
    { id: 'fastest' as RouteOption, label: 'Fastest' },
    { id: 'safest' as RouteOption, label: 'Safest' },
    { id: 'eco-friendly' as RouteOption, label: 'Eco-friendly' },
  ];

  const preferenceOptions = [
    { id: 'avoid-tolls' as RoutePreference, label: 'Avoid tolls' },
    { id: 'avoid-highways' as RoutePreference, label: 'Avoid highways' },
  ];

  const voiceOptions = [
    { id: 'normal' as VoiceGuidance, label: 'Normal' },
    { id: 'hazard-only' as VoiceGuidance, label: 'Hazard only' },
    { id: 'mute' as VoiceGuidance, label: 'Mute' },
  ];

  const togglePreference = (id: RoutePreference) => {
    setSelectedPreferences(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const renderTransportIcon = (mode: any, selected: boolean) => {
    const color = selected ? '#fff' : '#666';
    if (mode.pack === 'MaterialIcons') {
      return <MaterialIcons name={mode.icon} size={24} color={color} />;
    } else if (mode.pack === 'Ionicons') {
      return <Ionicons name={mode.icon} size={22} color={color} />;
    } else if (mode.pack === 'FontAwesome5') {
      return <FontAwesome5 name={mode.icon} size={20} color={color} />;
    }
  };

  const renderDropdownIcon = (mode: any) => {
    if (mode.pack === 'MaterialIcons') {
      return <MaterialIcons name={mode.icon} size={18} color="#666" />;
    } else if (mode.pack === 'Ionicons') {
      return <Ionicons name={mode.icon} size={18} color="#666" />;
    } else if (mode.pack === 'FontAwesome5') {
      return <FontAwesome5 name={mode.icon} size={16} color="#666" />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" translucent={false} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Plan your Drive</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Location Inputs Grouping */}
        <View style={styles.locationSectionBox}>
          <View style={styles.locationIndicators}>
            <View style={[styles.indicatorOuter, styles.indicatorOuterTop]}>
              <View style={styles.indicatorInnerBlack} />
            </View>
            <View style={styles.dashedLine} />
            <View style={[styles.indicatorOuter, styles.indicatorOuterBottom]}>
              <View style={styles.indicatorInnerGreen} />
            </View>
          </View>

          <View style={styles.locationInputs}>
            <View style={styles.inputBox}>
              <TextInput
                style={styles.locationInput}
                placeholder="Your location"
                value={fromLocation}
                onChangeText={setFromLocation}
                placeholderTextColor="#999"
              />
            </View>
            <View style={{ height: 12 }} />
            <View style={styles.inputBox}>
              <TextInput
                style={styles.locationInput}
                placeholder="Input destination"
                value={toLocation}
                onChangeText={setToLocation}
                placeholderTextColor="#999"
              />
            </View>
          </View>

          <TouchableOpacity style={styles.swapButtonWrapper}>
            <Ionicons name="swap-vertical" size={20} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Transport Modes Row */}
        <View style={styles.transportSection}>
          {transportModes.map((mode) => (
            <TouchableOpacity
              key={mode.id}
              style={[
                styles.transportButton,
                selectedTransport === mode.id && styles.transportButtonActive
              ]}
              onPress={() => setSelectedTransport(mode.id)}
            >
              {renderTransportIcon(mode, selectedTransport === mode.id)}
            </TouchableOpacity>
          ))}

          {/* Dropdown Toggle */}
          <View style={{ position: 'relative' }}>
            <TouchableOpacity
              style={[styles.transportButton, showTransportDropdown && styles.transportButtonDropdownActive, { zIndex: 10 }]}
              onPress={() => setShowTransportDropdown(!showTransportDropdown)}
            >
              <Ionicons name="chevron-down" size={20} color="#666" />
            </TouchableOpacity>

            {showTransportDropdown && (
              <View style={styles.dropdownPopup}>
                {additionalTransportModes.map((mode) => (
                  <TouchableOpacity
                    key={mode.id}
                    style={styles.dropdownItem}
                    onPress={() => {
                      setSelectedTransport(mode.id);
                      setShowTransportDropdown(false);
                    }}
                  >
                    <View style={styles.dropdownIconWrap}>
                      {renderDropdownIcon(mode)}
                    </View>
                    <Text style={styles.dropdownItemText}>{mode.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>

        {/* Trip Info centered text */}
        <View style={styles.tripInfoBox}>
          <Text style={styles.tripInfoBase}>
            ETA: <Text style={styles.tripInfoBold}>25mins</Text>   <Text style={styles.tripInfoDivider}>|</Text>   Distance: <Text style={styles.tripInfoBold}>12km</Text>
          </Text>
        </View>

        {/* Big White Card for Settings */}
        <View style={styles.settingsCard}>
          {/* Route Options */}
          <View style={styles.settingsGroup}>
            <Text style={styles.settingsGroupTitle}>Route Options</Text>
            <View style={styles.pillRow}>
              {routeOptions.map((opt) => (
                <TouchableOpacity
                  key={opt.id}
                  style={[styles.pillButton, selectedRoute === opt.id && styles.pillButtonActive]}
                  onPress={() => setSelectedRoute(opt.id)}
                >
                  <Text style={[styles.pillText, selectedRoute === opt.id && styles.pillTextActive]}>{opt.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Route Preferences */}
          <View style={styles.settingsGroup}>
            <Text style={styles.settingsGroupTitle}>Route Preferences</Text>
            <View style={styles.pillRow}>
              {preferenceOptions.map((opt) => (
                <TouchableOpacity
                  key={opt.id}
                  style={[styles.pillButton, styles.pillButtonWide, selectedPreferences.includes(opt.id) && styles.pillButtonActive]}
                  onPress={() => togglePreference(opt.id)}
                >
                  <Text style={[styles.pillText, selectedPreferences.includes(opt.id) && styles.pillTextActive]}>{opt.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Voice Guidance */}
          <View style={[styles.settingsGroup, { marginBottom: 0 }]}>
            <Text style={styles.settingsGroupTitle}>Voice Guidance</Text>
            <View style={styles.pillRow}>
              {voiceOptions.map((opt) => (
                <TouchableOpacity
                  key={opt.id}
                  style={[styles.pillButton, voiceGuidance === opt.id && styles.pillButtonActive]}
                  onPress={() => setVoiceGuidance(opt.id)}
                >
                  <Text style={[styles.pillText, voiceGuidance === opt.id && styles.pillTextActive]}>{opt.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

      </ScrollView>

      {/* Fixed bottom continue button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.continueButton, (!fromLocation || !toLocation || !selectedTransport) && styles.continueButtonDisabled]}
          disabled={!fromLocation || !toLocation || !selectedTransport}
          onPress={() => router.push('/road-insight')}
        >
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>
      </View>

      {/* Overlay for dropdown to close when tapped outside */}
      {showTransportDropdown && (
        <TouchableWithoutFeedback onPress={() => setShowTransportDropdown(false)}>
          <View style={StyleSheet.absoluteFillObject} />
        </TouchableWithoutFeedback>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
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
  locationSectionBox: {
    flexDirection: 'row',
    marginTop: 24,
    marginBottom: 32,
    alignItems: 'center',
  },
  locationIndicators: {
    alignItems: 'center',
    width: 20,
    marginRight: 10,
  },
  indicatorOuter: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicatorOuterTop: {
    borderColor: '#000',
  },
  indicatorOuterBottom: {
    borderColor: '#057D4B',
  },
  indicatorInnerBlack: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#000',
  },
  indicatorInnerGreen: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#057D4B',
  },
  dashedLine: {
    width: 1,
    height: 44,
    borderLeftWidth: 1,
    borderLeftColor: '#000',
    borderStyle: 'dotted',
    marginVertical: 4,
  },
  locationInputs: {
    flex: 1,
    paddingRight: 12,
  },
  inputBox: {
    height: 52,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  locationInput: {
    fontSize: 15,
    color: '#000',
  },
  swapButtonWrapper: {
    padding: 8,
    paddingRight: 0,
  },
  transportSection: {
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'center',
    marginBottom: 32,
    zIndex: 20,
  },
  transportButton: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  transportButtonActive: {
    backgroundColor: '#057D4B',
  },
  transportButtonDropdownActive: {
    backgroundColor: '#f0f0f0',
  },
  dropdownPopup: {
    position: 'absolute',
    top: 56,
    right: 0,
    width: 130,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
    paddingVertical: 8,
    zIndex: 100,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  dropdownIconWrap: {
    width: 24,
    alignItems: 'center',
    marginRight: 8,
  },
  dropdownItemText: {
    fontSize: 13,
    color: '#333',
    fontWeight: '500',
  },
  tripInfoBox: {
    alignItems: 'center',
    marginBottom: 24,
  },
  tripInfoBase: {
    fontSize: 12,
    color: '#999',
    fontWeight: '500',
  },
  tripInfoBold: {
    fontSize: 14,
    color: '#000',
    fontWeight: '600',
  },
  tripInfoDivider: {
    color: '#e0e0e0',
  },
  settingsCard: {
    borderWidth: 1,
    borderColor: '#e9ecef',
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
  },
  settingsGroup: {
    marginBottom: 28,
  },
  settingsGroupTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
    marginBottom: 16,
  },
  pillRow: {
    flexDirection: 'row',
    gap: 10,
  },
  pillButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  pillButtonWide: {
    paddingHorizontal: 20,
  },
  pillButtonActive: {
    backgroundColor: '#fff',
    borderColor: '#057D4B',
  },
  pillText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  pillTextActive: {
    color: '#057D4B',
    fontWeight: '600',
  },
  footer: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: Platform.OS === 'ios' ? 32 : 16,
  },
  continueButton: {
    backgroundColor: '#057D4B',
    borderRadius: 12,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueButtonDisabled: {
    backgroundColor: '#a5d6a7', // Light green or grey
  },
  continueText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  }
});