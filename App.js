import React, { useState } from 'react'
import { Habit, data } from './src/utils'
import EditView from './src/editView'
import MainView from './src/mainView'

const App = () => {
  const [date, setDate] = useState(new Date())
  const dateStamp = date.toDateString()
  const [habits, setHabits] = useState(data.getHabits(dateStamp))
  const [toEditId, setToEditId] = useState(null)
  
  const editHabitInfo = (newHabit) => {
    data.editHabitInfo(newHabit)
    setHabits(data.getHabits(dateStamp))
  }
  const editHabitStatus = (newHabit) => {
    data.editHabitStatus(newHabit, dateStamp)
    setHabits(data.getHabits(dateStamp))
  }
  const addHabit = () => {
    data.addHabit()
    setHabits(data.getHabits(dateStamp))
  }

  if (toEditId == null) return <MainView 
      habits={habits}
      addHabit={addHabit}
      setHabit={editHabitStatus}
      editHabit={(habitId) => setToEditId(habitId)}
      date={date}
      setDate={date => {
        const dateStamp = date.toDateString()
        setDate(date)
        setHabits(data.getHabits(dateStamp))
      }}
    />

  const editHabit = habits.find(h => h.id === toEditId)
  console.assert(!editHabit, "There is no habit with id", toEditId)
  return <EditView
    habit={editHabit}
    setHabit={editHabitInfo}
    closeView={() => setToEditId(null)}
  />
};

export default App;
