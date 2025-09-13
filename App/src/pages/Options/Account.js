import React, {useState, useEffect} from 'react';
import { View, StyleSheet, ToastAndroid, LogBox, KeyboardAvoidingView, ScrollView } from 'react-native';
import  AsyncStorage  from '@react-native-async-storage/async-storage'

import DefaultBar from '../../components/Bars/DefaultBar';
import Button from '../../components/Form/Button';
import Input from '../../components/Form/Inputs';
import api from '../../services/api';

function Account({navigation}){
    LogBox.ignoreAllLogs(true);

    const [user, setUser] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        AsyncStorage.getItem('user').then(data => setUser(data));
        AsyncStorage.getItem('name').then(data => setName(data));
        AsyncStorage.getItem('email').then(data => setEmail(data));
    },[]);

    async function uptadePassword(){
        if(password.match(confirmPassword)){
            const id = user;
            await api.put(`/users/update/${id}`,{ password });
            ToastAndroid.show('Senha Alterada', ToastAndroid.SHORT);   
            back();
        }
    }

    async function updateUser(){
        if(name != null || email != null){
            const id = user
            await api.put(`/users/update/${id}`, { name, email});
            ToastAndroid.show('Usuário Atualizado', ToastAndroid.SHORT);
            AsyncStorage.setItem('name', name);
            AsyncStorage.setItem('email', email);
            back();
        }
    }

    function back(){
        navigation.navigate('Options');
    }
    return(
        <>
            <DefaultBar title={'Conta'} onPress={back} back={true}/>
            <ScrollView style={styles.maxView}>
            <KeyboardAvoidingView>
                <View style={styles.container}>
                    <View style={styles.view}>
                        <Input name={'name'} placeholder={'Nome'} onChangeText={setName} value={name} />
                        <Input name={'email'} placeholder={'E-Mail'} onChangeText={setEmail} value={email} />
                        <Button onpress={updateUser} text={'Atualizar Usuário'}/>
                    </View>
                    <View style={styles.view}>
                        <Input name={'password'} placeholder={'Senha'} onChangeText={setPassword} value={password} security={true}/>
                        <Input name={'confirmPassword'} placeholder={'Confirme a Senha'} onChangeText={setConfirmPassword} value={confirmPassword} security={true}/>
                        <Button onpress={uptadePassword} text={'Alterar Senha'}/>
                    </View>
                </View>
            </KeyboardAvoidingView>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    maxView:{
        flex: 1,
        backgroundColor: '#f0f0f0',
        paddingTop: 30,
    },
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    view:{
        width: '100%',
        marginBottom: 50,
        alignItems: 'center',
    },
});

export default Account;