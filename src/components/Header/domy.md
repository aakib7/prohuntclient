{
/\* <div className="container">

  <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar">
    <div className="top_section">
      <Typography
        variant="h4"
        style={{ display: isOpen ? "block" : "none", color: "#f2a71b" }}
        className="logo"
      >
        ProHunt
      </Typography>
      <div style={{ marginLeft: isOpen ? "20px" : "0px" }} className="bars">
        <MenuIcon onClick={toggle} sx={{ fontSize: "40px" }} />
      </div>
    </div>
    {menuItem.map((item, index) => (
      <NavLink
        to={item.path}
        key={index}
        className="link"
        activeclassName="active"
      >
        <div className="icon">{item.icon}</div>
        <div
          style={{ display: isOpen ? "block" : "none" }}
          className="link_text"
        >
          {item.name}
        </div>
      </NavLink>
    ))}
  </div>
</div>; */
}

const StyledButton = styled(Button)` background-color: #f2a71b; color: #fff; &:hover { background-color: #025e73; }`;

// toast
const [open, setOpen] = React.useState(false);
const [severity, setSeverity] = React.useState("error");
const [message, setMessage] = React.useState("");

//use where u want
setOpen(true);
setSeverity("error");
setMessage("Please fill Email And Password feildes");

// in return at the top
<Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
<Alert
onClose={() => setOpen(false)}
severity={severity}
sx={{ width: "100%" }}

>

    {message}

  </Alert>
</Snackbar>;

// end
const Alert = React.forwardRef(function Alert(props, ref) {
return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// axios

const config = {
headers: {
"Access-Control-Allow-Origin": "\*",
"Content-type": "application/json",
"x-auth-token": user.token,
},
};

const { data } = await axios.get(`/api/user?search=${search}`, config);
setLoading(false);
console.log(data);
setSearchResult(data);

/// use ? in map

{
reviews?.map((review) => (
<>
<Divider />
<Review
        comment={review.comment}
        rating={review.rating}
        author={review.name}
      />
<Divider />
</>
));
}

/// req
const handleLike = () => {
const config = {
headers: {
"Access-Control-Allow-Origin": "\*",
"Content-Type": "application/json",
},
withCredentials: true,
};

axios
.get(`http://localhost:4000/gigs/gig/${gigId}/like`, config)
.then((response) => {
setLike((pre) => !pre);
setSeverity("success");
setMessage(response.data.message);
setOpen(true);
})
.catch((error) => {
setSeverity("error");
setMessage(error);
setOpen(true);
});
};

// use navigation

import { useNavigate } from "react-router-dom";
let navigate = useNavigate();
navigate("/");

//
// main
style={{
        backgroundImage:
          "linear-gradient(to right, #fff,rgba(2, 94, 115, 0.4))",
      }}

      sx={{
          backgroundImage:
            "linear-gradient(to top,rgba(192, 192, 192, 0.3) ,#fff)",
          boxShadow: "1px 1px 1px 1px #C0C0C0",
          marginTop: "65px",
        }}

// set intervel
useEffect(() => {
if (msg) {
const interval = setInterval(() => {
console.log("we");
navigate("/login");
}, 2000);
return () => clearInterval(interval);
}
}, [msg]);

const d = new Date(mongo date);
console.log(d.getTime());
console.log(d.getDay());
console.log(d.getMonth());
d.
