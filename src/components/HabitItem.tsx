import type { Habit } from "../types/types"
import { useState } from "react"
import "../App.css"

type Props = {
    habit: Habit
    currentRegistration: boolean
    onDeleteHabits: (id: number) => void
    onEditHabits: (id: number, text: string) => void
    onToggleHabits: (id: number) => void
}

function HabitItem({habit, currentRegistration, onDeleteHabits, onEditHabits, onToggleHabits} : Props) {

    const [editingId, setEditingId] = useState<boolean>(false)
    const [editText, setEditText] = useState<string>(habit.name)

    return (
        <>
            <div className="habit-item">

                {currentRegistration ? <button className="toggle-button"
                onClick={() => onToggleHabits(habit.id)}>{habit.completed ? "☑" : "□"}
                </button> : ""}

                {editingId ?
                    <input
                      className="edit-input"
                      value={editText}
                      autoFocus
                      onChange={(e) => setEditText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            onEditHabits(habit.id, editText)
                            setEditingId(false)
                        }
                      }}
                    /> : 
                    <div className="habit-name">{habit.name}</div>
                }
                
                {currentRegistration ? "" : 
                    <div className="habit-actions">   
                        {editingId ? 
                            <button className="save-button"
                            onClick={() => {onEditHabits(habit.id, editText), setEditingId(false)}}>
                                保存
                            </button>:

                            <button className="edit-button"
                            onClick={() => setEditingId(true)}>
                                編集
                            </button>
                        }

                        <button className="delete-button"
                        onClick={() => onDeleteHabits(habit.id)}>
                            消去
                        </button>

                    </div>
                }
            </div>
        </>
    )
}

export default HabitItem