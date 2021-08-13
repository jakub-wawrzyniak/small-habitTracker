import React from 'react'
import {View, StyleSheet, Text, Pressable} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import {style} from './style'

const CenteredMessage = ({children}) => {
    const st = StyleSheet.create({
        view: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        text: {
            textAlign: "center",
            fontWeight: 'bold',
            fontSize: 16
        }
    })
    return <View style={st.view}>
        <Text style={st.text}>{children}</Text>
    </View>
}

const DateSelector = ({onPrev, onNext, onPress, children}) => {
    const st = StyleSheet.create({
        outerView: {
            flexDirection: 'row',
            justifyContent: 'center',
            marginVertical: 10,
        },
        innerView: {
            paddingVertical: 10,
            paddingHorizontal: 25,
            width: "90%",
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        text: {
            fontSize: 17,
            fontWeight: 'bold',
            textAlign: 'center',
        },
        el: {
          paddingHorizontal: 15,
          paddingVertical: 2,
        }
    })
    
    return <View style={[style.appFrame, st.outerView]}>
        <View style={st.innerView}>
            <Pressable onPress={onPrev} style={st.el}>
                <Icon name={"chevron-back-outline"} size={22}/>
            </Pressable>
            <Pressable onPress={onPress} style={st.el}><Text style={st.text}>{
                children
                /*  */
            }</Text></Pressable>
            <Pressable onPress={onNext} style={st.el}>
                <Icon name={"chevron-forward-outline"} size={22}/>
            </Pressable>
        </View>
    </View>
}

export {
    CenteredMessage,
    DateSelector
}