import { and, collection, getDocs, or, orderBy, query, where } from "firebase/firestore";
import db from "@/utils/firestore";

// Function to construct the Firestore query
export const buildEntityQuery = (filter: string, searchTerm: string) => {

  const lowerTerm = searchTerm.toLowerCase(); // Ensure case-insensitive search

  return query(
    collection(db, "entities"),
    and(
      where("type", "==", filter),
    ),
    orderBy("name")
  );
};

// Function to execute the query and fetch the documents
export const fetchEntities = async (filter: string, searchTerm: string, page: number = 1) => {
  try {
    const entityQuery = buildEntityQuery(filter, searchTerm, page);
    const querySnapshot = await getDocs(entityQuery);
    const results = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return results;
  } catch (error) {
    console.error("Error fetching entities:", error);
    return [];
  }
};