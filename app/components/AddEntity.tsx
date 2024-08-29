import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import db from '@/utils/firestore';  // Ensure Firestore is correctly configured

// Function to add an entity to Firestore
const addEntity = async (entity) => {
  try {
    const docRef = await addDoc(collection(db, 'entities'), entity);
    console.log('Entity added with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding entity: ', e);
  }
};

const AddEntity = () => {
  const [entityType, setEntityType] = useState('ICE_RINK');
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [iconUrl, setIconUrl] = useState('');
  const [avgRating, setAvgRating] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [additionalInfo, setAdditionalInfo] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newEntity = {
      name,
      type: entityType,
      title,
      description,
      iconUrl,
      avgRating: parseFloat(avgRating),
      reviewCount: parseInt(reviewCount, 10),
      additionalInfo,
    };

    await addEntity(newEntity);

    // Clear the form
    setName('');
    setTitle('');
    setDescription('');
    setIconUrl('');
    setAvgRating(0);
    setReviewCount(0);
    setAdditionalInfo({});
  };

  const handleAdditionalInfoChange = (e) => {
    const { name, value } = e.target;
    setAdditionalInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="p-4 h-screen w-auto flex flex-col gap-4 items-center">
      <h1>Add New Entity</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label>
          Entity Type:
          <select value={entityType} onChange={(e) => setEntityType(e.target.value)}>
            <option value="ICE_RINK">Ice Rink</option>
            <option value="COACH">Coach</option>
            <option value="CLUB">Club</option>
          </select>
        </label>

        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>

        <label>
          Description:
          <textarea
          className='bg-slateblue text-white'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>

        <label>
          Icon URL:
          <input
            type="url"
            value={iconUrl}
            onChange={(e) => setIconUrl(e.target.value)}
            required
          />
        </label>

        <label>
          Average Rating:
          <input
            type="number"
            value={avgRating}
            onChange={(e) => setAvgRating(e.target.value)}
            min="0"
            max="5"
            step="0.1"
            required
          />
        </label>

        <label>
          Review Count:
          <input
            type="number"
            value={reviewCount}
            onChange={(e) => setReviewCount(e.target.value)}
            min="0"
            required
          />
        </label>

        {/* Additional Info Fields */}
        <h2>Additional Information</h2>
        <label>
          Location:
          <input
            type="text"
            name="location"
            value={additionalInfo.location || ''}
            onChange={handleAdditionalInfoChange}
          />
        </label>

        <label>
          Opening Hours:
          <input
            type="text"
            name="openingHours"
            value={additionalInfo.openingHours || ''}
            onChange={handleAdditionalInfoChange}
          />
        </label>

        {/* Add more fields as needed based on the entity type */}

        <button type="submit" className="btn btn-primary mt-4">
          Add Entity
        </button>
      </form>
    </div>
  );
};

export default AddEntity;
