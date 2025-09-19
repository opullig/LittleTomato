import React, {useState, useEffect} from 'react';
import { View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import  AsyncStorage  from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native';



function BarNavigation({ navigation }){

    const [professional, setProfessional] = useState('');
    
    useEffect(() => {
        AsyncStorage.getItem('access').then(data => setProfessional(data)).catch();  
    },[]);

    function toPage(page){
        navigation.navigate(page);
    }


    if(professional == null){

        return (
            <View style={styles.containerBottom}>
            <TouchableOpacity onPress={() => toPage('MainUser')} style={styles.buttonBottom} >
                <Text style={styles.textBottom}>Produtos</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => toPage('Cart')} style={styles.buttonBottom} >
                <Text style={styles.textBottom}>Carrinho</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => toPage('Options')} style={styles.buttonBottom} >
                <Text style={styles.textBottom}>Opções</Text>
            </TouchableOpacity>
        </View>
        );
    }else{
        return (
            <View style={styles.containerBottom}>
                <TouchableOpacity style={styles.buttonBottom} onPress={() => toPage('MainProfessional')}>
                    <Text style={styles.textBottom}>Produtos</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonBottom} onPress={() => toPage('ProfessionalOrders')}>
                    <Text style={styles.textBottom}>Pedidos</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonBottom} onPress={() => toPage('Records')}>
                    <Text style={styles.textBottom}>Notas</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonBottom} onPress={() => toPage('Options')}>
                    <Text style={styles.textBottom}>Opções</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerBottom:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: '#6C91E0',
        height: 60,
        
    },
    iconBottom:{
        resizeMode: "contain",
        width: 28,
        height: 28,
    },
    buttonBottom:{
       justifyContent: 'center',
       alignItems: 'center',
       margin: 5, 
    },
    textBottom:{
        color: '#f0f0f0',
        fontSize: 12,
        fontWeight: 'bold',
    },

});

export default BarNavigation;