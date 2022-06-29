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
      if (Number(limit) === 0) {
        return 1;
      } else {
        const count = Math.ceil(products.count / Number(limit));
        return count;
      }
    } else {
      return 1;
    }
  }, [products, limit]);
  const fetchItems = async (url: string) => {
    const response = await request({ url: url });
    if (response?.data) {
      dispatch(setProducts(response.data));
    }
    return response?.data;
  };
  console.log(paginationCount);
  useEffect(() => {
    fetchItems(
      `/product?category=${category}&name=${name}&offset=${offset}&limit=${limit}`,
    );
    if (page > paginationCount) {
      setPage(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, offset, limit]);
  useEffect(() => {
    fetchItems(`/product?category=${category}&name=${name}`);
    if (page > paginationCount) {
      setPage(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);
  return (
    <div className={styles.container}>
      <NavBar
        name={name}
        setName={setName}
        category={category}
        setCategory={setCategory}
        limit={limit}
        setLimit={setLimit}
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
