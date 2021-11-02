import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { View, Text, Pressable, StyleSheet, FlatList, Modal } from 'react-native'
import { style, colors } from './style'
import { data } from './utils'
import { CenteredMessage, DateSelector } from './components'
import DateTimePicker from '@react-native-community/datetimepicker'


const DAY = 1000*60*60*24

const WeekSelector = ({date, setDate, onPress}) => {
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
        onPress={onPress}>
        {date.getDate()}-{in6Days.getDate()}
        {` ${date.toUTCString().slice(8, 16)}`}
    </DateSelector>
}

const Column = ({header, data, renderer}) => {
    const st = StyleSheet.create({
        view: {
            padding: 5,
            borderColor: colors.dark,
            justifyContent: 'flex-start',
            alignItems: 'center'
        },
        list: {},
        text: {
            fontSize: 17,
            fontWeight: 'bold',
            marginBottom: 15,
        },
    })

    return <View style={st.view}>
        <Text style={st.text}>{header}</Text>
        <FlatList style={st.list} data={data} renderItem={renderer} />
    </View>
}

const DayStat = ({habits, date}) => {
    const st = StyleSheet.create({
        view: {
            marginVertical: 4,
            paddingVertical: 4,
            paddingHorizontal: 2,
            marginHorizontal: 1,
            borderRadius: 4,
        }
    })
    const renderer = ({item: habit}) => {
        let name = 'remove', bgc = colors.verylight
        if (habit.isDone) {name = 'checkmark', bgc = colors.good}
        else if (habit.isMissed) {name = 'close', bgc = colors.bad}
        name += '-outline'
        return <View style={[st.view, {backgroundColor: bgc}]}>
            <Icon name={name} color={colors.dark} size={22} />
        </View>
    }
    return <Column header={date.getDate()}
        data={habits} renderer={renderer}/>
}

const LabelColumn = ({habits}) => {
    const st = StyleSheet.create({
        text: {
            fontSize: 17,
            marginVertical: 8,
        }
    })
    const renderer = ({item: habit}) => {
        let title = habit.title
        if (title.length > 8)
            title = title.slice(0, 13)
        return <Text style={st.text}>{title}</Text>
    }
    return <Column header={"Habit"}
        data={habits} renderer={renderer}/>   
}

const BackButton = ({onPress}) => {
    const st = StyleSheet.create({
        btn: {
            marginVertical: 15,
            paddingHorizontal: 40,
            paddingVertical: 12,
            borderRadius: 10,
            backgroundColor: colors.light
        },
        text: {
            textAlign: "center",
            color: '#fff',
        }
    })
    return <Pressable
        onPress={onPress}
        style={st.btn}>
        <Text style={[style.h4,st.text]}>Go back</Text></Pressable>
}

const StatView = ({closeView}) => {
    const [date, setDate] = useState(new Date())
    const [habits, setHabits] = useState(null)
    const [isCalendarVisible, setIsCalendarVisible] = useState(false)

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
            alignSelf: "center",
            justifyContent: "center",
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
        <Modal
        visible={isCalendarVisible}
        transparent={true}
        onRequestClose={() => {setIsCalendarVisible(false)}}>
        <DateTimePicker
            mode="date"
            display="calendar"
            value={date}
            onChange={(e, newDate) => {setDate(newDate); setIsCalendarVisible(false)}}
        /></Modal>
        <WeekSelector date={date} setDate={setDate} onPress={()=>setIsCalendarVisible(true)}/>
        <View style={st.innerView}>
            <LabelColumn habits={habits[0]}/>
            <FlatList horizontal={true}
                data={habits}
                renderItem={renderItem}
                keyExtractor={(h, id) => id}
            />
        </View>
        <BackButton onPress={closeView}/>
    </View>
}

export default StatView