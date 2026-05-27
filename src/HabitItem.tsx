import type { Habit } from "./types"
import { useState } from "react"


type Props = {
    habit: Habit
    registration: boolean
    onDeleteHabits: (id: number) => void
    onEditHabits: (id: number, text: string) => void
    onToggleHabits: (id: number) => void
}

function HabitItem({habit, registration, onDeleteHabits, onEditHabits, onToggleHabits} : Props) {

    const [editingId, setEditingId] = useState<boolean>(false)
    const [editText, setEditText] = useState<string>(habit.name)

    return (
        <>
            <div>
                {registration ? <button onClick={() => onToggleHabits(habit.id)}>{habit.completed ? "☑" : "□"}</button> : ""}
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
                
                {registration ? "" : 
                    <div>   
                        {editingId ? 
                            <button onClick={() => {onEditHabits(habit.id, editText), setEditingId(false)}}>保存</button>:
                            <button onClick={() => setEditingId(true)}>編集</button>
                        }
                        <button onClick={() => onDeleteHabits(habit.id)}>消去</button>
                    </div>
                }
            </div>
        </>
    )
}

export default HabitItem