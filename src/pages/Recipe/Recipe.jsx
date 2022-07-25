import { useEffect, useState } from "react";
import styledComponents from "styled-components";
import { useParams } from "react-router-dom";
import PageHeader from "../../components/Header/Header";
import Popular from "../../components/Popular/Popular";
import Footer from "../../components/Footer/Footer";
import { Icon } from "semantic-ui-react";

export default function Recipe({ handleLogout, user }) {
  let params = useParams();
  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState("instructions");

  const fetchDetails = async () => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/${params.id}/information?apiKey=${process.env.REACT_APP_API_KEY}`
    );
    const detailData = await data.json();
    setDetails(detailData);
  };
  useEffect(() => {
    fetchDetails(params.name);
  }, [params.name]);

  // async function deleteRecipe(){
  //   const data = fetch(
  //     `https://api.spoonacular.com/recipes/${params.id}/information?apiKey=${process.env.REACT_APP_API_KEY}`,{
  //        method: 'DELETE'
  //      });
  //       data = await data.json();
  //      console.warn(deleteRecipe)
  //  }

  //  async function getData (id) {

  //    let recipes = fetch(
  //      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${id}`
  //      );
  //      recipes = await recipes.json();
  //      setData(recipes)

  //  }
  const likeColor = -1 ? "blue" : "red";

  return (
    <div>
      <PageHeader handleLogout={handleLogout} user={user} />
      <DetailWrapper>
        <div>
          <h2>{details.title}</h2>
          <img src={details.image} alt="" />
        </div>
        <Info>
          <Button //turnary expression switch between the instructions and ingridients
            className={activeTab === "instructions" ? "active" : " "}
            onClick={() => setActiveTab("instructions")}
          >
            Instructions
          </Button>
          <Button
            className={activeTab === "ingridients" ? "active" : " "}
            onClick={() => setActiveTab("ingridients")}
          >
            Ingridients
          </Button>
          <Button>
            <Icon name={"thumbs up"} size="small" color={likeColor} />
            Like
          </Button>
          {activeTab === "instructions" && (
            <div>
              <h3 dangerouslySetInnerHTML={{ __html: details.summary }}></h3>
              <h3
                dangerouslySetInnerHTML={{ __html: details.instructions }}
              ></h3>
            </div>
          )}
          {activeTab === "ingridients" && (
            <ul>
              {details.extendedIngredients.map((ingredient) => (
                <li key={ingredient.id}>{ingredient.original}</li>
              ))}
            </ul>
          )}
        </Info>
      </DetailWrapper>
      <Popular />
      <Footer />
    </div>
  );
}
const DetailWrapper = styledComponents.div`
    margin-top: 10rem;
    margin-bottom: 5rem;
    display: flex;
    .active{
        background: linear-gradient(35deg, #494949, #313131);
        color: white;
    }
    h2{
        margin-bottom: 3rem;
        margin-left: 5rem;

    }
    li {
        font-size: 1.2rem;
        line-height: 2.5rem;

    }
    ul{
        margin-top: 2rem;
    }
    h3{
      font-size: 1.2rem;
      line-height: 2rem;
      font-weight: 200;
    }
    img {
      margin-left: 5rem;
    }
`;
const Button = styledComponents.button`
 padding: 1rem 2rem;
 color: #313131;
 background: white;
 border: 2px solid black;
 margin-right: 2rem;
 font-weight: 600;
 margin-bottom: 3rem;

`;

const Info = styledComponents.div`
    margin-left: 10rem;
    margin-right: 5rem;
  
`;
