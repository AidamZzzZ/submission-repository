import { useState } from 'react'

const Title = (props) => <h1>{props.title}</h1>

const Button = ({ controlEventFunction, text }) => (
    <button onClick={controlEventFunction}>{text}</button>
)

const StatisticLine = (props) => {
    return ( 
        <>
            <tr>
                <td>{props.text}</td>
                <td>{props.value}</td>
            </tr>
        </>
    )
}

const Statistics = (props) => {

    const allComments = () => {
        return props.goodCounter + props.neutralCounter + props.badCounter
    }

    const averageComments = (type) => {
        if (type === "positive") {
            return ((props.goodCounter / (props.goodCounter +  props.neutralCounter + props.badCounter)) * 100).toFixed(1) || 0
        }
        return ((props.goodCounter + -props.badCounter) / (props.goodCounter + props.neutralCounter + props.badCounter)).toFixed(1) || 0
    }

    // renderizado condicional
    if (props.goodCounter === 0 && props.neutralCounter === 0 && props.badCounter === 0) {
        return (
            <>
                <Title title="statistics" />
                <p><strong>No feedback given</strong></p>
            </>
        )
    }
    return (
        <>
            <Title title="statistics" />
            <table>
                <tbody>
                    <StatisticLine text="good" value={props.goodCounter} />
                    <StatisticLine text="neutral" value={props.neutralCounter} />
                    <StatisticLine text="bad" value={props.badCounter} />
                    <StatisticLine text="all" value={allComments()} />
                    <StatisticLine text="average" value={averageComments()} />
                    <StatisticLine text="positive" value={averageComments("positive")} />
                </tbody>
            </table>
        </>
    )
}

const App = () => {
    const [good, SetGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleClickGood = () => {
        SetGood(good + 1)
    }

    const handleClickNeutral = () => {
        setNeutral(neutral + 1)
    }

    const handleClickBad = () => {
        setBad(bad + 1)
    }

    return (
        <div>
          <Title title="give feedback" />
          <Button  controlEventFunction={handleClickGood} text="good"/>
          <Button  controlEventFunction={handleClickNeutral} text="neutral" />
          <Button  controlEventFunction={handleClickBad} text="bad" />
          <Statistics goodCounter={good} neutralCounter={neutral} badCounter={bad}/>
        </div>
    )
}

export default App
