import React, {useEffect, useState} from 'react';
import { AsyncStorage, LogBox, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';

import DefaultBar from '../../components/Bars/DefaultBar';
import BarNavigation from '../../components/Bars/BarNavigation';

import api from '../../services/api';

function Order({ navigation }){
    LogBox.ignoreAllLogs(true);

    const [orders, setOrders] = useState('');
    const [user, setUser] = useState('');
    
    useEffect(() => {
        AsyncStorage.getItem('user').then(data => setUser(data))
    },[]);

    useEffect(() => {
        if(user)
            getOrders();
    },[user]);

    async function getOrders(){
        try{
            const result = await api.get('/orders',{'headers':{
                'Content-Type':'application/json',
                id:user
            }});
            setOrders(result.data);
        }catch(e){console.error(e)}
    }

    function back(){ navigation.navigate('Options')};

    function goTo(data={}){ navigation.navigate('DetailsOrder',data)};

    return(
        <>
            <DefaultBar title='Pedidos' back={true} onPress={back}/>
            <ScrollView style={styles.container}>
            {orders.length == 0 ? <Text></Text> : orders.map((order,index) => {
                    
                    let date = order.date.substring(0, 19);
                    date = date.replace('T', ' ')
                    return(
                        <TouchableOpacity key={index} style={styles.btnOrder} onPress={() => goTo(order)}>
                            <Text style={styles.textOrder}>{date}</Text>
                            <Text style={styles.textOrder}>{order.status}</Text>
                        </TouchableOpacity>  
                    )
                })} 
            </ScrollView>
            <BarNavigation />
        </>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:'#f0f0f0',
    },

    btnOrder:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
        marginHorizontal: 15,
        marginVertical: 5,
        borderColor: '#000',
        borderBottomWidth: 1,     
        alignItems: 'center',
    },

    textOrder:{
        fontSize: 14,
        fontStyle: 'italic',
        color:'#000',
    },
});

export default Order;