import RootLayout from "@/components/Layouts/RootLayout";
import { useState } from "react";

const Addproduct = () => {
  const [activeModal, setActiveModal] = useState(false);

  //product adding function
  const handleSubmit = async (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const price = event.target.price.value;
    const imageLink = event.target.image.value;
    const description = event.target.description.value;
    const product = {
      name: name,
      price: Number(price),
      description: description,
      image: imageLink,
    };

    const response = await fetch(
      "https://grocery-shop-backend.onrender.com/add-product",
      {
        method: "POST",
        body: JSON.stringify(product),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (data.affectedRows === 1) {
      setActiveModal(true);
      event.target.reset();
    }
  };

  return (
    <div className="card w-1/3 mx-auto glass shadow-xl">
      <div className="card-body text-center">
        <h2 className="card-title mb-5 justify-center uppercase">
          Add Product{" "}
        </h2>
        <form onSubmit={handleSubmit} action="">
          <input
            name="name"
            type="text"
            placeholder="Product Name"
            className="input input-bordered input-primary w-full max-w-xs mb-3"
            required
          />
          <input
            name="price"
            type="number"
            placeholder="Product Price"
            className="input input-bordered input-primary w-full max-w-xs mb-3"
            required
          />
          <input
            name="image"
            type="text"
            placeholder="Product image link"
            className="input input-bordered input-primary w-full max-w-xs mb-3"
            required
          />
          <textarea
            name="description"
            placeholder="Product Description"
            className="textarea textarea-primary textarea-lg w-full max-w-xs"
            required
          ></textarea>

          <input
            type="submit"
            value="Add Product"
            className="btn btn-primary"
          />
        </form>

        {/*---------product adding modal--------- */}
        <dialog open={activeModal} className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-2xl text-success text-center mb-5">
              Product successfully Added
            </h3>
            <form method="dialog">
              <button onClick={() => setActiveModal(false)} className="btn">
                Ok
              </button>
            </form>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default Addproduct;

Addproduct.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
