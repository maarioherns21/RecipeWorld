import { Header, Segment } from "semantic-ui-react";
import Search from "../Search/Search";
import Category from "../Category/Category";

export default function Header2() {
    return (
        <>
   <Segment>
   <Header>
    <Search />
   </Header>
   <Header>
   <Category/>
   </Header>
   </Segment>
   </>
  
    )
}
