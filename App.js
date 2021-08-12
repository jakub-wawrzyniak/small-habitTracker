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
  primary: "#1bd",
  dark: "#222",
  light: "#777",
}

let habitIdCounter = 0;
class Habit {
  constructor(title, description="") {
    this.title = title
    this.description = description
    // this.status = status // done, '', missed
    this.isDone = false
    this.isMissed = false
    this.id = habitIdCounter;
    habitIdCounter++;
  }

  copy() {
    return Object.assign(new Habit(), this)
  }
}

const style = StyleSheet.create({
  h1: {
    fontSize: 24,
    textAlign: 'center'
  },
  h2:{
    fontSize: 22,
    textAlign: 'left'
  },
  h3: {
    textAlign: 'right',
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
  right: {
    textAlign: "right"
  },
  
  appFrame: {
    margin: 15,
  },
  habitView: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.light,
    marginVertical: 5,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  habitButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 78
  },
  habitButton: {
    width: 35,
    height: 35
  },
})

const HabitButtons = ({habit, setHabit}) => {
  let jsx = []
  for (let type of [["V", "isDone"], ["X", "isMissed"]]) {
    const color = habit[type[1]]
      ? COLORS.primary
      : COLORS.light;
    
    const handlePress = () => {
      const newHabit = habit.copy()
      newHabit.isDone = newHabit.isMissed =  false
      newHabit[type[1]] = !habit[type[1]]
      setHabit(newHabit)
    }

    jsx.push(
      <View style={style.habitButton} key={type[0]}>
        <Button title={type[0]} color={color} onPress={handlePress}/>
      </View>
    )
  }

  return <View style={style.habitButtons}>{jsx}</View>
}

const HabitView = (props) => {
  const [habit, setHabit] = useState(props.habit)
  return <View style={style.habitView}>
    <HabitButtons habit={habit} setHabit={setHabit}/>
    <Pressable onPress={() => props.edit(habit.id)}>
      <Text style={[style.h3, style.right]}>{habit.title}</Text>
      <Text style={[style.p, style.right]}>{habit.description}</Text>
    </Pressable>
  </View>
}

const AddHabitButton = ({onPress}) => {
  const st = StyleSheet.create({
    press: {
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
    },
    text: {
      color: "#fff",
      bottom: 2
    }
  })

  return <Pressable style={st.press} onPress={onPress}>
    <Text style={[style.h2, st.text]}>+</Text>
  </Pressable>
}

const MainView = ({habits, editHabit, addHabit}) => {
  return (
  <Fragment>
    <FlatList data={habits} style={style.appFrame}
    renderItem={({item: habit}) =>
      <HabitView key={habit.id} habit={habit} edit={editHabit}/>}/>
    <AddHabitButton onPress={addHabit}/>
  </Fragment>
  )
}

const EditField = ({
  setText,
  label,
  placeholder,
  defaultValue
}) => {
  const st = StyleSheet.create({
    frame: {
      flexDirection: "row",
      alignItems: "center",
      // paddingHorizontal: 5,
      borderBottomWidth: 1,
      borderColor: COLORS.dark,
      // paddingVertical: 0,
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
      backgroundColor: COLORS.light
    },
    primary: {
      backgroundColor: COLORS.primary
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

const App = () => {
  const [habits, setHabits] = useState([
    new Habit("my habit", "A description")])
  const [toEditId, setToEditId] = useState(null)
  
  const setHabit = (newHabit) => {
    const newHabits = habits.filter(h => h.id != newHabit.id)
    newHabits.push(newHabit)
    setHabits(newHabits)
  }
  const addHabit = () => {
    const newHabits = [...habits]
    newHabits.push(new Habit("New habit", "Your description"))
    setHabits(newHabits)
  }

  if (toEditId == null) return <MainView 
      habits={habits} addHabit={addHabit}
      editHabit={(habitId) => setToEditId(habitId)}
    />

  const editHabit = habits.find(h => h.id === toEditId)
  console.assert(!editHabit, "There no habit with id", toEditId, 'was found!')
  return <EditView
    habit={editHabit}
    setHabit={setHabit}
    closeView={() => setToEditId(null)}
  />
};

export default App;
