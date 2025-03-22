const Filter = ({ handleInput }) => {
  return (
    <>
        <span>find countries: </span>
        <input type="text" onChange={handleInput}/>
    </>
  )
}

export default Filter