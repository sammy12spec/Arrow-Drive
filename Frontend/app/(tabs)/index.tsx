import React, { useState, useRef, useEffect } from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Animated,
  Easing,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import * as Location from 'expo-location';

// Conditionally require/import react-native-maps for native platforms
let MapView: any = null;
let Marker: any = null;
if (Platform.OS !== 'web') {
  try {
    const Maps = require('react-native-maps');
    MapView = Maps.default || Maps;
    Marker = Maps.Marker;
  } catch (e) {
    console.warn('react-native-maps unavailable, using universal tile stream:', e);
  }
}

// Fallback Coordinates (Lagos, Nigeria)
const DEFAULT_COORDS = {
  latitude: 6.5244,
  longitude: 3.3792,
};

export default function HomeScreen() {
  const [userLocation, setUserLocation] = useState(DEFAULT_COORDS);
  const [locationCity, setLocationCity] = useState('Ado Ekiti');
  const [hasPermissions, setHasPermissions] = useState(false);

  // Native MapView Ref for camera animation
  const mapRef = useRef<any>(null);

  // Glovo-style Camera Dive & Pin-Drop Animations
  const pinDropY = useRef(new Animated.Value(-70)).current;
  const pinOpacity = useRef(new Animated.Value(0)).current;
  const pinScale = useRef(new Animated.Value(1.3)).current;

  // Radar wave ripple outward from pin base
  const radarWave = useRef(new Animated.Value(0)).current;

  // UI Sheet Slide-Ins
  const bottomSheetY = useRef(new Animated.Value(380)).current;
  const bottomSheetOpacity = useRef(new Animated.Value(0)).current;
  const searchBarY = useRef(new Animated.Value(-90)).current;
  const searchBarOpacity = useRef(new Animated.Value(0)).current;
  const floatingActionsOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let isMounted = true;

    const initLocationAndFlyIn = async () => {
      let targetCoords = DEFAULT_COORDS;

      // 1. Initial High-Altitude Camera Setup & Safe Permission Retrieval
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
          if (isMounted) setHasPermissions(true);
          const loc = await Location.getCurrentPositionAsync({});

          if (loc && isMounted) {
            targetCoords = {
              latitude: loc.coords.latitude,
              longitude: loc.coords.longitude,
            };
            setUserLocation(targetCoords);

            // Reverse geocode to fetch city name for the bottom card
            try {
              const geocoded = await Location.reverseGeocodeAsync(targetCoords);
              if (geocoded && geocoded[0]?.city && isMounted) {
                setLocationCity(geocoded[0].city);
              }
            } catch (err) {
              // Keep default city
            }
          }
        }
      } catch (err) {
        // Fallback seamlessly to default coordinates (Lagos: lat 6.5244, lng 3.3792)
        console.warn('Location retrieval fallback used:', err);
        targetCoords = DEFAULT_COORDS;
        if (isMounted) {
          setUserLocation(DEFAULT_COORDS);
        }
      }

      // 2. Stage 2: Camera Fly-In Dive after ~300ms pause over 1500ms
      const flyInTimer = setTimeout(() => {
        if (!isMounted) return;

        // Native Map Camera Dive
        if (mapRef.current?.animateCamera) {
          mapRef.current.animateCamera(
            {
              center: targetCoords,
              pitch: 35, // 3D perspective tilt
              heading: 0,
              altitude: 800,
              zoom: 17, // Street level
            },
            { duration: 1500 }
          );
        }

        // 3. Stage 3 & 4: Spring Pin-Drop, Radar Pulse & UI Reveal around the 1200ms mark
        const pinTimer = setTimeout(() => {
          if (!isMounted) return;

          // Pin Drop with Spring Bounce (friction: 5, tension: 90)
          Animated.parallel([
            Animated.spring(pinDropY, {
              toValue: 0,
              friction: 5,
              tension: 90,
              useNativeDriver: true,
            }),
            Animated.timing(pinOpacity, {
              toValue: 1,
              duration: 200,
              useNativeDriver: true,
            }),
            Animated.spring(pinScale, {
              toValue: 1,
              friction: 5,
              tension: 90,
              useNativeDriver: true,
            }),
          ]).start();

          // Radar Wave: Expanding circular wave (#10B981) pulsing outward from pin base
          radarWave.setValue(0);
          Animated.loop(
            Animated.timing(radarWave, {
              toValue: 1,
              duration: 2000,
              easing: Easing.out(Easing.ease),
              useNativeDriver: true,
            })
          ).start();

          // UI Reveal: Glide up bottom cards and search sheet with Easing.out(Easing.cubic)
          Animated.parallel([
            Animated.timing(bottomSheetY, {
              toValue: 0,
              duration: 700,
              easing: Easing.out(Easing.cubic),
              useNativeDriver: true,
            }),
            Animated.timing(bottomSheetOpacity, {
              toValue: 1,
              duration: 600,
              easing: Easing.out(Easing.cubic),
              useNativeDriver: true,
            }),
            Animated.timing(searchBarY, {
              toValue: 0,
              duration: 650,
              easing: Easing.out(Easing.cubic),
              useNativeDriver: true,
            }),
            Animated.timing(searchBarOpacity, {
              toValue: 1,
              duration: 600,
              easing: Easing.out(Easing.cubic),
              useNativeDriver: true,
            }),
            Animated.timing(floatingActionsOpacity, {
              toValue: 1,
              duration: 500,
              useNativeDriver: true,
            }),
          ]).start();
        }, 1200);

        return () => clearTimeout(pinTimer);
      }, 300);

      return () => clearTimeout(flyInTimer);
    };

    initLocationAndFlyIn();

    return () => {
      isMounted = false;
    };
  }, []);

  // Interpolate radar wave expansions
  const radarWaveScale = radarWave.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 3.2],
  });
  const radarWaveOpacity = radarWave.interpolate({
    inputRange: [0, 0.35, 1],
    outputRange: [0.8, 0.45, 0],
  });

  // Dynamic Leaflet HTML for Web & Universal Fallback
  const leafletMapHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
      <style>
        * { box-sizing: border-box; }
        html, body, #map { margin: 0; padding: 0; width: 100%; height: 100%; background: #02120C; overflow: hidden; }
        .leaflet-control-attribution { display: none !important; }
        .leaflet-control-zoom { border: none !important; margin-right: 18px !important; margin-bottom: 90px !important; }
        .leaflet-bar a {
          background-color: #042C20 !important;
          color: #10B981 !important;
          border: 1px solid #10B981 !important;
          border-radius: 8px !important;
          margin-bottom: 6px !important;
          box-shadow: 0 4px 12px rgba(0,0,0,0.4) !important;
        }
        .leaflet-bar a:hover {
          background-color: #055838 !important;
          color: #00E676 !important;
        }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script>
        var lat = ${userLocation.latitude};
        var lng = ${userLocation.longitude};
        var map = L.map('map', {
          center: [lat, lng],
          zoom: 11,
          zoomControl: true,
          attributionControl: false
        });

        // Live OpenStreetMap / CartoDB Dark Matter tile layer
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
          maxZoom: 19,
          subdomains: 'abcd'
        }).addTo(map);

        map.zoomControl.setPosition('bottomright');

        // Stage 2: Camera Fly-In Dive down to street level
        setTimeout(function() {
          map.flyTo([lat, lng], 17, {
            animate: true,
            duration: 1.5,
            easeLinearity: 0.25
          });
        }, 300);
      </script>
    </body>
    </html>
  `;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#fdfdfd"
        translucent={false}
      />

      {/* =================================================================== */}
      {/* ROBUST UNIVERSAL LIVE MAP (LEAFLET / OPENSTREETMAP / MAPVIEW)        */}
      {/* =================================================================== */}
      <View style={styles.mapContainer}>
        {Platform.OS !== 'web' && MapView ? (
          // Native MapView with Live Tiles
          <MapView
            ref={mapRef}
            style={StyleSheet.absoluteFillObject}
            initialCamera={{
              center: userLocation,
              pitch: 0,
              heading: 0,
              altitude: 35000,
              zoom: 11, // Stage 1: High Orbit
            }}
            showsUserLocation={false}
            showsCompass={false}
            toolbarEnabled={false}
          >
            <Marker coordinate={userLocation} anchor={{ x: 0.5, y: 0.85 }}>
              <View style={styles.pinMarkerContainer}>
                {/* Radar Wave Pulsing from Pin Base */}
                <Animated.View
                  style={[
                    styles.radarPulseWave,
                    {
                      transform: [{ scale: radarWaveScale }],
                      opacity: radarWaveOpacity,
                    },
                  ]}
                />

                {/* Spring-Dropped Custom Emerald Beacon Pin */}
                <Animated.View
                  style={[
                    styles.pinDropWrapper,
                    {
                      opacity: pinOpacity,
                      transform: [{ translateY: pinDropY }, { scale: pinScale }],
                    },
                  ]}
                >
                  <View style={styles.emeraldPinHead}>
                    <View style={styles.emeraldPinInnerDot}>
                      <MaterialIcons name="navigation" size={14} color="#042C20" />
                    </View>
                  </View>
                  <View style={styles.pinTip} />
                  <View style={styles.pinShadow} />
                </Animated.View>
              </View>
            </Marker>
          </MapView>
        ) : (
          // Web / Universal Live Interactive Tile Container (Leaflet + OpenStreetMap)
          <View style={StyleSheet.absoluteFillObject}>
            {React.createElement('iframe', {
              srcDoc: leafletMapHtml,
              style: {
                width: '100%',
                height: '100%',
                border: 'none',
              },
              title: 'ArrowDrive Live Map',
            })}

            {/* Custom Emerald Beacon Pin & Radar Wave Overlay */}
            <View style={styles.webCenterPinContainer} pointerEvents="none">
              {/* Radar Wave */}
              <Animated.View
                style={[
                  styles.radarPulseWave,
                  {
                    transform: [{ scale: radarWaveScale }],
                    opacity: radarWaveOpacity,
                  },
                ]}
              />

              {/* Spring-Dropped Custom Emerald Beacon Pin (#10B981 with white core) */}
              <Animated.View
                style={[
                  styles.pinDropWrapper,
                  {
                    opacity: pinOpacity,
                    transform: [{ translateY: pinDropY }, { scale: pinScale }],
                  },
                ]}
              >
                <View style={styles.emeraldPinHead}>
                  <View style={styles.emeraldPinInnerDot}>
                    <MaterialIcons name="navigation" size={14} color="#042C20" />
                  </View>
                </View>
                <View style={styles.pinTip} />
                <View style={styles.pinShadow} />
              </Animated.View>
            </View>
          </View>
        )}

        {/* =================================================================== */}
        {/* TOP SEARCH BAR (STAGE 4: GLIDES IN FROM TOP)                       */}
        {/* =================================================================== */}
        <Animated.View
          style={[
            styles.searchContainer,
            {
              opacity: searchBarOpacity,
              transform: [{ translateY: searchBarY }],
            },
          ]}
        >
          <View style={styles.searchBar}>
            <MaterialIcons name="search" size={24} color="#666" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search here"
              placeholderTextColor="#999"
            />
            {/* Notification Bell */}
            <TouchableOpacity style={styles.notificationButton}>
              <MaterialIcons name="notifications-none" size={24} color="#000" />
              <View style={styles.notificationDot} />
            </TouchableOpacity>
          </View>

          {/* Upgrade to premium pill */}
          <View style={styles.premiumPillContainer}>
            <TouchableOpacity style={styles.premiumPill}>
              <MaterialIcons name="diamond" size={16} color="#000" />
              <Text style={styles.premiumText}>Upgrade to premium</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* =================================================================== */}
        {/* FLOATING ACTION BUTTONS ON MAP                                     */}
        {/* =================================================================== */}
        <Animated.View
          style={[
            styles.mapFloatingActions,
            { opacity: floatingActionsOpacity },
          ]}
        >
          <TouchableOpacity style={styles.hazardButton}>
            <MaterialIcons name="warning" size={24} color="#e11d48" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navigationIconButton}
            onPress={() => router.push('/plan-trip')}
          >
            <MaterialIcons name="turn-right" size={24} color="#fff" />
          </TouchableOpacity>
        </Animated.View>

        {/* Need Help Button */}
        <Animated.View
          style={[
            styles.needHelpContainer,
            { opacity: floatingActionsOpacity },
          ]}
        >
          <TouchableOpacity style={styles.needHelpButton}>
            <MaterialIcons name="live-help" size={16} color="#333" />
            <Text style={styles.needHelpText}>Need help?</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>

      {/* =================================================================== */}
      {/* BOTTOM INFO PANEL (STAGE 4: SLIDES UP WITH CUBIC EASING)           */}
      {/* =================================================================== */}
      <Animated.View
        style={[
          styles.bottomPanel,
          {
            opacity: bottomSheetOpacity,
            transform: [{ translateY: bottomSheetY }],
          },
        ]}
      >
        <View style={styles.weatherInfoRow}>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Time</Text>
            <Text style={styles.infoValue}>9:00 AM</Text>
          </View>
          <View style={[styles.infoBox, styles.locationBox]}>
            <Text style={styles.infoLabel}>Location</Text>
            <Text style={styles.infoValue} numberOfLines={1}>
              {locationCity}
            </Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Weather</Text>
            <View style={styles.weatherRow}>
              <MaterialIcons name="cloud" size={18} color="#666" style={{ marginRight: 4 }} />
              <Text style={styles.infoValue}>28°</Text>
            </View>
          </View>
        </View>

        {/* Quick Shortcut Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
          contentContainerStyle={{ paddingHorizontal: 16 }}
        >
          <TouchableOpacity style={[styles.categoryButton, styles.activeCategory]}>
            <MaterialIcons name="hotel" size={16} color="#fff" />
            <Text style={styles.activeCategoryText}>Hotels</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.categoryButton}>
            <MaterialIcons name="local-gas-station" size={16} color="#000" />
            <Text style={styles.categoryText}>Gas</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.categoryButton}>
            <MaterialIcons name="restaurant" size={16} color="#000" />
            <Text style={styles.categoryText}>Restaurants</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.categoryButton}>
            <MaterialIcons name="local-hospital" size={16} color="#000" />
            <Text style={styles.categoryText}>Hospitals</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.categoryButton}>
            <MaterialIcons name="build" size={16} color="#000" />
            <Text style={styles.categoryText}>Mechanics</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Turn-by-turn Listings & Hotel Cards */}
        <ScrollView style={styles.hotelListings} showsVerticalScrollIndicator={false}>
          {/* Hotel Item 1 */}
          <View style={styles.hotelItem}>
            <View style={styles.hotelIconContainer}>
              <MaterialIcons name="bed" size={24} color="#057D4B" />
            </View>
            <View style={styles.hotelDetails}>
              <Text style={styles.hotelName}>Grand Horizon Hotel</Text>
            </View>
            <View style={styles.hotelStats}>
              <View style={styles.statsRow}>
                <MaterialIcons name="directions-car" size={12} color="#666" />
                <Text style={styles.statsText}>6 min drive</Text>
                <Text style={styles.statsText}>2.5km away</Text>
                <MaterialIcons name="star" size={12} color="#facc15" />
                <Text style={styles.statsText}>4.5</Text>
              </View>
            </View>
          </View>

          {/* Hotel Item 2 */}
          <View style={styles.hotelItem}>
            <View style={styles.hotelIconContainer}>
              <MaterialIcons name="bed" size={24} color="#057D4B" />
            </View>
            <View style={styles.hotelDetails}>
              <Text style={styles.hotelName}>Midas Hotel</Text>
            </View>
            <View style={styles.hotelStats}>
              <View style={styles.statsRow}>
                <MaterialIcons name="directions-car" size={12} color="#666" />
                <Text style={styles.statsText}>12 min drive</Text>
                <Text style={styles.statsText}>5km away</Text>
                <MaterialIcons name="star" size={12} color="#facc15" />
                <Text style={styles.statsText}>4</Text>
              </View>
            </View>
          </View>

          {/* Hotel Item 3 */}
          <View style={styles.hotelItem}>
            <View style={styles.hotelIconContainer}>
              <MaterialIcons name="bed" size={24} color="#057D4B" />
            </View>
            <View style={styles.hotelDetails}>
              <Text style={styles.hotelName}>Prosperous Hotel</Text>
            </View>
            <View style={styles.hotelStats}>
              <View style={styles.statsRow}>
                <MaterialIcons name="directions-car" size={12} color="#666" />
                <Text style={styles.statsText}>15 min drive</Text>
                <Text style={styles.statsText}>7km away</Text>
                <MaterialIcons name="star" size={12} color="#facc15" />
                <Text style={styles.statsText}>5</Text>
              </View>
            </View>
          </View>

          {/* Hotel Item 4 */}
          <View style={styles.hotelItem}>
            <View style={styles.hotelIconContainer}>
              <MaterialIcons name="bed" size={24} color="#057D4B" />
            </View>
            <View style={styles.hotelDetails}>
              <Text style={styles.hotelName}>Eko Hotel</Text>
            </View>
            <View style={styles.hotelStats}>
              <View style={styles.statsRow}>
                <MaterialIcons name="directions-car" size={12} color="#666" />
                <Text style={styles.statsText}>25 min drive</Text>
                <Text style={styles.statsText}>15km away</Text>
                <MaterialIcons name="star" size={12} color="#facc15" />
                <Text style={styles.statsText}>5</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#02120C',
    overflow: 'hidden',
  },

  // Emerald Beacon Pin & Radar Wave Styles (#02120C, #042C20, #10B981, #FFFFFF)
  pinMarkerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 140,
    height: 140,
  },
  webCenterPinContainer: {
    position: 'absolute',
    top: '38%',
    left: '50%',
    marginLeft: -70,
    marginTop: -70,
    alignItems: 'center',
    justifyContent: 'center',
    width: 140,
    height: 140,
    zIndex: 5,
  },
  radarPulseWave: {
    position: 'absolute',
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(16, 185, 129, 0.25)',
    borderWidth: 2.5,
    borderColor: '#10B981',
    bottom: 12,
  },
  pinDropWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  emeraldPinHead: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#10B981',
    borderWidth: 3,
    borderColor: '#042C20',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.45,
    shadowRadius: 8,
    elevation: 8,
  },
  emeraldPinInnerDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  pinTip: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#042C20',
    marginTop: -2,
  },
  pinShadow: {
    width: 18,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    marginTop: 2,
  },

  // Search & Navigation Elements
  searchContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    zIndex: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingHorizontal: 16,
    paddingVertical: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#000',
  },
  notificationButton: {
    padding: 4,
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 6,
    right: 8,
    width: 8,
    height: 8,
    backgroundColor: '#e11d48',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#fff',
  },
  premiumPillContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  premiumPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    gap: 6,
  },
  premiumText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#000',
  },
  mapFloatingActions: {
    position: 'absolute',
    right: 20,
    top: '46%',
    transform: [{ translateY: -30 }],
    gap: 16,
    zIndex: 10,
  },
  hazardButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#e11d48',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  navigationIconButton: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#057D4B',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  needHelpContainer: {
    position: 'absolute',
    bottom: 24,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 10,
  },
  needHelpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    gap: 6,
  },
  needHelpText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
  },

  // Bottom Sheet Info Panel
  bottomPanel: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 24,
    height: 380,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 10,
    marginTop: -20,
    zIndex: 20,
  },
  weatherInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 24,
    gap: 12,
  },
  infoBox: {
    flex: 1,
    backgroundColor: '#f6f6f6',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  locationBox: {
    flex: 1.5,
  },
  weatherRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 11,
    color: '#999',
    marginBottom: 6,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  categoriesContainer: {
    marginBottom: 16,
    maxHeight: 40,
    minHeight: 40,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginRight: 16,
  },
  activeCategory: {
    backgroundColor: '#057D4B',
    borderRadius: 20,
  },
  categoryText: {
    fontSize: 13,
    color: '#000',
    fontWeight: '600',
    marginLeft: 6,
  },
  activeCategoryText: {
    fontSize: 13,
    color: '#fff',
    fontWeight: '600',
    marginLeft: 6,
  },
  hotelListings: {
    paddingHorizontal: 20,
    marginTop: 8,
  },
  hotelItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  hotelIconContainer: {
    width: 48,
    height: 48,
    backgroundColor: '#e6f2ec',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hotelDetails: {
    flex: 1,
    marginLeft: 16,
  },
  hotelName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
  },
  hotelStats: {
    alignItems: 'flex-end',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statsText: {
    fontSize: 11,
    color: '#666',
  },
});
