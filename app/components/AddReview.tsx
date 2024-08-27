import React, { useState } from 'react';
import db from '@/utils/firestore.js';
import { collection, addDoc } from 'firebase/firestore';

const AddReview = () => {
  const [review, setReview] = useState('');
  const [userName, setUserName] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const docRef = await addDoc(collection(db, 'reviews'), {
        review,
        userName,
        created: new Date().toISOString(),
      });
      console.log('Document written with ID: ', docRef.id);
      setReview('');
      setUserName('');
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <div>
      <h2>Add Review</h2>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-row'>
          <label htmlFor="userName">User Name:</label>
          <input
          className='bg-white bg-opacity-15 mx-5 p-5 items-center justify-center flex flex-col'
            type="text"
            id="userName"
            value={userName}
            placeholder="Enter Name"
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        <div className='flex flex-row my-10'>
          <label htmlFor="review">Review:</label>
          <textarea
          className='bg-white bg-opacity-15  mx-10 p-10 items-center justify-center flex flex-col'
            id="review"
            value={review}
            placeholder="Write Review"
            onChange={(e) => setReview(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit"  className='bg-teal-300 bg-opacity-5 my-10 p-5 rounded-lg items-center justify-center flex flex-col'>Submit Review</button>
      </form>
    </div>
  );
};

export default AddReview;
