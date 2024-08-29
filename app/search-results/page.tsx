"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import db from "@/utils/firestore";
import Link from "next/link";

const SearchResults = () => {
  const searchParams = useSearchParams();
  const q = searchParams.get("q");
  const [entities, setEntities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEntities = async () => {
      setLoading(true);
      try {
        const searchSame = q;
        // Create query for the name field
        const qName = query(
          collection(db, "entities"),
          where("name", ">=", searchSame),
          where("name", "<=", searchSame + "\uf8ff")
        );
        
        const querySnapshot = await getDocs(qName);
        const results = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(results);
        setEntities(results);
      } catch (error) {
        console.error("Error fetching entities:", error);
      }
      setLoading(false);
    };
    if (q) fetchEntities();
  }, [q]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="search-results h-screen justify-center items-center w-full flex flex-col gap-4">
      <h1>Search Results for {q}</h1>
      <ul>
        {entities.length > 0 ? (
          entities.map((entity) => (
            <li key={entity.id}>
            <Link href={`/entities/${entity.id}`}>
              
                <h2>{entity.title}</h2>
                <p>{entity.description}</p>
                <img src={entity.iconUrl} alt={entity.title} style={{ width: '100px', height: '100px' }} />
                <p>Type: {entity.type}</p>
                <p>Average Rating: {entity.avgRating}</p>
                <p>Reviews Count: {entity.reviewCount}</p>
              
            </Link>
          </li>
          ))
        ) : (
          <p>No results found</p>
        )}
      </ul>
    </div>
  );
};

export default SearchResults;