import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity,ScrollView, LogBox } from 'react-native';
import  AsyncStorage  from '@react-native-async-storage/async-storage'

import BarNavigation from '../../components/Bars/BarNavigation';
import DefaultBar from '../../components/Bars/DefaultBar';
import Button from '../../components/Form/Button';
import api from '../../services/api';



function Options({ navigation }){
    LogBox.ignoreAllLogs(true);   

    const [user, setUser] = useState('');
    const [access, setAccess] = useState('');
    const [locations, setLocations] = useState('');
    const [orders, setOrders] = useState('');


    useEffect(() => {
        let isCancelled = false;
        const runAsync = async () => {
          try {
            if (!isCancelled) { getUsers(); }
          } catch (e) {
            if (!isCancelled) { throw e; }
          }
        };
        runAsync();
        return () => {
          isCancelled = true;
        };      
    },[]);
    
    useEffect(() => {
        let isCancelled = false;
        const runAsync = async () => {
          try {
            if (!isCancelled) { 
                getLocations();
                getOrders(); 
            }
          } catch (e) {
            if (!isCancelled) { throw e; }
          }
        };
        runAsync();
        return () => {
          isCancelled = true;
        };
    },[user]);

    function getUsers(){
        AsyncStorage.getItem('user').then(data => setUser(data));
        AsyncStorage.getItem('access').then(data => setAccess(data));
    }

    async function getLocations(){
        try{
            const data = await api.get('/locations',{'headers':{
                'Content-Type':'application/json',    
                id:user
            }})
            setLocations(data.data);
        }catch(e){
            setLocations('');
        }
    }

    async function getOrders(){
        if(user != null){
            try{
                const result = await api.get(`/orders`, {'headers':{
                    'Content-Type':'application/json',
                    id: user}
                });
                setOrders(result.data);
            }catch(e){
                setOrders('');
            }
        }
    }

    function logout(){
        AsyncStorage.removeItem('user');
        AsyncStorage.removeItem('access');
        AsyncStorage.removeItem('name');
        AsyncStorage.removeItem('cart');
        navigation.navigate('Login');
    }
    function goTo(page, data = {}){
        navigation.navigate(page, data)
    }

    function goLocation(data = '0'){
        if(data == 0){
         navigation.navigate('Location');   
        }else{
            navigation.navigate('Location', data);
        }
    }
    return(
        <>
            <DefaultBar title='Opções'/>
            <ScrollView style={styles.container}>
                <View style={styles.view}>
                    <TouchableOpacity style={styles.touch} onPress={() => goTo('Account')}>
                        <Text style={styles.text}>Conta</Text>
                    </TouchableOpacity>
                </View>
                {!access ?
                <View>
                    <View style={styles.view}>
                        <Text style={styles.title}>Locais</Text>
                        {locations.length != 0 ? locations.map((location, index) => {
                            
                            return(
                                <TouchableOpacity style={styles.touch} key={index} onPress={() => goLocation(location)}>
                                    <Text style={styles.text} >{location.address}</Text>
                                </TouchableOpacity>
                            )
                            }):<Text></Text>}
                            <TouchableOpacity style={styles.touch} onPress={() => goLocation()}>
                                <Text style={styles.text}>Adicionar Local de Entrega</Text>
                            </TouchableOpacity>
                    </View>
                    <View style={styles.view}>
                        <TouchableOpacity style={styles.touch} onPress={() => goTo('Orders')}>
                            <Text style={styles.title}>Pedidos</Text>
                        </TouchableOpacity>
                        <ScrollView style={styles.viewOrders}>
                            {orders.length == 0 ? <Text>Sem Pedidos</Text> : orders.map((order, index) => {
                                if(order.status != 'Concluído' && order.status != 'Cancelado'){
                                    let date = order.date.substring(0, 19);
                                        date = date.replace('T', ' ') 
                                    return (
                                        <TouchableOpacity key={index} style={styles.btnOrder} onPress={() => goTo('DetailsOrder', order)}>
                                            <Text style={styles.textOrder}>{date}</Text><Text style={styles.textOrder}>{order.status}</Text>
                                        </TouchableOpacity>
                                    )
                                }
                            })}
                            
                        </ScrollView>
                    </View>
                </View> 
                : 
                <View>
                    <TouchableOpacity style={styles.touch} onPress={() => navigation.navigate('AddProfessional')}>
                        <Text style={styles.text}>Cadastrar Profissional</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.touch} onPress={() => navigation.navigate('Sales')}>
                        <Text style={styles.text}>Vendas</Text>
                    </TouchableOpacity>
                </View>
                }
            </ScrollView>
                <View style={styles.btnLogout}>
                    <Button text='Logout' onpress={logout}/>             
                </View>
            <BarNavigation />
        </>
    );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#f0f0f0',
        padding: 10,
    },
    icon:{
        width: 16,
        height: 16,
        resizeMode:"contain",
        marginHorizontal: 5,
    },
    touch:{
        width: '100%',
        height: 40,
        alignContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    text:{
        fontSize: 16,
        fontStyle: 'italic',
    },
    view:{
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    btnLogout:{
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
        justifyContent:'flex-end',
        paddingBottom: 20,
    },
    title:{
        fontSize: 18,
        fontWeight: 'bold',
        color: '#3A435C'
    },
    viewOrders:{
        width: '100%',
        paddingHorizontal: 15,
    },
    btnOrder:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 5,
        height: 60,
    },
    textOrder:{
        fontSize: 14,
        fontStyle: 'italic',
        color: '#000'
    },
});

export default Options;