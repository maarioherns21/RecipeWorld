import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Grid,
  Icon,
  CardContent,
} from "semantic-ui-react";
import PageHeader from "../../components/Header/Header";
import "./Searched.css";
import styled from "styled-components";
import Popular from "../../components/Popular/Popular";
import Footer from "../../components/Footer/Footer";

export default function Searched() {
  const [SearchedRecipes, setSearchRecipes] = useState([]);
  let params = useParams();

  const getSearched = async (name) => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${name}`
    );
    const recipes = await data.json();
    setSearchRecipes(recipes.results);
  };

  useEffect(() => {
    getSearched(params.search);
  }, [params.search]);

  return (
    <div>
      <PageHeader />
      <Grid centered>
        {SearchedRecipes.map((item) => {
          return (
            <Card className="Card" key={item.id}>
              <Link to={"/recipe/" + item.id}>
                <img src={item.image} alt="" />
                <p>{item.title}</p>
              </Link>

              <CardContent extra textAlign={"right"}>
                <Icon name={"heart"} size="large" color="grey" />
              </CardContent>
            </Card>
          );
        })}
      </Grid>
      <Wrapper />
      <Popular />
      <Footer />
    </div>
  );
}

const Wrapper = styled.div`
  margin: 1rem 0rem;
`;

const Card = styled.div`
  min-height: 20rem;
  overflow: hidden;
  position: relative;

  img {
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  p {
    position: absolute;
    z-index: 10;
    left: 50;
    bottom: 0%;
    color: white;
    width: 100%;
    text-align: center;
    font-weight: 600;
    font-size: 1rem;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
