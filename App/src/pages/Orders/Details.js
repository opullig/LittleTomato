import React, {useState, useEffect} from 'react';
import {Text, ScrollView, StyleSheet, View, LogBox} from 'react-native';

import DefaultBar from '../../components/Bars/DefaultBar';
import Button from '../../components/Form/Button';

import api from '../../services/api';

function Details({navigation}){
    LogBox.ignoreAllLogs(true);

    const [order, setOrder] = useState('');
    const [date, setDate] = useState('');
    const [orderItems, setOrderItems] = useState('');

    useEffect(()=>{
        setOrder(navigation.state.params);
    },[]);

    useEffect(() => {
        if(order.date){
            let date = order.date.substring(0, 19);
            date = date.replace('T', ' ');
            setDate(date);
        }
        if(order.order_number)
            getAllItems();
    },[order]);

    async function getAllItems(){
        try{
            const result = await api.get(`/orders/item/${order.order_number}`);
            setOrderItems(result.data);
            

        }catch(e){ console.error(e)}
    };

    async function cancelOrder(){
        const data ={status: 'Cancelado'}
        await api.put(`/orders/pendings/update/${order.order_number}`, data);
        back();
    }

    function back(){
        navigation.navigate('Options');
    }
    return(
        <>
        <DefaultBar title='Detalhes Pedido' back={true} onPress={back}/>
        <ScrollView style={styles.container}>
            <View style={styles.title}>
                <Text style={styles.textTitle}>{date}</Text>
                <Text style={styles.textTitle}>{order.status}</Text>
            </View>
            <Text>{order.address}</Text>
            <View style={styles.warningView}>
                <Text style={styles.warningText}>*Após o pedido ser liberado para entrega, existe um prazo de 48 horas pra ser entregue.</Text>
            </View>
            <View style={styles.viewList}>
                {orderItems.length == 0 ? <></> : orderItems.map((item, index) => {
                    return (
                        <View key={index} style={styles.viewItem}>
                            <Text style={styles.textItem}>{item.amount}x {item.name}</Text>
                            <Text style={styles.textItem}>R${(item.amount*item.price).toFixed(2).replace('.',',')}</Text>
                        </View>)
                })}
            </View>
            <View style={styles.priceView}>
                <Text>{order.payment}</Text>
                {order.total_price ? 
                <Text style={styles.textPrice}>R$ {order.total_price.toFixed(2).replace('.',',')}</Text>
                : <></>}
            </View>
            <View style={styles.viewButton}>
                {order.status == 'Em Aberto' ? <Button text='Cancelar Pedido' onpress={cancelOrder}/> : <></>}
            </View>
        </ScrollView>
        </>
    )};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#f0f0f0',
        padding: 5,
        paddingHorizontal: 15,
    },
    
    title:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5,
    },
    
    textTitle:{
        fontSize: 17,
        fontWeight: 'bold',
        color: '#1E2F5C',
    },

    viewItem:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 5,
        marginVertical: 5,
    },

    viewList:{
        flex: 1,
    },

    textItem:{
        color:'#1E2F5C',
        fontSize: 15,
        fontStyle: 'italic',
    },

    priceView:{
        flexDirection: 'row',
        marginTop: 15,
        justifyContent: 'space-around',
    },

    textPrice:{
        fontSize: 18,
        fontWeight: 'bold',
        color: '#68C03F',
    },

    viewButton:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 60,
    },

    warningView:{
        margin: 5,
    },

    warningText:{
        fontSize: 13,
        fontStyle: 'italic',
        color: '#3856A8',
    },
});

export default Details;