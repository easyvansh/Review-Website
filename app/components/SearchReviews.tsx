"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const SearchReviews = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("ICE_RINK");
  const router = useRouter();

  const handleSearch = async (event) => {
    event.preventDefault();

    if (searchTerm.trim() !== "") {
      // Include the filter in the query params
      router.push(
        `/search-results?q=${encodeURIComponent(
          searchTerm
        )}&filter=${encodeURIComponent(filter)}`
      );
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <form
        onSubmit={handleSearch}
        className="flex items-center space-x-4"
      >
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
          className="border py-4 rounded-lg px-10 bg-inherit text-pretty justify-start items-start"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border px-8 py-4 rounded-lg bg-inherit"
        >
          <option value="ICE_RINK" className="bg-black">
            Ice Rink
          </option>
          <option value="COACH" className="bg-black">
            Coach
          </option>
          <option value="CLUB" className="bg-black">
            Club
          </option>
        </select>
        <button
          type="submit"
          className="bg-slate-900 text-white px-8 py-4 rounded-lg"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchReviews;
