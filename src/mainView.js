import React, { Fragment } from 'react';
import { style, colors } from './style';
import { View, Button, Pressable, FlatList,
    Text, StyleSheet } from 'react-native'

const HabitButtons = ({habit, setHabit}) => {
  let jsx = []
  for (let type of [["V", "isDone"], ["X", "isMissed"]]) {
    const color = habit[type[1]]
      ? colors.primary
      : colors.light;
    
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

const HabitView = ({habit, editHabit, setHabit}) => {
  return <View style={style.habitView}>
    <HabitButtons habit={habit} setHabit={setHabit}/>
    <Pressable onPress={() => editHabit(habit.id)}>
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

const MainView = ({habits, editHabit, addHabit, setHabit}) => {
  return (
  <Fragment>
    <FlatList data={habits} style={style.appFrame}
    renderItem={({item: habit}) =>
      <HabitView key={habit.id} habit={habit}
        editHabit={editHabit} setHabit={setHabit}/>}/>
    <AddHabitButton onPress={addHabit}/>
  </Fragment>
  )
}

export default MainView