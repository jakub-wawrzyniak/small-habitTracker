import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { View, Text, Pressable, StyleSheet, FlatList } from 'react-native'
import { style, colors } from './style'
import { data } from './utils'
import { CenteredMessage, DateSelector } from './components'

const DAY = 1000*60*60*24

const WeekSelector = ({date, setDate}) => {
    const in6Days = new Date()
    in6Days.setTime(date.getTime()+DAY*6)

    const handleWeekChange = (isNext) => {
        const off = isNext ? 7*DAY : -7*DAY
        const newDate = new Date()
        newDate.setTime(date.getTime() + off)
        setDate(newDate)
    }

    return <DateSelector
        onNext={() => handleWeekChange(true)}
        onPrev={() => handleWeekChange(false)}
        onPress={()=>{}}>
        {date.getDate()}-{in6Days.getDate()}
        {` ${date.toUTCString().slice(8, 16)}`}
    </DateSelector>
}

const Column = ({header, data, renderer}) => {
    const st = StyleSheet.create({
        view: {
            margin: 5,
            padding: 5,
            borderColor: colors.dark,
            justifyContent: 'flex-start',
            alignItems: 'center'
        },
        list: {},
        text: {
            fontSize: 17,
            fontWeight: 'bold',
            marginBottom: 10,
        },
        icon: {
            marginVertical: 5,
        }
    })

    return <View style={st.view}>
        <Text style={st.text}>{header}</Text>
        <FlatList style={st.list} data={data} renderItem={renderer} />
    </View>
}

const DayStat = ({habits, date}) => {
    const renderer = ({item: habit}) => {
        let name = habit.isDone
            ? 'checkmark'
            : habit.isMissed 
                ? 'close'
                : 'remove'
        name += '-outline'
        return <Icon style={{marginVertical: 5}} key={habit.id} name={name} color={colors.dark} size={22} />
    }
    return <Column header={date.getDate()}
        data={habits} renderer={renderer}/>
}

const LabelColumn = ({habits}) => {
    const st = StyleSheet.create({
        text: {
            fontSize: 17,
            marginVertical: 5,
        }
    })
    const renderer = ({item: habit}) => {
        return <Text style={st.text}>{habit.title}</Text>
    }
    return <Column header={"Habit"}
        data={habits} renderer={renderer}/>   
}

const StatView = () => {
    const [date, setDate] = useState(new Date())
    const [habits, setHabits] = useState(null)

    const getHabits = async () => {
        const promises = []
        for (let off = 0; off < DAY*7; off += DAY) {
            const thisDate = new Date()
            thisDate.setTime(date.getTime() + off)
            const dateStamp = thisDate.toDateString()
            promises.push(data.getHabits(dateStamp))
        }
        const newHabits = []
        for (let i = 0; i < 7; i++)
            newHabits[i] = await promises[i]
        setHabits(newHabits)
    }
    useEffect(getHabits, [date])

    const st = StyleSheet.create({
        view: {
            flex: 1,
        },
        innerView: {
            flexDirection: 'row',
        },
        list: {
            flexDirection: 'column'
        }
    })

    if (habits === null) return <View style={st.view}>
        <WeekSelector date={date} setDate={setDate}/>
        <CenteredMessage>Loading...</CenteredMessage>
    </View>

    const renderItem = ({item: habits, index}) => {
        const statDate = new Date()
        statDate.setTime(date.getTime() + index*DAY)
        return <DayStat date={statDate} habits={habits}/>
    }

    return <View style={st.view}>
        <WeekSelector date={date} setDate={setDate}/>
        <View style={st.innerView}>
            <LabelColumn habits={habits[0]}/>
            <FlatList horizontal={true} data={habits}
                renderItem={renderItem}
            />
        </View>
    </View>
}

export default StatView