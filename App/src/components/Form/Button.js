import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

function Button({ onpress, text, style='default' }){
    return (
        <TouchableOpacity style={style.match('white') ? styles.whiteButton :styles.defaultButton} onPress={onpress}>
            <Text style={style.match('white') ? styles.textWhiteButton : styles.textDefaultButton}>{text}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    
    whiteButton:{
        height: 50,
        width:'70%',
        borderRadius: 20,
        borderColor: '#fff',
        borderWidth: 1,
        justifyContent:'center',
        padding: 10,
    },
    
    defaultButton:{
        height: 50,
        width:'70%',
        borderRadius: 20,
        borderColor: '#3856A8',
        borderWidth: 1,
        justifyContent:'center',
        padding: 10,
    },
    textWhiteButton:{
        textAlign:'center',
        color:'#fff',
        fontWeight:'bold',
        fontSize: 16,
    },
    textDefaultButton:{
        textAlign:'center',
        color:'#3856A8',
        fontWeight:'bold',
        fontSize: 16,
    },
});
export default Button;