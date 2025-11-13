import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
  Animated,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import OrfiqIcon from '../components/OrfiqIcon';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const passwordRef = useRef<TextInput>(null);
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    const show = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
    const hide = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));
    return () => { show.remove(); hide.remove(); };
  }, []);

  const handleLogin = () => {
    if (!email || !password) return;
    router.push('/home');
  };

  return (
    <KeyboardAvoidingView
      style={styles.kav}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* ---- ORFIQ ICON + WELCOME TEXT (slides down when keyboard appears) ---- */}
        <Animated.View
          style={[
            styles.header,
            { transform: [{ translateY: keyboardVisible ? 60 : 0 }] },
          ]}
        >
          <OrfiqIcon width={100} height={30} />
          <Text style={styles.subtitle}>Welcome back</Text>
          <Text style={styles.sub}>Your learning journey continues here.</Text>
        </Animated.View>

        {/* ---- FORM (matches screenshot spacing & text) ---- */}
        <View style={styles.form}>
          {/* Email */}
          <View style={styles.row}>
            <TextInput
              style={styles.input}
              placeholder="Enter Your Email"
              placeholderTextColor="#9ca3af"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              returnKeyType="next"
              onSubmitEditing={() => passwordRef.current?.focus()}
              blurOnSubmit={false}
            />
          </View>

          {/* Password */}
          <View style={styles.row}>
            <View style={styles.passwordWrap}>
              <TextInput
                ref={passwordRef}
                style={styles.input}
                placeholder="Enter Your Password"
                placeholderTextColor="#9ca3af"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                returnKeyType="done"
                onSubmitEditing={handleLogin}
              />
              <TouchableOpacity
                style={styles.eye}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? 'eye-off' : 'eye'}
                  size={22}
                  color="#6b7280"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Forgot */}
          <TouchableOpacity style={styles.forgotBtn}>
            <Text style={styles.forgotTxt}>Forgot password?</Text>
          </TouchableOpacity>

          {/* Login */}
          <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
            <Text style={styles.loginTxt}>Login</Text>
          </TouchableOpacity>

          {/* Terms */}
          <Text style={styles.terms}>
            By logging in, you agree to{' '}
            <Text style={styles.link}>Terms & Conditions</Text>
          </Text>
        </View>

        {/* Back to Landing */}
        <TouchableOpacity 
          style={styles.back} 
          onPress={() => router.back()}
        >
          <Text style={styles.backTxt}>Back to Landing</Text>
        </TouchableOpacity>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

/* ---------------- Styles (screenshot match) ---------------- */
const styles = StyleSheet.create({
  kav: { flex: 1, backgroundColor: '#fff' },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingBottom: 40,
  },
  header: { 
    alignItems: 'center', 
    marginBottom: 40,
  },
  subtitle: { 
    fontSize: 24, 
    fontWeight: '600', 
    color: '#111', 
    marginTop: 16,
    marginBottom: 4,
  },
  sub: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  form: { marginBottom: 24 },
  row: { marginBottom: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  passwordWrap: { position: 'relative' },
  eye: { position: 'absolute', right: 16, top: 16 },
  forgotBtn: { alignSelf: 'flex-end', marginBottom: 12 },
  forgotTxt: { color: '#3b82f6', fontSize: 14 },
  loginBtn: {
    backgroundColor: '#3b82f6',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  loginTxt: { color: '#fff', fontSize: 16, fontWeight: '600' },
  terms: {
    textAlign: 'center',
    fontSize: 12,
    color: '#6b7280',
    marginTop: 16,
  },
  link: { color: '#3b82f6' },
  back: { marginTop: 24, alignItems: 'center' },
  backTxt: { color: '#9ca3af', fontSize: 14 },
});