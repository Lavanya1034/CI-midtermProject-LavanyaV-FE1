import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import StarRatings from "react-star-ratings";
import { Link } from "react-router-dom"
import CartBtn from "./CartBtn";
import WishListBtn from "./WishListBtn";

function DisplayProducts(props) {

 
  //to extract price decimal value and to display as superscript
  let prodPrice = props.price
  const priceVal = (prodPrice.toString()).split(".");
  

  return (
    <div id="eachProducts" >
      <Card style={{ width: "18rem",height:"fit-content" }}>
        <div style={{display:"flex",justifyContent:"flex-end", marginRight:"2%", marginTop:"2%"}}>
        <WishListBtn prodMatched={props}/>
        </div>
        <Link to={`/products/${props.id}`}>
          <Card.Img variant="top" id="image-style"  src={props.image}/>
          <Button id="image-zoom">View Details</Button>
        </Link>
        <hr />
        <Card.Body >
          <Card.Title id="brand-title">
            <span style={{ color: "#80B3FF" }}>Brand, </span>
            {props.brand}
          </Card.Title>

          <StarRatings
            rating={props.rating.rate} // The initial rating (you can change this dynamically)
            starRatedColor="gold" // The color of the filled-in stars
            changeRating={(newRating) => console.log(newRating)} // Callback function when the rating changes
            numberOfStars={5} // Total number of stars to display
            name="rating" // Unique name for the rating input (required for accessibility)
            starDimension="20px" // Customize the size of the stars
            starSpacing="2px" // Customize the spacing between stars
          />
          <p style={{marginLeft:"5%"}}>({props.rating.count})</p>

          <Card.Text>
          
            <span style={{color:"rgb(152, 148, 148)"}}>&#xFF04;</span>
            <span>{priceVal[0]}</span>
            <sup style={{color:"rgb(152, 148, 148)"}}>{priceVal[1]}</sup>
          </Card.Text>

          <CartBtn prodMatched={props}/>
        </Card.Body>
      </Card>
    </div>
  );
}

export default DisplayProducts;
