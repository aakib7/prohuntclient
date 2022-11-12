import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import { Typography, styled } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Search from "../Home/Search";
import TuneIcon from "@mui/icons-material/Tune";

const FilterSideBar = () => {
  const [state, setState] = React.useState({ left: true });
  const [dropdown, setDropdown] = React.useState(true);
  const [price, setPrice] = React.useState(true);
  const [country, setCountry] = React.useState(true);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 320 }}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <Typography padding={2}>Filter</Typography>
      </List>
      {/* Deliver dropdoen */}
      <Divider />
      <List>
        <Box paddingX={3}>
          <Typography fontSize={22}>
            Deliver Time
            <span
              onClick={() => setDropdown(!dropdown)}
              style={{ marginTop: "55px" }}
            >
              <ArrowDropDownIcon />
            </span>
          </Typography>
          <List sx={{ display: dropdown ? "flex" : "none" }}>
            <Box sx={{ width: "320px" }}>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="1"
                    control={<Radio />}
                    label="Within 1 day"
                  />
                  <FormControlLabel
                    value="2"
                    control={<Radio />}
                    label="Within 2 day"
                  />
                  <FormControlLabel
                    value="3"
                    control={<Radio />}
                    label="Within 3 day"
                  />
                  <FormControlLabel
                    value="4"
                    control={<Radio />}
                    label="Within 4 day"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
          </List>
        </Box>
      </List>
      {/* country dropDowm */}
      <Divider />
      <List>
        <Box paddingX={3}>
          <Typography fontSize={22}>
            Country
            <span
              onClick={() => setCountry(!country)}
              style={{ marginTop: "55px" }}
            >
              <ArrowDropDownIcon />
            </span>
          </Typography>
          <List sx={{ display: country ? "flex" : "none" }}>
            <Box sx={{ width: "320px" }}>
              <Search />
            </Box>
          </List>
        </Box>
      </List>
      {/* Price DropDown */}
      <Divider />
      <List>
        <Box paddingX={3}>
          <Typography fontSize={22}>
            Price
            <span
              onClick={() => setPrice(!price)}
              style={{ marginTop: "55px" }}
            >
              <ArrowDropDownIcon />
            </span>
          </Typography>
          <List sx={{ display: price ? "flex" : "none" }}>
            <Box sx={{ width: "320px" }}>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="1"
                    control={<Radio />}
                    label="Under $20"
                  />
                  <FormControlLabel
                    value="2"
                    control={<Radio />}
                    label="$20 to $50"
                  />
                  <FormControlLabel
                    value="3"
                    control={<Radio />}
                    label="$50 to $100"
                  />
                  <FormControlLabel
                    value="4"
                    control={<Radio />}
                    label="Over $100"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
          </List>
        </Box>
      </List>

      <Divider />
      <List>
        <Box paddingX={3}>
          <StyledButton fullWidth={true}>Apply Filters</StyledButton>
        </Box>
      </List>
    </Box>
  );

  return (
    <div>
      {["Filters"].map((anchor) => (
        <React.Fragment key={anchor}>
          <StyledButton
            startIcon={<TuneIcon />}
            onClick={toggleDrawer(anchor, true)}
          >
            {anchor}
          </StyledButton>
          <Drawer
            anchor={"left"}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
};

export default FilterSideBar;

const StyledButton = styled(Button)`
  background-color: #f2a71b;
  color: #fff;
  &:hover {
    background-color: #025e73;
  }
`;
