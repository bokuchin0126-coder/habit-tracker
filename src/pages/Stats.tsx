import { Link } from "react-router-dom"


type Props = {
    specifyPeriod: (days: number) => number
    totalAchievement: () => number
    todayAchievement: () => number
    bestAchievement: () => number
}


function Stats({ specifyPeriod, totalAchievement, todayAchievement, bestAchievement }: Props) {
    return (
        <>
            <div className="achievement-area">

                <p>今日の達成率{todayAchievement()}%</p>
                <p>過去１週間の達成率{specifyPeriod(7)}%</p>
                <p>過去１か月の達成率{specifyPeriod(30)}%</p>
                <p>総達成率{totalAchievement()}%</p>
                <p>過去最高達成率{bestAchievement()}%</p>

                <Link to="/">
                    ホームへ戻る
                </Link>
            </div>
        </>
    )
}
export default Stats