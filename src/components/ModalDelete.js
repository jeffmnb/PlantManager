import React from 'react';

import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { SvgFromUri } from 'react-native-svg';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export const ModalDelete = ({ onpressCancel, onpressDelete , photo, name}) => {

    return (
        <View style={styles.container}>
            <View style={{ width: 120, height: 120, borderRadius: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.shape }}>
                <SvgFromUri uri={photo} width={80} />
            </View>


            <Text style={styles.txtQuestion}>Deseja mesmo deletar sua {'\n'} <Text style={{fontWeight:'bold'}}>{name}?</Text></Text>

            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={styles.btnResponse} onPress={onpressCancel}>
                    <Text style={styles.txtCancel} onPress={onpressCancel}>
                        Cancelar
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnResponse} onPress={onpressDelete}>
                    <Text style={styles.txtDelete} onPress={onpressDelete}>
                        Deletar
                    </Text>
                </TouchableOpacity>
            </View>


        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        width: 265,
        height: 322,
        backgroundColor: colors.background,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20
    },

    txtQuestion: {
        fontFamily: fonts.text,
        color: colors.heading,
        fontSize: 17,
        textAlign: 'center',
        marginTop: '5%'
    },

    btnResponse: {
        width: 96,
        height: 48,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.shape,
        marginHorizontal: '2%',
        marginTop: '12%'
    },

    txtCancel: {
        fontFamily: fonts.text,
        color: colors.heading,
        fontSize: 15
    },

    txtDelete: {
        fontFamily: fonts.text,
        color: colors.red,
        fontSize: 15
    }
})