"use client";

import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import db from "@/utils/firestore";  // Ensure this path is correct
import Link from "next/link";

const AllEntitiesPage = () => {
  const [entities, setEntities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEntities = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "entities"));
        const entitiesList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEntities(entitiesList);
      } catch (error) {
        console.error("Error fetching entities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEntities();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (entities.length === 0) return <div>No entities found.</div>;

  return (
    <div className = "flex flex-col h-screen text-white justify-center items-center">
      <h1 className="font-bold text-3xl" >All Entities</h1>
      <ul className = "flex flex-col gap-4"> 
        {entities.map(entity => (
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
        ))}
      </ul>
    </div>
  );
};

export default AllEntitiesPage;
