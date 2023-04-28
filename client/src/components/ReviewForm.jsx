import React, { useState } from 'react';
import axios from "axios";

function ReviewForm() {
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [photo, setPhoto] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const handlePhotoChange = (event) => {
    setPhoto(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const formData = new FormData();
    formData.append('review', review);
    formData.append('rating', rating);
    formData.append('photo', photo);
    formData.append('phoneNumber', phoneNumber);
  
    try {
      const response = await axios.post('http://localhost:8080/api/reviews', formData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <label className="block mb-4">
  <span className="text-gray-700">Phone number:</span>
  <input
    type="text"
    className="form-input mt-1 block w-full border-gray-300 rounded-md shadow-sm"
    value={phoneNumber}
    onChange={(event) => setPhoneNumber(event.target.value)}
  />
</label>
      <label className="block mb-4">
        <span className="text-gray-700">Review:</span>
        <textarea
          className="form-textarea mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          value={review}
          onChange={handleReviewChange}
        />
      </label>
      <label className="block mb-4">
        <span className="text-gray-700">Rating:</span>
        <select
          className="form-select mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          value={rating}
          onChange={handleRatingChange}
        >
          <option value={0}>Select a rating</option>
          <option value={1}>1 star</option>
          <option value={2}>2 stars</option>
          <option value={3}>3 stars</option>
          <option value={4}>4 stars</option>
          <option value={5}>5 stars</option>
        </select>
      </label>
      <label className="block mb-4">
        <span className="text-gray-700">Photo:</span>
        <input
          type="file"
          className="form-input mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          onChange={handlePhotoChange}
        />
      </label>
      <button
        type="submit"
        className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600"
      >
        Submit
      </button>
    </form>
  );
}

export default ReviewForm;
