import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import Choice from "./Choice";
import Form from "./Form";

const Registration = () => {
  const [role, setRole] = useState();

  const handleRole = (role) => {
    setRole(role);
  };

  return (
    <>
      <Box backgroundColor={"red"} height={"114px"}>
        Heelo nav bar{role}
      </Box>

      <Box
        height={"150vh"}
        width={"100%"}
        backgroundImage="url('./images/reg-background.jpg')"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
      >
        {role ? (
          <Box display={"flex"} justifyContent={"center"} paddingTop={"56px"}>
            <Form role={role} />
          </Box>
        ) : (
          <Box display={"flex"} justifyContent={"center"} marginTop={"56px"}>
            <Choice handleRole={handleRole} />
          </Box>
        )}
      </Box>
      <Box height={"432px"} width={"100%"} backgroundColor={"yellow"}></Box>
    </>
  );
};

export default Registration;
