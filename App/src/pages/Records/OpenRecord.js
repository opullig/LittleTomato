import React, { useState, useEffect } from 'react';
import { ScrollView, Text, TextInput, StyleSheet, View, TouchableOpacity, ToastAndroid, LogBox } from 'react-native';

import DefaultBar from '../../components/Bars/DefaultBar';
import Button from '../../components/Form/Button';
import api from '../../services/api';


export default function OpenRecord({ navigation }){
    LogBox.ignoreAllLogs(true);
    
    const [record, setRecord] = useState('');
    const [recordItems, setRecordItems] = useState('');
    const [products, setProducts] = useState('');
    const [filter, setFilter] = useState('');
    const [date, setDate] = useState('');

    useEffect(() => {
        let isCancelled = false;
        const runAsync = async () => {
          try {
            if (!isCancelled) { 
                setRecord(navigation.state.params)   
            }
          } catch (e) {
            if (!isCancelled) { throw e; }
          }
        };
        runAsync();
        return () => {
          isCancelled = true;
        };
    }, [])
    
    useEffect(() => {
        let isCancelled = false;
        const runAsync = async () => {
          try {
            if (!isCancelled) { 
                getItems();
                cleanDate();
            }
          } catch (e) {
            if (!isCancelled) { throw e; }
          }
        };
        runAsync();
        return () => {
          isCancelled = true;
        };
    },[record])

    useEffect(() => {
        let isCancelled = false;
        const runAsync = async () => {
          try {
            if (!isCancelled) {
                if(record.record_number != null)
                getRecordItems();
            }
          } catch (e) {
            if (!isCancelled) { throw e; }
          }
        };
        runAsync();
        return () => {
          isCancelled = true;
        };
    },[products]);

    function cleanDate(){
        if(record.date != null){
            let date = record.date
            date = date.substring(0,19);
            date = date.replace('T', ' ');
            setDate(date);
        }
    }
    
    async function getItems(){
        const { data } = await api.get('/products');
        setProducts(data);
    }

    async function getRecordItems(){
        try{
            const { data } = await api.get(`/records/item/${record.record_number}`);
            let itemList = [];
            data.map(item => {
                let name = ''
                const itemObj = {}
                products.map(product => {
                    if(product.id == item.product)
                        name = product.name;  
                })
                itemObj.name = name;
                itemObj.product = item.product;
                itemObj.amount = item.amount;
                itemObj.id = item.id;
                itemObj.record_number = item.record_number;
                
                itemList.push(itemObj);
            });
            setRecordItems(itemList);
        }catch(e){console.error(e)}
    }

    async function remove(id, index){
        await api.delete(`/records/item/${id}`);
        recordItems.splice(index,1);
        getRecordItems();
        ToastAndroid.showWithGravity('Removido', ToastAndroid.SHORT,ToastAndroid.BOTTOM);
    }
    
    async function closeRecord(id){
        if(recordItems.length != 0){
            await api.put(`/records/update/${id}`, {status: 'Fechado'});
            recordItems.map(item => {
                addAmountProduct(item.product, { amount: item.amount, operator: 'plus' });  
            });
            ToastAndroid.showWithGravity('Nota Fechada', ToastAndroid.SHORT,ToastAndroid.BOTTOM);
            navigation.navigate('Records');
        }
    }

    async function addAmountProduct(id,data){
        await api.put(`/products/amount/${id}`, data);
    }

    return(
        <>
            <DefaultBar title={`Nota - ${date}`} back={true} onPress={() => navigation.navigate('Records')}/>
            <View style={styles.container}>
                {record.status != 'Fechado' ?
                    <View style={styles.viewDefault}>
                        <TextInput value={filter} onChangeText={setFilter} placeholder='Procurar Item' />
                        <View style={styles.viewTitle}>
                            <Text style={styles.title}>Produtos</Text>
                        </View>
                        <ScrollView >
                            {products.length == 0 ? <></> : products.map((product, index) => {
                                const name = product.name.toLowerCase();
                                if(name.match(filter.toLowerCase())){
                                    return(
                                        <View key={index}>
                                            <TouchableOpacity style={styles.touchProduct} onPress={() => navigation.navigate('RecordItem', {product, record})}>
                                                <Text style={styles.textProduct}>{product.name}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    );
                                }
                            })}
                        </ScrollView>
                    </View>
                    : <></>
                }
                <View style={styles.viewDefault}>
                    <View style={styles.viewTitle}>
                        <Text style={styles.title}>Itens na Nota</Text>
                    </View>
                    <ScrollView>
                        {recordItems.length == 0 ? <></> : recordItems.map((item, index) => {
                            return(
                                <View key={index}>
                                    <TouchableOpacity style={styles.orderItem} onPress={() => {record.status != 'Fechado' ? remove(item.id): ''}}>
                                        <Text style={styles.textProduct}>{item.amount}x</Text>
                                        <Text style={styles.textProduct}>{item.name}</Text>
                                    </TouchableOpacity>
                                </View>
                                );
                        })}
                    </ScrollView>
                    {record.status != 'Fechado' ? 
                        <View style={recordItems.length == 0 ? styles.hidden : styles.show}>
                            <View style={styles.btnView}>
                                <Button text='Fechar Pedido' onpress={() => closeRecord(record.record_number)} />
                            </View>
                        </View>
                        : <></>
                    }
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 10,
    },
    icon:{
        resizeMode: 'contain',
        width: 16,
        height: 16,
    },
    viewTitle:{
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    title:{
        fontSize: 18,
        fontWeight:'bold',
        color: '#3A435C',
        paddingLeft: 3,
    },
    show:{ display:'flex', },
    hidden:{ display:'none' },
    btnView:{
        alignItems: 'center',
        marginVertical: 25,
    },
    textProduct:{
        fontSize: 16,
        fontWeight: 'bold',
        color: '#3A435C',
    },
    viewDefault:{
        height: '50%',
        paddingBottom: 15,
    },
    touchProduct:{
        padding: 5,
        marginVertical: 5,
    },
    orderItem:{
        flexDirection: 'row',
        marginBottom: 10,
    },
});