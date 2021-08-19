import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./SearchBar.css";
import { onSearch } from "../../store/actions/index";


export default function SearchBar() {
  const [city, setCity] = useState("");
  const dispatch = useDispatch();


  const handleChange = (e)=>{
    setCity(e.target.value)
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    dispatch(onSearch(city))
    setCity("")
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="search"
    >
      <input
        type="text"
        placeholder="Ciudad..."
        value={city}
        onChange={(e) => handleChange(e)}
        className="inputSearch"
      />
      <input type="submit" value="Agregar" />
    </form>
  );
}
