export type Habit = {
    id: number
    name: string
}

export type Record = {
    date: string
    habitId: number
    completed: boolean
}