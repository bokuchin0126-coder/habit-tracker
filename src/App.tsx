import HabitItem from "./components/HabitItem"
import useHabits from "./hooks/useHabits"
import "./App.css"

function App() {
    
    const {
        dailyHabits,
        inputText,
        setInputText,
        error,
        selectedDate,
        registration,
        currentHabits,
        changeDate,
        specifyPeriod,
        handleAddHabits,
        handleDeleteHabits,
        handleToggleHabits,
        handleEditHabits,
        handleChangeRegistration
    } = useHabits()

    
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
                                handleAddHabits()
                            }
                        }}
                    />

                    <button className="app-button" onClick={handleAddHabits}>追加</button>
                </div>
            }
            {error}

            <div className="habit-list">
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

            <button className="mode-button" onClick={handleChangeRegistration}>
                {registration ? "変更" : "登録"}
            </button>
            
            <div className="achievement-area">
                <p>過去１週間の達成率{specifyPeriod(7)}%</p>
                <p>過去１か月の達成率{specifyPeriod(30)}%</p>
            </div>

        </div>
        </>
    )
}

export default App