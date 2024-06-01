import { useState } from "react";
import Banner from "../components/Banner";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";

const Home = () => {
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value)
  }
  console.log(query)
  return (
    <div>
      <Banner query={query} handleInputChange={handleInputChange} />
      {/* Depending on the state of query, either render LoginPage or RegisterPage */}
      {query === "login" ? <LoginPage /> : <RegisterPage />}
    </div>
  );
};

export default Home;
