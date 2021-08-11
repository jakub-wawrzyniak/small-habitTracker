import React, {Fragment, useState} from 'react';
import {
  ScrollView,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

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

const App = () => {
  const [habits, setHabits] = useState([
    new Habit("my habit","done", "A description")])
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
};

export default App;
