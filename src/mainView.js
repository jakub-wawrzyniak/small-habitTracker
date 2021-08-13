import React, { Fragment, useState } from 'react';
import { style, colors } from './style';
import { View, Button, Pressable, FlatList,
    Text, StyleSheet, Modal } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'

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

const DateSelecor = ({date, setDate, onPress}) => {
    const st = StyleSheet.create({
        outerView: {
            flexDirection: 'row',
            justifyContent: 'center',
            marginVertical: 10,
        },
        innerView: {
            paddingVertical: 10,
            paddingHorizontal: 25,
            width: "60%",
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        text: {
            fontWeight: 'bold'
        }
    })
    
    const handleDaySwitch = (isNext) => {
        let off = isNext ? 1 : -1
        off *= 24 * 60 * 60 * 1000
        const newDate = new Date(date.getTime() + off)
        setDate(newDate)
    }
    
    return <View style={[style.appFrame, st.outerView]}>
        <View style={st.innerView}>
            <Pressable onPress={()=>handleDaySwitch(false)}>
                <Text style={style.h3}>&lt;</Text>
            </Pressable>
            <Pressable onPress={onPress}><Text style={[style.h4, st.text]}>{
                date.toUTCString().slice(0, 11)
            }</Text></Pressable>
            <Pressable onPress={()=>handleDaySwitch(true)}>
                <Text style={style.h3}>&gt;</Text>
            </Pressable>
        </View>
    </View>
}

const HabitStatusButtons = ({habit, editHabitStatus}) => {
  const style = StyleSheet.create({
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
  
  let jsx = []
  for (let type of [["V", "isDone"], ["X", "isMissed"]]) {
    const color = habit[type[1]]
      ? colors.primary
      : colors.light;
    
    const handlePress = () => {
      const newHabit = habit.copy()
      newHabit.isDone = newHabit.isMissed =  false
      newHabit[type[1]] = !habit[type[1]]
      editHabitStatus(newHabit)
    }

    jsx.push(
      <View style={style.habitButton} key={type[0]}>
        <Button title={type[0]} color={color} onPress={handlePress}/>
      </View>
    )
  }

  return <View style={style.habitButtons}>{jsx}</View>
}

const HabitElement = ({habit, enterEditView, editHabitStatus}) => {
  const st = StyleSheet.create({
    habitElement: {
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: colors.light,
      marginVertical: 5,
      padding: 10,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    }
  })
  
  return <View style={st.habitElement}>
    <HabitStatusButtons habit={habit} editHabitStatus={editHabitStatus}/>
    <Pressable onPress={() => enterEditView(habit.id)}>
      <Text style={[style.h3, style.right]}>{habit.title}</Text>
      <Text style={[style.p, style.right]}>{habit.description}</Text>
    </Pressable>
  </View>
}

const HabitList = ({habits, editHabitStatus, enterEditView}) => {
    if (habits.length == 0)
        return <CenteredMessage>No habit has been created</CenteredMessage>
    return <FlatList data={habits} style={style.appFrame}
    renderItem={
        ({item: habit}) =>
        <HabitElement id={habit.id} habit={habit}
        enterEditView={enterEditView} editHabitStatus={editHabitStatus}/>}/>
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

const MainView = ({
    habits,
    addHabit,
    enterEditView,
    editHabitStatus,
    date,
    setDate,
}) => {
  const [isCalendarVisible, setIsCalendarVisible] = useState(false)
    return (
  <Fragment>
    <Modal visible={isCalendarVisible} transparent={true}><DateTimePicker
        mode="date"
        display="calendar"
        value={date}
        onChange={(e, newDate) => {setDate(newDate); setIsCalendarVisible(false)}}
    /></Modal>
    <DateSelecor date={date} setDate={setDate} onPress={()=>setIsCalendarVisible(true)}/>
    {habits === null &&
        <CenteredMessage>Loading...</CenteredMessage>}
    {habits !== null &&
        <HabitList
        habits={habits}
        enterEditView={enterEditView}
        editHabitStatus={editHabitStatus}/>}
    <AddHabitButton onPress={addHabit}/>
  </Fragment>
  )
}

export default MainView