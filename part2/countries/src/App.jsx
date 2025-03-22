import axios from 'axios'
import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import { CountriesList, ShowCountrie } from './components/Countries'

const App = () => {
  const [countries, setCountries] = useState(null)
  const [inputCountrie, setInputCountrie] = useState('')

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleInputCountrie = (event) => {
    setInputCountrie(event.target.value)
  }

  const handleClickCountrie = (countrie) => {
    return (
      <ShowCountrie countrie={countrie} />
    )
  }

  if (!countries) {
    return <div>Cargando...</div>
  }

  return (
    <>
      <Filter handleInput={handleInputCountrie}/>

      <CountriesList countries={countries} inputCountrie={inputCountrie} handleClickCountrie={handleClickCountrie}/>
    </>
  )
}

export default App
