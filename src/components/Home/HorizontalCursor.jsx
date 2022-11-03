import Carousel from "react-elastic-carousel";
import React, { useState, useEffect } from "react";
import Banner from "../../assests/images/main-banner.jpg";
import { Link } from "react-router-dom";
import CategoryCard from "../cards/CategoryCard";
import axios from "axios";

export default function HorizontalCursor() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      setLoading(true);
      axios
        .get(`/category`)
        .then((response) => {
          setCategories(response.data.categories);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
    }
    fetchCategories();
  }, []);
  return (
    <Carousel breakPoints={breakPoints} pagination={false}>
      {!loading && categories.length == 0 && <h1>No Categories</h1>}
      {loading ? (
        <h1>Loading</h1>
      ) : (
        categories.map((category) => {
          return (
            <Link to={`/${category.name.replace(/ /g, "")}/${category._id}`}>
              <CategoryCard title={category.name} image={category.imageUrl} />
            </Link>
          );
        })
      )}
    </Carousel>
  );
}

const categories = [
  {
    id: 1,
    category: "Technoogy",
    detail: "Picture your idea",
    // image: image.code,
  },
  {
    id: 2,
    category: "Programing",
    detail: "Picture your idea",
    // image: image.mobile,
  },
  {
    id: 3,
    category: "writing",
    detail: "Picture your idea",
    // image: image.web,
  },
  {
    id: 4,
    category: "Bussines",
    detail: "Picture your idea",
    // image: image.logo,
  },
  {
    id: 5,
    category: "Design",
    detail: "Picture your idea",
    // image: image.design,
  },
  {
    id: 6,
    category: "Design",
    detail: "Picture your idea",
    // image: image.design,
  },
  {
    id: 7,
    category: "Design",
    detail: "Picture your idea",
    // image: image.design,
  },
  {
    id: 8,
    category: "Design",
    detail: "Picture your idea",
    // image: image.design,
  },
  {
    id: 9,
    category: "Design",
    detail: "Picture your idea",
    // image: image.design,
  },
  {
    id: 10,
    category: "Design",
    detail: "Picture your idea",
    // image: image.design,
  },
];

const cat = ["animation", "design", "web-development", "react"];
const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 600, itemsToShow: 2 },
  { width: 900, itemsToShow: 3 },
  { width: 1200, itemsToShow: 5 },
];
