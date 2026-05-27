export type Habit = {
    id: number
    name: string
    completed: boolean
}

export type DailyHabit = {
    date: string
    registration: boolean
    habits: Habit[]
}