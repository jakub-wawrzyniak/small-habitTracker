import React, { useState, useEffect } from 'react'
import { data } from './src/utils'
import EditView from './src/editView'
import MainView from './src/mainView'

const App = () => {
  const [date, setDate] = useState(new Date())
  const [habits, setHabits] = useState(null)
  const [toEditId, setToEditId] = useState(null)
  const dateStamp = date.toDateString()
  
  const getHabits = async () => {
    const newHabits = await data.getHabits(dateStamp)
    setHabits(newHabits)
  }
  useEffect(getHabits, [date])
  useEffect(() => {
    if (habits === null) getHabits()
  })

  const editHabitInfo = (newHabit) => {
    data.editHabitInfo(newHabit)
    getHabits()
  }
  const editHabitStatus = (newHabit) => {
    data.editHabitStatus(newHabit, dateStamp)
    getHabits()
  }
  const addHabit = () => {
    data.addHabit()
    getHabits()
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
