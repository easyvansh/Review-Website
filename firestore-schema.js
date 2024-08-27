// Firestore Schema

// Users Collection
users: {
  userId: {
    username: string,
    email: string,
    level: string,
    createdAt: timestamp,
    // Other user-specific fields
  }
}

// Entities Collection (Ice Rinks, Coaches, Clubs)
entities: {
  entityId: {
    name: string,
    type: string, // 'ICE_RINK', 'COACH', or 'CLUB'
    title: string,
    description: string,
    iconUrl: string,
    avgRating: number,
    reviewCount: number,
    additionalInfo: {
      // Entity-specific fields
      key1: value1,
      key2: value2,
      // ...
    }
  }
}

// Reviews Subcollection (under each entity)
entities/{entityId}/reviews: {
  reviewId: {
    userId: string, // Reference to user document
    rating: number,
    reviewText: string,
    createdAt: timestamp
  }
}

// Example Queries:

// 1. Get all entities of a specific type
db.collection('entities').where('type', '==', 'ICE_RINK').get()

// 2. Search entities by name
db.collection('entities')
  .where('name', '>=', searchTerm)
  .where('name', '<=', searchTerm + '\uf8ff')
  .get()

// 3. Get top-rated entities
db.collection('entities')
  .orderBy('avgRating', 'desc')
  .limit(10)
  .get()

// 4. Get reviews for a specific entity
db.collection('entities').doc(entityId).collection('reviews').get()

// 5. Add a new review (and update entity stats)
async function addReview(entityId, userId, rating, reviewText) {
  const entityRef = db.collection('entities').doc(entityId);
  const reviewRef = entityRef.collection('reviews').doc();

  await db.runTransaction(async (transaction) => {
    const entityDoc = await transaction.get(entityRef);
    const newReviewCount = entityDoc.data().reviewCount + 1;
    const newAvgRating = (entityDoc.data().avgRating * entityDoc.data().reviewCount + rating) / newReviewCount;

    transaction.set(reviewRef, {
      userId,
      rating,
      reviewText,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    transaction.update(entityRef, {
      reviewCount: newReviewCount,
      avgRating: newAvgRating
    });
  });
}

// 6. Get user details
db.collection('users').doc(userId).get()
