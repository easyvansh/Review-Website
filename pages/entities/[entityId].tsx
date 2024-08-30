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

  if (!entity) return <div className="loading">Loading...</div>;

  return (
    <div className="entity-page p-20">
      <h1 className="text-4xl font-bold mb-4">{entity.name}</h1>
      <p className="text-xl mb-2">Summary: {entity.description}</p>
      <p className="text-m text-gray-500 mb-4">Type: {entity.type}</p>
      <p className="text-lg mb-2">
        Average Rating: {entity.avgRating?.toFixed(1)}
      </p>
      <p className="text-lg mb-4">Reviews: {entity.reviewCount}</p>

      <AddReview entityId={entityId} />

      <h2 className="text-2xl font-semibold mt-8 mb-4">Reviews</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reviews.map((review) => (
          <li
            key={review.id}
            className="border rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={review.userIcon || "/default-avatar.png"} // Fallback in case no icon is available
                alt={`${review.userName}'s icon`}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h3 className="text-lg font-semibold">{review.userName}</h3>
                <h4 className="text-sm text-gray-600">
                  {review.userLevel.charAt(0).toUpperCase() +
                    review.userLevel.slice(1).toLowerCase()}
                </h4>
              </div>
            </div>
            <p>
              <strong>Rating: </strong> {review.rating}
            </p>
            <p className="text-gray-600">
              <strong>Date: </strong>
              {new Date(review.createdAt.seconds * 1000).toLocaleDateString(
                "en-US",
                {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                }
              )}
            </p>
            <p className="mt-4 text-gray-800">
              <strong>Review: </strong> {review.reviewText}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EntityPage;
