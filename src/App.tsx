import { useState, useEffect } from 'react'
import type { Habit, DailyHabit } from "./types"
import HabitItem from "./HabitItem"

function App() {

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
    const registration = currentDate?.registration ?? false

    useEffect(() => {
        localStorage.setItem("dailyHabits", JSON.stringify(dailyHabits))
    }, [dailyHabits])

    useEffect(() => {
        const registeredOnly = dailyHabits.filter(day => day.registration)

        localStorage.setItem(
            "daylyHabits",
            JSON.stringify(registeredOnly)
        )
    }, [])


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

        const formatted = new Intl.DateTimeFormat("ja-JP", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
        }).format(date)
        setSelectedDate(formatted)
    } 

    return (
        <>
            <div>
                <button onClick={() => changeDate(-1)}>←</button>
                <h3>{selectedDate}</h3>
                <button onClick={() => changeDate(+1)}>→</button>
            </div>
            {registration ? "" : 
                <div>
                    <input
                        value={inputText}
                        placeholder="リストを追加..."
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleAddHabits()
                            }
                        }}
                    />
                    {error}
                    <button onClick={handleAddHabits}>追加</button>
                </div>
            }
            {error}
            <div>
                {currentHabits.map(habit => (
                        <HabitItem
                            key={habit.id}
                            habit={habit}
                            registration={registration}
                            onDeleteHabits={handleDeleteHabits}
                            onEditHabits={handleEditHabits}
                            onToggleHabits={handleToggleHabits}
                        />
                ))}
            </div>
            <button onClick={handleChangeRegistration}>
                {registration ? "変更" : "登録"}
            </button>
        </>
    )
}

export default App