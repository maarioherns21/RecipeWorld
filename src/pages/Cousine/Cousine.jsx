import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PageHeader from "../../components/Header/Header";
import "./Cousine.css";
import {
  Grid,
  Icon,
  CardContent
} from "semantic-ui-react";


export default function Cousine() {
  const [cuisine, setCuisine] = useState([]);
  let params = useParams();

  const getCousine = async (name) => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${name}`
    );
    const recipes = await data.json();
    setCuisine(recipes.results);
  };

  useEffect(() => {
    getCousine(params.type);
    console.log(params.type);
  }, [params.type]);

  return (
    <div>
      <PageHeader />
    <Grid>
      {cuisine.map((item) => {
        return (
          <Card className="Card" key={item.id}>
            <Link to={"/recipe/" + item.id}>
              <img src={item.image} alt="" />
               <p>{item.title}</p>
             <Icon className="icon" name={"heart"} size="large" />
            </Link>
            <CardContent extra textAlign={"right"}>
                <Icon name={"heart"} size="large" color="grey" />
              </CardContent>
              <Wrapper/>
          </Card>
        );
      })}
    </Grid>
    </div>
  );
}

const Wrapper = styled.div `
margin: 1rem 0rem;`;

const Card = styled.div `
min-height: 20rem;
overflow: hidden;
position: relative;

img{
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
     font-weight:  600;
     font-size: 1rem;
     height: 40%;
     display: flex;
     justify-content: center;
     align-items: center;
 }
`;
