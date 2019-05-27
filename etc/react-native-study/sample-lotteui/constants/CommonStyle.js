import { Platform, StyleSheet } from 'react-native';

const APPBAR_HEIGHT = Platform.select({
  ios: 44,
  android: 56,
  default: 64,
});

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    marginTop: APPBAR_HEIGHT,
    alignItems: 'center',
  },
});
