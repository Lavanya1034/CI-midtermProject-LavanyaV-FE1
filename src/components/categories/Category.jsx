import DisplayProducts from "./DisplayProducts";
import "./../../styles/AllProducts.css";
import { useEffect } from "react";
import axios from 'axios';
import { EndPoints } from "../../api/EndPoints";
import { useState } from "react";
import LoadingPart from "./LoadingPart";
import { useParams } from "react-router-dom";

function Category() {
  const [catdetails,setCatdetails]= useState([])
  const [err,setErr] = useState(null)
  const[loading,setLoading] = useState(false)
  const {categories} = useParams();
  console.log(categories)

  useEffect(()=>{
    axios.get(EndPoints.INDCATEGORIES_URL+categories)
        .then((response)=>{
          setCatdetails(response.data)
          setLoading(true)
        },
        (error)=>setErr(error.response.data))
        .catch((err)=>setErr(err.message))
  },[categories])
 
    let contents = catdetails.map((productInd) => (
      <DisplayProducts
        key={productInd.id}
        id={productInd.id}
        brand={productInd.title}
        desc={productInd.description}
        image={productInd.image}
        price={productInd.price}
        rating={productInd.rating}
        title = {productInd.title}
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
      <div style={{height:"25vw",display:"flex",alignItems:"center",justifyContent:"center"}}>
        <h1 style={{ color: "red", textAlign: "center" }}>
          Error status encountered : {err.message}
        </h1>
      </div>
    )}
  </div>
  );
}

export default Category;
