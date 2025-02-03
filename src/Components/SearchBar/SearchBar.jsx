import { useState } from "react";
import'./Searchbar.css'
import { useSelector } from "react-redux";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const curentLange = useSelector((state) => state.lange.lange);

  const  text = useSelector((state) => state.lange[curentLange]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value); // Search as user types
  };

  return (
    <div className="flex justify-center my-20 w-full rounded-xl">
      <input
        type="text"
        className="form-control w-1/2 p-2 border rounded-md"
        placeholder= {text.search}
        value={query}
        onChange={handleInputChange} // Trigger search on input change
      />
    </div>
  );
}
