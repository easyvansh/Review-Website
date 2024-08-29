"use client";

import { collection, query, where, getDocs, or } from "firebase/firestore";
import db from "@/utils/firestore";

const fetchEntities = async (searchTerm) => {
  try {
    const searchLower = searchTerm.toLowerCase();

    // Create queries for each field
    const qName = query(
      collection(db, "entities"),
      where("name", ">=", searchLower),
      where("name", "<=", searchLower + "\uf8ff")
    );

    const qTitle = query(
      collection(db, "entities"),
      where("title", ">=", searchLower),
      where("title", "<=", searchLower + "\uf8ff")
    );

    const qDescription = query(
      collection(db, "entities"),
      where("description", ">=", searchLower),
      where("description", "<=", searchLower + "\uf8ff")
    );

    // Fetch data from all queries
    const [snapName, snapTitle, snapDescription] = await Promise.all([
      getDocs(qName),
      getDocs(qTitle),
      getDocs(qDescription),
    ]);

    // Combine results from all queries
    const results = new Map();
    snapName.docs.forEach(doc => results.set(doc.id, doc.data()));
    snapTitle.docs.forEach(doc => results.set(doc.id, doc.data()));
    snapDescription.docs.forEach(doc => results.set(doc.id, doc.data()));

    // Convert Map to array
    return Array.from(results.values());

  } catch (error) {
    console.error("Error fetching entities:", error);
    return [];
  }
};


