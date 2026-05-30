import { Link } from "react-router-dom"
import type { Habit } from "../types/types" 
import HabitItem from "../components/HabitItem"

type Props = {
    inputText: string
    setInputText: (text: string) => void
    error: string | null
    selectedDate: string
    changeDate: (number: number) => void
    registration: boolean
    currentHabits: Habit[]
    onAddHabits: () => void
    onDeleteHabits: (id: number) => void
    onEditHabits: (id: number, text: string) => void
    onToggleHabits: (id: number) => void
    onChangeRegistration: () => void
}

function Home({ inputText, setInputText, error, selectedDate, changeDate, registration, currentHabits, onAddHabits,
onDeleteHabits, onEditHabits, onToggleHabits, onChangeRegistration}: Props) {
    return (
        <>
          <div className="app">
            <div className="date-nav">
                <button onClick={() => changeDate(-1)}>←</button>
                <h3>{selectedDate}</h3>
                <button onClick={() => changeDate(+1)}>→</button>
            </div>

            {registration ? "" : 
                <div className="input-area">
                    <input
                        className="habit-input"
                        value={inputText}
                        placeholder="リストを追加..."
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                onAddHabits()
                            }
                        }}
                    />

                    <button className="app-button" onClick={onAddHabits}>追加</button>
                </div>
            }
            {error}

            <div className="habit-list">
                {currentHabits.map(habit => (
                        <HabitItem
                            key={habit.id}
                            habit={habit}
                            registration={registration}
                            onDeleteHabits={onDeleteHabits}
                            onEditHabits={onEditHabits}
                            onToggleHabits={onToggleHabits}
                        />
                ))}
            </div>

            <button className="mode-button" onClick={onChangeRegistration}>
                {registration ? "変更" : "登録"}
            </button>

        </div>

          <Link to="/stats">
            達成率を見る
          </Link>
        </>
    )
}

export default Home