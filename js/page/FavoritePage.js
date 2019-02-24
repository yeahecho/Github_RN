import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button } from 'react-native';
import { connect } from 'react-redux';
import actions from '../action/index';
import { createMaterialTopTabNavigator } from 'react-navigation';
import NavigationUtil from '../navigator/NavigationUtil';

type Props = {};
class FavoritePage extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>FavoritePage</Text>
        <Button
          title="change theme color"
          onPress={() => {
            this.props.onThemeChange('#505');
          }}
        />
        <Button
          title={'Fetch usage'}
          onPress={() => {
            NavigationUtil.goPage(
              { navigation: this.props.navigation },
              'FetchDemoPage'
            );
          }}
        />
        <Button
          title={'AsyncStorage usage'}
          onPress={() => {
            NavigationUtil.goPage(
              { navigation: this.props.navigation },
              'AsyncStorageDemoPage'
            );
          }}
        />
        <Button
          title={'DataStore usage离线缓存框架'}
          onPress={() => {
            NavigationUtil.goPage(
              { navigation: this.props.navigation },
              'DataStoreDemoPage'
            );
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  }
});
const mapStateToProps = state => ({
  theme: state.theme.theme
});
const mapDispatchToProps = dispatch => ({
  onThemeChange: theme => dispatch(actions.onThemeChange(theme))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FavoritePage);
