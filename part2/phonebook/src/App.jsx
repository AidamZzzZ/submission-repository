import { useState, useEffect } from 'react'
import personModule from "./services/person"
import { Persons, PersonForm }  from './components/Person'
import { PrincipalTitle, SecondaryTitle } from './components/Titles'
import Filter from './components/Filter'
import Notification from './components/Notification'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchNumber, setSearchNumber] = useState('')
  const [addedMessage, setAddedMessage] = useState(null)
  const [typeClass, setTypeClass] = useState('error-message')

  // renderiza todos loso numeros en el estado "persons" desde el servidor
  useEffect(() => {
    personModule
      .getAll()
      .then(response => {
        setPersons(response)
      }) 
  }, [])

  // Controla el evento del input del buscador
  const handleSearch = (event) => {
    setSearchNumber(event.target.value)
  }

  /* 
    Agrega a una nueva persona y su numero, utiliza un objeto para pasarlo al array de objetos
    Y verifica si este no se encuentra dentro del array de objetos (resetea los inputs),
    tambien agrega el usuario escrito por pantalla, al servidor, si este ya esta agregado
    actualiza su numero, mediante la confirmacion del usuario
  */
  const addPerson = (event) => {
    event.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber,
    }

    const findPerson = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())

    if (persons.includes(findPerson)) {
      if (window.confirm(`${findPerson.name} is already added to phonebook, replace the old number with a new`)) {
        const newObject = { ...findPerson, number: newNumber }
        personModule
          .update(findPerson.id, newObject)
          .then(response => {
            messageErrorActivation(response.name)
            setPersons(persons.map(person => person.id !== findPerson.id ? person : response))
          })
          .catch(error => {
            messageErrorActivation(newObject.name, false)
          })
      }
    } else {
      personModule
        .create(newPerson)
        .then(response => {
          messageErrorActivation(response.name)
          setPersons(persons.concat(response))
        })
    }

    setNewName('')
    setNewNumber('')
  }

  // Controla el evento del input name (para obtener el nombre del usuario)
  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  // Controla el evento del input number (para obtener el numero del ususario)
  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  /* 
    le pide al usuario confirmar si eliminar o no el usuario, si este accede, se elimina del servidor
    y se actualiza el estado "persons"
  */
  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personModule
      .deleted(id)
      .then(response => {
        setPersons(persons.filter(person  => person.id !== response.id))
      })
      .catch(error => console.log(error))
    }    
  }

  /*
    Maneja  el cambio de estado al agregar, actualizar una persona o mostrar un error al actualizar un objeto que no existe
    en el servidor (404 not found), toma como parametro el nombre del usuario y el tipo de operacion, si es true, es para
    agregar y/o actualizar un contacto o false, en caso de que sea un error al actualizar un objecto que no se encuentra
    en la base de datos.
  */
  const messageErrorActivation = (name, type = true) => {
    
    if (type) {
      setTypeClass('added-message')
      setAddedMessage(`Added ${name}`)
    } else {
      setTypeClass('error-message')
      setAddedMessage(`Information of ${name} has already been removed from server`)
    }
    
    setTimeout(() => {
      setAddedMessage(null)
    }, 5000)
  }

  return (
    <>
      <PrincipalTitle title="Phonebook" />
      
      <Notification message={addedMessage} className={typeClass}/>

      <Filter handleOnChange={handleSearch} />

      <SecondaryTitle title="Add a new"/>

      <PersonForm addPerson={addPerson} newName={newName} handleNewName={handleNewName} newNumber={newNumber} handleNewNumber={handleNewNumber} />

      <SecondaryTitle title="Numbers"/>

      <Persons persons={persons} searchNumber={searchNumber} handleDelete={deletePerson} />
      
    </>
  )
}

export default App
