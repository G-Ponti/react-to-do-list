import React, { useState } from 'react';
import { StyleSheet, Text} from 'react-native';

export default function Item(props){

    const [isChecked, setIsChecked] = useState(false);

    const checkItem = () => {
        props.setCheckItem(props.index, isChecked ? 'remove' : 'add');
        setIsChecked(!isChecked);
    }

    return(
        <Text 
            onPress={checkItem} 
            style={[{fontSize: 16}, isChecked ? {backgroundColor: 'lightgrey', textDecorationLine: 'line-through'} : {}]} 
            >
                {props.index}. {props.value}
        </Text>
    );
}