import Carousel from "react-elastic-carousel";
import React from "react";
import Banner from "../../assests/images/main-banner.jpg";
import { Link } from "react-router-dom";
import CategoryCard from "../cards/CategoryCard";

export default function HorizontalCursor() {
  return (
    <Carousel breakPoints={breakPoints} pagination={false}>
      {categories.map((cat) => {
        return (
          <Link to={`sub-categories/${cat.category}`}>
            <CategoryCard title={cat.category} image={Banner} />
          </Link>
        );
      })}
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
