import React, { Component } from 'react';
import { Text } from 'react-native';

export default class Grammar extends Component {
  render() {
    return (
      <Text>{this.props.grammar}</Text>
    );
  }
}