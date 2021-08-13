class Test {
    constructor(value, dummy="1", optional="hi") {
        this.value = value
        this.optional = optional
        this.dummy = dummy
    }
}

const t = new Test()
console.log(t)
delete t.optional
console.log(t)
