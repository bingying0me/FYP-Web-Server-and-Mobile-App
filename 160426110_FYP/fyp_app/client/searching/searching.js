import React, {Component} from 'react';
import {Alert, Dimensions, ScrollView} from 'react-native';
import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {SearchBar} from 'react-native-elements';
import axios from 'axios';
import inherits from '@babel/runtime/helpers/esm/inherits';

export default class searching extends Component {
  constructor(props) {
    super(props);
    this.state = {isLoading: true, search: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.jumpChange = this.jumpChange.bind(this);
    this.jumpSubmit = this.jumpSubmit.bind(this);
    this.myFunction = this.myFunction.bind(this);
    this.selectItem = this.selectItem.bind(this);
    this.state = {
      searching: '',
      items: [],
      item_name: '',
    };
  }

  myFunction = (index) => {
    this.setState({isLoading: true, select: this.state.items[index]});
    this.selectItem(this.state.items[index]);
    setTimeout(() => {
      this.setState({isLoading: false, redirect: true});
    }, 5000);
  };

  selectItem(items) {
    this.selectItem.item_id = items.item_id;
    this.selectItem.item_name = items.item_name;
    console.log(items.item_id);
    console.log(items.item_name);
    this.props.navigation.navigate('detail', {
      text: items.item_name,
      id: items.item_id,
    });
  }

  handleChange(event) {
    this.setState({searching: event});
  }

  handleSubmit(event) {
    event.preventDefault();

    const search = this.state.searching;
    console.log(search);
    console.log(searching);
    console.log(this.state.searching);
    axios
      .post('http://192.168.8.232:3000/item/searching', {search})
      .then((res) => {
        // console.log(res);
        console.log(res.data);
        // const items = res.data.results;
        //
        // this.setState({items});
        const items = res.data;
        this.setState({items});
        console.log(items);
      })
      .catch((error) => console.log(error));
  }

  jumpChange(event) {
    this.setState({item_name: event});
  }

  jumpSubmit(event) {
    event.preventDefault();

    const item_name = this.state.item_name;
    console.log(item_name);
    console.log(this.state.item_name);
    axios
      .post('http://192.168.8.232:3000/item/name', {item_name})
      .then((res) => {
        // console.log(res);
        console.log(res.data);
        // const items = res.data.results;
        //
        // this.setState({items});
        const name = res.data;
        this.setState({name});
        console.log(name);
      })
      .catch((error) => console.log(error));
  }

  get renderMovies() {
    let items = '';
    // console.log(items.length);
    if (this.state.items) {
      {
        items = this.state.items.map((item, index) => (
          <View style={{width: '100%'}}>
            <Text />
            <TouchableOpacity
              onPress={() => this.myFunction(index)}
              style={{
                flexDirection: 'row',
                backgroundColor: '#102538',
              }}>
              <View style={{width: '100%'}}>
                <Text
                  name="item_name"
                  onChangeText={(event) => this.jumpChange(event)}
                  style={styles.itemTitle1}>
                  {item.item_name}
                </Text>
                <Text style={styles.itemText1}>Type: {item.item_type}</Text>
                <Text style={styles.itemText1}>Info: {item.item_info}</Text>
                <Text style={styles.itemText2}>More ></Text>
              </View>
            </TouchableOpacity>
            <View style={{flexDirection: 'row', backgroundColor: '#3FCFC3'}} />
          </View>
        ));
        console.log(this.state.items.index);
        console.log(items.length);
        // this.state.items.map((items, index, array) => this.myFunction(index));
      }
    }

    return items;
  }

  render() {
    const {navigate} = this.props.navigation;
    const {search} = this.state;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.mainbodyView}>
            <View>
              <TextInput
                name="searching"
                onChangeText={(event) => this.handleChange(event)}
                value={this.state.searching.value}
                placeholder={'  Searching...'}
                placeholderTextColor={'#102538'}
              />
              <Button
                type="submit"
                title={'search'}
                color="#102538"
                onPress={this.handleSubmit}
              />
            </View>
            {this.renderMovies}
            {/*{this.state.items.map((item) => (*/}
            {/*  <View style={{flexDirection: 'row', backgroundColor: '#102538'}}>*/}
            {/*    <Image*/}
            {/*      style={{width: 150, height: 150, margin: 10}}*/}
            {/*      source={require('../login/image/product1.jpg')}*/}
            {/*    />*/}
            {/*    <View>*/}
            {/*      <Text style={styles.itemTitle1}>Item: {item.item_name}</Text>*/}
            {/*      <Text style={styles.itemText1}>Type: {item.item_type}</Text>*/}
            {/*      <Text style={styles.itemText1}>Info: {item.item_info}</Text>*/}
            {/*    </View>*/}
            {/*  </View>*/}
            {/*))}*/}

            {/*{this.state.items.map((item) => (*/}
            {/*<View style={{flexDirection: 'row', backgroundColor: '#3FCFC3'}}>*/}
            {/*  <Image*/}
            {/*    style={{width: 150, height: 150, margin: 10}}*/}
            {/*    source={require('../login/image/earphone2.jpg')}*/}
            {/*  />*/}
            {/*  <View>*/}
            {/*    <Text style={styles.itemTitle2}>Item: {item.item_name}</Text>*/}
            {/*    <Text style={styles.itemText2}>Type: {item.item_type}</Text>*/}
            {/*    <Text style={styles.itemText2}>Info: {item.item_info}</Text>*/}
            {/*  </View>*/}
            {/*</View>*/}
            {/*))}*/}

            {/*<View style={{flexDirection: 'row', backgroundColor: '#102538'}}>*/}
            {/*  <Image*/}
            {/*    style={{width: 150, height: 150, margin: 10}}*/}
            {/*    source={require('../login/image/product1.jpg')}*/}
            {/*  />*/}
            {/*  <View>*/}
            {/*    <Text style={styles.itemTitle1}>Item: Headphone</Text>*/}
            {/*    <Text style={styles.itemText1}>Type: Headphone</Text>*/}
            {/*    <Text style={styles.itemText1}>Info: xxxxx</Text>*/}
            {/*  </View>*/}
            {/*</View>*/}
            {/*<View style={{flexDirection: 'row', backgroundColor: '#3FCFC3'}}>*/}
            {/*  <Image*/}
            {/*    style={{width: 150, height: 150, margin: 10}}*/}
            {/*    source={require('../login/image/earphone2.jpg')}*/}
            {/*  />*/}
            {/*  <View>*/}
            {/*    <Text style={styles.itemTitle2}>Item: Headphone</Text>*/}
            {/*    <Text style={styles.itemText2}>Type: Headphone</Text>*/}
            {/*    <Text style={styles.itemText2}>Info: xxxxx</Text>*/}
            {/*  </View>*/}
            {/*</View>*/}
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
    backgroundColor: '#3FCFC3',
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
  mainbodyView: {
    marginBottom: 50,
    backgroundColor: '#3FCFC3',
  },
  content: {
    color: 'white',
    height: 40,
    fontSize: 25,
    marginBottom: 5,
  },
  scrollView: {
    width: '100%',
    marginBottom: 50,
  },
  itemText1: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
    marginLeft: 15,
  },
  itemText2: {
    color: 'white',
    fontSize: 16,
    marginRight: 10,
    marginBottom: 5,
    textAlign: 'right',
  },
  itemTitle1: {
    color: 'white',
    fontSize: 25,
    marginLeft: 5,
    marginTop: 20,
    marginBottom: 20,
  },
  itemTitle2: {
    fontSize: 20,
    marginTop: 20,
    marginBottom: 10,
  },
});
