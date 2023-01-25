import React, { useState } from "react";
import { Box, Typography, styled } from "@mui/material";
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
    <Box sx={{ width: "100%", backgroundColor: "#f7f7f7", height: "40px" }}>
      <Box
        sx={{
          padding: "8px 70px",
          display: { xs: "none", lg: "flex" },
        }}
      >
        {!loading && categories.length == 0 && (
          <Typography variant="h6">No Categories Found</Typography>
        )}

        {loading ? (
          <Typography variant="h6">Loading...</Typography>
        ) : (
          categories.map((category) => (
            <Link
              sx={{
                color: "black",
              }}
              to={`/${category.name.replace(/ /g, "")}/${category._id}`}
            >
              <StyledTypography>{category.name}</StyledTypography>
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
const StyledTypography = styled(Typography)`
  color: black;
  padding-left: 25px;
  font-weight: 500;
  &:hover {
    text-decoration: underline;
    color: #7a57d1;
  }
`;
