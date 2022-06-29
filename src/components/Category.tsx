import React from "react";

interface CategoryProps {
  name: string;
  onClick: (name: string) => void;
}

function Category({ name, onClick }: CategoryProps) {
  return <div onClick={() => onClick(name)}>{name}</div>;
}

export default Category;
