import React, {useState, useEffect} from 'react';
import { View, StyleSheet, ScrollView, TextInput, Text, Image, LogBox } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import DefaultBar from '../../components/Bars/DefaultBar';
import api from '../../services/api';

import SearchIcon from '../../assets/search.png';

export default function Sales({navigation}){
    LogBox.ignoreAllLogs(true);

    const [sales, setSales] = useState('');
    const [rawSales, setRawSales] = useState([]);
    const [dataFilter, setDataFilter] = useState('');

    useEffect(() => {
        prepareSale();
    },[])
    
    function back(){
        navigation.navigate('Options')
    }

    async function prepareSale(){
        const { data } = await api.get('/sales');
        setRawSales(data);
    }
    
    function getSales(){
        let sales = {date: dataFilter, products: []}
        const items = []
        const salesItems = [];
        rawSales.map( item =>{
            const objAux = {name:'',amount:0};
            const date = item.date.substring(0,10) 
            if(date.includes(dataFilter)){
                objAux.name = item.name;
                objAux.amount = item.amount;
                items.push(objAux);
            }       
        });
        
        for(let i = 0; i < items.length; i++){
            if(salesItems.length == 0){
                salesItems.push(items[i]);
                i++;
            }
            for(let k = 0; k < salesItems.length; k++){
                if(items[i].name.match(salesItems[k].name)){
                    salesItems[k].amount = salesItems[k].amount + items[i].amount;
                    break;
                }
                if(i == salesItems.length){
                    salesItems.push(items[i]);
                    break;
                }
            }
        }
        sales.products =salesItems;
        setSales(sales);
    }

    return(
        <>
            <DefaultBar title={'Vendas'} onPress={back}  back={true}/>
            <ScrollView style={styles.container}>
                <TextInput style={styles.input} onChangeText={setDataFilter} value={dataFilter} placeholder={'Pesquise por data (AAAA-MM-DD)'} keyboardType='decimal-pad' />
                {dataFilter.length >= 7 ?
                <TouchableOpacity style={styles.button} onPress={getSales}>
                    <Image source={SearchIcon} style={styles.icon} />
                    <Text style={styles.btnText}>Pesquisar</Text>
                </TouchableOpacity>
                :<></>
                }
                    <Text style={styles.title}>{sales.date}</Text>
                {sales != '' && sales.products.length != 0 ? sales.products.map((item, index) => {
                    return(
                        <View style={styles.item}  key={index}>
                            <Text style={styles.itemText}>{item.amount}x</Text>
                            <Text style={styles.itemText}>{item.name}</Text>
                        </View>
                    );
                })
                 :<></>}
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 10,
    },

    input:{
       height: 50,
       marginTop: 5,
       fontSize: 15, 
    },

    button:{
        flexDirection: 'row',
        marginVertical: 10,
        alignItems: 'center',

    },

    icon:{
        width: 14,
        height: 14,
        marginHorizontal: 2,
    },

    btnText:{
        fontSize: 16,
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: '#3A435C',
        
    },

    title:{
        marginVertical: 10,
        alignSelf: 'center',
        justifyContent: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: '#3A435C',
    },

    item:{
        flexDirection: 'row',
        margin: 10,
    },

    itemText:{
        fontSize: 16,
        color: '#3A435C',
        fontStyle: 'italic',
        marginRight: 10,
    },
    
});