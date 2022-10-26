import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
  Select,
  Box,
  Input,
  Container,
  Button,
  InputRightAddon,
} from "@chakra-ui/react";

const Form = ({ role }) => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <Container maxW="5xl" backgroundColor={"white"}>
      <form>
        <Box display={"flex"} width={"100%"} justifyContent={"space-between"}>
          <Box display={"flex"} width={"40%"}>
            <FormControl id="frisr-name" isRequired>
              <FormLabel>Frist Name</FormLabel>
              <Input
                palceholder="Please Enter Your Frist Name"
                _placeholder={{ opacity: 1, color: "gray.500" }}
                value={""}
                variant="outline"
                onChange={(e) => {}}
                type="text"
                required
              />
            </FormControl>
          </Box>
          <Box display={"flex"} width={"40%"}>
            <FormControl id="frisr-name" isRequired>
              <FormLabel>Last Name</FormLabel>
              <Input
                placeholde="Please Enter Your Frist Name"
                variant="outline"
                onChange={(e) => {}}
                type="text"
                required
              />
            </FormControl>
          </Box>
        </Box>

        <Box display={"flex"} width={"100%"} justifyContent={"space-between"}>
          <Box display={"flex"} width={"100%"}>
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <InputGroup>
                <Input
                  placeholder="email"
                  required
                  variant="outline"
                  onChange={(e) => {}}
                />
                <InputRightAddon children=".com" />
              </InputGroup>
            </FormControl>
          </Box>
        </Box>

        <Box display={"flex"} width={"100%"} justifyContent={"space-between"}>
          <Box display={"flex"} width={"40%"}>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  type={show ? "text" : "password"}
                  placeholder="Enter password"
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
          </Box>
          <Box display={"flex"} width={"40%"}>
            <FormControl id="confirn-password" isRequired>
              <FormLabel>Confirn Password</FormLabel>
              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  type={show ? "text" : "password"}
                  placeholder="Confirm password"
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
          </Box>
        </Box>

        <Box
          display={role === "freelancer" ? "flex" : "none"}
          width={"100%"}
          justifyContent={"space-between"}
        >
          <Box display={"flex"} width={"100%"}>
            <FormControl id="skills" isRequired>
              <FormLabel>Your Skills</FormLabel>
              <Input
                palceholder="Enter Your Skills"
                variant="outline"
                onChange={(e) => {}}
                type="text"
                required
              />
            </FormControl>
          </Box>
        </Box>

        <Box
          display={role === "freelancer" ? "flex" : "none"}
          width={"100%"}
          justifyContent={"space-between"}
        >
          <Box display={"flex"} width={"100%"} height={"150px"}>
            <FormControl id="about" isRequired>
              <FormLabel>About You</FormLabel>
              <Input
                palceholder="Describe Your Self"
                variant="outline"
                onChange={(e) => {}}
                type="text"
                size={"lg"}
                height={"120px"}
                required
              />
            </FormControl>
          </Box>
        </Box>

        <Box
          display={role === "freelancer" ? "flex" : "none"}
          width={"100%"}
          justifyContent={"space-between"}
        >
          <FormControl>
            <FormLabel>Language</FormLabel>
            <Select placeholder="Select Language">
              <option>English</option>
              <option>Urdu</option>
            </Select>
          </FormControl>
        </Box>

        <Box
          display={"flex"}
          width={"100%"}
          justifyContent={"center"}
          mt={"80px"}
          mb={"30px"}
        >
          <Button width={"40%"} height={"45px"} colorScheme="blue">
            Sign Up
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default Form;
