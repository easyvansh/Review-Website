"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { fetchEntities } from "@/utils/fetchEntities";
import Link from "next/link";

const SearchResults = () => {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";
  const filter = searchParams.get("filter") || "All";
  const [entities, setEntities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndSetEntities = async () => {
      setLoading(true);
      const results = await fetchEntities(filter, q);
      setEntities(results);
      setLoading(false);
    };

    fetchAndSetEntities();
  }, [q, filter]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="search-results min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">Search Results for "{q}"</h1>
      <p className="mb-4 text-lg">Searching In : {filter}'s</p>
      {entities.length > 0 ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {entities.map((entity) => (
            <li key={entity.id} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
              <Link href={`/entities/${entity.id}`}>
                <div className="flex items-center mb-2">
                  <img src={entity.iconUrl} alt={entity.name} className="w-16 h-16 object-cover rounded-full mr-4" />
                  <div>
                    <h2 className="text-xl font-semibold">{entity.name}</h2>
                    <p className="text-sm text-gray-600">{entity.type}</p>
                  </div>
                </div>
                <p className="text-sm mb-2">{entity.description}</p>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="mr-2">Rating: {entity.avgRating.toFixed(1)}</span>
                  <span>Reviews: {entity.reviewCount}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
};

export default SearchResults;