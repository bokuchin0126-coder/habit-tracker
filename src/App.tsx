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
        <Routes>
            <Route path="/" element={
                <Home 
                    inputText={inputText}
                    setInputText={setInputText}
                    error={error}
                    selectedDate={selectedDate}
                    changeDate={changeDate}
                    registration={registration}
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
                />} />
        </Routes>

        
        </>
    )
}

export default App