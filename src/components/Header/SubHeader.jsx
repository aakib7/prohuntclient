import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const SubHeader = () => {
  const [openCategories, setOpenCategories] = useState(false);
  return (
    <Box sx={{ width: "100%", backgroundColor: "#f7f7f7", height: "40px" }}>
      <Box
        sx={{
          padding: "8px 70px",
          display: { xs: "none", lg: "flex" },
        }}
      >
        <Typography>Technology</Typography>
        <Typography sx={{ paddingLeft: "25px", color: "#011f26" }}>
          Technology
        </Typography>
        <Typography sx={{ paddingLeft: "25px" }}>Technology</Typography>
        <Typography sx={{ paddingLeft: "25px" }}>Technology</Typography>
        <Typography sx={{ paddingLeft: "25px" }}>Technology</Typography>
        <Typography sx={{ paddingLeft: "25px" }}>Technology</Typography>
        <Typography sx={{ paddingLeft: "25px" }}>Technology</Typography>
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
              <Typography sx={{ paddingTop: "10px" }}>Item 1</Typography>
              <Divider />
              <Typography>Item 2</Typography>
              <Divider />
              <Typography>Item 3</Typography>
              <Divider />
              <Typography>Item 4</Typography>
              <Divider />
              <Typography>Item 5</Typography>
              <Divider />
              <Typography>Item 6</Typography>
              <Divider />
              <Typography>Item 7</Typography>
              <Divider />
              <Typography>Item 8</Typography>
              <Divider />
              <Typography>Item 9</Typography>
            </Stack>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
};

export default SubHeader;
