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
       <h1 className="text-2xl font-bold mb-4">All Entities</h1>
     
      
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
    </div>
  );
};

export default AllEntitiesPage;
