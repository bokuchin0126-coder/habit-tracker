import { useState, useEffect } from "react" 
import type { DailyHabit } from "../types/types"

function useHabits() {

    const [dailyHabits, setDailyHabits] = useState<DailyHabit[]>(() => {
        const saved = localStorage.getItem("dailyHabits")
        return saved ? JSON.parse(saved) : []
    })
    
    const [inputText, setInputText] = useState<string>("")
    const [error, setError] = useState<string | null>(null)
    const today = new Intl.DateTimeFormat("ja-JP", {
        timeZone: "Asia/Tokyo",
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    }).format(new Date())

    const [selectedDate, setSelectedDate] = useState(today)
    const currentDate = dailyHabits.find(day => day.date === selectedDate)
    const currentHabits = currentDate?.habits ?? []
    const currentRegistration = currentDate?.registration ?? false

    useEffect(() => {
        localStorage.setItem("dailyHabits", JSON.stringify(dailyHabits))
    }, [dailyHabits])

    const handleAddHabits = () => {
        if (inputText.trim() === "") return 
        if (!currentDate) {
            try {
                setDailyHabits(prev => [...prev,{
                    date: selectedDate,
                    registration: false,
                    habits: [{
                        id: Date.now(),
                        name: inputText,
                        completed:false
                    }]
                }])
            } catch {
                setError("リストの追加に失敗しました")
            } finally {
                setError(null)
                setInputText("")
            }
        } else {
            try {
                setDailyHabits(prev => prev.map(day => {
                    if (day.date !== selectedDate) {
                        return day
                    }
                    return {
                        ...day,
                        habits: [
                            ...day.habits,
                            {
                                id: Date.now(),
                                name: inputText,
                                completed: false
                            }
                        ]
                    }
                }))
            } catch {
                setError("追加出来ませんでした")
            } finally {
                setError(null)
                setInputText("")
            }
        }
    }

    const handleDeleteHabits = (id: number) => {
        try {
            setDailyHabits(prev => prev.map(day => {
                if (day.date !== selectedDate) {
                    return day
                }
                return {
                    ...day,
                    habits: day.habits.filter(habit => habit.id !== id)
                }
            }))
        } catch {
            setError("リストの消去に失敗しました")
        } finally {
            setError(null)
        }
    }

    const handleEditHabits = (id: number, text: string) => {
        if (text.trim() === "" ) return

        try {
            setDailyHabits(prev => prev.map(day => {
                if (day.date !== selectedDate) {
                    return day
                }
                return {
                    ...day,
                    habits: day.habits.map(habit => (
                        habit.id === id ? {...habit, name: text} : habit
                    ))
                }
            }))
        } catch {
            setError("編集に失敗しました")
        } finally {
            setError(null)
        }
    }

    const handleToggleHabits = (id: number) => {
        try {
            setDailyHabits(prev => prev.map(day => {
                if (day.date !== selectedDate) {
                    return day
                }
                return {
                    ...day,
                    habits: day.habits.map(habit => (
                        habit.id === id ? {...habit, completed: !habit.completed} : habit
                    ))
                }
            }))
        } catch {
            setError("タグ切り替えに失敗しました")
        } finally {
            setError(null)
        }
    }

    const handleChangeRegistration = () => {
        try {
            setDailyHabits(prev => prev.map(day => {
                if (day.date !== selectedDate) {
                    return day
                }
                return {
                    ...day,
                    registration: !day.registration
                }
            }))
        } catch {
            setError("登録に失敗しました")
        } finally {
            setError(null)
        }
    }

    const changeDate = (number: number) => {
        const date = new Date(selectedDate)
        date.setDate(date.getDate() + number)

        const todayDate = new Date(today)
        if (date > todayDate) return today

        const formatted = new Intl.DateTimeFormat("ja-JP", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
        }).format(date)
        setSelectedDate(formatted)
    } 

    const specifyPeriod = (days: number) => {
        const targetDate = new Date(selectedDate)
        targetDate.setDate(targetDate.getDate() - days)

        const filterDays = dailyHabits.filter(day => {
            const dayDate = new Date(day.date)
            return dayDate >= targetDate
        })

        const allHabits = filterDays.flatMap(day => day.habits)
        const wholeNumber = allHabits.length
        if (wholeNumber === 0) return 0
        const completedNumber = allHabits.filter(habit => habit.completed).length

        return Math.floor((completedNumber / wholeNumber) * 100)
    }

    const totalAchievement = () => {
        const allHabits = dailyHabits.flatMap(day => day.habits)
        const wholeNumber = allHabits.length
        if (wholeNumber === 0) return 0
        const completedNumber = allHabits.filter(habit => habit.completed).length

        return Math.floor((completedNumber / wholeNumber) * 100)
    }

    const todayAchievement = () => {
        const todayDate = dailyHabits.find(day => day.date === today)
        const todayHabits = todayDate?.habits ?? []
        if (todayHabits.length === 0) return 0
        const todayCompleted = todayHabits.filter(habit => habit.completed).length

        return Math.floor((todayCompleted / todayHabits.length) * 100)
    }

    const bestAchievement = () => {
        const rationalization = dailyHabits.map(day => {
            const habits = day.habits
            if (habits.length === 0) return 0
            const completed = habits.filter(h => h.completed).length
            return Math.floor((completed / habits.length) * 100)
        })
        return Math.max(...rationalization)
    }

    return {
        dailyHabits,
        inputText,
        setInputText,
        today,
        error,
        selectedDate,
        currentRegistration,
        currentHabits,
        changeDate,
        totalAchievement,
        todayAchievement,
        bestAchievement,
        specifyPeriod,
        handleAddHabits,
        handleDeleteHabits,
        handleToggleHabits,
        handleEditHabits,
        handleChangeRegistration
    }
}

export default useHabits