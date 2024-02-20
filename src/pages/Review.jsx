import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Star } from "lucide-react";
import ReviewForm from "@/components/ReviewForm";

const Review = ({ product }) => {
  return (
    <>
      <div className="mt-8 flex items-center justify-between">
        <h2 className="font-bold text-2xl">Reviews</h2>
        <ReviewForm product={product} />
      </div>
      <div className="mt-6 grid grid-cols-3 gap-6">
        {product.reviews.map((review) => (
          <Card>
            <CardHeader>
              <CardTitle>{review.review_text}</CardTitle>
              <CardDescription className="flex">
                {[
                  ...Array(review.rating)
                    .fill(0)
                    .map((_, index) => (
                      <Star
                        key={index}
                        className="h-6 w-6 fill-orange-500 text-transparent"
                      />
                    )),
                ]}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="opacity-70">{review.user.email}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export default Review;
