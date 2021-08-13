let habitIdCounter = 0;
class Habit {
  constructor(isNew=false) {
    this.title = "New Habit"
    this.description = "Your description"
    // this.date = null
    this.isDone = false
    this.isMissed = false
    if (isNew) {
      this.id = habitIdCounter;
      habitIdCounter++;
    }
  }

  copy() {
    return Object.assign(new Habit(), this)
  }
}

class Data {
  #habits = []
  #loadedDates = {}

  constructor() {
    this.#loadHabits()
    this.#loadDate(new Date())
    // this.#habits = [
    //   {id, title, description},
    //   {id, title, description},
    //   {id, title, description},
    // ]
    // this.#loadedDates = {
    //   date: {
    //     id: [isDone, isMissed],
    //     id: [isDone, isMissed],
    //     id: [isDone, isMissed],
    //   },
    // }
    // dateStamp = date.toDateString()
  }

  #loadHabits() {}
  #saveHabits() {}

  #loadDate(dateStamp) {
    this.#loadedDates[dateStamp] = {}
  }
  #saveDate(dateStamp) {}

  getHabits(dateStamp) {
    if (!(dateStamp in this.#loadedDates))
      this.#loadDate(dateStamp)
    const data = this.#loadedDates[dateStamp]

    const habits = this.#habits.map(h => {
      const habit = Object.assign(new Habit(), h)
      if (habit.id in data) {
        const [isDone, isMissed] = data[habit.id]
        habit.isDone = isDone, habit.isMissed = isMissed
      }
      return habit
    })
    return habits
  }

  addHabit() {
    const habit = new Habit(true)
    const core = {
      id: habit.id,
      title: habit.title,
      description: habit.description,
    }
    this.#habits.push(core)
    this.#saveHabits()
  }

  editHabitInfo(newHabit) {
    const {isMissed, isDone, ...core} = newHabit
    const habits = this.#habits.filter(h => h.id !== core.id)
    habits.push(core)
    habits.sort((h1, h2) => h1.id - h2.id)
    this.#habits = habits
    this.#saveHabits()
  }

  editHabitStatus(newHabit, dateStamp) {
    const {id, isDone, isMissed} = newHabit
    console.assert(!(isDone && isMissed), "Habit cannot be done and missed at the same time")
    if (isDone || isMissed) 
      this.#loadedDates[dateStamp][id] = [isDone, isMissed]
    else
      delete this.#loadedDates[dateStamp]
    this.#saveDate(dateStamp)
  }
}


const test = () => {
  const data = new Data()
  const dateStamp = new Date().toDateString()
  let habits = data.getHabits(dateStamp)
  console.log(habits)

  data.addHabit()
  habits = data.getHabits(dateStamp)
  console.log(habits)

  let habit = habits[0]
  habit.title = "a completely new title"
  data.editHabitInfo(habit)
  habits = data.getHabits(dateStamp)
  console.log(habits)

  habit = habits[0]
  habit.isDone = true
  data.editHabitStatus(habit, dateStamp)
  habits = data.getHabits(dateStamp)
  console.log(habits)
}

// test()
const data = new Data()
export {
  Habit,
  data,
}