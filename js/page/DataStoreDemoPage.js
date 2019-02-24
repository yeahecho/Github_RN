import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import actions from '../action';
import DataStore from '../expand/dao/DataStore';

type Props = {};
const KEY = 'save_key';
export default class DataStoreDemoPage extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      showText: ''
    };
    this.dataStore = new DataStore();
  }
  loadData() {
    let url = `https://api.github.com/search/repositories?q=${this.value}`;
    this.dataStore
      .fetchData(url)
      .then(data => {
        let newDate = new Date(data.timestamp);
        let showData = `初次数据加载时间：${new Date(
          data.timestamp
        )}\n${JSON.stringify(data.data)}`;
        this.setState({
          showText: showData
        });
      })
      .catch(error => {
        error && console.log(error.toString());
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>离线缓存框架设计</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => {
            this.value = text;
          }}
        />
        <Text
          onPress={() => {
            this.loadData();
          }}
        >
          获取
        </Text>
        <Text>{this.state.showText}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  input: {
    height: 30,
    width: 200,
    borderColor: 'black',
    borderWidth: 1
  },
  input_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  }
});
