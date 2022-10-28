import React, {useEffect, useState, useCallback} from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, RefreshControl, View, AsyncStorage, LogBox } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

import SearchBar from '../../components/Bars/SearchBar';
import BarNavigation from '../../components/Bars/BarNavigation';
import Button from '../../components/Form/Button';
import Modal from '../../components/Modal/ViewModal';

import Plus from '../../assets/plus.png';
import api from '../../services/api';

const wait = (timeout) => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }

export default function Index({ navigation }){
    LogBox.ignoreAllLogs(true);
    
    const [records, setRecords] = useState('');
    const [recordsList, setRecordsList] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [date, setDate] = useState('');
    const [access, setAccess] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const [filter, setFilter] = useState('');
    const [isClosed, setIsClosed] = useState(false);
    const [isOpened, setIsOpened] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        wait(1000).then(() => setRefreshing(false));
    }, []);

    useEffect(() => {
        onRefresh();
        populateView();
        AsyncStorage.getItem('access').then(access => setAccess(access));
        setRecordsList(records.length);
        getDate();
    },[]);

    useEffect(() => {
        populateView();
    }, [recordsList])

    useEffect(() => {
        if(isClosed == true){
            let data = [];
            records.map(record => {
                if(record.status.match('Fechado'))
                    data.push(record);
            });
            setRecords(data);
        }else{
            populateView();
        }
    }, [isClosed])

    useEffect(() => {
        if(isOpened == true){
            let data = [];
            records.map(record => {
                if(record.status.match('Em Aberto'))
                    data.push(record);
            });
            setRecords(data);
        }else{
            populateView();
        }
    }, [isOpened])

    async function populateView(){
        const { data } = await api.get('/records');
        setRecords(data);
    }

    function getDate(){
        const date = new Date().toLocaleString('pt-BR',{timeZone: '-3 UTC'});
        setDate(date);
    }

    async function addNewRecord(){
        getDate()
        try{
            await api.post('/records', {date},{'headers':{
                'Content-Type':'application/json',
                'access_key': access
            }});
        }catch(e){console.error(e)}
        setModalVisible(false);
        setRecordsList('0');
        onRefresh();
    }

    async function openRecord(data){
        navigation.navigate('OpenRecord', data);
    }
    
    return(
        <>
            <SearchBar onChangeText={setFilter} value={filter} />
            <View style={styles.filterView}>
                <View style={styles.filterOption}>
                    <CheckBox value={isOpened} onValueChange={data => setIsOpened(data)} tintColors={{true: '#f0f0f0', false: '#f0f0f0'}}/>
                    <Text style={styles.filterLabel}>Em Aberto</Text>
                </View>
                <View style={styles.filterOption}>
                    <CheckBox value={isClosed} onValueChange={data => setIsClosed(data)} tintColors={{true: '#f0f0f0', false: '#f0f0f0'}}/>
                    <Text style={styles.filterLabel}>Fechados</Text>
                </View>
            </View>
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} style={styles.container}>
                <Modal visible={modalVisible} setVisible={setModalVisible} title='Criar Nova Nota'>
                    <Text style={styles.modalBodyText}>Deseja Criar uma nota nova?</Text>
                    <View style={styles.viewButton}>
                        <Button text='Criar nova nota' onpress={addNewRecord}/>
                    </View>
                </Modal>
                <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.buttonView}>
                    <Image source={Plus} style={styles.icon} />
                    <Text style={styles.buttonText}>Criar Nova Nota</Text>
                </TouchableOpacity>
                {records.length == 0 ? <Text>Sem Cadastro</Text> : records.map((record, index) => {
                    if(record.date.match(filter)){
                        let date = record.date.substring(0,19);
                        date = date.replace('T', ' ')
                        return(
                            <TouchableOpacity key={index} style={styles.buttonRecord} onPress={() => openRecord(record)}>
                                <Text style={styles.buttonRecordText} >{date}</Text>
                                <Text style={styles.buttonRecordText}>{record.status}</Text>
                            </TouchableOpacity>
                            );
                    }
                })}
            </ScrollView>
            <BarNavigation />
        </>
    );
}

const styles = StyleSheet.create({
    container:{ backgroundColor: '#f0f0f0'},
    icon:{
        resizeMode:'contain',
        width: 16,
        height: 16,
        marginRight: 5,
    },
    buttonView:{
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        padding: 5,
    },
    buttonText:{ fontSize: 16 },
    viewButton:{
        width: '100%',
        alignItems: 'center',
        marginTop: 20
    },
    buttonRecord:{
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderStyle: 'solid',
        borderTopColor: '#1E2F5C',
        borderTopWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    buttonRecordText:{
        fontWeight: 'bold',
        color: '#1E2F5C',
    },
    filterView:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#6C91E0'
    },
    filterOption:{ 
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    filterLabel:{ 
        color: '#f0f0f0',
        fontWeight: 'bold',
    }
});