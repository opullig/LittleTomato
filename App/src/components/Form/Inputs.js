import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

function Input({name, placeholder, security, onChangeText, value, type = 'default' }){
    return (
        <TextInput name={name} placeholder={placeholder} autoCapitalize='none' 
                   autoCorrect={false} secureTextEntry={security} autoCompleteType='off'
                   style={styles.input} 
                   onChangeText={onChangeText}
                   value={value}
                   keyboardType={type}
                   >
        </TextInput>
    );
};

const styles = StyleSheet.create({
    input:{
        backgroundColor:'#fff',
        borderRadius: 15,
        borderColor: '#d2d2d2',
        borderWidth: 1,
        height: 40,
        width: '100%',
        marginBottom: 20,
        paddingLeft: 15,
    },
});

export default Input;