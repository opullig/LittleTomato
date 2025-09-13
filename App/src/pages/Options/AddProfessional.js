import React, {useState,useEffect} from 'react';
import {View, Text, StyleSheet, LogBox } from 'react-native';
import  AsyncStorage  from '@react-native-async-storage/async-storage'

import DefaultBar from '../../components/Bars/DefaultBar';
import Button from '../../components/Form/Button';
import Input from '../../components/Form/Inputs';
import api from '../../services/api';

export default function AddProfessional({navigation}){
    LogBox.ignoreAllLogs(true);

    const [users, setUsers] = useState('');
    const [keyLoged, setKeyLoged] = useState('');
    const [professionals, setProfessionals] = useState('');
    const [filter, setFilter] = useState('');
    const [selectedUser, setSelectedUser] = useState({});

    useEffect(()=>{
        getUsers();
        getProfessionals();
        getProfessionalLoged();
        
    },[])

    useEffect(() => {
        if(users.length >= 1){
            findUser();
        }
    },[filter])

    async function getUsers(){
        const {data} = await api.get('/users');
        setUsers(data);
    }

    async function getProfessionalLoged(){
        AsyncStorage.getItem('access').then(data => setKeyLoged(data));
    }
    async function getProfessionals(){
        const {data} = await api.get('/professionals');
        setProfessionals(data);
    }

    function findUser(){
        let objUser = {};
        users.map(user => {
            if(filter.match(user.email)){
                objUser = user;
                professionals.map(professional => {
                    if(professional.user == user.id){
                        objUser.access = professional.access_key;
                    }
                });
            }
        });
        setSelectedUser(objUser);
    }

    function back(){ navigation.navigate('Options'); }

    async function addProfessional(id){
        await api.post('/professionals',{},{'headers':{
            'Content-Type':'application/json',
            user:id,
        }});
        back();
    }

    async function removeProfessional(id){
        await api.delete(`/professionals/delete/${id}`)
        back();
    }
    return(
        <>
            <DefaultBar  title='Cadastrar Profissional' back={true} onPress={() => navigation.navigate('Options')}/>
            <View style={styles.container}>
                <Input value={filter} onChangeText={(data => setFilter(data))}  placeholder={'Digite um e-mail'}/>
                    <Text >{selectedUser.name}</Text>
                    <Text>{selectedUser.email}</Text>
                    {selectedUser.access ? <Text>Profissional</Text> : selectedUser.name != null ? <Text>Usuário Padrão</Text> : <></>}
                <View style={styles.buttonView}>
                    {!selectedUser.access && selectedUser.name != null ? 
                        <Button text='Adicionar Profissional' onpress={() => addProfessional(selectedUser.id)} />
                        : selectedUser.access != 0 && selectedUser.access != null && selectedUser.access != keyLoged ?
                        <Button text='Remover Profissional' onpress={() => removeProfessional(selectedUser.id)}/>
                        :
                        selectedUser.name ? 
                        <Text>Você está logado com esse usuário</Text>
                        :
                        <></>
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
        paddingTop: 15,
        paddingHorizontal: 20,
    },
    buttonView:{
        marginTop: 30,
        alignItems: 'center',
    },
});