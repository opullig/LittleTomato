import React, {useEffect, useState} from 'react';
import { LogBox, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import DefaultBar from '../../components/Bars/DefaultBar';
import BarNavigation from '../../components/Bars/BarNavigation';
import api from '../../services/api';

export default function ProfessionalOrders({navigation}){
    LogBox.ignoreAllLogs(true);
    
    const [pendings, setPendings] = useState('');
    const [status, setStatus] = useState('Em Aberto');

    useEffect(() => {
        getPendings();
    },[])

    useEffect(() => {
        getPendings();
    },[status])
    
    function showDetails(data){ navigation.navigate('DetailsProfessionalOrders', data)}

    async function getPendings(){
        const { data } = await api.get(`/orders/pendings/${status}`)
        setPendings(data);
    }
    
    return(
        <>
            <DefaultBar title='Atendimento de Pedidos' />
            <View style={styles.container}>

            <Picker selectedValue={status} onValueChange={(data) => setStatus(data)} >
                    <Picker.Item label='Em Aberto' value='Em Aberto'/>
                    <Picker.Item label='Em Atendimento' value='Em Atendimento'/>
                    <Picker.Item label='Em Rota de Entrega' value='Em Rota de Entrega'/>
                    <Picker.Item label='Concluído' value='Concluído'/>
                </Picker>
            
            
            <ScrollView>
                {pendings.length == 0 ? <Text>Sem Registro</Text> : pendings.map((pending,index) => {
                    let date = pending.date.substring(0,19);
                    date = date.replace('T', ' ')
                    return(
                        <TouchableOpacity style={styles.itemList} key={index} onPress={() => showDetails(pending)}>
                            <Text style={styles.textDate}>{date}</Text>
                            <Text style={styles.textAddress}>{pending.address}</Text>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
            </View>
            <BarNavigation />
        </>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 15,
    },
    itemList:{
        marginVertical: 10,
    },
    textDate:{
        fontSize: 15,
        fontWeight: 'bold',
        color: '#1E2F5C',
    },
    textAddress:{
        fontStyle: 'italic',
        marginLeft: 5,
        color: '#3A435C',
    },
});