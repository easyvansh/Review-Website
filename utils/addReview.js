import { collection, doc, addDoc, serverTimestamp } from 'firebase/firestore';
import db from '@/utils/firestore';  // Make sure to correctly configure your Firebase and Firestore

// Function to add a review to a specific entity's reviews subcollection
const addReview = async (entityId, review) => {
  try {
    const entityRef = doc(db, 'entities', entityId);
    const reviewsCollectionRef = collection(entityRef, 'reviews');
    await addDoc(reviewsCollectionRef, {
      ...review,
      createdAt: serverTimestamp(),
    });
    console.log('Review added successfully');
  } catch (e) {
    console.error('Error adding review: ', e);
  }
};
