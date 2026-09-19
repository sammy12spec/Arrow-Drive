import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  Animated,
  Easing,
} from 'react-native';
import Svg, { Rect, Circle, Path, Text as SvgText } from 'react-native-svg';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

type AuthViewMode = 'signup' | 'signin' | 'forgot' | 'verify' | 'reset';

export default function AuthScreen() {
  const [viewMode, setViewMode] = useState<AuthViewMode>('signup');

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // 4-Digit OTP Code State
  const [otp, setOtp] = useState(['', '', '', '']);
  const otpInputs = useRef<Array<any>>([]);

  // Animation values: Image slides in from the top, field section comes from the down and meet
  const topSlideAnim = useRef(new Animated.Value(-120)).current;
  const bottomSlideAnim = useRef(new Animated.Value(140)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Reset values for entrance transition
    topSlideAnim.setValue(-120);
    bottomSlideAnim.setValue(140);
    fadeAnim.setValue(0);

    Animated.parallel([
      Animated.timing(topSlideAnim, {
        toValue: 0,
        duration: 650,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(bottomSlideAnim, {
        toValue: 0,
        duration: 650,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 550,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, [viewMode]);

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input if value entered
    if (value && index < 3) {
      otpInputs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputs.current[index - 1]?.focus();
    }
  };

  const handleCompleteAuth = () => {
    router.replace('/(tabs)');
  };

  const handleBack = () => {
    if (viewMode === 'reset') {
      setViewMode('verify');
    } else if (viewMode === 'verify') {
      setViewMode('forgot');
    } else if (viewMode === 'forgot') {
      setViewMode('signin');
    } else if (viewMode === 'signin') {
      setViewMode('signup');
    } else {
      router.replace('/');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardContainer}
      >
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {/* ================================================================= */}
          {/* 1. TOP BANNER IMAGE (SLIDES IN FROM THE TOP)                      */}
          {/* ================================================================= */}
          {(viewMode === 'signup' || viewMode === 'signin') && (
            <Animated.View
              style={[
                styles.topImageWrapper,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: topSlideAnim }],
                },
              ]}
            >
              <Image
                source={require('@/assets/images/auth-car-highway.jpg')}
                style={styles.heroCarImage}
              />
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.floatingBackButton}
                onPress={() => router.replace('/')}
              >
                <MaterialIcons name="arrow-back" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </Animated.View>
          )}

          {/* TOP HEADER FOR FORGOT PASSWORD, VERIFY EMAIL & RESET PASSWORD */}
          {(viewMode === 'forgot' || viewMode === 'verify' || viewMode === 'reset') && (
            <Animated.View
              style={[
                styles.topHeaderBar,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: topSlideAnim }],
                },
              ]}
            >
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.headerBackArrow}
                onPress={handleBack}
              >
                <MaterialIcons name="arrow-back" size={24} color="#000000" />
              </TouchableOpacity>
              <Text style={styles.headerBarTitle}>
                {viewMode === 'forgot'
                  ? 'Forgot Password'
                  : viewMode === 'verify'
                  ? 'Verify Your Email'
                  : 'Create New Password'}
              </Text>
              <View style={{ width: 24 }} />
            </Animated.View>
          )}

          {/* ================================================================= */}
          {/* 2. FIELD SECTION (SLIDES IN FROM THE DOWN)                        */}
          {/* ================================================================= */}

          {/* VIEW: CREATE AN ACCOUNT (SIGN UP - MATCHING DESIGN SCREENSHOT)    */}
          {viewMode === 'signup' && (
            <Animated.View
              style={[
                styles.formContent,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: bottomSlideAnim }],
                },
              ]}
            >
              <Text style={styles.formTitle}>Create an account</Text>
              <Text style={styles.formSubtitle}>Sign up now and unlock access to travel smart</Text>

              {/* 1. Your name */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Your name</Text>
                <TextInput
                  style={styles.inputField}
                  placeholder="Input your name"
                  placeholderTextColor="#8E8E93"
                  value={name}
                  onChangeText={setName}
                />
              </View>

              {/* 2. Email address */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Email address</Text>
                <TextInput
                  style={styles.inputField}
                  placeholder="your@email.com"
                  placeholderTextColor="#8E8E93"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              {/* 3. Username */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Username</Text>
                <TextInput
                  style={styles.inputField}
                  placeholder="Input your preferred username"
                  placeholderTextColor="#8E8E93"
                  value={username}
                  onChangeText={setUsername}
                  autoCapitalize="none"
                />
              </View>

              {/* 4. Password */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Password</Text>
                <TextInput
                  style={styles.inputField}
                  placeholder="••••••••"
                  placeholderTextColor="#8E8E93"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>

              {/* Terms Checkbox */}
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.checkboxRow}
                onPress={() => setAgreedToTerms(!agreedToTerms)}
              >
                <View style={[styles.checkboxBox, agreedToTerms && styles.checkboxBoxChecked]}>
                  {agreedToTerms && <MaterialIcons name="check" size={14} color="#FFFFFF" />}
                </View>
                <Text style={styles.checkboxText}>
                  I agree with <Text style={styles.underlineLink}>Terms</Text> and{' '}
                  <Text style={styles.underlineLink}>Privacy Policy</Text>
                </Text>
              </TouchableOpacity>

              {/* Sign up Button */}
              <TouchableOpacity
                activeOpacity={0.88}
                style={styles.primaryActionButton}
                onPress={handleCompleteAuth}
              >
                <Text style={styles.primaryButtonText}>Sign up</Text>
              </TouchableOpacity>

              {/* Switch to Sign in */}
              <View style={styles.switchAuthRow}>
                <Text style={styles.switchAuthPrompt}>Already have an account? </Text>
                <TouchableOpacity onPress={() => setViewMode('signin')}>
                  <Text style={styles.switchAuthAction}>Sign in</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          )}

          {/* VIEW: WELCOME BACK (SIGN IN) */}
          {viewMode === 'signin' && (
            <Animated.View
              style={[
                styles.formContent,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: bottomSlideAnim }],
                },
              ]}
            >
              <Text style={styles.formTitle}>Welcome back!</Text>
              <Text style={styles.formSubtitle}>Sign in and pick up where you left off</Text>

              {/* Email address */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Email address</Text>
                <TextInput
                  style={styles.inputField}
                  placeholder="your@email.com"
                  placeholderTextColor="#8E8E93"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              {/* Password */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Password</Text>
                <TextInput
                  style={styles.inputField}
                  placeholder="••••••••"
                  placeholderTextColor="#8E8E93"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>

              {/* Forgot password link */}
              <TouchableOpacity
                style={styles.forgotPasswordRow}
                onPress={() => setViewMode('forgot')}
              >
                <Text style={styles.forgotPasswordText}>Forgot password</Text>
              </TouchableOpacity>

              {/* Sign in Button */}
              <TouchableOpacity
                activeOpacity={0.88}
                style={styles.primaryActionButton}
                onPress={handleCompleteAuth}
              >
                <Text style={styles.primaryButtonText}>Sign in</Text>
              </TouchableOpacity>

              {/* Switch to Sign up */}
              <View style={styles.switchAuthRow}>
                <Text style={styles.switchAuthPrompt}>Don't have an account? </Text>
                <TouchableOpacity onPress={() => setViewMode('signup')}>
                  <Text style={styles.switchAuthAction}>Sign up</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          )}

          {/* VIEW: FORGOT PASSWORD */}
          {viewMode === 'forgot' && (
            <Animated.View
              style={[
                styles.subPageContent,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: bottomSlideAnim }],
                },
              ]}
            >
              {/* Lock with ? illustration */}
              <View style={styles.illustrationCircle}>
                <Svg width="110" height="110" viewBox="0 0 100 100">
                  <Path
                    d="M 32 45 V 30 C 32 20, 40 12, 50 12 C 60 12, 68 20, 68 30 V 45"
                    stroke="#044E32"
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <Rect
                    x="24"
                    y="42"
                    width="52"
                    height="42"
                    rx="8"
                    fill="#3F8265"
                    stroke="#044E32"
                    strokeWidth="6"
                  />
                  <Circle cx="37" cy="58" r="3" fill="#044E32" />
                  <Circle cx="50" cy="58" r="3" fill="#044E32" />
                  <Circle cx="63" cy="58" r="3" fill="#044E32" />
                  <Circle cx="72" cy="72" r="14" fill="#FFFFFF" stroke="#044E32" strokeWidth="4" />
                  <Path
                    d="M 68 67 C 68 64, 71 63, 73 63 C 75 63, 77 64, 77 66 C 77 68, 75 69, 73 71 V 73 M 73 76 V 77"
                    stroke="#044E32"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                  />
                </Svg>
              </View>

              <Text style={styles.instructionHeading}>
                Please Enter Your Email Address To Receive a Verification Code
              </Text>

              {/* Email address */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Email address</Text>
                <TextInput
                  style={styles.inputField}
                  placeholder="youremail321@gmail.com"
                  placeholderTextColor="#8E8E93"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              {/* Send Button */}
              <TouchableOpacity
                activeOpacity={0.88}
                style={[styles.primaryActionButton, { marginTop: 40 }]}
                onPress={() => setViewMode('verify')}
              >
                <Text style={styles.primaryButtonText}>Send</Text>
              </TouchableOpacity>
            </Animated.View>
          )}

          {/* VIEW: VERIFY YOUR EMAIL */}
          {viewMode === 'verify' && (
            <Animated.View
              style={[
                styles.subPageContent,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: bottomSlideAnim }],
                },
              ]}
            >
              {/* Envelope with @ illustration */}
              <View style={styles.illustrationCircle}>
                <Svg width="110" height="110" viewBox="0 0 100 100">
                  <Path
                    d="M 22 48 L 50 26 L 78 48 Z"
                    fill="#2E7D59"
                    stroke="#044E32"
                    strokeWidth="4"
                    strokeLinejoin="round"
                  />
                  <Rect
                    x="29"
                    y="24"
                    width="42"
                    height="38"
                    rx="4"
                    fill="#FFFFFF"
                    stroke="#044E32"
                    strokeWidth="4"
                  />
                  <SvgText
                    x="50"
                    y="50"
                    fontSize="24"
                    fontWeight="bold"
                    fill="#044E32"
                    textAnchor="middle"
                  >
                    @
                  </SvgText>
                  <Path
                    d="M 22 46 L 50 66 L 78 46 V 78 H 22 Z"
                    fill="#3F8265"
                    stroke="#044E32"
                    strokeWidth="5"
                    strokeLinejoin="round"
                  />
                  <Path d="M 22 78 L 44 58" stroke="#044E32" strokeWidth="4" strokeLinecap="round" />
                  <Path d="M 78 78 L 56 58" stroke="#044E32" strokeWidth="4" strokeLinecap="round" />
                  <Path
                    d="M 22 46 L 50 66 L 78 46"
                    stroke="#044E32"
                    strokeWidth="4"
                    fill="none"
                    strokeLinejoin="round"
                  />
                </Svg>
              </View>

              <Text style={styles.instructionHeading}>
                Please Enter The 4 Digit Code Sent To{'\n'}
                {email || 'youremail321@gmail.com'}
              </Text>

              {/* 4-Digit OTP Boxes */}
              <View style={styles.otpRow}>
                {[0, 1, 2, 3].map((index) => (
                  <TextInput
                    key={index}
                    ref={(ref) => {
                      otpInputs.current[index] = ref;
                    }}
                    style={styles.otpBox}
                    keyboardType="number-pad"
                    maxLength={1}
                    value={otp[index]}
                    onChangeText={(val) => handleOtpChange(val, index)}
                    onKeyPress={(e) => handleOtpKeyPress(e, index)}
                  />
                ))}
              </View>

              {/* Resend Code Link */}
              <TouchableOpacity
                activeOpacity={0.75}
                style={styles.resendCodeRow}
                onPress={() => setOtp(['', '', '', ''])}
              >
                <Text style={styles.resendCodeText}>Resend Code</Text>
              </TouchableOpacity>

              {/* Verify Button */}
              <TouchableOpacity
                activeOpacity={0.88}
                style={[styles.primaryActionButton, { marginTop: 24 }]}
                onPress={() => setViewMode('reset')}
              >
                <Text style={styles.primaryButtonText}>Verify</Text>
              </TouchableOpacity>
            </Animated.View>
          )}

          {/* VIEW: CREATE NEW PASSWORD */}
          {viewMode === 'reset' && (
            <Animated.View
              style={[
                styles.subPageContent,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: bottomSlideAnim }],
                },
              ]}
            >
              {/* Lock with checkmark illustration */}
              <View style={styles.illustrationCircle}>
                <Svg width="110" height="110" viewBox="0 0 100 100">
                  <Path
                    d="M 32 45 V 30 C 32 20, 40 12, 50 12 C 60 12, 68 20, 68 30 V 45"
                    stroke="#044E32"
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <Rect
                    x="24"
                    y="42"
                    width="52"
                    height="42"
                    rx="8"
                    fill="#3F8265"
                    stroke="#044E32"
                    strokeWidth="6"
                  />
                  <Circle cx="37" cy="58" r="3" fill="#044E32" />
                  <Circle cx="50" cy="58" r="3" fill="#044E32" />
                  <Circle cx="63" cy="58" r="3" fill="#044E32" />
                  <Circle cx="72" cy="72" r="14" fill="#FFFFFF" stroke="#044E32" strokeWidth="4" />
                  <Path
                    d="M 66 72 L 70 76 L 78 68"
                    stroke="#044E32"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </Svg>
              </View>

              <Text style={styles.instructionHeading}>
                Your New Password Must Be Different from Previously Used Password
              </Text>

              {/* New Password */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>New Password</Text>
                <TextInput
                  style={styles.inputField}
                  placeholder="••••••••"
                  placeholderTextColor="#8E8E93"
                  value={newPassword}
                  onChangeText={setNewPassword}
                  secureTextEntry
                />
              </View>

              {/* Confirm Password */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Confirm Password</Text>
                <TextInput
                  style={styles.inputField}
                  placeholder="••••••••"
                  placeholderTextColor="#8E8E93"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                />
              </View>

              {/* Save Button */}
              <TouchableOpacity
                activeOpacity={0.88}
                style={[styles.primaryActionButton, { marginTop: 40 }]}
                onPress={handleCompleteAuth}
              >
                <Text style={styles.primaryButtonText}>Save</Text>
              </TouchableOpacity>
            </Animated.View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingBottom: 40,
  },

  // 1. Top Image Banner (Slides in from the top)
  topImageWrapper: {
    width: '100%',
    height: 240,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#031810',
  },
  heroCarImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  floatingBackButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 16 : 16,
    left: 16,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },

  // Top Header Bar for Sub-pages
  topHeaderBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 12 : 20,
    paddingBottom: 16,
  },
  headerBackArrow: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerBarTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
    textAlign: 'center',
  },

  // 2. Form Content (Slides in from the down)
  formContent: {
    paddingHorizontal: 22,
    paddingTop: 24,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#000000',
    letterSpacing: -0.5,
    marginBottom: 6,
  },
  formSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 6,
  },
  inputField: {
    backgroundColor: '#EBE8E8',
    borderRadius: 12,
    height: 48,
    paddingHorizontal: 16,
    fontSize: 14,
    color: '#111827',
    outlineWidth: 0,
  },

  // Checkbox
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 20,
  },
  checkboxBox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#6B7280',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    backgroundColor: '#FFFFFF',
  },
  checkboxBoxChecked: {
    backgroundColor: '#044E32',
    borderColor: '#044E32',
  },
  checkboxText: {
    fontSize: 12,
    color: '#374151',
    fontWeight: '500',
  },
  underlineLink: {
    textDecorationLine: 'underline',
    fontWeight: '600',
    color: '#111827',
  },

  // Forgot password text link
  forgotPasswordRow: {
    alignSelf: 'flex-end',
    marginTop: 4,
    marginBottom: 22,
  },
  forgotPasswordText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#044E32',
  },

  // Primary Action Button (Green Pill matching design)
  primaryActionButton: {
    backgroundColor: '#044E32',
    borderRadius: 28,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
    marginBottom: 20,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  // Switch Auth Row
  switchAuthRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  switchAuthPrompt: {
    fontSize: 13,
    color: '#374151',
  },
  switchAuthAction: {
    fontSize: 13,
    fontWeight: '700',
    color: '#044E32',
  },

  // Sub-pages (Forgot, Verify & Reset)
  subPageContent: {
    paddingHorizontal: 22,
    paddingTop: 16,
  },
  illustrationCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#E8F5E9',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  instructionHeading: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 16,
    marginBottom: 24,
  },

  // 4-Digit OTP Boxes
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 14,
    marginBottom: 20,
  },
  otpBox: {
    width: 54,
    height: 54,
    borderRadius: 12,
    backgroundColor: '#EBE8E8',
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '800',
    color: '#111827',
    outlineWidth: 0,
  },
  resendCodeRow: {
    alignSelf: 'center',
    marginBottom: 36,
  },
  resendCodeText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#044E32',
    textDecorationLine: 'underline',
  },
});
