import React, { useState } from "react";
import { Box, Text, Button } from "@chakra-ui/react";

const Choice = ({ handleRole }) => {
  const [choiceBackground, setChoiceBackground] = useState("white");
  const [choiceTextColor, setChoiceTextColor] = useState("black");
  const [choice, setChoice] = useState("");
  const [disabled, setDisabled] = useState(true);

  const freelancerHandler = () => {
    setChoiceBackground("#003366");
    setChoiceTextColor("white");
    setChoice("freelancer");
    setDisabled(false);
  };
  const employeerHandler = () => {
    setChoiceBackground("#003366");
    setChoiceTextColor("white");
    setChoice("employeer");
    setDisabled(false);
  };
  return (
    <Box height={"490px"} width={"640px"} backgroundColor={"white"}>
      <Text
        fontSize="3xl"
        pt={"55px"}
        display={"flex"}
        justifyContent={"center"}
      >
        Start Your Professional Life
      </Text>
      <Text fontSize="md" pt={"50px"} display={"flex"} pl={"45px"}>
        What do you want to do? (you can edit this later)
      </Text>
      {/* // choices */}
      <Box display={"flex"} mt={"25px"} height={"82px"} ml={"30px"}>
        <Box
          display={"flex"}
          height={"100%"}
          width={"50%"}
          justifyContent={"center"}
        >
          <Text
            fontSize="lg"
            backgroundColor={
              choice === "freelancer" ? choiceBackground : "white"
            }
            style={styles.border}
            color={choice === "freelancer" ? choiceTextColor : "black"}
            onClick={freelancerHandler}
          >
            I Want To Work As Freelancer
          </Text>
        </Box>
        <Box display={"flex"} height={"100%"} width={"50%"}>
          <Text
            fontSize="lg"
            backgroundColor={
              choice === "employeer" ? choiceBackground : "white"
            }
            style={styles.border}
            color={choice === "employeer" ? choiceTextColor : "black"}
            onClick={employeerHandler}
          >
            I Want To Hire A Freelancer
          </Text>
        </Box>
      </Box>
      {/* // Button */}
      <Box
        display={"flex"}
        mt={"45px"}
        height={"50px"}
        justifyContent={"center"}
      >
        <Button
          colorScheme="blue"
          width={"50%"}
          height={"100%"}
          disabled={disabled}
          onClick={() => handleRole(choice)}
        >
          Continue
        </Button>
      </Box>
      {/* // already exist Account */}
      <Box
        display={"flex"}
        mt={"25px"}
        height={"82px"}
        ml={"30px"}
        justifyContent={"center"}
      >
        <Text fontSize="xs" style={styles.link}>
          Already have an account? <span>Login.</span>
        </Text>
      </Box>
    </Box>
  );
};

export default Choice;

const styles = {
  border: {
    padding: "20px",
    border: "1px solid black",
    cursor: "pointer",
  },
  link: {
    textDecoration: "underline",
    color: "#0000EE",
    cursor: "pointer",
  },
};
