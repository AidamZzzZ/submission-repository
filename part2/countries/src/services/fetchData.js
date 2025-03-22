const fetchData = async (city) => {
    try {
        const url = fetch(`https://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_API_KEY}&lang-en&q=${city}`)
        const response = await url
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export default fetchData