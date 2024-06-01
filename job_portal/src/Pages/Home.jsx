import { useState } from "react";
import Banner from "../components/Banner"

const Home = () => {
  const [query, setQuery] = useState("");
  const handleInputChange = (event) => {
    setQuery(event.target.value)
  }
  con
  return (
    <div>
      <Banner query = {query} handleInputChange = {handleInputChange}/>
      </div>
  )
}

export default Home
