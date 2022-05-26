import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Grid,
  GridRow,
  Card,
  Image,
  CardDescription,
  Icon,
  CardContent,
} from "semantic-ui-react";
import PageHeader from "../../components/Header/Header";
import "./Searched.css";

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
      <Grid>
        <GridRow>
          {SearchedRecipes.map((item) => {
            return (
              <Card key={item.id} raised>
                <Card.Content>
                  <Link to={"/recipe/" + item.id}>
                    <Image src={item.image} alt="" />
                    <CardDescription>{item.title}</CardDescription>
                  </Link>
                </Card.Content>
                <CardContent extra textAlign={"right"}>
                  <Icon className="icon" name={"heart"} size="large" />
                </CardContent>
              </Card>
            );
          })}
        </GridRow>
      </Grid>
    </div>
  );
}
