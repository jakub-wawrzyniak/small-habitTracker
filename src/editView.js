import React, { useState } from 'react';
import { style, colors } from './style';
import { View, Pressable, TextInput,
    Text, StyleSheet } from 'react-native'

const EditField = ({
    setText,
    label,
    defaultValue
  }) => {
    const st = StyleSheet.create({
      frame: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderColor: colors.dark,
        marginVertical: 10,
        width: "100%"
      },
      text: {
        marginRight: 10,
        fontSize: 15,
        fontWeight: 'bold',
      },
      input: {
        flex: 1,
        fontSize: 16,
        width: '100%'
      }
    })
    return <View style={st.frame}>
      <Text style={st.text}>{label}:</Text>
      <TextInput 
        style={st.input}
        onChangeText={(newText) => setText(newText)} 
        placeholder="Type here..."
        defaultValue={defaultValue}
      />
    </View>
  }
  
  const EditSaveButtons = ({cancel, save}) => {
    const st = StyleSheet.create({
      innerView: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 25,
      },
      btn: {
        flex: 1,
        maxWidth: "48%",
        paddingHorizontal: 40,
        paddingVertical: 12,
        borderRadius: 10,
        backgroundColor: colors.light
      },
      primary: {
        backgroundColor: colors.primary
      }
    })
  
    return <View style={st.innerView}>
      <Pressable style={st.btn} onPress={cancel}>
        <Text style={[style.h4]}>Cancel</Text>
      </Pressable>
      <Pressable style={[st.btn, st.primary]} onPress={save}>
        <Text style={style.h4}>Save</Text>
      </Pressable>
    </View>
  }
  
  const EditView = ({habit, setHabit, closeView}) => {
    const [title, setTitle] = useState(habit.title)
    const [desc, setDesc] = useState(habit.description)
  
    const handleSave = () => {
      const newHabit = habit.copy()
      newHabit.title = title
      newHabit.description = desc
      setHabit(newHabit)
      closeView()
    }
  
    return <View style={style.appFrame}>
      <EditField setText={setTitle} label={'Title'}
        defaultValue={title}/>
      <EditField setText={setDesc} label={'Description'}
        defaultValue={desc}/>
      <EditSaveButtons cancel={closeView} save={handleSave}/>
    </View>
  }
  
export default EditView