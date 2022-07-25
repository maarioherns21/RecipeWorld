import React, { useState, useEffect } from "react";
import Popular from "../../components/Popular/Popular";
import Veggie from "../../components/Veggie/Veggie";
import { motion } from "framer-motion";

import Category from "../../components/Category/Category";
import PageHeader from "../../components/Header/Header";
import HeroSection from "../../components/HeroSection/HeroSection";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loading from "../../components/Loader/Loader";
import * as postsAPI from "../../utils/postApi";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

export default function Home({ user, handleLogout }) {
  console.log(postsAPI, " <-- postsAPI");
  const [posts, setPosts] = useState([]); // <- likes are inside of the each post in the posts array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
