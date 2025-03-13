import { useState } from 'react'

const Title = props => <h2>{props.title}</h2>

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const StatsVotes = (props) => {
  return (
    <p>has {props.votes} votes</p>
  )
}

const Display = props => <p>{props.anecdote}</p>

const votes = new Array(8).fill(0)

const App = () => {
  const [selected, setSelected] = useState(0)
  const [votesA, setVotesA] = useState(votes)
  const [mostVoted, setMostVoted] = useState('')

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const randomSelect = () => {
    let random = Math.floor(Math.random() * anecdotes.length)
    setSelected(random)
  }
  
  const votesAnecdote = () => {
    const copy = [...votesA]
    copy[selected] += 1
    setVotesA(copy)
  }

  const anecdoteMoreVoted = () => {
    let moreVoted = Math.max(...votesA)
    let index = votesA.indexOf(moreVoted)
    return anecdotes[index]
  }

  return (
    <div>
      <Title title="Anecdote of the day" />
      <Display anecdote={anecdotes[selected]}/>
      <StatsVotes votes={votesA[selected]} />
      <Button handleClick={votesAnecdote} text="votes"/>
      <Button handleClick={randomSelect} text="next anecdote" />

      <Title title="Anecdote with most votes" />
      <Display anecdote={anecdoteMoreVoted()}/>
    </div>
  )
}

export default App
