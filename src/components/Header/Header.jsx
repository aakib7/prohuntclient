import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import DesktopMacIcon from "@mui/icons-material/DesktopMac";
import { Snackbar, Alert } from "@mui/material";
import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Header() {
  // const isAuth = false;
  const { isAuthenticated } = useSelector((state) => state.user);
  let navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [severity, setSeverity] = React.useState("error");
  const [message, setMessage] = React.useState("");

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const logout = () => {
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    axios
      .get(`http://localhost:4000/user/logout`, config)
      .then((response) => {
        setSeverity("success");
        setMessage(response.data.message);
        setOpen(true);
        window.location.reload(true);
      })
      .catch((error) => {
        setSeverity("error");
        setMessage(error);
        setOpen(true);
      });
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Link to={"/panel"}>My account</Link>
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleMenuClose();
          logout();
        }}
      >
        Log Out
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";

  const renderMobileMenuAuth = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const renderMobileMenuUnAuth = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <Link
          to={"/registration"}
          style={{ textDecoration: "none", color: "black" }}
        >
          Sign Up
        </Link>
      </MenuItem>
      <Divider />
      <MenuItem>
        <Link to={"/login"} style={{ textDecoration: "none", color: "black" }}>
          Log In
        </Link>
      </MenuItem>
      <Divider />
      <MenuItem>
        <Link to={""} style={{ textDecoration: "none", color: "black" }}>
          How It Work?
        </Link>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity={severity}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
      <AppBar position="static" style={{ backgroundColor: "#025e73" }}>
        <Toolbar>
          <Link to={"/"} style={{ textDecoration: "none" }}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                display: { xs: "none", sm: "block" },
                color: "#f2a71b",
              }}
            >
              ProHunt
            </Typography>
          </Link>

          <Box sx={{ display: "flex", marginLeft: "12px" }}>
            <Link to={"/"} style={{ textDecoration: "none", color: "white" }}>
              <DesktopMacIcon />
            </Link>
          </Box>
          <Box sx={{ flexGrow: 1 }} />

          {/* //notification and messages */}

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {isAuthenticated ? (
              <>
                <IconButton
                  size="large"
                  aria-label="show 4 new mails"
                  color="inherit"
                >
                  <Badge badgeContent={4} color="error">
                    <MailIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  color="inherit"
                >
                  <Badge badgeContent={17} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  marginTop: "10px",
                  flexDirection: "row",
                }}
              >
                <Link
                  style={{
                    marginRight: "19px",
                    fontSize: "16px",
                    fontWeight: "400",
                    color: "white",
                  }}
                  to={"/login"}
                >
                  How It Work ?
                </Link>

                <Link
                  style={{
                    marginRight: "19px",
                    fontSize: "16px",
                    fontWeight: "400",
                    color: "white",
                  }}
                  to={"/login"}
                >
                  Login
                </Link>
              </Box>
            )}
            {isAuthenticated ? (
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            ) : (
              <Box
                sx={{
                  mt: "2px",
                  backgroundColor: "#f2a71b",
                  borderRadius: "5px",
                }}
              >
                <Typography
                  sx={{
                    padding: "5px 10px",
                    fontSize: "16px",
                    fontWeight: "500",
                    color: "#f7f7f7",
                  }}
                >
                  <Link
                    to={"/registration"}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    Sign Up
                  </Link>
                </Typography>
              </Box>
            )}
          </Box>

          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {isAuthenticated ? renderMobileMenuAuth : renderMobileMenuUnAuth}
      {/* //sub profile in mobile */}
      {renderMenu}
    </Box>
  );
}
