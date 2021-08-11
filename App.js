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
    // borderWidth: 2,
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
  p: {
    fontSize: 14,
  },
  habitView: {
    borderWidth: 2,
    borderRadius: 10,
    marginVertical: 10,
    padding: 8,
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
    jsx.push(
      <View style={style.btn} key={type[0]}>
        <Button title={type[0]} color={color}/>
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

const App = () => {
  const h1 = new Habit("my habit","done", "A description")
  return (
    <View style={style.frame1}>
      <HabitView habit={h1}></HabitView>
    </View>
  )
};

export default App;
