import { useState } from 'react'
import type { Habit, Record } from "./types"
import HabitItem from "./HabitItem"

function App() {

    const [habits, setHabits] = useState<Habit[]>([])
    const [records, setRecords] = useState<Record[]>([])
    const [inputText, setInputText] = useState<string>("")
    const [error, setError] = useState<string | null>(null)
    const today = new Intl.DateTimeFormat("ja-JP", {
        timeZone: "Asia/Tokyo",
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    }).format(new Date())
    const recordToday = records.find(day => day.date === today)

    const handleAddHabits = () => {
        if (inputText.trim() === "") return 
        const id = Date.now()
        try {
            setHabits(prev => [...prev, {
                id: id,
                name: inputText
            }])
            setRecords(prev => [...prev, {
                date: today,
                habitId: id,
                completed: false
            }])
        } catch {
            setError("追加出来ませんでした")
        } finally {
            setError(null)
            setInputText("")
        }
    }

    const handleDeleteHabits = (id: number) => {
        try {
            setHabits(prev => prev.filter(h => h.id !== id))
            setRecords(prev => prev.filter(r => r.habitId !== id))
        } catch {
            setError("リストの消去に失敗しました")
        } finally {
            setError(null)
        }
    }

    const handleEditHabits = (id: number, text: string) => {
        if (text.trim() === "" ) return

        try {
            setHabits(prev => prev.map(h => (
                h.id === id ? {...h, name: text} : h
            )))
        } catch {
            setError("編集に失敗しました")
        } finally {
            setError(null)
        }
    }

    const handleToggleHabits = (id: number) => {
        try {
            setRecords(prev => prev.map(r => (
                r.habitId === id ? {...r, completed: !r.completed} : r
            )))
        } catch {
            setError("タグ切り替えに失敗しました")
        } finally {
            setError(null)
        }
    }

    return (
        <>
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
            {error}
            <div>
                {habits.map(habit => {
                    const record = records.find(r => r.habitId === habit.id)

                    return (
                        <HabitItem
                            key={habit.id}
                            habit={habit}
                            record={record}
                            onDeleteHabits={handleDeleteHabits}
                            onEditHabits={handleEditHabits}
                            onToggleHabits={handleToggleHabits}
                        />
                    )
                })}
            </div>
        </>
    )
}

export default App