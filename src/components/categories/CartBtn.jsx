import { addCart, deleteCart } from "../../reducers/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "react-bootstrap";
import { BsCart3,BsCartX } from "react-icons/bs";

//functionality for cart button
function CartBtn({ prodMatched }) {
 
  const cartDetails = useSelector((state) => state.cartStore.cart);
  const dispatch = useDispatch();
  const [addToCart, setAddToCart] = useState("Add to Cart");
  const [availableInCart, setAvailableInCart] = useState(false);
  

  //setting the "cart indicator" whether to mention add or to remove from cart:

  //to avoid infinite loop due to re-rendering- we are using inside useEffect
  //so only when cartDetails or id changes this below code will get executed.


  const cartIdsFirst = cartDetails.map((ele) => ele.id);

  useEffect(() => {
    // Check if the product is in the cart when cartIds changes

    if (cartIdsFirst.includes(prodMatched.id)) {
      setAvailableInCart(true);
      setAddToCart("Remove from Cart");
    } else {
      setAvailableInCart(false);
      setAddToCart("Add to Cart");
    }
  }, [cartDetails, cartIdsFirst, prodMatched.id]);

  //when trying to add items to cart and removal from cart
  const handleClick = () => {
   
    if (!availableInCart) {
      dispatch(
        addCart({
          ...prodMatched,
          quantity: 1,
        })
      );
      toast.success(`Successfully ${prodMatched.title} added to Cart`, {
        position: "bottom-center",
        autoClose: 3000,
        style: {
          background: "#E4F1FF", // Change the background color
          color: "black", // Change the text color
        },
      });
    } else {
      let ind = cartDetails.findIndex((ele, index) => ele.id == prodMatched.id);
      dispatch(deleteCart(ind));
      toast.error(`${prodMatched.title} removed from Cart`, {
        position: "bottom-center",
        autoClose: 3000,
        style: {
          background: "#FF6969", // Change the background color
          color: "white", // Change the text color
        },
      });
      setAvailableInCart(false);
      setAddToCart("Add to Cart");
    }
  };

  return (
    <div className="m-1">
      <Button
      className="btn btn-block d-flex gap-0.5 justify-center items-center"
        variant="primary"
        onClick={() => handleClick()}
        style={{
          backgroundColor: availableInCart ? "red" : "blue",
          marginBottom: "20px",
        }}
      >
        {!availableInCart?<BsCart3/>:<BsCartX/>}{addToCart}
        
      </Button >
      <ToastContainer/>
    </div>
  );
}

export default CartBtn;
