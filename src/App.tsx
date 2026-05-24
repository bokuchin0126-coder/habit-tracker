import { useState } from 'react'
import type { Habit, Record } from "./types"

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

        try {
            setHabits(prev => [...prev, {
                id: Date.now(),
                name: inputText
            }])
            setRecords(prev => [...prev, {
                date: today,
                habitId: Date.now(),
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
            <div>
                {habits.map(h => (
                    <div key={h.id}>
                        <p>{h.name}</p>
                        <button onClick={() => handleDeleteHabits(h.id)}>消去</button>
                    </div>
                ))}
            </div>
        </>
    )
}

export default App