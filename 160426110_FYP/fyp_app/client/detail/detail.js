import React, {Component} from 'react';
import {Button, Dimensions, ScrollView, TextInput} from 'react-native';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/AntDesign';
import axios from 'axios';

export default class detail extends Component {
  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.createAddress = this.createAddress.bind(this);
    this.state = {
      images: [
        require('../login/image/product1.jpg'),
        require('../login/image/earphone2.jpg'),
        // 'https://source.unsplash.com/1024x768/?nature',
        // 'https://source.unsplash.com/1024x768/?water', // Network image
        // require('../login/image/slider1.jpg'), // Local image
      ],
      liked: false,
      items: [],
      itemids: [],
      id: '',
    };
    // this.componentDidMount = this.componentDidMount.bind(this);
    this.lastPress = 0;
  }

  // handleChange(event) {
  //   this.setState({id: event});
  // }
  //
  // handleSubmit(event) {
  //   event.preventDefault();
  //
  //   const id = this.state.id;
  //   console.log(this.state.id);
  //   axios
  //     .post('http://192.168.8.232:3000/itemInfo/find', {id})
  //     .then((res) => {
  //       // console.log(res);
  //       console.log(res.data);
  //       // const items = res.data.results;
  //       //
  //       // this.setState({items});
  //       const itemIDs = res.data;
  //       this.setState({itemIDs});
  //       console.log(itemIDs);
  //     })
  //     .catch((error) => console.log(error));
  // }

  componentDidMount() {
    this.state.id = this.props.navigation.getParam('id', 'nothing sent');
    const id = this.state.id;
    // const id = this.state.id.value;
    console.log(id);
    axios
      .post('http://192.168.8.232:3000/itemInfo/find', {id})
      .then((res) => {
        // console.log(res);
        console.log(res.data);
        // const items = res.data.results;
        //
        // this.setState({items});
        const itemids = res.data;
        this.setState({itemids});
        console.log(itemids);
      })
      .catch((error) => console.log(error));
  }

  createAddress () {
    this.props.navigation.navigate('createAddress', {
      id: this.props.navigation.getParam('id', 'nothing sent'),
      text: this.props.navigation.getParam('text', 'nothing sent'),
    });
  };


  render() {
    const text = this.props.navigation.getParam('text', 'nothing sent');
    const {navigate} = this.props.navigation;
    const {liked} = this.state;
    const colors = {
      transparent: 'transparent',
      white: '#fff',
      heartColor: '#e92f3c',
      textPrimary: '#515151',
      black: '#000',
    };
    const AnimatedIcon = Animatable.createAnimatableComponent(Icon);
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.bodyView}>
            <View style={styles.mainbodyView}>
              <Text style={styles.content}>{text}</Text>
            </View>
            <View style={styles.slider}>
              <SliderBox
                images={this.state.images}
                sliderBoxHeight={Dimensions.get('window').height / 2}
                autoplay
                circleLoop
                parentWidth={Dimensions.get('window').width - 20}
                onCurrentImagePressed={(index) =>
                  console.warn(`image ${index} pressed`)
                }
              />
            </View>
            <Button
              type="submit"
              title={'Create new address'}
              color="#102538"
              onPress={() => this.createAddress()}
            />
            <Text />
            {this.state.itemids.map((itemid) => (
              <View>
                <View style={styles.mainView}>
                  <View style={styles.itemView}>
                    <View style={styles.tableView}>
                      <Text style={styles.name}>{itemid.address}:</Text>
                      <Text style={styles.address}>{itemid.address_map}</Text>
                    </View>
                    <View style={styles.priceView}>
                      <Text style={styles.price}>${itemid.price}</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      marginRight: 10,
                      marginLeft: 10,
                      backgroundColor: 'white',
                      marginBottom: 10,
                      marginTop: -5,
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                    }}>
                    {/*<TouchableOpacity*/}
                    {/*  activeOpacity={1}*/}
                    {/*  onPress={this.handleOnPressLike}>*/}
                    {/*  <AnimatedIcon*/}
                    {/*    ref={this.handleSmallAnimatedIconRef}*/}
                    {/*    name={liked ? 'heart' : 'hearto'}*/}
                    {/*    color={liked ? colors.heartColor : colors.textPrimary}*/}
                    {/*    size={25}*/}
                    {/*    style={styles.icon}*/}
                    {/*  />*/}
                    {/*</TouchableOpacity>*/}
                    <Text style={{fontSize: 18, marginRight: 10}}></Text>
                  </View>
                </View>
              </View>
            ))}
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
  title: {
    color: 'white',
    height: 100,
    fontSize: 50,
    marginBottom: 20,
  },
  mainbodyView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
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
  tableView: {
    marginBottom: 10,
    backgroundColor: '#102538',
    marginLeft: 10,
    width: '78%',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  bodyView: {
    marginBottom: 60,
  },
  priceView: {
    marginBottom: 10,
    marginRight: 10,
    width: '16%',
    alignItems: 'center',
    backgroundColor: '#3FCFC3',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  itemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 80,
  },
  mainView: {
    backgroundColor: '#E7E7E7',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  name: {
    fontSize: 18,
    color: 'white',
  },
  address: {
    fontSize: 15,
    color: 'white',
  },
  price: {
    fontSize: 16,
    color: 'white',
  },
  slider: {
    marginBottom: 30,
    marginLeft: 10,
  },
  icon: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
