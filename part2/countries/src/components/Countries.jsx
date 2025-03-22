import { useState, useEffect } from "react"
import { PrincipalTitle, SecondaryTitle } from "./Titles"
import fetchData from "../services/fetchData"

const ShowCurrentCountrie = ({ countrie }) => {
    const [tempAndWind, setTempAndWind] = useState(null)
    let  capital   = countrie.capital[0]
    capital.includes("'")
        ? capital = capital.replace("'", "")
        : capital

    useEffect(() => {

        fetchData(capital)
            .then(response => {
                setTempAndWind(response)
            })
            .catch(error => {
                console.log(error)
            })
    }, [countrie])

    if (!tempAndWind) {
        return <div>Loadding...</div>
    }

    return (
        <div>
            <SecondaryTitle title="Weater in " city={capital} />

            <ItemTempAndWind current="Temperature" wheater={tempAndWind.current.temp_c} type="Celsius" />
            <ItemTempAndWind current="Wind" wheater={tempAndWind.current.wind_mph} type="mph"/>
        </div>
    )
}

const ItemTempAndWind = ({ current, wheater, type }) => {
    return (
        <p>{current} <span>{wheater}</span> <span>{type}</span></p>
    )
}

const ShowCountrie = ({ countrie }) => {
    const [showCountrie, setShowCountrie] = useState(null)

    useEffect(() => {
        try {
            setShowCountrie(countrie[0])
        } catch (error) {
            console.log(error)
        }
        
    }, [countrie])

    if (!showCountrie) {
        return <div>Loading...</div>
    }

    const { name, capital, area, languages, flags } = showCountrie
    const languagesList = Object.values(languages)
    
    return (
      <>
        <PrincipalTitle title={name.common}/>

        <p><em>Capital: </em>{capital}</p>
        <p><em>Area: </em>{area}</p>

        <SecondaryTitle title="Languagues"/>

        <ul>{languagesList.map((language, i) =>
            <ItemCountrie key={i} name={language}/>)}
        </ul>
        <img src={flags.png} alt={name.common} />

        <ShowCurrentCountrie countrie={countrie[0]}/>
      </>
    )
}
  
const ItemCountrie = (props) => <li>{props.name}</li>
  
const CountriesList = ({ countries, inputCountrie }) => {
    const filterCountries = 
    countries.filter(countrie => countrie.name.common.toLowerCase().startsWith(inputCountrie.toLowerCase()))
    
    if (inputCountrie === "") {
        return null
    } else if (filterCountries.length === 1) {
        return (
            <ShowCountrie countrie={filterCountries}/>
        )
    } else if (filterCountries.length >= 10) {
        return <p>Too many matches. specify another filter</p>
    
    } else if (filterCountries.length < 10) {
        return (
            <>
                {filterCountries.map((countrie, i) => 
                <div key={i}>
                    {countrie.name.common}
                </div>
                )}
            </>
        )
    } 
}

export { CountriesList, ShowCountrie }