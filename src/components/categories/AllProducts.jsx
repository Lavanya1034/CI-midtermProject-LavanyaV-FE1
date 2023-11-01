import React, { useEffect, useState } from "react";
import DisplayProducts from "./DisplayProducts";
import "./../../styles/AllProducts.css";
import LoadingPart from "./LoadingPart";
import { EndPoints } from "../../api/EndPoints";
import { useParams } from "react-router-dom";

function AllProducts() {
  let { key } = useParams();
  console.log(key);
  //if param is not present, then key is set to null- because only when this
  //component called for search- param will be set
  if (key == undefined) {
    key = null;
  }

  const [productsData, setProductsData] = useState([]);
  const [err, setErr] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(EndPoints.PRODUCT_BASE_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        } else {
          return response.json();
        }
      })
      .then((res) => {
        setProductsData(res);
        setLoading(true);
      })
      .catch((error) => {
        console.log(error);
        setErr(error);
      });
  }, [key]);
  //if the component is called for search- props will be available. Then in that case
  //have to filter the product with title and display

  if (key !== null && key !== undefined && productsData) {
    let newPro = productsData.filter((each) =>
      each.title.toLowerCase().includes(key.trim().toLowerCase())
    );
    if (newPro.length > 0) {
      productsData.splice(0);
      productsData.push(...newPro);
    }
  }

  let contents = productsData.map((productInd) => (
    <DisplayProducts
      key={productInd.id}
      id={productInd.id}
      brand={productInd.title}
      desc={productInd.description}
      image={productInd.image}
      price={productInd.price}
      rating={productInd.rating}
      title={productInd.title}
    />
  ));

  return (
    <div>
      {!err ? (
        <div>
          {loading ? (
            <div className="display-allcards">{contents}</div>
          ) : (
            <LoadingPart />
          )}
        </div>
      ) : (
        <div
          style={{
            height: "25vw",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1 style={{ color: "red", textAlign: "center" }}>
            Error status encountered : {err.message}
          </h1>
        </div>
      )}
    </div>
  );
}

export default AllProducts;
