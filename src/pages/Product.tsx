import { Rating } from "@mui/material";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { request } from "../API";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setProduct } from "../store/productSlice";
import styles from "./Product.module.scss";

function Product() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { product } = useAppSelector((state) => state.product);
  const [image, setImage] = React.useState(product?.images[0]);
  useEffect(() => {
    setImage(product?.images[0]);
  }, [product]);

  console.log(product);
  useEffect(() => {
    (async () => {
      const response = await request({ url: `/product/${id?.split(":")[1]}` });
      if (response?.data) {
        dispatch(setProduct(response.data));
      }
    })();
  }, [dispatch, id]);
  return (
    <div>
      <div className={styles.container}>
        <img src={image} alt={product?.title} />
        <div className={styles.right}>
          <h3>Title: {product?.title}</h3>
          <p>Description: {product?.description}</p>
          <h4>Brand: {product?.brand}</h4>
          <h5>
            Category: <span>#{product?.category}</span>
          </h5>
          <b> Price: $ {product?.price}</b>
          <br />
          <b> Remainder: {product?.stock}</b>
          <h5 className={styles.sale}>Sale: {product?.discountPercentage}%</h5>
          <div className={styles.rating}>
            <Rating
              name="half-rating-read"
              defaultValue={product?.rating}
              readOnly
            />
          </div>
        </div>
      </div>
      <div className={styles.images}>
        {product?.images?.map((image: string) => (
          <img
            onClick={() => setImage(image)}
            src={image}
            alt={product?.title}
          />
        ))}
      </div>
    </div>
  );
}

export default Product;
