import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import db from '@/utils/firestore';  // Adjust the import path as needed

const EntityPage = () => {
  const router = useRouter();
  const { entityId } = router.query;  // Extract the entityId from the URL
  const [entityData, setEntityData] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEntityData = async () => {
      if (!entityId) return;

      try {
        // Fetch the entity document from Firestore
        const entityDocRef = doc(db, 'entities', entityId);
        const entityDoc = await getDoc(entityDocRef);

        if (entityDoc.exists()) {
          setEntityData(entityDoc.data());

          // Fetch the reviews subcollection
          const reviewsCollectionRef = collection(entityDocRef, 'reviews');
          const reviewsSnapshot = await getDocs(reviewsCollectionRef);
          const reviewsList = reviewsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));

          setReviews(reviewsList);
        } else {
          console.log('No such entity!');
        }
      } catch (error) {
        console.error('Error fetching entity data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEntityData();
  }, [entityId]);

  if (loading) return <p>Loading...</p>;

  if (!entityData) return <p>No data found for this entity.</p>;

  return (
    <div>
      <h1>{entityData.name}</h1>
      <p>Type: {entityData.type}</p>
      <p>Title: {entityData.title}</p>
      <p>Description: {entityData.description}</p>
      <p>Average Rating: {entityData.avgRating}</p>
      <p>Review Count: {entityData.reviewCount}</p>

      <h2>Reviews</h2>
      <ul>
        {reviews.map(review => (
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
