import React, {Fragment, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

class Habit {
  constructor(title, status="", description="") {
    this.title = title
    this.description = description
    this.status = status // done, '', missed
  }
}

const style = StyleSheet.create({
  frame1: {
    borderWidth: 2,
    borderColor: 'blue',
    margin: 15,
    padding: 10,
  },
  h1: {
    fontSize: 24,
    textAlign: 'center'
  },
  h3: {
    fontSize: 20
  },
  p: {
    fontSize: 14,
  },
  checked: {
    backgroundColor: "red"
  },
  habitView: {
    borderWidth: 2,
    borderColor: 'magenta',
    // margin: 15,
    // padding: 10,
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
  return <View style={style.habbitButtons}>
    <View style={style.btn}><Button title="V" /></View>
    <View style={style.btn}><Button title="X" /></View>
  </View>
}

const HabitView = ({habit: initHabit}) => {
  const [habit, setHabit] = useState(initHabit)
  return <View style={style.habitView}>
    <HabbitButtons habit={habit} setHabit={setHabit}/>
    <View>
      <Text style={[style.h3, style.right]}>{habit.title}</Text>
      <Text style={[style.p, style.right]}>{habit.description}</Text>
    </View>
  </View>
}

const App = () => {
  const h1 = new Habit("my habit","", "A description")
  return (
    <View style={style.frame1}>
      <HabitView habit={h1}></HabitView>
    </View>
  )
};

export default App;
