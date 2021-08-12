import React, { useState } from 'react'
import { Habit } from './src/utils'
import EditView from './src/editView'
import MainView from './src/mainView'

const App = () => {
  // return <DateTimePicker
  //   mode="date"
  //   display="calendar"
  //   value={new Date()}
  // />

  const [habits, setHabits] = useState([])
  const [toEditId, setToEditId] = useState(null)
  
  const setHabit = (newHabit) => {
    const newHabits = habits.filter(h => h.id != newHabit.id)
    newHabits.push(newHabit)
    newHabits.sort((h1, h2) => h1.id - h2.id)
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
      setHabit={setHabit}
    />

  const editHabit = habits.find(h => h.id === toEditId)
  console.assert(!editHabit, "There is no habit with id", toEditId, 'was found!')
  return <EditView
    habit={editHabit}
    setHabit={setHabit}
    closeView={() => setToEditId(null)}
  />
};

export default App;
