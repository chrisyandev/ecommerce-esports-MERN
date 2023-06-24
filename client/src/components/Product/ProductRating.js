import React from "react";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import styled from "styled-components";

const ProductRating = ({ numOfReviews = 0, averageRating = 0 }) => {
  const rating = Math.round(averageRating / 0.5) * 0.5; // round to the nearest 0.5

  const stars = Array.from({ length: 5 }, (_, index) => {
    return (
      <span key={index}>
        {rating >= index + 1 ? (
          <BsStarFill />
        ) : rating >= index + 0.5 ? (
          <BsStarHalf />
        ) : (
          <BsStar />
        )}
      </span>
    );
  });

  return (
    <StyledDiv>
      <div className="stars">{stars}</div>
      <p className="reviews">({numOfReviews} reviews)</p>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  span {
    color: #ffb900;
    font-size: 1rem;
    margin-right: 0.25rem;
  }
  p {
    margin-left: 0.5rem;
    margin-bottom: 0;
  }
  margin-bottom: 0.5rem;
`;

export default ProductRating;
