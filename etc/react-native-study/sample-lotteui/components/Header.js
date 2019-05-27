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

import { Header, Icon, Button } from 'react-native-elements';
import Color from './../constants/Colors';

export default class IotHeader extends React.Component {
  render() {
    return (
      <Header
        placement="left"
        leftComponent={{ icon: 'menu', color: '#fff' }}
        centerComponent={{
          text: this.props.pageTitle,
          style: { color: '#fff', fontSize: 18 },
        }}
        rightComponent={
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={{ color: 'white', fontSize: 16 }}>5º</Text>
            <Icon
              name="settings"
              color="white"
              size={15}
              containerStyle={{ paddingRight: 15 }}
            />
            <Button
              icon={<Icon name="dashboard" size={18} color="white" />}
              buttonStyle={{
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                backgroundColor: '#953851',
              }}
            />
          </View>
        }
        backgroundColor={Color.samplebackgroundColor}
        rightContainerStyle={{ paddingRight: 0, marginRight: 0 }}
        containerStyle={{
          paddingRight: 0,
          paddingBottom: 10,
          marginRight: 0,
          borderBottomWidth: 0,
        }}
      />
    );
  }
}
