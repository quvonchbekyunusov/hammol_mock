import { Search } from "@mui/icons-material";
import React, { useEffect } from "react";
import { request } from "../API";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setCategories } from "../store/productSlice";
import styles from "./NavBar.module.scss";

interface NavBarProps {
  name: string;
  setName: (name: string) => void;
  category: string;
  setCategory: (category: string) => void;
  limit: string;
  setLimit: (limit: string) => void;
}

function NavBar({
  name,
  setName,
  category,
  setCategory,
  limit,
  setLimit,
}: NavBarProps) {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.product);
  useEffect(() => {
    (async () => {
      const response = await request({ url: "category" });
      const data = await response.data;
      console.log(data);
      if (data) {
        dispatch(setCategories(data));
      }
    })();
  }, [dispatch]);
  return (
    <div className={styles.container}>
      <p>PRODUCTS</p>
      <select
        className={styles.select}
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">All</option>
        {categories?.length &&
          categories?.map((category: string) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
      </select>
      <input
        type="text"
        placeholder="Limit"
        value={limit}
        onChange={(e) => setLimit(e.target.value)}
        className={styles.limitInput}
      />
      <div className={styles.searchContainer}>
        <input value={name} onChange={(e) => setName(e.target.value)} />
        <button>
          <Search />
        </button>
      </div>
    </div>
  );
}

export default NavBar;
