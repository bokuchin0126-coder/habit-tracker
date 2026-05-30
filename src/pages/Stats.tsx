import { Link } from "react-router-dom"


type Props = {
    specifyPeriod: (days: number) => number
}
function Stats({ specifyPeriod }: Props) {
    return (
        <>
            <div>
                <div className="achievement-area">
                    <p>過去１週間の達成率{specifyPeriod(7)}%</p>
                    <p>過去１か月の達成率{specifyPeriod(30)}%</p>
                </div>

                <Link to="/">
                    ホームへ戻る
                </Link>
            </div>
        </>
    )
}
export default Stats