const Filter = ({ handleOnChange }) => {
  return (
    <div>
      filter shown with <input onChange={handleOnChange} type="text" />
    </div>
  )
}

export default Filter