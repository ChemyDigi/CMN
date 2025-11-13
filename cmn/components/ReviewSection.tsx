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
  const [rating, setRating] = useState(3);
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
  };

  return (
    <div className="w-full bg-white border-t border-gray-400 mt-20 pt-10 pb-16 px-6 sm:px-10 lg:px-20">
      {/* Reviews Section */}
      <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-gray-900">Reviews</h2>

      {reviews.length > 0 ? (
        <div className="space-y-8 mb-12">
          {reviews.map((review, i) => (
            <div key={i} className="pb-4">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="font-semibold text-gray-900">
                  {review.customerName}
                </span>
                <span className="text-pink-500 text-base sm:text-lg">
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
        <p className="text-gray-600 text-[15px] mb-12">There are no reviews yet.</p>
      )}

      <hr className="border-gray-300 mb-10" />

      {/* Review Form */}
      <h3 className="text-xl sm:text-2xl font-semibold mb-6 text-gray-900">
        Be the first to write a review
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Rating */}
        <div>
          <label className="block text-base font-medium text-gray-800 mb-2">
            Your rating
          </label>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`text-xl sm:text-2xl focus:outline-none ${
                  star <= rating ? "text-pink-500" : "text-gray-300"
                }`}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        {/* Review Text */}
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-2">
            Your review
          </label>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            rows={6}
            className="w-full border border-gray-300 bg-gray-50 rounded-lg p-3 focus:outline-none focus:ring-1 focus:ring-gray-400 text-[15px]"
            required
          />
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-2">
            Your Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 bg-gray-50 rounded-lg p-2.5 text-[15px] focus:outline-none focus:ring-1 focus:ring-gray-400"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-2">
            Your Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 bg-gray-50 rounded-lg p-2.5 text-[15px] focus:outline-none focus:ring-1 focus:ring-gray-400"
            required
          />
        </div>

        {/* Submit Button */}
          <button
            type="submit"
            className="border border-gray-900 text-gray-900 px-5 py-1.5 rounded-md text-base font-medium hover:bg-gray-900 hover:text-white transition-all"
          >
            Submit
          </button>
      </form>
    </div>
  );
};

export default ReviewSection;