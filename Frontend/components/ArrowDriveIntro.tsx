import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Animated, Easing } from 'react-native';

interface Props {
  onAnimationComplete?: () => void;
}

export const ArrowDriveIntro: React.FC<Props> = ({ onAnimationComplete }) => {
  // Phase 1: GPS Radar Lock
  const radarScale = useRef(new Animated.Value(0.2)).current;
  const radarAlpha = useRef(new Animated.Value(1)).current;
  const pinScale = useRef(new Animated.Value(0)).current;

  // Phase 2: 3D Horizon & Highway
  const roadTilt = useRef(new Animated.Value(0)).current;
  const dashFlow = useRef(new Animated.Value(0)).current;

  // Phase 3: Route Knot & Snap
  const routeSpread = useRef(new Animated.Value(36)).current;
  const vehicleProgress = useRef(new Animated.Value(0)).current;

  // Phase 4: Horizon Flatten & Brand Lock
  const lockFlatten = useRef(new Animated.Value(0)).current;
  const textAlpha = useRef(new Animated.Value(0)).current;
  const textLetterSpacing = useRef(new Animated.Value(14)).current;

  // Phase 5: Transition Exit
  const exitScale = useRef(new Animated.Value(1)).current;
  const overlayAlpha = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Continuous road lane flow
    Animated.loop(
      Animated.timing(dashFlow, {
        toValue: 1,
        duration: 320,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    Animated.sequence([
      // 1. GPS PIN DROP & DUAL RADAR PULSE (900ms)
      Animated.parallel([
        Animated.spring(pinScale, {
          toValue: 1,
          friction: 6,
          tension: 60,
          useNativeDriver: true,
        }),
        Animated.timing(radarScale, {
          toValue: 3.2,
          duration: 900,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(radarAlpha, {
          toValue: 0,
          duration: 900,
          useNativeDriver: true,
        }),
      ]),

      // 2. HORIZON TILT & ROUTE SPREAD (900ms)
      Animated.parallel([
        Animated.timing(roadTilt, {
          toValue: 1,
          duration: 900,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(pinScale, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ]),

      // 3. ROUTES SNAP TO UNIFIED HIGHWAY & CHEVRON ACCELERATES (1100ms)
      Animated.parallel([
        Animated.timing(routeSpread, {
          toValue: 0,
          duration: 750,
          easing: Easing.inOut(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(vehicleProgress, {
          toValue: 1,
          duration: 1100,
          easing: Easing.in(Easing.quad),
          useNativeDriver: true,
        }),
      ]),

      // 4. PERSPECTIVE FLATTENS & BRAND EMBLEM DOCKS (800ms)
      Animated.parallel([
        Animated.timing(lockFlatten, {
          toValue: 1,
          duration: 600,
          easing: Easing.out(Easing.back(1.4)),
          useNativeDriver: true,
        }),
        Animated.timing(textAlpha, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(textLetterSpacing, {
          toValue: 3,
          duration: 800,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: false,
        }),
      ]),

      // 5. HOLD & PUNCH-THROUGH DISMISSAL (600ms)
      Animated.parallel([
        Animated.timing(overlayAlpha, {
          toValue: 0,
          duration: 600,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(exitScale, {
          toValue: 1.35,
          duration: 600,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      onAnimationComplete?.();
    });
  }, []);

  // Motion math
  const dashTranslate = dashFlow.interpolate({
    inputRange: [0, 1],
    outputRange: [-36, 36],
  });

  const arrowY = vehicleProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [140, -38],
  });

  const arrowScale = vehicleProgress.interpolate({
    inputRange: [0, 0.45, 1],
    outputRange: [1.2, 0.85, 0.48],
  });

  const lockScale = lockFlatten.interpolate({
    inputRange: [0, 1],
    outputRange: [0.48, 1],
  });

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.overlay,
        {
          opacity: overlayAlpha,
          transform: [{ scale: exitScale }],
        },
      ]}
    >
      <View style={styles.centerStage}>
        {/* PHASE 1: GPS Radar Ring & Pulse Pin */}
        <Animated.View
          style={[
            styles.radarWave,
            {
              opacity: radarAlpha,
              transform: [{ scale: radarScale }],
            },
          ]}
        />
        <Animated.View
          style={[
            styles.pinHead,
            {
              transform: [{ scale: pinScale }],
            },
          ]}
        />

        {/* PHASE 2: 3D Horizon & Road Grid */}
        <Animated.View
          style={[
            styles.horizonGrid,
            {
              opacity: roadTilt,
              transform: [
                { perspective: 350 },
                {
                  rotateX: roadTilt.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '68deg'],
                  }),
                },
              ],
            },
          ]}
        >
          {/* Highway Outer Edge Lines (Green) */}
          <View style={styles.roadEdgeLeft} />
          <View style={styles.roadEdgeRight} />

          {/* PHASE 3: Converging Route Tracks */}
          <Animated.View
            style={[
              styles.trafficRoute,
              {
                transform: [
                  { translateX: routeSpread.interpolate({ inputRange: [0, 36], outputRange: [0, -34] }) },
                  { rotate: routeSpread.interpolate({ inputRange: [0, 36], outputRange: ['0deg', '-24deg'] }) },
                ],
              },
            ]}
          />
          <View style={styles.trafficRouteCenter} />
          <Animated.View
            style={[
              styles.trafficRoute,
              {
                transform: [
                  { translateX: routeSpread.interpolate({ inputRange: [0, 36], outputRange: [0, 34] }) },
                  { rotate: routeSpread.interpolate({ inputRange: [0, 36], outputRange: ['0deg', '24deg'] }) },
                ],
              },
            ]}
          />

          {/* Rushing Highway Dashes (White) */}
          <Animated.View style={{ transform: [{ translateY: dashTranslate }] }}>
            {[...Array(6)].map((_, i) => (
              <View key={i} style={styles.highwayDash} />
            ))}
          </Animated.View>
        </Animated.View>

        {/* Dynamic Navigational Chevron (Green & White) */}
        <Animated.View
          style={[
            styles.chevronContainer,
            {
              transform: [
                { translateY: arrowY },
                { scale: Animated.multiply(arrowScale, lockScale) },
              ],
            },
          ]}
        >
          <View style={styles.chevronWingLeft} />
          <View style={styles.chevronWingRight} />
          <View style={styles.chevronCoreDot} />
        </Animated.View>

        {/* PHASE 4: Brand Reveal */}
        <Animated.View style={[styles.brandContainer, { opacity: textAlpha }]}>
          <Animated.Text
            style={[
              styles.brandTitle,
              { letterSpacing: textLetterSpacing },
            ]}
          >
            ArrowDrive
          </Animated.Text>
          <Text style={styles.brandSub}>NAVIGATION SYSTEM</Text>
        </Animated.View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#02120C', // Deep obsidian green
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999999,
    elevation: 999999,
  },
  centerStage: {
    width: 260,
    height: 320,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },

  // GPS Radar & Pin
  radarWave: {
    position: 'absolute',
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 2,
    borderColor: '#10B981',
  },
  pinHead: {
    position: 'absolute',
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#FFFFFF',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 6,
  },

  // 3D Perspective Road
  horizonGrid: {
    width: 170,
    height: 240,
    alignItems: 'center',
    justifyContent: 'space-around',
    position: 'absolute',
    top: 25,
  },
  roadEdgeLeft: {
    position: 'absolute',
    left: 8,
    width: 2,
    height: '100%',
    backgroundColor: 'rgba(16, 185, 129, 0.35)',
  },
  roadEdgeRight: {
    position: 'absolute',
    right: 8,
    width: 2,
    height: '100%',
    backgroundColor: 'rgba(16, 185, 129, 0.35)',
  },
  trafficRoute: {
    position: 'absolute',
    width: 3,
    height: 140,
    backgroundColor: '#059669',
    borderRadius: 2,
    top: 45,
  },
  trafficRouteCenter: {
    position: 'absolute',
    width: 3,
    height: 140,
    backgroundColor: '#10B981',
    borderRadius: 2,
    top: 45,
  },
  highwayDash: {
    width: 3,
    height: 18,
    backgroundColor: '#FFFFFF',
    marginVertical: 10,
    borderRadius: 2,
  },

  // Aerodynamic Chevron
  chevronContainer: {
    position: 'absolute',
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    top: '38%',
  },
  chevronWingLeft: {
    position: 'absolute',
    left: 8,
    top: 10,
    width: 6,
    height: 24,
    backgroundColor: '#10B981',
    borderRadius: 3,
    transform: [{ rotate: '-38deg' }],
  },
  chevronWingRight: {
    position: 'absolute',
    right: 8,
    top: 10,
    width: 6,
    height: 24,
    backgroundColor: '#10B981',
    borderRadius: 3,
    transform: [{ rotate: '38deg' }],
  },
  chevronCoreDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#FFFFFF',
    top: 3,
    shadowColor: '#FFFFFF',
    shadowOpacity: 0.9,
    shadowRadius: 6,
  },

  // Typography
  brandContainer: {
    position: 'absolute',
    bottom: 20,
    alignItems: 'center',
  },
  brandTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  brandSub: {
    fontSize: 9,
    fontWeight: '700',
    color: '#10B981',
    letterSpacing: 4,
    marginTop: 5,
  },
});