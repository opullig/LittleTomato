import React, {useEffect, useState} from 'react';
import { Text, View, StyleSheet, Image, ToastAndroid, LogBox} from 'react-native';
import  AsyncStorage  from '@react-native-async-storage/async-storage'

import DefaultBar from '../../components/Bars/DefaultBar';
import Button from '../../components/Form/Button';

import Market from '../../assets/MarketIcon.png';

import api from '../../services/api';

function CloseOrder({ navigation }){
    LogBox.ignoreAllLogs(true);
    
    const [user, setUser] = useState('');
    const [products, setProducts] = useState('');
    const [payment, setPayment] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [total_price , setTotal_price] = useState('');

    useEffect(() => {
        let isCancelled = false;
        const runAsync = async () => {
          try {
            if (!isCancelled) {
                const {payment, location, user, products, cost} = navigation.state.params
                setUser(user);
                setPayment(payment);
                setLocation(location);
                setProducts(products);
                setDate(new Date().toLocaleString('en-US',{timeZone: '-3 UTC'}));
                setTotal_price(cost)
            }
          } catch (e) {
            if (!isCancelled) {
              throw e;
            }
          }
        };
        runAsync();
        return () => {
          isCancelled = true;
        }; 
    },[])
    
    function back(){
        navigation.navigate('Cart');
    }

    async function createOrder(){
        const data = {user, payment, address: location, date, total_price,}
        try{
            const result = await api.post('/orders', data);
            const order_number = result.data.data;
            products.map( async product => {
                try{
                    const data = {
                        name: product.name, 
                        amount: product.amount, 
                        price: product.price, 
                        order_number, 
                        product: product.id}
                    await api.post('/orders/item', data)
                }catch(e){
                    console.error(e)
                }
            });
            await AsyncStorage.removeItem('cart');
            ToastAndroid.showWithGravity('Pedido Enviado', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
        }catch(e){ ToastAndroid.showWithGravity('Ocorreu um Erro no Envio', ToastAndroid.SHORT, ToastAndroid.BOTTOM);}
        
        navigation.navigate('Cart');
    }

    return(
        <>
            <DefaultBar title='Confirmando Pedido' onPress={back} back={true}/>
            <View style={styles.container}>
                <Text style={styles.labelText}>Forma de Pagamento:</Text> 
                <Text style={styles.dataText}>{payment}</Text>
                <Text style={styles.labelText}>Local de Entrega:</Text> 
                <Text style={styles.dataText}>{location}</Text>
                <View style={styles.heading}>
                    <Image source={Market} style={styles.icon}/>
                    <Text style={styles.headingText}>Produtos</Text>
                </View>
                <View style={styles.productList}>
                    {products.length != 0 ? products.map((product,index) => {
                        return(
                            <View key={index} style={styles.productView}>
                                <Text style={styles.productText}>{product.name}</Text><Text style={styles.productText}>R${product.price.replace('.',',')}</Text>
                            </View>
                        );
                    }): <></>}
                </View>
                <View style={styles.totalPriceView}>
                    <Text style={styles.labelText}>Total:</Text> 
                    <Text style={styles.priceText}>R$ {total_price.replace('.',',')}</Text>
                </View>
                <View style={styles.buttonView}>
                    <Button text='Concluir Pedido' onpress={createOrder}/>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 10,
        backgroundColor: '#f0f0f0',
    },
    labelText:{
        color: '#3A435C',
        fontSize: 12,
        fontStyle: 'italic',
    },
    dataText:{
        fontSize: 16,
        paddingLeft: 3,
        marginBottom: 5,
    },
    heading:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    headingText:{
        paddingLeft: 5,
        fontSize: 18,

    },
    icon:{
        resizeMode: 'contain',
        width: 20,
        height: 20,
    },
    productList:{
        marginVertical: 5,
        marginHorizontal: 20,
    },
    productView:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 3,
    },
    productText:{
        fontSize: 14,
        fontStyle: 'italic'
    },
    totalPriceView:{
        marginVertical: 15,
        alignItems: 'flex-end',        
    },
    priceText:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#68C03F',
    },
    buttonView:{
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 30,
    },
})

export default CloseOrder;