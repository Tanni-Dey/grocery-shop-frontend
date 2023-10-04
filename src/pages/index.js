import RootLayout from "@/components/Layouts/RootLayout";
import Product from "@/components/UI/Product";
import { useEffect, useState } from "react";

export default function HomePage({ allProducts }) {
  const [products, setProducts] = useState(allProducts);

  //search by name function
  const handleSearch = (e) => {
    e.preventDefault();
    const searchText = e.target.search.value;
    const searchProducts = allProducts.filter((product) =>
      product.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setProducts(searchProducts);
  };

  return (
    <div className="container px-20">
      <div>
        <form
          onSubmit={handleSearch}
          className="mx-auto max-w-full mb-5"
          action=""
        >
          <input
            type="text"
            className="input input-bordered w-full  max-w-xs mr-2 mb-2"
            name="search"
            placeholder="Search by Name"
          />
          <input className="btn btn-primary" type="submit" value="Search" />
        </form>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {products?.map((product) => (
          <Product key={product.ID} product={product}></Product>
        ))}
      </div>
    </div>
  );
}

HomePage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

//all product data fetching from server
export const getServerSideProps = async () => {
  const response = await fetch(
    "https://grocery-shop-backend.onrender.com/products"
  );
  const data = await response.json();
  return {
    props: {
      allProducts: data,
    },
  };
};
