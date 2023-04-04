//This is an example code for Navigator//
import React, {Component} from 'react';
import {Dimensions, ScrollView} from 'react-native';
//import react in our code.
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
//import all the components we are going to use.
import {SliderBox} from 'react-native-image-slider-box';
import Carousel from 'react-native-snap-carousel';

export default class main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [
        require('../login/image/slider1.jpg'),
        require('../login/image/slider2.jpg'),
        require('../login/image/slider3.jpg'),
        // 'https://source.unsplash.com/1024x768/?nature',
        // 'https://source.unsplash.com/1024x768/?water', // Network image
        // require('../login/image/slider1.jpg'), // Local image
      ],
      entries1: [
        {image: require('../login/image/product1.jpg')},
        {image: require('../login/image/product2.jpg')},
      ],
      type: '',
    };
  }

  _renderItemTop({item, index}) {
    return (
      <View style={styles.slide}>
        <TouchableOpacity>
          <Image
            style={{width: Dimensions.get('window').width / 2, height: 250}}
            source={item.image}
          />
          {/*<View style={styles.text1}>*/}
          {/*  <Text style={styles.subtitleTop}>Product</Text>*/}
          {/*</View>*/}
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.slider}>
            <SliderBox
              images={this.state.images}
              sliderBoxHeight={Dimensions.get('window').height - 155}
              autoplay
              circleLoop
              parentWidth={Dimensions.get('window').width}
              onCurrentImagePressed={(index) =>
                console.warn(`image ${index} pressed`)
              }
            />
          </View>
          <View style={styles.choice}>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('type', {
                  type: 'Food',
                })
              }>
              <Image
                style={styles.choiceBtnSpecial}
                source={require('../login/image/supermarket.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('type', {
                  type: '3C',
                })
              }>
              <Image
                style={styles.choiceBtn}
                source={require('../login/image/3C.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('type', {
                  type: 'toy',
                })
              }>
              <Image
                style={styles.choiceBtn}
                source={require('../login/image/toys.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('type', {
                  type: 'cloth',
                })
              }>
              <Image
                style={styles.choiceBtn}
                source={require('../login/image/clothes.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.choice}>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('type', {
                  type: 'furniture',
                })
              }>
              <Image
                style={styles.choiceBtnSpecial}
                source={require('../login/image/furniture.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('type', {
                  type: 'pet',
                })
              }>
              <Image
                style={styles.choiceBtn}
                source={require('../login/image/pet.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('type', {
                  type: 'baby',
                })
              }>
              <Image
                style={styles.choiceBtn}
                source={require('../login/image/baby.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('type', {
                  type: 'makeup',
                })
              }>
              <Image
                style={styles.choiceBtn}
                source={require('../login/image/makeup.png')}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('type', {
                type: '',
              })
            }>
            <View style={styles.text}>
              <Text style={styles.title}>ALL Item</Text>
              <Carousel
                ref={(c) => {
                  this._carousel = c;
                }}
                data={this.state.entries1}
                renderItem={this._renderItemTop}
                sliderWidth={Dimensions.get('window').width}
                itemWidth={Dimensions.get('window').width / 2}
                layout={'default'}
              />
              <Text style={{textAlign: 'right', color: 'white'}}> More > </Text>
            </View>
          </TouchableOpacity>
          <View style={styles.adv}>
            <Image
              style={{
                width: Dimensions.get('window').width - 10,
                height: 100,
                marginTop: 5,
                marginBottom: 50,
              }}
              source={require('../login/image/adv1.jpg')}
            />
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
    height: 75,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomContainer: {
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    position: 'absolute',
    bottom: 0,
  },
  scrollView: {
    width: '100%',
    marginBottom: 50,
  },
  slide: {
    borderRadius: 20,
  },
  title: {
    height: 60,
    fontSize: 40,
    color: 'white',
    fontFamily: 'sans-serif-medium',
    marginTop: 30,
  },
  subtitleTop: {
    height: 50,
    fontSize: 20,
    marginBottom: 20,
    color: 'white',
    fontFamily: 'sans-serif-medium',
  },
  text: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#102538',
  },
  choice: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3FCFC3',
    flexDirection: 'row',
  },
  adv: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3FCFC3',
  },
  text1: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  choiceBtn: {
    borderRadius: 400 / 2,
    width: 80,
    height: 80,
    marginTop: 20,
    marginBottom: 20,
    marginRight: 20,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'white',
  },
  choiceBtnSpecial: {
    borderRadius: 400 / 2,
    width: 80,
    height: 80,
    marginTop: 20,
    marginBottom: 20,
    marginRight: 20,
    marginLeft: 20,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'white',
  },
});
