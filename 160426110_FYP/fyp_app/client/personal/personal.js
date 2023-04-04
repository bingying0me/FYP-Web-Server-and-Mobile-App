import React, {Component} from 'react';
import {Dimensions, ScrollView} from 'react-native';
import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import axios from 'axios';

export default class personal extends Component {
  constructor(props) {
    super(props);
    this.toggleModal = this.toggleModal.bind(this);
    this.state = {
      isModalVisible: false,
      appInfos: [],
    };
  }

  toggleModal() {
    axios.get('http://192.168.8.232:3000/appInfo/appInfo').then((res) => {
      const appInfos = res.data;
      this.setState({appInfos});
      console.log(appInfos);
      this.setState({isModalVisible: !this.state.isModalVisible});
    });
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.mainView}>
            <Text style={styles.content}>Profile Info</Text>
          </View>
          <View style={styles.imageView}>
            <Image
              style={{
                width: 150,
                height: 150,
                marginBottom: 40,
                borderRadius: 400 / 2,
                borderWidth: 1,
                borderColor: 'black',
              }}
              source={require('../login/image/example.png')}
            />
          </View>
          <View style={styles.mainbodyView}>
            <TouchableOpacity
              style={styles.profileBtn}
              onPress={this.toggleModal}>
              <Text style={styles.loginText}>APP INFO</Text>
            </TouchableOpacity>
            <Modal isVisible={this.state.isModalVisible}>
              {this.state.appInfos.map((appInfo) => (
                <View
                  style={{
                    flex: 1,
                    backgroundColor: '#102538',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={styles.appTitle}>App Info</Text>
                  <Image
                    style={{
                      width: 150,
                      height: 150,
                      marginBottom: 20,
                      backgroundColor: 'white',
                    }}
                    source={require('../login/image/logo2.png')}
                  />
                  <View
                    style={{
                      marginBottom: 50,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text style={styles.appText}>
                      COMPANY: {appInfo.company}
                    </Text>
                    <Text style={styles.appText}>
                      ADDRESS: {appInfo.address}
                    </Text>
                    <Text style={styles.appText}>PHONE: {appInfo.phone}</Text>
                    <Text style={styles.appText}>EMAIL: {appInfo.email}</Text>
                    <Text style={styles.appText}>
                      WEBSITE: {appInfo.website}
                    </Text>
                    <Text style={styles.appText}>
                      FACEBOOK: {appInfo.facebook}
                    </Text>
                    <Text style={styles.appText}>INSTAGRAM: {appInfo.ig}</Text>
                  </View>
                  <Button title="Back" onPress={this.toggleModal} />
                </View>
              ))}
            </Modal>
            <TouchableOpacity
              style={styles.profileBtn}
              onPress={() => this.props.navigation.navigate('login')}>
              <Text style={styles.loginText}>LOGOUT</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => this.props.navigation.navigate('main')}>
            <Image
              style={{width: 25, height: 25}}
              source={require('../login/image/home.png')}
            />
            <Text style={styles.loginText}>Main</Text>
          </TouchableOpacity>
          {/*<TouchableOpacity*/}
          {/*  style={styles.loginBtn}*/}
          {/*  onPress={() => this.props.navigation.navigate('detail')}>*/}
          {/*  <Image*/}
          {/*    style={{width: 25, height: 25}}*/}
          {/*    source={require('../login/image/detail.png')}*/}
          {/*  />*/}
          {/*  <Text style={styles.loginText}>Detail</Text>*/}
          {/*</TouchableOpacity>*/}
          {/*<TouchableOpacity*/}
          {/*  style={styles.loginBtn}*/}
          {/*  onPress={() => this.props.navigation.navigate('camera')}>*/}
          {/*  <Image*/}
          {/*    style={{width: 80, height: 80, marginBottom: 50}}*/}
          {/*    source={require('../login/image/camera.png')}*/}
          {/*  />*/}
          {/*  /!*<Text style={styles.loginTextC}>Camera</Text>*!/*/}
          {/*</TouchableOpacity>*/}
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => this.props.navigation.navigate('searching')}>
            <Image
              style={{width: 25, height: 25}}
              source={require('../login/image/search.png')}
            />
            <Text style={styles.loginText}>Searching</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => this.props.navigation.navigate('personal')}>
            <Image
              style={{width: 25, height: 25}}
              source={require('../login/image/info.png')}
            />
            <Text style={styles.loginText}>Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  loginTextC: {
    fontSize: 16,
    marginBottom: 40,
  },
  loginText: {
    fontSize: 16,
    color: 'white',
  },
  loginBtn: {
    width: '33.3%',
    backgroundColor: '#102538',
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileBtn: {
    width: '70%',
    backgroundColor: '#102538',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  bottomContainer: {
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    position: 'absolute',
    bottom: 0,
  },
  title: {
    color: 'white',
    height: 100,
    fontSize: 50,
    marginBottom: 20,
  },
  mainbodyView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
  },
  mainView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 80,
    backgroundColor: '#102538',
  },
  content: {
    color: 'white',
    height: 40,
    fontSize: 30,
    marginBottom: 20,
    marginTop: 20,
  },
  scrollView: {
    width: '100%',
    marginBottom: 50,
  },
  imageView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  appTitle: {
    color: 'white',
    fontSize: 40,
    marginBottom: 20,
    marginTop: 20,
  },
  appText: {
    color: 'white',
    fontSize: 20,
    marginBottom: 10,
  },
});
