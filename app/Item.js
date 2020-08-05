import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';

export default function Item(props){

    const [isChecked, setIsChecked] = useState(props.isChecked);

    const checkItem = () => {
        props.setCheckItem(props.index, isChecked ? 'remove' : 'add');
        setIsChecked(!isChecked);
    }

    //used for fix a bug with displaying wrong checked items when clearCompleted called
    useEffect(() => {
        if(props.masterReset){
            setIsChecked(false);
            props.setMasterReset();
        }
    });

    return(
        <Text 
            onPress={checkItem} 
            style={[{fontSize: 16}, isChecked ? {backgroundColor: 'lightgrey', textDecorationLine: 'line-through'} : {}]} 
            >
                {props.index}. {props.value}
        </Text>
    );
}