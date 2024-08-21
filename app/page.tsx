"use client"

import { useState } from "react";

const dummyData = [
  { id: 1, area: "Downtown", club: "Skate Club", rink: "Ice Arena", coach: "John Doe" },
  { id: 2, area: "Uptown", club: "Hockey Club", rink: "Winter Rink", coach: "Jane Smith" },
  { id: 3, area: "Suburb", club: "Figure Skating Club", rink: "Snow Rink", coach: "Emily Johnson" },
  // Add more dummy entries as needed
];

export default function Home() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("AREA");
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    if (query.trim()) {
      // Filter the dummy data based on query and category
      const filteredResults = dummyData.filter((item) =>
        item[category.toLowerCase()].toLowerCase().includes(query.toLowerCase())
      );
      setResults(filteredResults);
      setIsSearching(true);
    }
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 absolute w-full max-w-6xl items-center justify-between font-mono text-sm lg:flex">
      <h1 className="text-2xl text-pretty">Home Page</h1>
        <div className="relative w-full max-w-5xl items-center justify-center font-mono text-sm lg:flex mt-20">
        <div className="flex bg-inherit">
            <select
              className="border rounded p-2 mr-2 bg-inherit"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="AREA">AREA</option>
              <option value="CLUB">CLUB</option>
              <option value="RINK">RINK</option>
              <option value="COACH">COACH</option>
            </select>
            <input
              type="text"
              className="border rounded p-2 w-full mr-2 bg-inherit"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Search by ${category.toLowerCase()}...`}
            />
          </div>
          <a href="/Search">Search</a>
        </div>
      </div>
    </main>
  );
}
