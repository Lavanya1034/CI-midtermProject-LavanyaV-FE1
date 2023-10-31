import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./../../styles/NavBar.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { EndPoints } from "../../api/EndPoints";

function NavBar() {
  const nav = useNavigate();
  const [categoriesNames, setCategoriesNames] = useState([]);

  //categories are also fetched from api and dynamically dispplayed in navbar
  useEffect(() => {
    axios
      .get(EndPoints.CATEGORY_URL)
      .then(
        (response) => {
          setCategoriesNames(response.data);
        },

        (error) => console.log(error.response.data)
      )
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div>
      <Navbar id="nav-sec">
        <Container id="nav-container">
          <Nav className="me-auto " id="nav-titles">
            <Nav.Link className="nav-categories text-white" onClick={() => nav("/all")}>
              All
            </Nav.Link>
            {categoriesNames
              ? categoriesNames.map((eachCategory,index) => (
                  <Nav.Link
                    key ={index}
                    className="nav-categories text-white"
                    onClick={() => nav(`/category/${eachCategory}`)}
                  >
                    {eachCategory
                      .split(" ") // Split the sentence into words
                      .map(
                        (individual) =>
                          individual[0].toUpperCase() + individual.slice(1)
                      )
                      .join(" ")}
                  </Nav.Link>
                ))
              : null}
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBar;
