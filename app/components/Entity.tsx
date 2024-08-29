import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import db from '@/utils/firestore';

const EntityPage = ({ entityId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const reviewsCollectionRef = collection(db, `entities/${entityId}/reviews`);
      const querySnapshot = await getDocs(reviewsCollectionRef);
      const reviewsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setReviews(reviewsList);
    };

    if (entityId) fetchReviews();
  }, [entityId]);

  return (
    <div>
      <h1>Entity {entityId} Details</h1>
      {/* Entity details */}

      <h2>Reviews</h2>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <p>Rating: {review.rating}</p>
            <p>{review.reviewText}</p>
            <p>By User: {review.userId}</p>
            <p>Posted: {new Date(review.createdAt.seconds * 1000).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EntityPage;
