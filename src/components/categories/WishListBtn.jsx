import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./../../styles/DisplayProducts.css";
import "./../../styles/IndProductDetail.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { addWish, deleteWish } from "../../reducers/wishSlice";


//component for heart symbol-wishlist functionality
function WishListBtn({prodMatched}) {
   
  const dispatch = useDispatch();
  const wishDetails = useSelector((state) => state.wishStore.wish);
  const [availableInWish, setAvailableInWish] = useState(false);

  
  //for wishlist

  useEffect(() => {
    if (wishDetails.length > 0) {
      wishDetails.forEach((element) => {
        //checking if already the product is added to wishlist
        if (element.id == prodMatched.id) {
          //if present in wishlist, setting indicator true  to set the colour red
          setAvailableInWish(true);
        }
      });
    }
  }, [wishDetails, prodMatched.id]);


  //for wishList control and to set heart red colour
  const handleWishClick = () => {
    if (!availableInWish) {
     
      dispatch(
       
        addWish({
          ...prodMatched,
          quantity: 1,
        })
      );
      toast.success(`Successfully ${prodMatched.title} added to WishList`, {
        position: "bottom-right",
        autoClose: 3000,
        style: {
          background:"#45474B",
          color: "white", // Change the text color
        },
      });
    } else {
      let indWish = wishDetails.findIndex((ele, index) => ele.id == prodMatched.id);

      dispatch(deleteWish(indWish));
      toast.warning(`${prodMatched.title} removed from Wishlist`, {
        position: "bottom-right",
        autoClose: 3000,
        style: {
          background:"#FFFD8C",
          color: "black", // Change the text color
        },
      });
      setAvailableInWish(false);
    }
  };

  return (
    <div >
        <AiFillHeart
          style={{ color: availableInWish ? "red" : "black" }}
          id="heartSymb"
          onClick={handleWishClick}
        />
        <ToastContainer/>

    </div>
  )
}

export default WishListBtn