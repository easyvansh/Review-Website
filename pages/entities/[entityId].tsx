"use client";

import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import db from "@/utils/firestore";
import AddReview from "@/app/components/AddReview"; // Import AddReview component

const EntityPage = () => {
  const router = useRouter();
  const { entityId } = router.query;
  const [entity, setEntity] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchEntity = async () => {
      try {
        const entityDoc = await getDoc(doc(db, "entities", entityId));
        if (entityDoc.exists()) {
          setEntity({ id: entityDoc.id, ...entityDoc.data() });

          const reviewsSnapshot = await getDocs(
            collection(db, `entities/${entityId}/reviews`)
          );
          const reviewsList = reviewsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setReviews(reviewsList);
          console.log(reviewsList);
        } else {
          console.log("No such entity!");
        }
      } catch (error) {
        console.error("Error fetching entity:", error);
      }
    };

    if (entityId) fetchEntity();
  }, [entityId]);

  if (!entity) return <div>Loading...</div>;

  return (
    <div className="entity-page">
      <h1>{entity.name}</h1>
      <p>{entity.description}</p>
      <p>Type: {entity.type}</p>
      <p>Average Rating: {entity.avgRating}</p>
      <p>Reviews: {entity.reviewCount}</p>


      <AddReview entityId={entityId} />
      <h2>Reviews</h2>
      <ul>
        {reviews.map((review) => (
          <li key={review.id} className="bg-slate-700 shadow-md p-6 rounded-lg">
            <div className="flex items-center space-x-4">
            <img
                src={review.userIcon || "/default-avatar.png"} // Fallback in case no icon is available
                alt={`${review.userName}'s icon`}
                className="w-12 h-12 rounded-full"
              />
            </div>
            <h3 className="text-lg font-semibold">{review.userName}</h3>
            <h2 className="text-sm font-semibold">{review.userLevel.charAt(0).toUpperCase() + review.userLevel.slice(1).toLowerCase()}</h2>
            <p><strong>Rating: </strong> {review.rating}</p>
            <p className="text-white"><strong>Date: </strong>{new Date(review.createdAt.seconds * 1000).toLocaleDateString('en-US', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}</p>
            <p className="mt-4 text-white"><strong>Review: </strong> {review.reviewText}</p>
          </li>
        ))}
      </ul>
      
      </div>
    );
};

export default EntityPage;
