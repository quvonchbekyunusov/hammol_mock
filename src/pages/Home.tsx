import React, { useEffect, useMemo } from "react";
import styles from "./Home.module.scss";
import Pagination from "@mui/material/Pagination";
import Card from "../components/Card";
import NavBar from "../components/NavBar";
import { request } from "../API";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { IProduct, setProducts } from "../store/productSlice";

function Home() {
  const [category, setCategory] = React.useState("");
  const [offset, setOffset] = React.useState("");
  const [limit, setLimit] = React.useState("10");
  const [name, setName] = React.useState("");
  const [page, setPage] = React.useState(1);
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.product);
  const paginationCount = useMemo(() => {
    if (products) {
      return products?.count / Number(limit);
    } else {
      return 0;
    }
  }, [products]);
  const fetchItems = async (url: string) => {
    const response = await request({ url: url });
    if (response?.data) {
      dispatch(setProducts(response.data));
    }
    return response?.data;
  };
  console.log(products);
  useEffect(() => {
    console.log(
      `/products?category=${category}&name=${name}&offset=${offset}&limit=${limit}`,
    );
    fetchItems(
      `/product?category=${category}&name=${name}&offset=${offset}&limit=${limit}`,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, name, offset, limit]);
  return (
    <div className={styles.container}>
      <NavBar
        name={name}
        setName={setName}
        category={category}
        setCategory={setCategory}
      />
      <div className={styles.content}>
        {products?.products?.map((product: IProduct) => (
          <Card setCategory={setCategory} product={product} key={product.id} />
        ))}
      </div>
      <div className={styles.pagination}>
        <Pagination
          count={paginationCount}
          variant="outlined"
          shape="rounded"
          page={page}
          onChange={(event, value) => {
            setPage(value);
            setOffset(String((value - 1) * Number(limit)));
          }}
        />
      </div>
    </div>
  );
}

export default Home;
