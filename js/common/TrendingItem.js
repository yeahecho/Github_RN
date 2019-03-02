import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default class TrendingItem extends Component {
  render() {
    const { item } = this.props;
    if (!item) return null;
    let favoriteButton = (
      <TouchableOpacity
        style={{ padding: 6 }}
        onPress={() => {}}
        underlayColor={'transfarent'}
      >
        <FontAwesome name={'star-o'} size={26} style={{ color: 'red' }} />
      </TouchableOpacity>
    );
    return (
      // <Text>test</Text>
      <TouchableOpacity onPress={this.props.onSelect}>
        <View style={styles.cell_container}>
          <Text style={styles.title}>{item.fullname}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.description}>{item.meta}</Text>
          <View style={styles.row}>
            <View style={styles.row}>
              <Text>Built by: </Text>
              {item.contributors.map((result, i, arr) => {
                return (
                  <Image
                    key={i}
                    style={{ height: 22, width: 22, margin: 2 }}
                    source={{ uri: arr[i] }}
                  />
                );
              })}
            </View>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Text>Start</Text>
              <Text>{item.starCount}</Text>
            </View>
            {favoriteButton}
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  cell_container: {
    backgroundColor: 'white',
    padding: 10,
    marginLeft: 5,
    marginRight: 5,
    marginVertical: 3,
    borderColor: '#dddddd',
    borderWidth: 0.5,
    borderRadius: 2,
    shadowColor: 'gray', //shadow针对iOS阴影
    shadowOffset: { width: 0.5, height: 0.5 },
    shadowOpacity: 0.4,
    shadowRadius: 1,
    elevation: 2 //Android阴影
  },
  row: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    fontSize: 16,
    marginBottom: 2,
    color: '#212121'
  },
  description: {
    fontSize: 14,
    marginBottom: 2,
    color: '#757575'
  }
});