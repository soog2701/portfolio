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

import { Input, CheckBox, Button, Icon } from 'react-native-elements';

import Color from './../constants/Colors';
import Style from './../constants/CommonStyle';

export default class LoginScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: null,
  });
  state = {
    checked: false,
    radiochecked1: false,
    radiochecked2: false,
  };
  render() {
    return (
      <View Style={Style.container}>
        <ScrollView style={styles.background}>
          <View style={Style.contentContainer}>
            <View>
              <Image
                source={require('../assets/sample/loading01.jpg')}
                style={styles.welcomeImage}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Input
                inputStyle={{
                  color: Color.sampleColor,
                  fontSize: 14,
                }}
                inputContainerStyle={styles.input}
                leftIconContainerStyle={{ marginLeft: 5 }}
                placeholder="id"
                placeholderTextColor="#48433c"
                leftIcon={
                  <Icon
                    name="account"
                    size={24}
                    iconStyle={{
                      marginRight: 10,
                    }}
                    type="material-community"
                    color="#5a4f45"
                  />
                }
              />
              <Input
                inputStyle={{ color: Color.sampleColor, fontSize: 14 }}
                inputContainerStyle={styles.input}
                leftIconContainerStyle={{ marginLeft: 5 }}
                placeholder="password"
                placeholderTextColor="#48433c"
                leftIcon={
                  <Icon
                    name="lock"
                    iconStyle={{ marginRight: 10 }}
                    size={24}
                    type="material-community"
                    color="#5a4f45"
                  />
                }
              />
              <View>
                <Input
                  inputStyle={{ color: Color.sampleColor, fontSize: 14 }}
                  inputContainerStyle={styles.input}
                  leftIconContainerStyle={{ marginLeft: 5 }}
                  placeholder="단지를 선택해주세요."
                  placeholderTextColor="#48433c"
                  leftIcon={
                    <Icon
                      name="home-account"
                      size={24}
                      iconStyle={{ marginRight: 10 }}
                      type="material-community"
                      color="#5a4f45"
                    />
                  }
                />
                <Button
                  title="단지설정"
                  type="outline"
                  buttonStyle={{
                    position: 'absolute',
                    top: -40,
                    right: 10,
                    width: 70,
                    height: 30,
                    borderRadius: 10,
                    borderColor: '#5a4f45',
                  }}
                  titleStyle={{
                    color: '#5a4f45',
                    fontSize: 13,
                  }}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <CheckBox
                title="아이디저장"
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                checkedColor="#837669"
                uncheckedColor="#837669"
                containerStyle={styles.radiobox}
                textStyle={{ color: '#837669' }}
                checked={this.state.radiochecked1}
                onPress={() =>
                  this.setState({
                    radiochecked1: !this.state.radiochecked1,
                    radiochecked2: this.state.radiochecked1 ? true : false,
                  })
                }
              />
              <CheckBox
                title="자동로그인"
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                checkedColor="#837669"
                uncheckedColor="#837669"
                containerStyle={styles.radiobox}
                textStyle={{ color: '#837669' }}
                checked={this.state.radiochecked2}
                onPress={() =>
                  this.setState({
                    radiochecked2: !this.state.radiochecked2,
                    radiochecked1: this.state.radiochecked2 ? true : false,
                  })
                }
              />
            </View>
            <View style={{ marginTop: 5 }}>
              <Button
                title="로그인"
                buttonStyle={{
                  height: 50,
                  width: 230,
                  borderRadius: 25,
                  backgroundColor: '#943650',
                }}
                titleStyle={{
                  color: '#bb8786',
                }}
                onPress={() => this.props.navigation.navigate('Main')}
              />
              <Text
                style={{
                  marginTop: 30,
                  textAlign: 'center',
                  color: '#514b43',
                }}>
                앱을 일주일이상 사용하지 않을 경우{'\n'} 자동로그인 기능이
                해제됩니다.
              </Text>
              <Text
                style={{
                  marginTop: 30,
                  paddingBottom: 30,
                  color: '#7b7065',
                  textAlign: 'center',
                }}>
                아이디 및 비밀번호 찾기는{'\n'} 단지 관리사무소에 문의 바랍니다.
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  background: {
    height: '100%',
    backgroundColor: Color.samplebackgroundColor,
    paddingLeft: '10%',
    paddingRight: '10%',
  },
  input: {
    marginTop: 10,
    width: '100%',
    borderBottomColor: '#5a4f45',
  },
  radiobox: {
    width: 80,
    padding: 0,
    marginTop: 20,
    marginBottom: 30,
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
});
