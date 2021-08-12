let habitIdCounter = 0;
class Habit {
  constructor(title, description="") {
    this.title = title
    this.description = description
    this.isDone = false
    this.isMissed = false
    this.id = habitIdCounter;
    habitIdCounter++;
  }

  copy() {
    return Object.assign(new Habit(), this)
  }
}

export { Habit }