const Header = props => <h1>{props.title}</h1>

const Part = props => <p>{props.name} {props.exercises}</p>

const Total = ({ parts }) => {
  const totalExercises = parts.reduce((sum, part) => {
    return sum + part.exercises
  }, 0)

  return (
    <p><strong>total of {totalExercises} exercises</strong></p>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part, i) => 
        <Part key={i} name={part.name} exercises={part.exercises}/>
      )}
    </div>
  )
}

const Course = ({ course }) => {
  return (
    <>
      <Header title={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </>
  )
}

export default Course