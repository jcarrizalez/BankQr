import React from 'react';
import { StyleSheet, View, Text } from '../lib/react-native';
import {Icon} from '../lib/vector-icons';
import Touch from './Touch';
import styles from '../styles';

const css = styles('Item');

const Item = ({icon, title, onPress}) => 
  <Touch onPress={onPress}>
    <View style={css.item}>
      <View style={css.viewText}>
        <Icon name={icon} size={30} color="gray" solid/>
        <Text style={css.itemText}>{title}</Text>
      </View>
      <Icon style={css.itemIcon} name="chevron-right" size={30} color="gray" solid/>
    </View>
  </Touch>;

export default Item;