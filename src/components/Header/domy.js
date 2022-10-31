{
  /* <div className="container">
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

const StyledButton = styled(Button)`
  background-color: #f2a71b;
  color: #fff;
  &:hover {
    background-color: #025e73;
  }
`;
