import React from 'react';
import { StyleSheet, Text} from 'react-native';

export default function Item(props){
    return(
        <Text>{props.index}. {props.value}</Text>
    );
}