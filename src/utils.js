import AsyncStorage from '@react-native-async-storage/async-storage'

class Habit {
  static idCounter = 0;
  static usedIds = new Set()
  constructor(id=Habit.getNewId()) {
    this.title = "New Habit"
    this.description = "Your description"
    this.isDone = false
    this.isMissed = false
    this.id = id
    Habit.usedIds.add(id)
  }

  static getNewId() {
    while (Habit.usedIds.has(Habit.idCounter))
      Habit.idCounter++;
    return Habit.idCounter;
  }

  copy() {
    return Object.assign(new Habit(this.id), this)
  }

}

class Data {
  #habits = []
  #loadedDates = {}
  #areHabitsLoaded = false

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

  async loadHabits() {
    if (this.#areHabitsLoaded) return
    const json = await AsyncStorage.getItem('habits')
    if (json === null) this.#habits = []
    else this.#habits = JSON.parse(json)
    this.#areHabitsLoaded = true
  }
  
  async saveHabits() {
    const json = JSON.stringify(this.#habits)
    await AsyncStorage.setItem('habits', json)
  }
  
  async loadDate(dateStamp) {
    const json = await AsyncStorage.getItem(dateStamp)
    if (json === null) this.#loadedDates[dateStamp] = {}
    else this.#loadedDates[dateStamp] = JSON.parse(json)
  }
  
  async saveDate(dateStamp) {
    const json = JSON.stringify(this.#loadedDates[dateStamp])
    await AsyncStorage.setItem('dateStamp', json)
  }

  async getHabits(dateStamp) {
    await this.loadHabits()
    if (!(dateStamp in this.#loadedDates))
      await this.loadDate(dateStamp)
    const data = this.#loadedDates[dateStamp]

    const habits = this.#habits.map(h => {
      const habit = Object.assign(new Habit(h.id), h)
      if (habit.id in data) {
        const [isDone, isMissed] = data[habit.id]
        habit.isDone = isDone, habit.isMissed = isMissed
      }
      return habit
    })
    return habits
  }

  addHabit() {
    const habit = new Habit()
    const core = {
      id: habit.id,
      title: habit.title,
      description: habit.description,
    }
    this.#habits.push(core)
    this.saveHabits()
  }

  editHabitInfo(newHabit) {
    const {isMissed, isDone, ...core} = newHabit
    const habits = this.#habits.filter(h => h.id !== core.id)
    habits.push(core)
    habits.sort((h1, h2) => h1.id - h2.id)
    this.#habits = habits
    this.saveHabits()
  }

  editHabitStatus(newHabit, dateStamp) {
    const {id, isDone, isMissed} = newHabit
    console.assert(!(isDone && isMissed), "Habit cannot be done and missed at the same time")
    if (isDone || isMissed) 
      this.#loadedDates[dateStamp][id] = [isDone, isMissed]
    else
      delete this.#loadedDates[dateStamp][id]
    this.saveDate(dateStamp)
  }
}

// AsyncStorage.clear()

const data = new Data()
export {
  Habit,
  data,
}