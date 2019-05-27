import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  View,
} from 'react-native';

import IotHeader from './../components/Header';

import { ListItem, Badge, Button } from 'react-native-elements';

export default class MainScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: null,
  });
  render() {
    const list = [
      {
        title: 'Appointments',
        icon: 'av-timer',
      },
      {
        title: 'Trips',
        icon: 'flight-takeoff',
      },
    ];

    return (
      <View style={{ backgroundColor: '#f4f4f4' }}>
        <IotHeader pageTitle="LOTTE CASTLE" />
        <View>
          <ScrollView
            alwaysBounceHorizontal="true"
            alwaysBounceVertical="false"
            style={{
              height: 136,
              paddingTop: 10,
              backgroundColor: '#403835',
            }}>
            <View
              style={{
                width: '100%',
                height: 38,
              }}>
              <FlatList
                horizontal
                data={[
                  { key: '서비스공지' },
                  { key: '단지공지' },
                  { key: '택배도착' },
                  { key: '에너지알림' },
                ]}
                renderItem={({ item }) => (
                  <View style={{ height: 20, paddingRight: 35 }}>
                    <Text style={{ paddingTop: 4 }}>{item.key}</Text>
                    <Badge
                      value="N"
                      status="error"
                      containerStyle={{
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                      }}
                      badgeStyle={{
                        borderWidth: 0,
                      }}
                      textStyle={{ fontSize: 8 }}
                    />
                  </View>
                )}
              />
            </View>
          </ScrollView>

          <ScrollView
            style={{
              paddingHorizontal: 10,
              height: '100%',
              marginTop: -70,
            }}>
            <View style={{ flexDirection: 'row' }}>
              {list.map((item, i) => (
                <View
                  key={i}
                  style={{
                    flex: 1,
                    height: 150,
                    marginRight: i < 1 ? 10 : 0,
                    backgroundColor: '#fff',
                    borderRadius: 10,
                  }}>
                  <View
                    style={{
                      flexDirection: 'column',
                      alignItems: 'center',
                      alignSelf: 'center',
                    }}>
                    <Text>{item.title}</Text>
                  </View>
                </View>
              ))}
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text>사용자모드</Text>
              <Text>모드추가</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text>편의/생활</Text>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}
