import React, { useState } from "react";
import "./SearchBar.css";

export default function SearchBar(props) {
  const [city, setCity] = useState("");

  const handleChange = (e)=>{
    setCity(e.target.value)
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        props.onSearch(city);
        setCity("");
      }}
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
