import { Rating } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { IProduct } from "../store/productSlice";
import styles from "./Card.module.scss";

function Card({
  product,
  setCategory,
}: {
  product: IProduct;
  setCategory: (category: string) => void;
}) {
  const navigation = useNavigate();
  return (
    <div
      onClick={() => navigation(`/product:${product.id}`)}
      className={styles.container}
    >
      <img style={{ width: "100%" }} alt="image45" src={product.thumbnail} />
      <h3>{product.title} </h3>
      <b>{product.id}</b>
      <p>{product.description}</p>
      <h4>{product.brand}</h4>
      <h5 onClick={() => setCategory(product.category)}>#{product.category}</h5>
      <div className={styles.rating}>
        <b> $ {product.price}</b>
        <Rating
          name="half-rating-read"
          defaultValue={product.rating}
          precision={0.1}
          readOnly
        />
      </div>

      <div className={styles.discount}>
        <p>{product.discountPercentage}%</p>
      </div>
    </div>
  );
}

export default Card;
