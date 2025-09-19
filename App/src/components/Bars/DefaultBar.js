import { StatusBar, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function DefaultBar({ title, onPress, back }){
    
    const navigation = useNavigation();

    if(onPress == null){
        onPress = () => navigation.goBack();
    }
    return(
        <View style={styles.bar}>
        {back == true ? 
        <TouchableOpacity onPress={onPress}>
            <Text style={styles.arrow}>{"<"}</Text>
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

export default DefaultBar;