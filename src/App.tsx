import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Stats from "./pages/Stats"
import useHabits from "./hooks/useHabits"
import "./App.css"

function App() {
    
    const {
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
    } = useHabits()

    
    return (
        <>
        <Routes>
            <Route path="/" element={
                <Home 
                    inputText={inputText}
                    setInputText={setInputText}
                    today={today}
                    error={error}
                    selectedDate={selectedDate}
                    changeDate={changeDate}
                    currentRegistration={currentRegistration}
                    currentHabits={currentHabits}
                    onAddHabits={handleAddHabits}
                    onDeleteHabits={handleDeleteHabits}
                    onEditHabits={handleEditHabits}
                    onToggleHabits={handleToggleHabits}
                    onChangeRegistration={handleChangeRegistration}
                />} />

            <Route path="/stats" element={
                <Stats 
                    specifyPeriod={specifyPeriod}
                    totalAchievement={totalAchievement}
                    todayAchievement={todayAchievement}
                    bestAchievement={bestAchievement}
                />} />
        </Routes>

        
        </>
    )
}

export default App