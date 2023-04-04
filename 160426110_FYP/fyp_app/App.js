import React, {Component} from 'react';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import login from './client/login/login';
import signup from './client/signup/signup';
import main from './client/main/main';
import detail from './client/detail/detail';
import searching from './client/searching/searching';
import personal from './client/personal/personal';
import createAddress from './client/detail/createAddress';
import type from './client/main/type';

const App = createStackNavigator(
  {
    login: {screen: login},
    signup: {screen: signup},
    main: {screen: main},
    detail: {screen: detail},
    searching: {screen: searching},
    personal: {screen: personal},
    createAddress: {screen: createAddress},
    type: {screen: type},
  },
  {
    initialRouteName: 'login',
  },
);
export default createAppContainer(App);
