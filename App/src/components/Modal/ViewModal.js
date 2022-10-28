import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ViewModal({title, visible, ...props}){

    return(
        <Modal animationType='fade' transparent={true} visible={visible}>
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <TouchableOpacity style={styles.modalTitle} onPress={() => props.setVisible(false)}>
                    <Text style={styles.modalTitleText}>{title}</Text>
                    <Text style={styles.modalTitleText}>X  </Text>
                </TouchableOpacity>
                <View style={styles.modalBody}>
                    {props.children}
                </View>
            </View>
        </View>
    </Modal>
    );
}

const styles = StyleSheet.create({
    centeredView:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#38383840'
    },
    modalView:{
        backgroundColor:'#fff',
        width: '90%',
        height:150,
        borderRadius: 10
    },
    modalTitle:{
        backgroundColor: '#6C91E0',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        padding: 4,
        flexDirection: 'row',
        justifyContent:'space-between',
    },
    modalTitleText:{
        color:'#f0f0f0',
        fontWeight:'bold',
    },
    modalBody:{
        backgroundColor: '#f0f0f0',
        flex: 1,
        borderBottomEndRadius: 10,
        borderBottomStartRadius: 10,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    modalBodyText:{
        marginTop: 10,
        fontSize: 16,
    },
    viewButton:{
        width: '100%',
        alignItems: 'center',
        marginTop: 20
    }
});