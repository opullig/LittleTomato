import React, { useEffect, useState } from 'react';
import { LogBox, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import DefaultBar from '../../components/Bars/DefaultBar';
import Button from '../../components/Form/Button';
import api from '../../services/api';

export default function DetailsProfessionalOrders({navigation}){
    LogBox.ignoreAllLogs(true);
    
    const [order, setOrder] = useState('')
    const [orderItems, setOrderItems] = useState('');
    const [date, setDate] = useState('');
    const [totalPrice, setTotalPrice] = useState('');
    const [initStock, setInitStock] = useState(false);
    const [stockList, setStockList] = useState('');
    const [textButton, setTextButton] = useState('Atender Pedido');
    const [statusButton, setStatusButton] = useState('Em Atendimento');
    const [noStock, setNoStock] = useState(false);

    useEffect(() => {
        setOrder(navigation.state.params);
    },[])

    useEffect(() => {
        if(order.order_number){
            getItems();
            setButton();
            setDate(order.date.substring(0,19).replace('T', ' '));
            setTotalPrice(order.total_price.toFixed(2));  
        }
    },[order])
    
    useEffect(() => {
        if(orderItems.length > 0){
            hasAmount();   
        }
    }, [initStock])

    async function getOrder(){
        const { data } = await api.get(`/orders/only/${order.order_number}`);
        setOrder(data);
    }

    async function getItems(){
        const {data} = await api.get(`/orders/item/${order.order_number}`)
        setOrderItems(data);
        setInitStock(true);
    }

    async function hasAmount(){
        const listItems = [];
        const { data } = await api.get(`/products`);
        orderItems.map((item) =>{
            const objItem = {};
            data.map(product => {
            
                if(product.id == item.product){
                    objItem.id = product.id;
                    objItem.name = item.name;
                    objItem.price = item.price;
                    objItem.amount = item.amount;
                    if(product.amount < item.amount){
                        objItem.hasAmount = false;
                    }else{
                        objItem.hasAmount = true;
                    }
                }
            })
            listItems.push(objItem);
        })
        setStockList(listItems);
    }

    async function setStatus(status){
        if(status.match('Em Rota de Entrega')){
            stockList.map( async item => {
                try{
                    await api.put(`/products/amount/${item.id}`, {amount: item.amount, operator:'minus'})
                    await api.post('/sales', {amount: item.amount, name: item.name, date: order.date.substring(0,10)});
                }catch(e){console.error(e)}
            })
            await api.put(`/orders/pendings/update/${order.order_number}`,{status})
        }else{
            await api.put(`/orders/pendings/update/${order.order_number}`,{status})
        }  
        getOrder();
    }

    function setButton(){
        if(order.status == 'Em Atendimento'){
            setTextButton('Liberar pra Entrega');
            setStatusButton('Em Rota de Entrega')
        }
        if(order.status == 'Em Rota de Entrega'){
            setTextButton('Concluir Entrega');
            setStatusButton('Concluído');
        }
    }

    return(
        <>
            <DefaultBar back={true} onPress={() => navigation.navigate('ProfessionalOrders')} title={date} />
            <View style={styles.container}>
                <Text style={styles.heading}>{`${order.address} - ${order.status}`}</Text>
                <View style={styles.viewPricing}>
                    <Text style={styles.pricing}>R${totalPrice.replace('.',',')}</Text>
                    <Text style={styles.pricing}>{order.payment}</Text>
                </View>
                {stockList.length == 0 ? <View></View> : stockList.map((item, index) => {
                    
                    if(item.hasAmount == false && noStock == false){
                        setNoStock(true);
                    }

                    return(
                        <View key={index} style={styles.productList}>
                            <Text style={styles.itemList}>{`${item.amount}x ${item.name}`}</Text>
                            <Text style={styles.itemList}>R${item.price.toFixed(2).replace('.',',')}</Text>
                            {noStock ? <Text style={styles.itemListStatus}>Falta em Estoque</Text> : <View></View>}
                        </View>
                    );
                })}
                {order.status == 'Concluído' || order.status == 'Cancelado' ? <></> : 
                    <View style={styles.buttonView}>
                        {noStock ? <></> :
                            <Button text={textButton} onpress={() => setStatus(statusButton)} />
                        }
                        <View style={styles.cancelButtonView}>
                            <TouchableOpacity onPress={() => setStatus('Cancelado')}>
                                <Text style={styles.cancelButtonText}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#f0f0f0',
        flex: 1,
        paddingTop: 5,
        paddingLeft: 5,
    },
    heading:{
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#1E2F5C',
    },
    viewPricing:{
        flexDirection: 'row',
        marginBottom: 30,
    },
    pricing:{
        color:'#68C03F',
        fontWeight: 'bold',
        fontSize: 16,
        marginRight: 15,
    },
    productList:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
    },
    itemList:{
        color:'#1E2F5C',
        fontWeight: 'bold',
        fontSize: 16,
        width: '33%',
    },
    itemListStatus:{
        color:'red',
        fontWeight: 'bold',
        fontSize: 13,
        alignSelf: 'center',
    },
    buttonView:{
        marginTop: 20,
        alignItems: 'center',
    },
    cancelButtonView:{
        marginTop: 55,
    },
    cancelButtonText:{
        color: 'red',
        fontWeight: 'bold',
        fontSize: 16,
        textDecorationLine: 'underline',
    },

});