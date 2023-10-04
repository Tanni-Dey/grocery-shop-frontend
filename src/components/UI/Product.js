import auth from "@/firebase/firebase.config";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const Product = ({ product }) => {
  const router = useRouter();
  const [singleProduct, setSingleProduct] = useState({});
  const [isActiveModal, setActiveModal] = useState(false);
  const [isDeleteModal, setDeleteModal] = useState(false);

  const [user] = useAuthState(auth);

  const handleModal = (clickedProduct) => {
    if (!user) {
      router.push("/login");
    } else {
      setSingleProduct(clickedProduct);
      setActiveModal(true);
    }
  };

  //add to cart function
  const handleAddToCart = (addProduct) => {
    const getProducts = localStorage.getItem("products");

    if (getProducts) {
      const allProducts = JSON.parse(getProducts);
      const searchProduct = allProducts.find(
        (product) => addProduct.ID === product.ID
      );
      if (searchProduct) {
        searchProduct.quantity = Number(searchProduct.quantity) + 1;
        const res = JSON.stringify(allProducts);
        localStorage.setItem("products", res);
      } else {
        allProducts.push(addProduct);
        const res = JSON.stringify(allProducts);
        localStorage.setItem("products", res);
      }
    } else {
      addProduct.quantity = 1;
      const allProducts = [addProduct];
      const res = JSON.stringify(allProducts);
      localStorage.setItem("products", res);
    }
  };

  //product delete function
  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:5000/delete-product/${id}`, {
      method: "DELETE",
    });
    const data = response.json();
    if (data) {
      setDeleteModal(true);
    }
  };

  return (
    <div>
      <button onClick={() => handleModal(product)}>
        <div className="card glass shadow-2xl">
          <figure>
            <img src={product.image} width={500} height={500} alt="product" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{product.name}</h2>
            <h6 className="text-xl font-semibold text-success text-left">
              Price : ${product.price}
            </h6>
          </div>
        </div>
      </button>

      <dialog open={isActiveModal} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{singleProduct.name}</h3>
          <p className="py-4">{singleProduct.description}</p>
          <h6 className="text-xl font-semibold text-success text-left">
            Price : ${product.price}
          </h6>

          <div className="modal-action">
            <button
              onClick={() => handleAddToCart(singleProduct)}
              className="btn btn-primary"
            >
              Add to cart
            </button>

            <Link href={`/products/${singleProduct.ID}`}>
              {" "}
              <button className="btn btn-warning">Edit</button>
            </Link>
            <button
              onClick={() => handleDelete(singleProduct.ID)}
              className="btn btn-error"
            >
              Delete
            </button>
            <form method="dialog">
              <button onClick={() => setActiveModal(false)} className="btn">
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
      <dialog open={isDeleteModal} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-2xl text-error text-center mb-5">
            Product Deleted
          </h3>
          <form method="dialog">
            <button onClick={() => setDeleteModal(false)} className="btn">
              Ok
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default Product;
