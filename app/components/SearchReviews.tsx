import React, { useState } from "react";
import db from "@/utils/firestore.js";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Result } from "postcss";

const SearchReviews = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("ice rink");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (event) => {
    event.preventDefault();

    try {
      const reviewsCollection = collection(db, "reviews");
      const q = query(reviewsCollection, where(filter, "==", searchTerm));
      const querySnapshot = await getDocs(q);
      const results = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setSearchResults(results);
    } catch (error) {
      console.error("Error fetching search results: ", error);
    }
  };
    console.log(searchResults)
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <form onSubmit={handleSearch} className="flex items-center space-x-4 mb-6 ">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
          className="border p-2 rounded-lg w-full  bg-inherit"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2 rounded-lg  bg-inherit"
        >
          <option value="ice rink" className="">Ice Rink</option>
          <option value="coach">Coach</option>
          <option value="club">Club</option>
        </select>
        <button
          type="submit"
          className="bg-teal-500 text-white px-4 py-2 rounded-lg"
        >
          Search
        </button>
      </form>
      
      <ul className="space-y-4">
        {searchResults.map((item) => (
          <li key={item.id} className="bg-white shadow-md p-6 rounded-lg">
            <h3 className="text-lg font-semibold">{item.userName}</h3>
            <p className="text-gray-500">{item.review}</p>
            {/* Display more details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchReviews;
