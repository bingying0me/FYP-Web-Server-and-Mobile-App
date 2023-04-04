import React, {Component} from 'react';
import {
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
} from 'react-native';
import axios from 'axios';

export default class login extends Component {
  constructor(props) {
    super(props);
    this.emailChange = this.emailChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      email: '',
      password: '',
      submit: 'false',
    };
  }

  emailChange(event) {
    this.setState({email: event});
  }
  passwordChange(event) {
    this.setState({password: event});
  }

  submit() {
    if (this.state.submit == 'true') {
      this.props.navigation.navigate('main');
      console.log(this.state.submit);
      this.state.submit = 'false';
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    const email = this.state.email;
    const password = this.state.password;
    // const {navigation} = this.props;

    console.log(email);
    console.log(password);
    console.log(this.state.submit);

    axios
      .post('http://192.168.8.232:3000/login/login', {
        email,
        password,
      })
      .then((res) => {
        // console.log(res);
        console.log(res.data);
        // navigation.navigate('main');
        this.setState({
          submit: 'true',
        });
        {
          this.submit();
        }
        console.log(this.state.submit);
        // const items = res.data.results;
        //
        // this.setState({items});
        // const items = res.data;
        // this.setState({items});
        // console.log(items);
        // this.props.navigation.navigate('main');
        // if (res.data.success) {
        //   this.props.navigation.navigate('main');
        // } else if (res.data.error) {
        // }
      })
      .catch((error) => console.log(error));
    // // if (data) {
    // } else {
    // }
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <Image
          style={{width: 150, height: 150, marginBottom: 20}}
          source={require('./image/logo2.png')}
        />
        <Text style={styles.title}>Member Login</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Email..."
            placeholderTextColor="#003f5c"
            onChangeText={(event) => this.emailChange(event)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Password..."
            placeholderTextColor="#003f5c"
            onChangeText={(event) => this.passwordChange(event)}
          />
        </View>
        <TouchableOpacity style={styles.loginBtn} onPress={this.handleSubmit}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('signup')}>
          <Text style={styles.loginText}>Signup</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3FCFC3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    height: 30,
    fontSize: 20,
    marginBottom: 20,
  },
  inputView: {
    width: '70%',
    backgroundColor: '#D7D7D7',
    borderRadius: 15,
    height: 45,
    marginBottom: 10,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 100,
    color: 'white',
    fontSize: 17,
  },
  forgot: {
    color: 'white',
    height: 25,
    fontSize: 16,
  },
  loginText: {
    fontSize: 16,
  },
  loginBtn: {
    width: '70%',
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
});
