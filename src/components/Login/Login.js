import React, { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import "./style.css";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  InputRightElement,
  InputGroup,
  Input,
  Text,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/Actions/User";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const toast = useToast();

  const { error } = useSelector((state) => state.user);

  const handleClick = () => setShow(!show);

  const loginHandler = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }
    dispatch(loginUser(email, password));
  };
  useEffect(() => {
    if (error) {
      toast({
        title: `${error}`,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  }, [dispatch, error]);

  return (
    <Box className="center" backgroundColor={"gray.100"} height={"100vh"}>
      <Box
        display={"flex"}
        flexDirection={"column"}
        padding={"50px 100px"}
        backgroundColor={"white"}
        height={"513px"}
        width={"550px"}
        borderRadius={"10px"}
      >
        <Box>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <InputGroup size="md">
              <Input
                type={show ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
        </Box>
        <Box marginTop={"10px"}>
          <a to="/forgot/password">
            <Text className="link">Forgot Password?</Text>
          </a>
        </Box>

        <Box margin={"40px 50px"}>
          <Button
            width={"100%"}
            colorScheme={"green"}
            color={"white"}
            className="login-button"
            onClick={loginHandler}
          >
            Login
          </Button>
        </Box>
        <Box marginLeft={"70px"}>
          <Text className="link">New on ProHunt? Create Account.</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
