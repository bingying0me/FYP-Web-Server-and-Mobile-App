import React, {Component} from 'react';
import {
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
} from 'react-native';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import DatePicker from 'react-native-datepicker';
import axios from 'axios';

let submit = 'flase';

export default class signup extends Component {
  constructor(props) {
    super(props);
    this.addressChange = this.addressChange.bind(this);
    this.address_mapChange = this.address_mapChange.bind(this);
    this.priceChange = this.priceChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      address: '',
      address_map: '',
      price: '',
      id: '',
    };
  }

  addressChange(event) {
    this.setState({address: event});
  }
  address_mapChange(event) {
    this.setState({address_map: event});
  }
  priceChange(event) {
    this.setState({price: event});
  }

  submit() {
    Alert.alert(
      'Sign Up',
      'Thank you for your information!!!',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => this.props.navigation.navigate('main')},
      ],
      {cancelable: false},
    );
    submit = 'flase';
  }

  handleSubmit(event) {
    event.preventDefault();
    this.state.id = this.props.navigation.getParam('id', 'nothing sent');
    const id = this.state.id;
    console.log(id);
    const address = this.state.address;
    const address_map = this.state.address_map;
    const price = this.state.price;
    console.log(address);
    console.log(address_map);
    console.log(price);
    axios
      .post('http://192.168.8.232:3000/itemInfo/add', {
        address,
        address_map,
        price,
        id,
      })
      .then((res) => {
        // console.log(res);
        submit = 'true';
        console.log(res.data);
        // const items = res.data.results;
        //
        // this.setState({items});
        // const items = res.data;
        // this.setState({items});
        // console.log(items);
      })
      .catch((error) => console.log(error));
    // if (data) {
    // } else {
    // }
    {
      this.submit();
    }
  }

  render() {
    const name = this.props.navigation.getParam('text', 'nothing sent');
    const {navigate} = this.props.navigation;
    return (
      <ScrollView
        style={styles.scrollView}
        style={{backgroundColor: '#102538'}}>
        <View style={styles.container}>
          <Text style={styles.title}>Create Address for {name}</Text>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              value={this.state.address.value}
              name={'address'}
              placeholder="Store Name"
              placeholderTextColor="#003f5c"
              onChangeText={(event) => this.addressChange(event)}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Address"
              placeholderTextColor="#003f5c"
              onChangeText={(event) => this.address_mapChange(event)}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Price"
              placeholderTextColor="#003f5c"
              onChangeText={(event) => this.priceChange(event)}
            />
          </View>
          <TouchableOpacity style={styles.loginBtn} onPress={this.handleSubmit}>
            <Text style={styles.loginText}>Added</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => this.props.navigation.navigate('main')}>
            <Text style={styles.loginText}>Back</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#102538',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginTop: 10,
    color: 'white',
    height: 70,
    fontSize: 30,
  },
  inputView: {
    width: '70%',
    backgroundColor: '#D7D7D7',
    borderRadius: 15,
    height: 50,
    marginBottom: 30,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 100,
    color: '#102538',
    fontSize: 17,
  },
  radioView: {
    width: '70%',
    height: 50,
    marginBottom: 40,
    justifyContent: 'center',
    padding: 20,
  },
  datepickerView: {
    width: '70%',
    height: 50,
    marginBottom: 30,
    justifyContent: 'center',
    padding: 20,
  },
  subtitle: {
    height: 30,
    fontSize: 20,
    color: 'white',
  },
  loginText: {
    fontSize: 16,
  },
  loginBtn: {
    width: '50%',
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  scrollView: {
    width: '100%',
  },
});
