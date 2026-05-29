import HabitItem from "./components/HabitItem"
import useHabits from "./hooks/useHabits"

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
            <p>過去１週間の達成率{specifyPeriod(7)}%</p>
            <p>過去１か月の達成率{specifyPeriod(30)}%</p>
        </>
    )
}

export default App