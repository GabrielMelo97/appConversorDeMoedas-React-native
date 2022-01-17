import React from 'react';
import RNPickerSelect from 'react-native-picker-select';

export default function Picker(props){
    const placeholder = {
        label: 'Selecione...',
        value: null,
        color: '#ccc'
    }

    return(
        <RNPickerSelect 
            placeholder={placeholder}
            items={props.moedasCarregadas}
            onValueChange={(valor)=> props.onChange(valor) }
            style={{
                inputAndroid:{
                    fontSize:20,
                    color:'#000'
                },
                inputIOS:{
                    fontSize:20,
                    color:'#000'
                }
            }}
        />
    )
}