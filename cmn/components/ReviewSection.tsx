"use client";

import { useState } from "react";

interface Review {
  customerName: string;
  rating: number;
  reviewDescription: string;
}

interface ReviewSectionProps {
  productId: string;
  reviews?: Review[];
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ productId, reviews = [] }) => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting review for product:", productId, {
      name,
      email,
      rating,
      reviewText,
    });

    // TODO: Add Firebase submission logic here
  };

  return (
    <div className="mt-16 w-full bg-white border-t pt-10 pb-12 px-4 sm:px-6 lg:px-8 rounded-xl shadow-sm">
      <h2 className="text-2xl font-semibold mb-8">Reviews</h2>

      {/* Existing Reviews */}
      {reviews.length > 0 ? (
        <div className="space-y-8 mb-12">
          {reviews.map((review, i) => (
            <div key={i} className="border-b pb-4">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="font-semibold text-gray-900">
                  {review.customerName}
                </span>
                <span className="text-yellow-500 text-base sm:text-lg">
                  {"★".repeat(review.rating)}
                </span>
                <span className="text-gray-300 text-base sm:text-lg">
                  {"★".repeat(5 - review.rating)}
                </span>
              </div>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                {review.reviewDescription}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-sm mb-10">
          There are no reviews yet.
        </p>
      )}

      {/* Review Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-5 max-w-2xl mx-auto w-full"
      >
        <h3 className="text-lg font-semibold">Add Your Review</h3>

        {/* Rating */}
        <div>
          <label className="block text-sm font-medium mb-2">Rating</label>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`text-2xl sm:text-3xl focus:outline-none ${
                  star <= rating ? "text-yellow-500" : "text-gray-400"
                }`}
              >
                {star <= rating ? "★" : "☆"}
              </button>
            ))}
          </div>
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 sm:p-3 border rounded-md focus:ring focus:ring-gray-200"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 sm:p-3 border rounded-md focus:ring focus:ring-gray-200"
            required
          />
        </div>

        {/* Review Text */}
        <div>
          <label className="block text-sm font-medium mb-2">Review</label>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            rows={4}
            className="w-full p-2 sm:p-3 border rounded-md focus:ring focus:ring-gray-200"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-black text-white px-6 py-2 sm:px-8 sm:py-3 rounded-md hover:bg-gray-800 transition-colors"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ReviewSection;
