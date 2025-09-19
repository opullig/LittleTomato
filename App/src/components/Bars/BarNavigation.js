import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

function BarNavigation() {
  const navigation = useNavigation();
  const [professional, setProfessional] = useState(null);

  useEffect(() => {
    const fetchAccess = async () => {
      try {
        const access = await AsyncStorage.getItem('access');
        setProfessional(access);
      } catch (e) {
        console.error('Erro ao ler AsyncStorage:', e);
      }
    };
    fetchAccess();
  }, []);

  // Configuração dos botões
  const buttons = professional
    ? [
        { label: 'Produtos', page: 'MainProfessional' },
        { label: 'Pedidos', page: 'ProfessionalOrders' },
        { label: 'Notas', page: 'Records' },
        { label: 'Opções', page: 'Options' },
      ]
    : [
        { label: 'Produtos', page: 'MainUser' },
        { label: 'Carrinho', page: 'Cart' },
        { label: 'Opções', page: 'Options' },
      ];

  return (
    <View style={styles.containerBottom}>
      {buttons.map((btn) => (
        <TouchableOpacity
          key={btn.page}
          style={styles.buttonBottom}
          onPress={() => navigation.navigate(btn.page)}
        >
          <Text style={styles.textBottom}>{btn.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  containerBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    backgroundColor: '#6C91E0',
    height: 60,
  },
  buttonBottom: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  textBottom: {
    color: '#f0f0f0',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default BarNavigation;
