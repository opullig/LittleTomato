import React from 'react';
import { View, TextInput, Image, StyleSheet, StatusBar } from 'react-native';


import SearchIcon from '../../assets/search.png';

function SearchBar({onChangeText, value}){
    return(
        <>
        <View style={styles.containerTop}>
            <View style={styles.searchInput}>
                <TextInput style={styles.input} onChangeText={onChangeText} value={value}/>
                <Image source={SearchIcon} style={styles.icon} />
            </View>
        </View>
        </> 
    );
}

const styles = StyleSheet.create({
    containerTop:{
        marginTop: StatusBar.currentHeight,
        paddingTop: 15,
        minHeight: 75,
        backgroundColor: '#6C91E0',
    },
    searchInput:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#f0f0f0',
        marginBottom: 10,
        paddingHorizontal: 15,
        marginHorizontal: 10,
        borderRadius: 20,
    },
    icon:{
        resizeMode: "contain",
        width: 20,
        height:20,
    },
    input:{
        flex:1,
        paddingTop: 10,
        paddingRight: 0,
        paddingBottom: 10,
        paddingLeft: 0,
    },
});

export default SearchBar;