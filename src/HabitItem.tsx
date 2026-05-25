import type { Habit, Record } from "./types"
import { useState } from "react"


type Props = {
    habit: Habit
    record?: Record
    onDeleteHabits: (id: number) => void
    onEditHabits: (id: number, text: string) => void
    onToggleHabits: (id: number) => void
}

function HabitItem({habit, record, onDeleteHabits, onEditHabits, onToggleHabits} : Props) {

    const [editingId, setEditingId] = useState<boolean>(false)
    const [editText, setEditText] = useState<string>(habit.name)

    return (
        <>
            <div>
                <button onClick={() => onToggleHabits(habit.id)}>{record?.completed ? "☑" : "□"}</button>
                {editingId ?
                    <input
                      value={editText}
                      autoFocus
                      onChange={(e) => setEditText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            onEditHabits(habit.id, editText)
                            setEditingId(false)
                        }
                      }}
                    /> : <div>{habit.name}</div>
                }
                
                {editingId ? 
                    <button onClick={() => {onEditHabits(habit.id, editText), setEditingId(false)}}>保存</button>:
                    <button onClick={() => setEditingId(true)}>編集</button>
                }
                <button onClick={() => onDeleteHabits(habit.id)}>消去</button>
            </div>
        </>
    )
}

export default HabitItem