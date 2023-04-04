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

var radio_props = [
  {label: 'F', value: 'F'},
  {label: 'M', value: 'M'},
];
let submit = 'flase';

export default class signup extends Component {
  constructor(props) {
    super(props);
    this.firstnameChange = this.firstnameChange.bind(this);
    this.lastnameChange = this.lastnameChange.bind(this);
    this.genderChange = this.genderChange.bind(this);
    this.birthdateChange = this.birthdateChange.bind(this);
    this.phoneChange = this.phoneChange.bind(this);
    this.emailChange = this.emailChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      birthdate: new Date(),
      firstname: '',
      lastname: '',
      gender: '',
      phone: '',
      email: '',
      password: '',
    };
  }

  firstnameChange(event) {
    this.setState({firstname: event});
  }
  lastnameChange(event) {
    this.setState({lastname: event});
  }
  genderChange(event) {
    this.setState({gender: event});
  }
  birthdateChange(event) {
    this.setState({birthdate: event});
  }
  phoneChange(event) {
    this.setState({phone: event});
  }
  emailChange(event) {
    this.setState({email: event});
  }
  passwordChange(event) {
    this.setState({password: event});
  }

  submit() {
    Alert.alert(
      'Sign Up',
      'Your signup has DONE!!!',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => this.props.navigation.navigate('login')},
      ],
      {cancelable: false},
    );
    submit = 'flase';
  }

  handleSubmit(event) {
    event.preventDefault();

    const firstname = this.state.firstname;
    const lastname = this.state.lastname;
    const gender = this.state.gender;
    const birthdate = this.state.birthdate;
    const phone = this.state.phone;
    const email = this.state.email;
    const password = this.state.password;
    console.log(firstname);
    console.log(lastname);
    console.log(gender);
    console.log(birthdate);
    console.log(phone);
    console.log(email);
    console.log(password);
    axios
      .post('http://192.168.8.232:3000/member/signup', {
        firstname,
        lastname,
        gender,
        birthdate,
        phone,
        email,
        password,
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
    const {navigate} = this.props.navigation;
    return (
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <Text style={styles.title}>Sign Up</Text>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              value={this.state.firstname.value}
              name={'firstname'}
              placeholder="First Name"
              placeholderTextColor="#003f5c"
              onChangeText={(event) => this.firstnameChange(event)}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Last Name"
              placeholderTextColor="#003f5c"
              onChangeText={(event) => this.lastnameChange(event)}
            />
          </View>
          <View style={styles.radioView}>
            <Text style={styles.subtitle}>Gender</Text>
            <RadioForm
              radio_props={radio_props}
              initial={0}
              selectedLabelColor={'white'}
              labelColor={'white'}
              buttonColor={'#3FCFC3'}
              selectedButtonColor={'#3FCFC3'}
              onPress={(value) => {
                this.setState({gender: value});
              }}
              onChangeText={(event) => this.genderChange(event)}
            />
          </View>
          <View style={styles.datepickerView}>
            <Text style={styles.subtitle}>Birth Date</Text>
            <DatePicker
              style={{width: 200}}
              date={this.state.date}
              mode="date"
              placeholder="select date"
              format="YYYY-MM-DD"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0,
                },
                dateInput: {
                  marginLeft: 36,
                },
                dateText: {
                  color: 'white',
                },

              }}
              onDateChange={(event) => this.birthdateChange(event)}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Phone"
              placeholderTextColor="#003f5c"
              onChangeText={(event) => this.phoneChange(event)}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Email"
              placeholderTextColor="#003f5c"
              onChangeText={(event) => this.emailChange(event)}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Password"
              placeholderTextColor="#003f5c"
              onChangeText={(event) => this.passwordChange(event)}
            />
          </View>
          <TouchableOpacity style={styles.loginBtn} onPress={this.handleSubmit}>
            <Text style={styles.loginText}>SIGNUP</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => this.props.navigation.navigate('login')}>
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
    color: 'white',
    height: 100,
    fontSize: 50,
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
