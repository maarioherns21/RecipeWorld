import React, { useState, useEffect } from "react";
import Popular from "../../components/Popular/Popular";
import Veggie from "../../components/Veggie/Veggie";
import { motion } from "framer-motion";
import Search from "../../components/Search/Search";
import Category from "../../components/Category/Category";
import PageHeader from "../../components/Header/Header";
import HeroSection from "../../components/HeroSection/HeroSection";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loading from "../../components/Loader/Loader";
import * as postsAPI from "../../utils/postApi";
import * as likesAPI from "../../utils/likeApi";
import Navbar from "../../components/Navbar/Navbar";
import { Grid } from "semantic-ui-react";
import Footer from "../../components/Footer/Footer";

export default function Home({ user, handleLogout }) {
  console.log(postsAPI, " <-- postsAPI");
  const [posts, setPosts] = useState([]); // <- likes are inside of the each post in the posts array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function addLike(postId) {
    try {
      const data = await likesAPI.create(postId);
      console.log(data, " <- the response from the server when we make a like");
      getPosts(); // <- to go get the updated posts with the like
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  }

  async function removeLike(likeId) {
    try {
      const data = await likesAPI.removeLike(likeId);
      console.log(
        data,
        "<-  this is the response from the server when we remove a like"
      );
      getPosts();
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  }

  // C create in Crud
  // we invoke this function in addPost component when the submit button on our form is clicked
  // so we need to pass it as a prop
  async function handleAddPost(post) {
    try {
      setLoading(true);
      const data = await postsAPI.create(post); // our server is going to return
      // the created post, that will be inside of data, which is the response from
      // the server, we then want to set it in state
      console.log(data, " this is response from the server, in handleAddPost");
      setPosts([data.post, ...posts]);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  }

  // R read in crud
  async function getPosts() {
    try {
      const data = await postsAPI.getAll();
      console.log(data, " this is data,");
      setPosts([...data.posts]);
      setLoading(false);
    } catch (err) {
      console.log(err.message, " this is the error");
      setError(err.message);
    }
  }

  // useEffect runs once
  // the component is first rendered (whenever you first view the component)
  // Component Lifecycle in react
  useEffect(() => {
    getPosts();
  }, []);

  if (error) {
    return (
      <>
        <PageHeader handleLogout={handleLogout} user={user} />
        <ErrorMessage error={error} />;
      </>
    );
  }

  if (loading) {
    return (
      <>
        <PageHeader handleLogout={handleLogout} user={user} />
        <Loading />
      </>
    );
  }

  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <PageHeader handleLogout={handleLogout} user={user} />
      <Navbar />
      <HeroSection />
      <Category />
      <Veggie />
      <Popular />
      <Footer />

    </motion.div>
  );
}
