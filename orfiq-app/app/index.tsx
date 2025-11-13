import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  Animated,
} from 'react-native';
import { useRouter } from 'expo-router';
import OrfiqIcon from './components/OrfiqIcon';

export default function LandingPage() {
  const router = useRouter();
  const fade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fade, { toValue: 1, useNativeDriver: true, duration: 700 }).start();
    const t = setTimeout(() => router.replace('/auth/loginpage'), 8000);
    return () => clearTimeout(t);
  }, []);

  const last = useRef(0);
  const onTap = () => {
    const now = Date.now();
    if (now - last.current < 300) router.replace('/auth/loginpage');
    last.current = now;
  };

  return (
    <TouchableWithoutFeedback onPress={onTap}>
      <View style={styles.screen}>
        <Animated.View style={[styles.card, { opacity: fade }]}>
          <OrfiqIcon width={120} height={36} />
          <Text style={styles.title}>ORFIG APP</Text>
          <Text style={styles.sub}>Welcome to our application</Text>
        </Animated.View>

        <Animated.Text style={[styles.hint, { opacity: fade }]}>
          Double tap anywhere to proceed
        </Animated.Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: { 
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: '#fff',
    marginTop: 20,
  },
  sub: {
    fontSize: 18,
    color: '#fff',
    marginTop: 8,
  },
  hint: {
    position: 'absolute',
    bottom: 50,
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
  },
});