import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const SubHeader = () => {
  const [openCategories, setOpenCategories] = useState(false);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      setLoading(true);
      const request = await axios.get("/category");
      setCategories(request.data.categories);
      setLoading(false);
      return request;
    }
    fetchCategories();
  }, []);

  return (
    <Box sx={{ width: "100%", backgroundColor: "#f7f7f7", height: "40px" }}>
      <Box
        sx={{
          padding: "8px 70px",
          display: { xs: "none", lg: "flex" },
        }}
      >
        {!loading && categories.length == 0 && <h1>No Categories</h1>}

        {loading ? (
          <h1>Loading...</h1>
        ) : (
          categories.map((category) => (
            <Link
              style={{ color: "black" }}
              to={`/${category.name.replace(/ /g, "")}/${category._id}`}
            >
              <Typography sx={{ paddingLeft: "25px" }}>
                {category.name}
              </Typography>
            </Link>
          ))
        )}
      </Box>
      <Box sx={{ display: { xs: "flex", lg: "none" } }}>
        <Accordion sx={{ width: "100%", bgcolor: "#f7f7f7", zIndex: 100 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Browse Categories</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={2} sx={{ width: "100%" }}>
              {loading && <p>Loading ...</p>}
              {categories.map((category) => (
                <Link
                  style={{ color: "black" }}
                  to={`/${category.name.replace(/ /g, "")}/${category._id}`}
                >
                  <Typography sx={{ paddingLeft: "25px" }}>
                    {category.name}
                  </Typography>
                  <Divider />
                </Link>
              ))}
            </Stack>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
};

export default SubHeader;
