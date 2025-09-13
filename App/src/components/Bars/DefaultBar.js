import { StatusBar, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BackArrow from '../../assets/backArrow.png'


function DefaultBar({ title, onPress, back }){

    return(
        <View style={styles.bar}>
        {back == true ? 
        <TouchableOpacity onPress={onPress}>
            <Image source={BackArrow} style={styles.arrow}/>
        </TouchableOpacity> : <></>
        }
            <Text style={styles.title}> {title} </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    bar:{
        flexDirection:"row",
        marginTop: StatusBar.currentHeight,
        height: 50,
        backgroundColor: '#6C91E0',
        justifyContent: "center",
        alignItems: "center",
    },
    title:{
        flex: 1,
        marginLeft: 10,
        color:'#f0f0f0',
        fontSize: 20,
        fontWeight: "bold",
    },
    arrow:{
        width: 25,
        height: 25,
        marginLeft: 10,
    }
});

export default useNavigation(DefaultBar);