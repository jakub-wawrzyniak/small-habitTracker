import React, {Fragment, useState} from 'react';
import {
  ScrollView,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput
} from 'react-native';


const COLORS = {
  theme: "#1bd",
  dark: "#222",
  light: "#777",
}

var idCounter = 0;
class Habit {
  constructor(title, status="", description="") {
    this.title = title
    this.description = description
    this.status = status // done, '', missed
    this.id = idCounter;
    idCounter++;
  }

  copy() {
    const copy = new Habit()
    copy.title = this.title
    copy.description = this.description
    copy.status = this.status
    return copy
  }
}

const style = StyleSheet.create({
  frame1: {
    borderColor: 'blue',
    margin: 15,
  },
  h1: {
    fontSize: 24,
    textAlign: 'center'
  },
  h3: {
    fontSize: 20
  },
  h4: {
    textAlign: "center",
    fontSize: 16,
    color: "black"
  },
  p: {
    fontSize: 14,
  },
  habitView: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginVertical: 5,
    padding: 10,
    borderColor: '#444',
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  habbitButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 78
  },
  btn: {
    width: 35,
    height: 35
  },
  right: {
    textAlign: "right"
  },
})

const HabbitButtons = ({habit, setHabit}) => {
  let jsx = []
  for (let type of [["V", "done"], ["X", "missed"]]) {
    let color = "#575757";
    if (habit.status.includes(type[1])) color = "#1bd"
    const handlePress = () => {
      const newHabit = habit.copy()
      newHabit.status = habit.status.includes(type[1])
        ? ""
        : type[1]
      setHabit(newHabit)
    }
    jsx.push(
      <View style={style.btn} key={type[0]}>
        <Button title={type[0]} color={color} onPress={handlePress}/>
      </View>
    )
  }

  return <View style={style.habbitButtons}>{jsx}</View>
}

const HabitView = (props) => {
  const [habit, setHabit] = useState(props.habit)
  return <View style={style.habitView}>
    <HabbitButtons habit={habit} setHabit={setHabit}/>
    <View>
      <Text style={[style.h3, style.right]}>{habit.title}</Text>
      <Text style={[style.p, style.right]}>{habit.description}</Text>
    </View>
  </View>
}

const AddHabitButton = ({onPress}) => {
  const style = {
    position: "absolute",
    bottom: 30,
    right: 30,
    width: 50,
    height: 50,
    backgroundColor: "#1bd",
    borderRadius: 50,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center"
  }
  const textStyle = {
    textAlign: "center",
    color: "#fff",
    fontSize: 24,
    fontWeight: "300",
    borderColor:"#000",
    bottom: 2
  }
  return <Pressable style={style} onPress={onPress}>
    <Text style={textStyle}>+</Text>
  </Pressable>
}

const mainView = ({habits, editHabit}) => {
  const handlePress = () => {
    const newHabits = [...habits]
    newHabits.push(new Habit("New habit","", "Your description"))
    setHabits(newHabits)
  }
  return (
  <Fragment>
    <FlatList data={habits} style={style.frame1}
    renderItem={({item: habit}) => <HabitView key={habit.id} habit={habit}/>}/>
    <AddHabitButton onPress={handlePress}/>
  </Fragment>
  )
}

const EditField = ({
  setText,
  label,
  placeholder,
  defaultValue
}) => {
  return <View style={{
    flexDirection: "row",
    alignItems: "center",
    // paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderColor: COLORS.dark,
    // paddingVertical: 0,
    marginVertical: 10,
    width: "100%"}}>
    <Text style={{
      marginRight: 10,
      fontSize: 17}}>{label}:</Text>
    <View style={{flex: 1}}>
      <TextInput 
        style={{fontSize: 16, width: '100%'}}
        onChangeText={(newText) => setText(newText)} 
        placeholder="Type here..."
        defaultValue={defaultValue}
        />
    </View>
  </View>
}

const EditSaveButtons = () => {
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
      backgroundColor: COLORS.light
    },
    highlight: {
      backgroundColor: COLORS.theme
    }
  })

  return <View><View style={st.innerView}>
    <Pressable style={st.btn}>
      <Text style={[style.h4]}>Cancel</Text></Pressable>
    <Pressable style={[st.btn, st.highlight]}><Text style={style.h4}>Save</Text></Pressable>
  </View></View>
}

const EditView = ({habit, setHabit, closeView}) => {
  const [title, setTitle] = useState(habit.title)
  const [desc, setDesc] = useState(habit.description)
  return <View style={style.frame1}>
    <EditField setText={setTitle} label={'Title'}
      defaultValue={title}/>
    <EditField setText={setDesc} label={'Description'}
      defaultValue={desc}/>
    <EditSaveButtons/>
  </View>
}

const App = () => {
  const [habits, setHabits] = useState([
    new Habit("my habit","done", "A description")])
  const [toEdit, setToEdit] = useState(-1)
  
  return <EditView habit={habits[0]}/>
};

export default App;
