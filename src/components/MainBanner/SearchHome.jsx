import React from "react";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Box, Button, Grid, styled, Typography } from "@mui/material";
import InputBase from "@mui/material/InputBase";

const SearchHome = ({ setSearch, setKeyword, keyword }) => {
  return (
    <>
      <Box style={{ display: "flex", width: "100%" }}>
        <Box style={{ display: "flex", width: "99%" }}>
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: "100%",
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder={"Search " + keyword}
              onChange={({ currentTarget: input }) => setSearch(input.value)}
            />

            <Select
              id="demo-simple-select"
              value={keyword}
              label="Search"
              onChange={(event) => {
                setKeyword(event.target.value);
              }}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value={"Jobs"}>Jobs</MenuItem>
              <MenuItem value={"Gigs"}>Gigs</MenuItem>
              <MenuItem value={"Freelancer"}>Freelancer</MenuItem>
              <MenuItem value={"Blog"}>Blog</MenuItem>
            </Select>
          </Paper>
        </Box>
        <Box style={{ display: "flex", width: "1%" }}></Box>
      </Box>
    </>
  );
};

export default SearchHome;
