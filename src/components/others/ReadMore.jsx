import { Typography } from "@mui/material";
import React, { useState } from "react";

const ReadMore = ({ children, words, color }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <Typography variant="p">
      {isReadMore ? text.slice(0, words) : text}
      <span
        onClick={toggleReadMore}
        style={{
          cursor: "pointer",
          fontWeight: "400",
          color: color ? color : "blue",
        }}
      >
        {isReadMore ? " ...read more" : " show less"}
      </span>
    </Typography>
  );
};

export default ReadMore;
