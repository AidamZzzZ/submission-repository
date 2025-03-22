const PersonForm = ({ addPerson, newName, handleNewName, newNumber, handleNewNumber }) => {
  return (
    <form onSubmit={addPerson}>
        <div>
          name: <input 
                  type="text" 
                  value={newName}
                  onChange={handleNewName} 
                />
        </div>
        <div>
          number: <input 
                    type="text" 
                    value={newNumber}
                    onChange={handleNewNumber}
                  />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
    </form>
  )
}

const Persons = ({ persons, searchNumber, handleDelete }) => {
    /* 
      Al buscar personas en el input de filtro, este crea una nueva variable y busca 
      las coincidencias y las pasa a un nuevo array (desde el array original)
    */
    const numberFiltered = persons.filter(person => {
      return person.name.toLowerCase().startsWith(searchNumber.toLowerCase())
    })
  
    return (
      <>
        <ul>
          {numberFiltered.map(person => 
            <li key={person.name}>
              {person.name} <span>{person.number}</span> 
              <button type="button" onClick={() => handleDelete(person.id, person.name)}>delete</button>
            </li>
          )}
          
        </ul>
      </>
    )
}

export { PersonForm, Persons }