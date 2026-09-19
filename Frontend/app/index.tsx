import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Image,
  useWindowDimensions,
  Animated,
  Easing,
  Platform,
  Modal,
} from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { router } from 'expo-router';

const AnimatedPath = Animated.createAnimatedComponent(Path);

// ============================================================================
// MICRO-INTERACTION COMPONENTS
// ============================================================================

/**
 * Reusable Scroll-Reveal Container with smooth cubic-bezier easing
 */
const AnimatedSection = ({
  children,
  delay = 0,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  style?: any;
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 750,
        delay,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 750,
        delay,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, [delay, fadeAnim, slideAnim]);

  return (
    <Animated.View
      style={[
        style,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
};

/**
 * Green Pill Button with Arrow Slide Interaction:
 * Hovering or pressing nudges the inner arrow icon rightward (translateX: 4px).
 */
const InteractiveGreenPillButton = ({
  onPress,
  label = 'Get Started',
}: {
  onPress: () => void;
  label?: string;
}) => {
  const arrowX = useRef(new Animated.Value(0)).current;
  const btnScale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(arrowX, {
        toValue: 4,
        friction: 6,
        tension: 140,
        useNativeDriver: true,
      }),
      Animated.spring(btnScale, {
        toValue: 1.02,
        friction: 6,
        tension: 140,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(arrowX, {
        toValue: 0,
        friction: 6,
        tension: 140,
        useNativeDriver: true,
      }),
      Animated.spring(btnScale, {
        toValue: 1,
        friction: 6,
        tension: 140,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <Animated.View style={{ alignSelf: 'flex-start', transform: [{ scale: btnScale }] }}>
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.greenPillButton}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        // @ts-ignore
        onMouseEnter={handlePressIn}
        // @ts-ignore
        onMouseLeave={handlePressOut}
      >
        <Text style={styles.greenPillButtonText}>{label}</Text>
        <View style={styles.pillIconSmall}>
          <Animated.Text
            style={[
              styles.pillIconText,
              { transform: [{ translateX: arrowX }] },
            ]}
          >
            ➔
          </Animated.Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

/**
 * Scroll-Triggered Slide-Up Feature Row:
 * When user scrolls to the section, the text and image slide up into view with an opacity fade.
 */
const ScrollRevealFeatureRow = ({
  children,
  delay = 50,
  style,
  parentOffsetY,
  scrollOffset,
  windowHeight,
}: {
  children: [React.ReactNode, React.ReactNode];
  delay?: number;
  style?: any;
  parentOffsetY: number;
  scrollOffset: number;
  windowHeight: number;
}) => {
  const [rowLayoutY, setRowLayoutY] = useState<number | null>(null);
  const [isTriggered, setIsTriggered] = useState(false);

  // Slide-up animation values
  const textSlideUp = useRef(new Animated.Value(60)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const imageSlideUp = useRef(new Animated.Value(70)).current;
  const imageOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isTriggered) return;

    // Absolute Y coordinate of the row on the page
    const absoluteY = parentOffsetY + (rowLayoutY ?? 0);

    // Trigger when user scrolls such that the element enters within the viewport
    if (rowLayoutY !== null && scrollOffset + windowHeight * 0.88 >= absoluteY) {
      setIsTriggered(true);

      Animated.parallel([
        Animated.timing(textSlideUp, {
          toValue: 0,
          duration: 750,
          delay,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 700,
          delay,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(imageSlideUp, {
          toValue: 0,
          duration: 800,
          delay: delay + 90,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(imageOpacity, {
          toValue: 1,
          duration: 750,
          delay: delay + 90,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [
    scrollOffset,
    rowLayoutY,
    parentOffsetY,
    isTriggered,
    windowHeight,
    delay,
    textSlideUp,
    textOpacity,
    imageSlideUp,
    imageOpacity,
  ]);

  const [firstChild, secondChild] = children;

  return (
    <View
      style={style}
      onLayout={(e) => {
        setRowLayoutY(e.nativeEvent.layout.y);
      }}
    >
      <Animated.View
        style={[
          styles.featureHalfCol,
          {
            opacity: textOpacity,
            transform: [{ translateY: textSlideUp }],
          },
        ]}
      >
        {firstChild}
      </Animated.View>

      <Animated.View
        style={[
          styles.featureHalfCol,
          {
            opacity: imageOpacity,
            transform: [{ translateY: imageSlideUp }],
          },
        ]}
      >
        {secondChild}
      </Animated.View>
    </View>
  );
};

/**
 * Scroll-Triggered Slide-Up Block:
 * Fades and slides up a block or heading when user scrolls it into view.
 */
const ScrollRevealBlock = ({
  children,
  delay = 0,
  style,
  parentOffsetY,
  scrollOffset,
  windowHeight,
}: {
  children: React.ReactNode;
  delay?: number;
  style?: any;
  parentOffsetY: number;
  scrollOffset: number;
  windowHeight: number;
}) => {
  const [layoutY, setLayoutY] = useState<number | null>(null);
  const [isTriggered, setIsTriggered] = useState(false);

  const slideUp = useRef(new Animated.Value(45)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isTriggered) return;
    const absoluteY = parentOffsetY + (layoutY ?? 0);
    if (layoutY !== null && scrollOffset + windowHeight * 0.9 >= absoluteY) {
      setIsTriggered(true);
      Animated.parallel([
        Animated.timing(slideUp, {
          toValue: 0,
          duration: 700,
          delay,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 650,
          delay,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [scrollOffset, layoutY, parentOffsetY, isTriggered, windowHeight, delay, slideUp, opacity]);

  return (
    <Animated.View
      style={[
        style,
        {
          opacity,
          transform: [{ translateY: slideUp }],
        },
      ]}
      onLayout={(e) => {
        setLayoutY(e.nativeEvent.layout.y);
      }}
    >
      {children}
    </Animated.View>
  );
};

/**
 * Animated Step Connector Arrow:
 * Pulses with an idle breathing glow and scale rhythm to visually communicate forward momentum.
 */
const PulsingStepConnector = () => {
  const pulseScale = useRef(new Animated.Value(1)).current;
  const arrowSlide = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(pulseScale, {
            toValue: 1.18,
            duration: 850,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(arrowSlide, {
            toValue: 4,
            duration: 850,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(pulseScale, {
            toValue: 1,
            duration: 850,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(arrowSlide, {
            toValue: 0,
            duration: 850,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [pulseScale, arrowSlide]);

  return (
    <Animated.View
      style={[
        styles.stepConnectorCircle,
        {
          transform: [
            { scale: pulseScale },
            { rotate: '90deg' },
          ],
        },
      ]}
    >
      <Animated.Text
        style={[
          styles.stepConnectorArrow,
          { transform: [{ translateX: arrowSlide }] },
        ]}
      >
        ➔
      </Animated.Text>
    </Animated.View>
  );
};

/**
 * Interactive Step Card with tactile hover/press elevation
 */
const InteractiveStepCard = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style: any;
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const liftAnim = useRef(new Animated.Value(0)).current;

  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1.025,
        friction: 7,
        tension: 120,
        useNativeDriver: true,
      }),
      Animated.timing(liftAnim, {
        toValue: -4,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 7,
        tension: 120,
        useNativeDriver: true,
      }),
      Animated.timing(liftAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <Animated.View
      style={[
        style,
        {
          transform: [{ scale: scaleAnim }, { translateY: liftAnim }],
        },
      ]}
      onTouchStart={handlePressIn}
      onTouchEnd={handlePressOut}
      // @ts-ignore
      onMouseEnter={handlePressIn}
      // @ts-ignore
      onMouseLeave={handlePressOut}
    >
      {children}
    </Animated.View>
  );
};

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function ArrowDriveLandingPage() {
  const { width, height: windowHeight } = useWindowDimensions();
  // Software is an application meant strictly for mobile view
  const isMobile = true;

  const [scrollOffset, setScrollOffset] = useState(0);
  const [featuresSectionY, setFeaturesSectionY] = useState(1050);

  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // About Us 2-second auto-cycling image state
  const aboutImages = [
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800&auto=format&fit=crop',
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const imageFadeAnim = useRef(new Animated.Value(1)).current;

  // Scroll tracking and section positions
  const scrollViewRef = useRef<any>(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const sectionPositions = useRef<{ [key: string]: number }>({
    home: 0,
    about: 650,
    features: 1100,
    howItWorks: 1950,
  });

  // Staggered Entrance Orchestration values (Hero Section)
  const navEntranceY = useRef(new Animated.Value(-15)).current;
  const navEntranceOpacity = useRef(new Animated.Value(0)).current;
  const headlineY = useRef(new Animated.Value(25)).current;
  const headlineOpacity = useRef(new Animated.Value(0)).current;
  const subheadlineY = useRef(new Animated.Value(20)).current;
  const subheadlineOpacity = useRef(new Animated.Value(0)).current;
  const ctaScale = useRef(new Animated.Value(0.85)).current;
  const ctaOpacity = useRef(new Animated.Value(0)).current;

  // Continuous physics & ambient animations
  const heroPulse = useRef(new Animated.Value(1)).current;
  const scanLineY = useRef(new Animated.Value(-100)).current;
  const radarWave = useRef(new Animated.Value(0)).current;
  const dashAnim = useRef(new Animated.Value(0)).current;

  // Newsletter interactive focus & press feedback
  const inputBorderAnim = useRef(new Animated.Value(0)).current;
  const subscribeBtnScale = useRef(new Animated.Value(1)).current;

  // Menu overlay animation
  const overlayAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 1. Staggered Entrance Orchestration on Initial Load
    Animated.parallel([
      Animated.timing(navEntranceY, {
        toValue: 0,
        duration: 650,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(navEntranceOpacity, {
        toValue: 1,
        duration: 550,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(headlineY, {
        toValue: 0,
        duration: 750,
        delay: 100,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(headlineOpacity, {
        toValue: 1,
        duration: 750,
        delay: 100,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(subheadlineY, {
        toValue: 0,
        duration: 750,
        delay: 250,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(subheadlineOpacity, {
        toValue: 1,
        duration: 750,
        delay: 250,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(ctaOpacity, {
        toValue: 1,
        duration: 450,
        delay: 400,
        useNativeDriver: true,
      }),
      Animated.spring(ctaScale, {
        toValue: 1,
        friction: 6,
        tension: 70,
        delay: 400,
        useNativeDriver: true,
      }),
    ]).start();

    // 2. Hero CTA Heartbeat Pulse
    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(heroPulse, {
          toValue: 1.05,
          duration: 1100,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(heroPulse, {
          toValue: 1,
          duration: 1100,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );
    pulseLoop.start();

    // 3. Cockpit Scanner Beam
    const scanLoop = Animated.loop(
      Animated.timing(scanLineY, {
        toValue: 500,
        duration: 3200,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    scanLoop.start();

    // 4. Radar Location Echo
    const radarLoop = Animated.loop(
      Animated.timing(radarWave, {
        toValue: 1,
        duration: 2000,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      })
    );
    radarLoop.start();

    // 5. SVG Live Route Dashes Stream
    const dashLoop = Animated.loop(
      Animated.timing(dashAnim, {
        toValue: 30,
        duration: 800,
        easing: Easing.linear,
        useNativeDriver: false,
      })
    );
    dashLoop.start();

    return () => {
      pulseLoop.stop();
      scanLoop.stop();
      radarLoop.stop();
      dashLoop.stop();
    };
  }, [
    ctaOpacity,
    ctaScale,
    dashAnim,
    headlineOpacity,
    headlineY,
    heroPulse,
    navEntranceOpacity,
    navEntranceY,
    radarWave,
    scanLineY,
    subheadlineOpacity,
    subheadlineY,
  ]);

  // 6. About Us Single Image Auto-Changes Every 2 Seconds
  useEffect(() => {
    const timer = setInterval(() => {
      Animated.sequence([
        Animated.timing(imageFadeAnim, {
          toValue: 0.2,
          duration: 250,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(imageFadeAnim, {
          toValue: 1,
          duration: 350,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start();

      setCurrentImageIndex((prev) => (prev + 1) % aboutImages.length);
    }, 2000);

    return () => clearInterval(timer);
  }, [imageFadeAnim]);

  // Handle Input Focus / Blur Animation
  useEffect(() => {
    Animated.timing(inputBorderAnim, {
      toValue: isInputFocused ? 1 : 0,
      duration: 250,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [isInputFocused, inputBorderAnim]);

  // Overlay Menu Transition
  useEffect(() => {
    if (menuOpen) {
      Animated.timing(overlayAnim, {
        toValue: 1,
        duration: 280,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(overlayAnim, {
        toValue: 0,
        duration: 220,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }).start();
    }
  }, [menuOpen, overlayAnim]);

  // Start Driving CTA -> Leads to Authentication Page
  const handleStartDriving = () => {
    setMenuOpen(false);
    router.push('/auth');
  };

  // Smooth Section Scroll
  const handleScrollToSection = (sectionKey: string) => {
    setMenuOpen(false);
    const targetY = sectionPositions.current[sectionKey] ?? 0;
    const scrollOffset = Math.max(0, targetY - 60);
    setTimeout(() => {
      scrollViewRef.current?.scrollTo({ y: scrollOffset, animated: true });
    }, 150);
  };

  // Newsletter interactive submit with tactile press feedback
  const handleSubscribe = () => {
    if (email.trim().length > 3) {
      Animated.sequence([
        Animated.timing(subscribeBtnScale, {
          toValue: 0.92,
          duration: 120,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.spring(subscribeBtnScale, {
          toValue: 1,
          friction: 4,
          tension: 140,
          useNativeDriver: true,
        }),
      ]).start();

      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail('');
    }
  };

  // Scroll-Adaptive Sticky Header Interpolations
  const headerBgColor = scrollY.interpolate({
    inputRange: [0, 90, 240],
    outputRange: ['rgba(5, 12, 10, 0)', 'rgba(3, 18, 14, 0.75)', 'rgba(3, 18, 14, 0.94)'],
    extrapolate: 'clamp',
  });

  const headerBorderBottomColor = scrollY.interpolate({
    inputRange: [0, 90, 240],
    outputRange: ['rgba(255, 255, 255, 0)', 'rgba(16, 185, 129, 0.18)', 'rgba(16, 185, 129, 0.32)'],
    extrapolate: 'clamp',
  });

  const headerShadowOpacity = scrollY.interpolate({
    inputRange: [0, 90, 240],
    outputRange: [0, 0.25, 0.5],
    extrapolate: 'clamp',
  });

  const inputBorderColor = inputBorderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(255, 255, 255, 0.35)', '#10B981'],
  });

  const inputBgColor = inputBorderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(255, 255, 255, 0.22)', 'rgba(6, 78, 59, 0.42)'],
  });

  return (
    <View style={styles.outerScreenContainer}>
      {/* ========================================================================= */}
      {/* SCROLL-ADAPTIVE STICKY HEADER (Click ArrowDrive to Open Navigation Menu) */}
      {/* ========================================================================= */}
      <Animated.View
        style={[
          styles.stickyHeader,
          {
            backgroundColor: headerBgColor,
            borderBottomColor: headerBorderBottomColor,
            borderBottomWidth: 1,
            shadowOpacity: headerShadowOpacity,
            transform: [{ translateY: navEntranceY }],
            opacity: navEntranceOpacity,
          },
        ]}
      >
        <View style={styles.headerInnerRow}>
          {/* ArrowDrive Pill at Left Top is the button that opens the Navigation Overlay */}
          <TouchableOpacity
            activeOpacity={0.82}
            style={styles.logoPillButton}
            onPress={() => setMenuOpen(true)}
          >
            <Text style={styles.logoText}>ArrowDrive</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      {/* ========================================================================= */}
      {/* FULL-SCREEN NAVIGATION OVERLAY (HOME, ABOUT US, FEATURES, HOW IT WORKS)  */}
      {/* ========================================================================= */}
      <Modal
        visible={menuOpen}
        transparent={true}
        animationType="none"
        onRequestClose={() => setMenuOpen(false)}
      >
        <Animated.View
          style={[
            styles.overlayBackdrop,
            {
              opacity: overlayAnim,
            },
          ]}
        >
          <Animated.View
            style={[
              styles.overlayContainer,
              {
                transform: [
                  {
                    translateY: overlayAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-40, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            {/* Overlay Header */}
            <View style={styles.overlayHeader}>
              <View style={styles.logoPill}>
                <Text style={styles.logoText}>ArrowDrive</Text>
              </View>

              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.closeBtn}
                onPress={() => setMenuOpen(false)}
              >
                <Text style={styles.closeBtnText}>✕</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.overlayCategoryTitle}>QUICK NAVIGATION</Text>

            {/* Navigation Menu Buttons */}
            <View style={styles.overlayLinksContainer}>
              <TouchableOpacity
                activeOpacity={0.85}
                style={styles.overlayNavItem}
                onPress={() => handleScrollToSection('home')}
              >
                <View style={styles.navItemIconBox}>
                  <Text style={styles.navItemSymbol}>⌂</Text>
                </View>
                <View style={styles.navItemTextBox}>
                  <Text style={styles.overlayNavText}>HOME</Text>
                  <Text style={styles.overlayNavSub}>Top of the page & live cockpit</Text>
                </View>
                <Text style={styles.navItemArrow}>➔</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.85}
                style={styles.overlayNavItem}
                onPress={() => handleScrollToSection('about')}
              >
                <View style={styles.navItemIconBox}>
                  <Text style={styles.navItemSymbol}>ℹ</Text>
                </View>
                <View style={styles.navItemTextBox}>
                  <Text style={styles.overlayNavText}>ABOUT US</Text>
                  <Text style={styles.overlayNavSub}>Our vision & roadside companion</Text>
                </View>
                <Text style={styles.navItemArrow}>➔</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.85}
                style={styles.overlayNavItem}
                onPress={() => handleScrollToSection('features')}
              >
                <View style={styles.navItemIconBox}>
                  <Text style={styles.navItemSymbol}>★</Text>
                </View>
                <View style={styles.navItemTextBox}>
                  <Text style={styles.overlayNavText}>FEATURES</Text>
                  <Text style={styles.overlayNavSub}>Real-time hazards & smart routing</Text>
                </View>
                <Text style={styles.navItemArrow}>➔</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.85}
                style={styles.overlayNavItem}
                onPress={() => handleScrollToSection('howItWorks')}
              >
                <View style={styles.navItemIconBox}>
                  <Text style={styles.navItemSymbol}>⚙</Text>
                </View>
                <View style={styles.navItemTextBox}>
                  <Text style={styles.overlayNavText}>HOW IT WORKS</Text>
                  <Text style={styles.overlayNavSub}>3 simple steps to confident driving</Text>
                </View>
                <Text style={styles.navItemArrow}>➔</Text>
              </TouchableOpacity>
            </View>

            {/* Direct CTA leading to Authentication */}
            <TouchableOpacity
              activeOpacity={0.88}
              style={styles.overlayCtaBtn}
              onPress={handleStartDriving}
            >
              <Text style={styles.overlayCtaText}>Start Driving</Text>
              <View style={styles.ctaArrowCircle}>
                <Text style={styles.ctaArrowIcon}>➔</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      </Modal>

      {/* ========================================================================= */}
      {/* SCROLLABLE MAIN CONTENT                                                   */}
      {/* ========================================================================= */}
      <Animated.ScrollView
        ref={scrollViewRef}
        style={styles.mainContainer}
        bounces={false}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          {
            useNativeDriver: false,
            listener: (e: any) => {
              const y = e?.nativeEvent?.contentOffset?.y ?? 0;
              setScrollOffset(y);
            },
          }
        )}
      >
        {/* ======================================================================= */}
        {/* 1. HERO SECTION & COCKPIT SCANNER (HOME)                                */}
        {/* ======================================================================= */}
        <View
          style={[styles.heroWrapper, { height: 650 }]}
          onLayout={(e) => {
            sectionPositions.current.home = e.nativeEvent.layout.y;
          }}
        >
          <ImageBackground
            source={{
              uri: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=2000&auto=format&fit=crop',
            }}
            style={styles.heroBackground}
          >
            <View style={styles.heroDarkOverlay} />

            {/* Animated Cockpit Scanner Beam */}
            <Animated.View
              style={[
                styles.scanBeam,
                { transform: [{ translateY: scanLineY }] },
              ]}
            />

            {/* Header clearance spacer */}
            <View style={{ height: Platform.OS === 'ios' ? 105 : 85 }} />

            {/* Hero Content with Staggered Entrance Orchestration */}
            <View style={[styles.heroContent, { paddingHorizontal: 20 }]}>
              {/* Radar Location Echo */}
              <Animated.View
                style={[
                  styles.radarPing,
                  {
                    opacity: radarWave.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.8, 0],
                    }),
                    transform: [
                      {
                        scale: radarWave.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0.3, 2.6],
                        }),
                      },
                    ],
                  },
                ]}
              />

              {/* Headline text: reveals upward with soft opacity fade */}
              <Animated.Text
                style={[
                  styles.heroHeadline,
                  {
                    fontSize: 32,
                    opacity: headlineOpacity,
                    transform: [{ translateY: headlineY }],
                  },
                ]}
              >
                “DRIVE SMARTER, GO FARTHER,{' '}
                <Text style={styles.highlightGreen}>NAVIGATE WITH CONFIDENCE”</Text>
              </Animated.Text>

              {/* Subheadline: fades in with 150ms delay */}
              <Animated.Text
                style={[
                  styles.heroSubheadline,
                  {
                    fontSize: 14,
                    opacity: subheadlineOpacity,
                    transform: [{ translateY: subheadlineY }],
                  },
                ]}
              >
                Empowering every journey with real-time traffic updates, hazard alerts, and essential
                stop recommendations, ensuring a smarter, safer driving experience.
              </Animated.Text>

              {/* "Start Driving" CTA: scales in with a soft, settling spring + heartbeat pulse -> leads to Auth */}
              <Animated.View
                style={{
                  opacity: ctaOpacity,
                  transform: [
                    { scale: ctaScale },
                    { scale: heroPulse },
                  ],
                }}
              >
                <TouchableOpacity
                  activeOpacity={0.88}
                  style={styles.primaryCtaBtn}
                  onPress={handleStartDriving}
                >
                  <Text style={styles.primaryCtaText}>Start Driving</Text>
                  <View style={styles.ctaArrowCircle}>
                    <Text style={styles.ctaArrowIcon}>➔</Text>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            </View>
          </ImageBackground>
        </View>

        {/* ======================================================================= */}
        {/* 2. ABOUT US SECTION (SINGLE IMAGE AUTO-CHANGES EVERY 2 SECONDS)         */}
        {/* ======================================================================= */}
        <View
          style={[styles.aboutSection, { paddingHorizontal: 20 }]}
          onLayout={(e) => {
            sectionPositions.current.about = e.nativeEvent.layout.y;
          }}
        >
          <AnimatedSection delay={100} style={styles.sectionPillWrapper}>
            <View style={styles.categoryPill}>
              <Text style={styles.categoryPillText}>About us</Text>
            </View>
          </AnimatedSection>

          <AnimatedSection delay={200} style={styles.titleWithBarRow}>
            <Text style={[styles.largeDisplayHeading, { fontSize: 36 }]}>
              Want to know{'\n'}
              <View style={styles.greenBarInline} /> about us?
            </Text>
          </AnimatedSection>

          <View style={[styles.aboutContentRow, { flexDirection: 'column' }]}>
            <AnimatedSection delay={300} style={[styles.aboutTextCol, { width: '100%' }]}>
              <Text style={styles.bodyParagraph}>
                At Arrow Drive, we’re redefining what it means to travel smart. Our platform acts as
                your <Text style={styles.tealHighlight}>intelligent roadside companion</Text>—providing
                real-time alerts for hazards like traffic, potholes, and severe weather, while guiding
                you to nearby essentials like gas stations and restaurants.
              </Text>
            </AnimatedSection>

            {/* Single Image in the Section that Automatically Changes Every 2 Seconds */}
            <View style={styles.singleImageSectionWrapper}>
              <Animated.View
                style={[
                  styles.singleImageCard,
                  {
                    opacity: imageFadeAnim,
                  },
                ]}
              >
                <Image
                  source={{ uri: aboutImages[currentImageIndex] }}
                  style={styles.aboutSingleImage}
                />
                <View style={styles.imageOverlayBadge}>
                  <Text style={styles.imageBadgeText}>Live Companion View</Text>
                </View>
              </Animated.View>

              {/* Subtle 2-second cycle dots */}
              <View style={styles.carouselDotRow}>
                {aboutImages.map((_, idx) => (
                  <View
                    key={idx}
                    style={[
                      styles.carouselDot,
                      currentImageIndex === idx && styles.carouselDotActive,
                    ]}
                  />
                ))}
              </View>
            </View>
          </View>
        </View>

        {/* ======================================================================= */}
        {/* 3. INTERACTIVE FEATURES & SIMULATED ROUTE                              */}
        {/* ======================================================================= */}
        <View
          style={styles.whiteCardContainer}
          onLayout={(e) => {
            const y = e.nativeEvent.layout.y;
            sectionPositions.current.features = y;
            setFeaturesSectionY(y);
          }}
        >
          <ScrollRevealBlock
            delay={50}
            style={styles.sectionPillWrapper}
            parentOffsetY={featuresSectionY}
            scrollOffset={scrollOffset}
            windowHeight={windowHeight}
          >
            <View style={styles.categoryPill}>
              <Text style={styles.categoryPillText}>Features</Text>
            </View>
          </ScrollRevealBlock>

          <ScrollRevealBlock
            delay={150}
            parentOffsetY={featuresSectionY}
            scrollOffset={scrollOffset}
            windowHeight={windowHeight}
          >
            <Text style={[styles.largeDisplayHeading, { fontSize: 32, paddingHorizontal: 20 }]}>
              Navigate with confidence{'\n'}using Arrow Drive <View style={styles.greenBarInline} />
              {'\n'}
              <View style={[styles.greenBarInline, { width: 140 }]} /> features
            </Text>
          </ScrollRevealBlock>

          <View style={[styles.featuresList, { paddingHorizontal: 20 }]}>
            {/* Feature 1: Slide-up on Scroll Reveal */}
            <ScrollRevealFeatureRow
              parentOffsetY={featuresSectionY}
              scrollOffset={scrollOffset}
              windowHeight={windowHeight}
              delay={50}
              style={[styles.featureRow, { flexDirection: 'column-reverse' }]}
            >
              <View style={[styles.featureTextCol, { width: '100%' }]}>
                <Text style={styles.featureTitleGreen}>Know What Lies Ahead</Text>
                <Text style={styles.bodyParagraph}>
                  Get real-time updates on your route – whether it’s regularly plied, under
                  construction, filled with bends, or blocked. Arrow Drive gives you live visibility so
                  you’re never caught off guard.
                </Text>
                <InteractiveGreenPillButton onPress={handleStartDriving} label="Get Started" />
              </View>

              <View style={[styles.featureImageCol, { width: '100%' }]}>
                <Image
                  source={{
                    uri: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=800&auto=format&fit=crop',
                  }}
                  style={styles.featureImage}
                />
              </View>
            </ScrollRevealFeatureRow>

            {/* Feature 2: Interactive SVG Route Vector Simulation (Slide-up on Scroll Reveal) */}
            <ScrollRevealFeatureRow
              parentOffsetY={featuresSectionY}
              scrollOffset={scrollOffset}
              windowHeight={windowHeight}
              delay={50}
              style={[styles.featureRow, { flexDirection: 'column' }]}
            >
              <View style={[styles.featureImageCol, { width: '100%' }]}>
                <View style={styles.interactiveRouteMapBox}>
                  <Svg width="100%" height="220" viewBox="0 0 320 220">
                    <Path
                      d="M 10 40 Q 90 90, 160 50 T 310 90"
                      stroke="#10B981"
                      strokeWidth="4"
                      fill="none"
                      strokeLinecap="round"
                    />
                    <AnimatedPath
                      d="M 30 180 C 70 140, 140 180, 200 110 S 290 60, 290 60"
                      stroke="#34D399"
                      strokeWidth="5"
                      strokeDasharray="8 6"
                      strokeDashoffset={dashAnim}
                      fill="none"
                    />
                    <Circle cx="30" cy="180" r="7" fill="#FFFFFF" />
                    <Circle cx="290" cy="60" r="10" fill="#10B981" />
                    <Circle cx="290" cy="60" r="5" fill="#FFFFFF" />
                  </Svg>
                  <View style={styles.routeTag}>
                    <Text style={styles.routeTagText}>● FASTEST PATH • 22 MIN</Text>
                  </View>
                </View>
              </View>

              <View style={[styles.featureTextCol, { width: '100%' }]}>
                <Text style={styles.featureTitleGreen}>Smarter routes, Every time</Text>
                <Text style={styles.bodyParagraph}>
                  Arrow Drive doesn’t just show you how to get there, it shows you the best way. With
                  built-in traffic analysis, potential blockages, and alternate routes, you save time
                  and avoid delay.
                </Text>
                <InteractiveGreenPillButton onPress={handleStartDriving} label="Get Started" />
              </View>
            </ScrollRevealFeatureRow>

            {/* Feature 3: Slide-up on Scroll Reveal */}
            <ScrollRevealFeatureRow
              parentOffsetY={featuresSectionY}
              scrollOffset={scrollOffset}
              windowHeight={windowHeight}
              delay={50}
              style={[styles.featureRow, { flexDirection: 'column-reverse' }]}
            >
              <View style={[styles.featureTextCol, { width: '100%' }]}>
                <Text style={styles.featureTitleGreen}>Advanced Hazard Detection</Text>
                <Text style={styles.bodyParagraph}>
                  From potholes to rainstorms, our system detects and alerts you to hazards before you
                  reach them– giving you time to slow down, reroute, or prepare accordingly.
                </Text>
                <InteractiveGreenPillButton onPress={handleStartDriving} label="Get Started" />
              </View>

              <View style={[styles.featureImageCol, { width: '100%' }]}>
                <Image
                  source={{
                    uri: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?q=80&w=800&auto=format&fit=crop',
                  }}
                  style={styles.featureImage}
                />
              </View>
            </ScrollRevealFeatureRow>
          </View>
        </View>

        {/* ======================================================================= */}
        {/* 4. HOW IT WORKS & ANIMATED STEP CONNECTORS                             */}
        {/* ======================================================================= */}
        <View
          style={[styles.howItWorksSection, { paddingHorizontal: 20 }]}
          onLayout={(e) => {
            sectionPositions.current.howItWorks = e.nativeEvent.layout.y;
          }}
        >
          <AnimatedSection style={styles.sectionPillWrapper}>
            <View style={styles.categoryPill}>
              <Text style={styles.categoryPillText}>How it works</Text>
            </View>
          </AnimatedSection>

          <Text style={[styles.largeDisplayHeading, { fontSize: 32, textAlign: 'center' }]}>
            Want to know how{'\n'}
            <View style={[styles.greenBarInline, { width: 70 }]} /> Arrow Drive{'\n'}works?{' '}
            <View style={[styles.greenBarInline, { width: 120 }]} />
          </Text>

          <View style={[styles.stepsContainer, { flexDirection: 'column' }]}>
            {/* Step 1 Card */}
            <InteractiveStepCard style={[styles.stepCardWrapper, { width: '100%' }]}>
              <ImageBackground
                source={{
                  uri: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=600&auto=format&fit=crop',
                }}
                style={styles.stepCardImage}
                imageStyle={{ borderRadius: 24 }}
              >
                <View style={styles.stepGlassBottomBar}>
                  <Text style={styles.stepBarTitle}>Enter Destination</Text>
                </View>
              </ImageBackground>
            </InteractiveStepCard>

            {/* Animated Connector Arrow with forward momentum breathing glow */}
            <PulsingStepConnector />

            {/* Step 2 Card */}
            <InteractiveStepCard style={[styles.stepCardWrapper, { width: '100%' }]}>
              <ImageBackground
                source={{
                  uri: 'https://images.unsplash.com/photo-1508962914676-134849a727f0?q=80&w=600&auto=format&fit=crop',
                }}
                style={styles.stepCardImage}
                imageStyle={{ borderRadius: 24 }}
              >
                <View style={styles.stepGlassBottomBar}>
                  <Text style={styles.stepBarTitle}>Get Smart Route Suggestions</Text>
                </View>
              </ImageBackground>
            </InteractiveStepCard>

            {/* Animated Connector Arrow with forward momentum breathing glow */}
            <PulsingStepConnector />

            {/* Step 3 Card */}
            <InteractiveStepCard style={[styles.stepCardWrapper, { width: '100%' }]}>
              <ImageBackground
                source={{
                  uri: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=600&auto=format&fit=crop',
                }}
                style={styles.stepCardImage}
                imageStyle={{ borderRadius: 24 }}
              >
                <View style={styles.stepGlassBottomBar}>
                  <Text style={styles.stepBarTitle}>Drive With Confidence</Text>
                </View>
              </ImageBackground>
            </InteractiveStepCard>
          </View>

          <View style={styles.centerButtonWrapper}>
            <TouchableOpacity style={styles.primaryCtaBtn} onPress={handleStartDriving}>
              <Text style={styles.primaryCtaText}>Start Driving</Text>
              <View style={styles.ctaArrowCircle}>
                <Text style={styles.ctaArrowIcon}>➔</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* ======================================================================= */}
        {/* 5. TESLA BANNER & INTERACTIVE NEWSLETTER INPUT                         */}
        {/* ======================================================================= */}
        <View style={[styles.newsletterSection, { paddingHorizontal: 16 }]}>
          <ImageBackground
            source={{
              uri: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1600&auto=format&fit=crop',
            }}
            style={styles.teslaBanner}
            imageStyle={{ borderRadius: 28 }}
          >
            <View style={styles.bannerDarkOverlay} />
            <Text style={[styles.bannerHeading, { fontSize: 26 }]}>
              Plan better journeys with zero guesswork
            </Text>

            {/* Glassmorphism input pill with subtle emerald border glow when active */}
            <Animated.View
              style={[
                styles.newsletterPill,
                {
                  width: '92%',
                  borderColor: inputBorderColor,
                  backgroundColor: inputBgColor,
                  shadowColor: '#10B981',
                  shadowOpacity: isInputFocused ? 0.45 : 0,
                  shadowRadius: 14,
                  elevation: isInputFocused ? 8 : 0,
                },
              ]}
            >
              <TextInput
                placeholder="Your email address..."
                placeholderTextColor="rgba(255, 255, 255, 0.7)"
                value={email}
                onChangeText={setEmail}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
                style={styles.newsletterInput}
                autoCapitalize="none"
                keyboardType="email-address"
              />

              {/* Tactile press feedback and confirmation transition */}
              <Animated.View style={{ transform: [{ scale: subscribeBtnScale }] }}>
                <TouchableOpacity
                  activeOpacity={0.85}
                  style={[
                    styles.subscribeBtn,
                    subscribed && styles.subscribeBtnActive,
                  ]}
                  onPress={handleSubscribe}
                >
                  <Text
                    style={[
                      styles.subscribeBtnText,
                      subscribed && styles.subscribeBtnTextActive,
                    ]}
                  >
                    {subscribed ? '✓ Joined!' : 'Subscribe'}
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            </Animated.View>
          </ImageBackground>
        </View>

        {/* ======================================================================= */}
        {/* 6. EMERALD BRAND FOOTER                                                */}
        {/* ======================================================================= */}
        <View style={styles.footerContainer}>
          <View style={[styles.footerColumnsRow, { flexDirection: 'column', paddingHorizontal: 24 }]}>
            <View style={[styles.footerBrandCol, { width: '100%' }]}>
              <Text style={styles.footerBrandName}>ArrowDrive</Text>
              <Text style={styles.footerBrandDescription}>
                Changing The Game In Transportation With Real-time Update On Routes, Using Developed
                Mapping Technologies, Shaping The Future Of Transportation.
              </Text>
              <Text style={styles.copyrightText}>@Copyright 2026 Arrow Drive</Text>
            </View>

            <View style={[styles.footerLinksWrapper, { width: '100%', flexWrap: 'wrap' }]}>
              <View style={styles.footerLinkCol}>
                <Text style={styles.footerColTitle}>COMPANY</Text>
                <TouchableOpacity onPress={() => handleScrollToSection('features')}>
                  <Text style={styles.footerLinkItem}>Features</Text>
                </TouchableOpacity>
                <Text style={styles.footerLinkItem}>Pricing</Text>
                <TouchableOpacity onPress={() => handleScrollToSection('about')}>
                  <Text style={styles.footerLinkItem}>About Us</Text>
                </TouchableOpacity>
                <Text style={styles.footerLinkItem}>Contact</Text>
              </View>
              <View style={styles.footerLinkCol}>
                <Text style={styles.footerColTitle}>RESOURCES</Text>
                <Text style={styles.footerLinkItem}>Blog</Text>
                <Text style={styles.footerLinkItem}>Customer</Text>
                <Text style={styles.footerLinkItem}>Information</Text>
                <Text style={styles.footerLinkItem}>Legal</Text>
              </View>
              <View style={styles.footerLinkCol}>
                <Text style={styles.footerColTitle}>CAREER</Text>
                <Text style={styles.footerLinkItem}>Positions</Text>
                <Text style={styles.footerLinkItem}>Internships</Text>
                <Text style={styles.footerLinkItem}>Culture</Text>
              </View>
              <View style={styles.footerLinkCol}>
                <Text style={styles.footerColTitle}>HELP</Text>
                <Text style={styles.footerLinkItem}>FAQ</Text>
                <Text style={styles.footerLinkItem}>Support Hub</Text>
                <Text style={styles.footerLinkItem}>Contact Us</Text>
              </View>
            </View>
          </View>

          <View style={styles.bigFooterTextContainer}>
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              style={[styles.massiveBrandText, { fontSize: 64 }]}
            >
              Arrow Drive
            </Text>
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  );
}

// ============================================================================
// STYLES
// ============================================================================

const styles = StyleSheet.create({
  outerScreenContainer: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    position: 'relative',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },

  // Sticky Frosted Header
  stickyHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 16,
    elevation: 8,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 48 : 16,
    paddingBottom: 14,
    // @ts-ignore
    ...Platform.select({
      web: {
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
      },
    }),
  },
  headerInnerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  logoPillButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.28)',
  },
  logoPill: {
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 0.4,
  },

  // Overlay Menu Styles
  overlayBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(2, 14, 10, 0.95)',
    justifyContent: 'flex-start',
    paddingTop: Platform.OS === 'ios' ? 44 : 20,
    paddingHorizontal: 20,
    // @ts-ignore
    ...Platform.select({
      web: {
        backdropFilter: 'blur(22px)',
        WebkitBackdropFilter: 'blur(22px)',
      },
    }),
  },
  overlayContainer: {
    flex: 1,
    paddingBottom: 30,
    justifyContent: 'space-between',
  },
  overlayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  closeBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  overlayCategoryTitle: {
    color: '#10B981',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginTop: 28,
    marginBottom: 16,
  },
  overlayLinksContainer: {
    gap: 12,
  },
  overlayNavItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  navItemIconBox: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
  },
  navItemSymbol: {
    color: '#10B981',
    fontSize: 18,
    fontWeight: '900',
  },
  navItemTextBox: {
    flex: 1,
  },
  overlayNavText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  overlayNavSub: {
    color: '#A7F3D0',
    fontSize: 12,
    marginTop: 2,
  },
  navItemArrow: {
    color: '#10B981',
    fontSize: 16,
    fontWeight: '900',
  },
  overlayCtaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00E676',
    borderRadius: 30,
    height: 56,
    shadowColor: '#00E676',
    shadowOpacity: 0.45,
    shadowRadius: 16,
    elevation: 8,
  },
  overlayCtaText: {
    color: '#02120C',
    fontSize: 17,
    fontWeight: '900',
    marginRight: 12,
  },

  // Hero & Cockpit Scanner
  heroWrapper: {
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
  },
  heroBackground: {
    flex: 1,
    justifyContent: 'space-between',
  },
  heroDarkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(5, 12, 10, 0.72)',
  },
  scanBeam: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 12,
    backgroundColor: 'rgba(16, 185, 129, 0.25)',
    borderBottomWidth: 2,
    borderBottomColor: '#10B981',
    zIndex: 2,
  },
  heroContent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 60,
    position: 'relative',
  },
  radarPing: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 2,
    borderColor: '#10B981',
    top: -20,
  },
  heroHeadline: {
    fontWeight: '900',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 44,
    marginBottom: 16,
  },
  highlightGreen: {
    color: '#10B981',
  },
  heroSubheadline: {
    color: 'rgba(255, 255, 255, 0.88)',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 30,
  },
  primaryCtaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00E676',
    paddingLeft: 28,
    paddingRight: 8,
    paddingVertical: 8,
    borderRadius: 40,
    shadowColor: '#00E676',
    shadowOpacity: 0.45,
    shadowRadius: 18,
    elevation: 8,
  },
  primaryCtaText: {
    color: '#031E15',
    fontSize: 16,
    fontWeight: '800',
    marginRight: 14,
  },
  ctaArrowCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#031E15',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ctaArrowIcon: {
    color: '#00E676',
    fontSize: 14,
    fontWeight: '900',
  },

  // About Us Section
  aboutSection: {
    backgroundColor: '#EEF2F0',
    paddingVertical: 56,
  },
  sectionPillWrapper: {
    alignItems: 'center',
    marginBottom: 18,
  },
  categoryPill: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  categoryPillText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#374151',
  },
  titleWithBarRow: {
    alignItems: 'center',
    marginBottom: 36,
  },
  largeDisplayHeading: {
    fontWeight: '900',
    color: '#000000',
    textAlign: 'center',
    lineHeight: 48,
  },
  greenBarInline: {
    width: 80,
    height: 18,
    backgroundColor: '#045A38',
    borderRadius: 10,
    marginHorizontal: 8,
  },
  aboutContentRow: {
    alignItems: 'center',
  },
  aboutTextCol: {
    marginBottom: 24,
  },
  bodyParagraph: {
    fontSize: 15,
    lineHeight: 24,
    color: '#374151',
    marginBottom: 20,
  },
  tealHighlight: {
    color: '#10B981',
    fontWeight: '700',
  },

  // Single Image with 2-second auto change
  singleImageSectionWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  singleImageCard: {
    width: '100%',
    height: 320,
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 6,
    position: 'relative',
    backgroundColor: '#042C20',
  },
  aboutSingleImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageOverlayBadge: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    backgroundColor: 'rgba(2, 18, 12, 0.75)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.4)',
  },
  imageBadgeText: {
    color: '#A7F3D0',
    fontSize: 12,
    fontWeight: '700',
  },
  carouselDotRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 16,
  },
  carouselDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D1D5DB',
  },
  carouselDotActive: {
    width: 24,
    backgroundColor: '#045A38',
    borderRadius: 4,
  },

  // Features Section
  whiteCardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 36,
    paddingVertical: 56,
    marginTop: -20,
  },
  featuresList: {
    marginTop: 36,
  },
  featureRow: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 56,
  },
  featureHalfCol: {
    width: '100%',
    paddingVertical: 10,
  },
  featureTextCol: {
    paddingVertical: 10,
  },
  featureImageCol: {
    paddingVertical: 10,
  },
  featureTitleGreen: {
    fontSize: 26,
    fontWeight: '800',
    color: '#064E3B',
    marginBottom: 14,
  },
  featureImage: {
    width: '100%',
    height: 230,
    borderRadius: 24,
    resizeMode: 'cover',
  },
  interactiveRouteMapBox: {
    width: '100%',
    height: 230,
    backgroundColor: '#03120E',
    borderRadius: 24,
    padding: 16,
    justifyContent: 'space-between',
  },
  routeTag: {
    alignSelf: 'flex-start',
    backgroundColor: '#042C20',
    borderColor: '#10B981',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  routeTagText: {
    color: '#10B981',
    fontSize: 11,
    fontWeight: '800',
  },
  greenPillButton: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00E676',
    paddingLeft: 18,
    paddingRight: 6,
    paddingVertical: 6,
    borderRadius: 24,
    shadowColor: '#00E676',
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 4,
  },
  greenPillButtonText: {
    color: '#031E15',
    fontSize: 13,
    fontWeight: '800',
    marginRight: 10,
  },
  pillIconSmall: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#031E15',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pillIconText: {
    color: '#00E676',
    fontSize: 11,
    fontWeight: '900',
  },

  // Steps / How It Works
  howItWorksSection: {
    backgroundColor: '#EEF2F0',
    paddingVertical: 56,
  },
  stepsContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 36,
  },
  stepCardWrapper: {
    height: 260,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 4,
  },
  stepCardImage: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 14,
  },
  stepGlassBottomBar: {
    backgroundColor: 'rgba(255, 255, 255, 0.68)',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 12,
    alignItems: 'center',
    // @ts-ignore
    ...Platform.select({
      web: {
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      },
    }),
  },
  stepBarTitle: {
    color: '#111827',
    fontSize: 14,
    fontWeight: '800',
    textAlign: 'center',
  },
  stepConnectorCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 12,
    shadowColor: '#10B981',
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 5,
  },
  stepConnectorArrow: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
  },
  centerButtonWrapper: {
    alignItems: 'center',
    marginTop: 16,
  },

  // Tesla Newsletter Banner
  newsletterSection: {
    backgroundColor: '#EEF2F0',
    paddingBottom: 56,
  },
  teslaBanner: {
    height: 360,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  bannerDarkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.52)',
    borderRadius: 28,
  },
  bannerHeading: {
    color: '#FFFFFF',
    fontWeight: '900',
    textAlign: 'center',
    maxWidth: 620,
    marginBottom: 28,
    paddingHorizontal: 20,
    lineHeight: 34,
  },
  newsletterPill: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 36,
    padding: 6,
    borderWidth: 1.5,
    // @ts-ignore
    ...Platform.select({
      web: {
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      },
    }),
  },
  newsletterInput: {
    flex: 1,
    paddingHorizontal: 16,
    color: '#FFFFFF',
    fontSize: 14,
    outlineWidth: 0,
  },
  subscribeBtn: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 11,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  subscribeBtnActive: {
    backgroundColor: '#10B981',
  },
  subscribeBtnText: {
    color: '#042C20',
    fontSize: 13,
    fontWeight: '800',
  },
  subscribeBtnTextActive: {
    color: '#FFFFFF',
  },

  // Footer
  footerContainer: {
    backgroundColor: '#043825',
    paddingTop: 56,
  },
  footerColumnsRow: {
    justifyContent: 'space-between',
    marginBottom: 48,
  },
  footerBrandCol: {
    marginBottom: 28,
  },
  footerBrandName: {
    color: '#00E676',
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 14,
  },
  footerBrandDescription: {
    color: '#A7F3D0',
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 20,
  },
  copyrightText: {
    color: '#6EE7B7',
    fontSize: 12,
    fontWeight: '600',
  },
  footerLinksWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  footerLinkCol: {
    minWidth: 80,
    marginBottom: 20,
  },
  footerColTitle: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 14,
  },
  footerLinkItem: {
    color: '#A7F3D0',
    fontSize: 13,
    marginBottom: 10,
    fontWeight: '500',
  },
  bigFooterTextContainer: {
    alignItems: 'center',
    overflow: 'hidden',
    paddingBottom: 20,
  },
  massiveBrandText: {
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -2,
  },
});