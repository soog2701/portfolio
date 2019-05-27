import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default class TermsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: null,
  });
  render() {
    return (
      <View>
        <Text>TermsScreen</Text>
      </View>
    );
  }
}
