import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Select,
  SimpleGrid,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "../../utils/useForm";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import signupImage from "../../assets/SignUpPicture.svg";
import illustration from "../../assets/Mobile login-pana.svg";
import AuthLeftContainer from "../../components/PageSections/AuthLeftContainer";
import { registerUser, useAuthState, useAuthDispatch } from "../../context";

const SignUp = () => {
  const dispatch = useAuthDispatch();
  const { loading, errorMessage } = useAuthState();
  const navigate = useNavigate();
  const toast = useToast();
  const [show, setShow] = useState(false);
  const [checkedItems, setCheckedItems] = React.useState([false, false]);
  const handleShowPassword = () => {
    setShow(!show);
  };

  const {
    handleSubmit,
    handleChange,
    data: user,
    errors,
  } = useForm({
    validations: {
      username: {
        custom: {
          isValid: (value) => value.length > 1,
          message: "The username needs to be at least 6 characters long.",
        },
        pattern: {
          value: "^[A-Za-z]*$",
          message:
            "You're not allowed to use special characters or numbers in your name.",
        },
      },
      email: {
        pattern: {
          value: "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$",
          message: "Please enter a valid email address",
        },
      },
      password: {
        custom: {
          isValid: (value) => value.length > 6,
          message: "The password needs to be at least 6 characters long.",
        },
      },
    },

    onSubmit: async () => {
      try {
        const payload = {
          user: {
            email: user.email,
            username: user.username,
            password: user.password,
          },
          phone_number: user.phone_number,
          is_subscribed: checkedItems[0],
          specialization: "none",
        };

        let response = await registerUser(dispatch, payload); //loginUser action makes the request and handles all the neccessary state changes
        if (response) {
          console.log(response);
          alert("response is here");
        }

        toast({
          title: "Sign in Successful",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        localStorage.setItem("user", JSON.stringify(response));
        navigate("/login");
      } catch (error) {
        // Object.keys(error.response).forEach(function (prop) {
        //   // `prop` is the property name
        //   // `data[prop]` is the property value
        //   return error.response[prop][0][0];
        // });
        alert("Error Occurred");

        toast({
          title: "Error Occured!",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    },
  });

  const handleEnterKey = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <SimpleGrid columns={[null, null, null, 2]} height="100vh">
      {/* Left side */}

      <AuthLeftContainer image={signupImage} illustration={illustration} />

      {/* Right side */}
      <Box pl="3vw" overflowY="scroll">
        <HStack mt="3vh" ml="57%" mb="3vh">
          <Button
            color="#555555"
            variant="link"
            onClick={() => navigate("/login")}
          >
            <Text>Already have an account? </Text>
            <Text ml="0.3vw" color="brand.300" fontWeight="500">
              Sign in
            </Text>
          </Button>
        </HStack>
        <Stack width="70%">
          <Text align="left" fontSize="2rem">
            Join Us!
          </Text>
          <Text align="left" color="gray.300" fontSize="0.8rem">
            Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem
            ipsum
          </Text>
          <form id="login-form" onSubmit={handleSubmit}>
            <FormControl id="username" mt="5vh" isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={user.username || ""}
                onChange={handleChange("username")}
              />
            </FormControl>
            <FormControl id="email" mt="3vh">
              <FormLabel>Email Address</FormLabel>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={user.email || ""}
                onChange={handleChange("email")}
              />
            </FormControl>
            <FormControl id="phone_number" mt="3vh">
              <FormLabel>Phone Number</FormLabel>
              <InputGroup>
                <InputLeftAddon>
                  <Select
                    borderColor="transparent"
                    _focus={{ borderColor: "transparent" }}
                    _active={{ borderColor: "transparent" }}
                  >
                    <option>+254</option>
                  </Select>
                </InputLeftAddon>
                <Input
                  prefix="+254"
                  id="phone_number"
                  type="number"
                  placeholder="Enter your phone number"
                  value={user.phone_number || ""}
                  onChange={handleChange("phone_number")}
                />
              </InputGroup>
            </FormControl>
            <FormControl id="password" mt="3vh">
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  id="password"
                  type={show ? "text" : "password"}
                  placeholder="Enter your password"
                  value={user.password || ""}
                  onChange={handleChange("password")}
                />
                <InputRightElement>
                  {show ? (
                    <Icon as={FiEye} onClick={handleShowPassword} />
                  ) : (
                    <Icon as={FiEyeOff} onClick={handleShowPassword} />
                  )}
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl id="confirmpassword" mt="3vh">
              <FormLabel>Confirm Password</FormLabel>
              <InputGroup>
                <Input
                  id="confirmpassword"
                  type={show ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={user.confirmpassword || ""}
                  onChange={handleChange("confirmpassword")}
                  onKeyDown={(e) => handleEnterKey(e)}
                />
                <InputRightElement>
                  {show ? (
                    <Icon as={FiEye} onClick={handleShowPassword} />
                  ) : (
                    <Icon as={FiEyeOff} onClick={handleShowPassword} />
                  )}
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Checkbox
              mt="3"
              isChecked={checkedItems[0]}
              onChange={(e) => {
                setCheckedItems([e.target.checked, checkedItems[1]]);
                alert(checkedItems);
              }}
              textAlign="left"
            >
              Subscribe to our newsletter to get notified of new products and
              discounts
            </Checkbox>
            <Checkbox
              mt="3"
              textAlign="left"
              isChecked={checkedItems[1]}
              onChange={(e) =>
                setCheckedItems([checkedItems[0], e.target.checked])
              }
            >
              By creating an account, you agree to our Terms and Conditions
            </Checkbox>
            {errors && (
              <Text mt="1vh" align="left" color="red">
                {errors.password ||
                  errors.username ||
                  errors.phone_number ||
                  errors.confirmpassword ||
                  errors.email}
              </Text>
            )}
            {errorMessage && (
              <Text mt="1vh" align="left" color="red">
                {errorMessage}
              </Text>
            )}
            <Button
              mt="3vh"
              mb="2vh"
              type="submit"
              width="100%"
              isDisabled={
                !user.password ||
                !user.username ||
                !user.phone_number ||
                !user.confirmpassword ||
                !user.email
              }
              bg={
                !user.password ||
                !user.username ||
                !user.phone_number ||
                !user.confirmpassword ||
                !user.email
                  ? "brand.200"
                  : "brand.300"
              }
              color={
                !user.password ||
                !user.username ||
                !user.phone_number ||
                !user.confirmpassword ||
                !user.email
                  ? "brand.300"
                  : "brand.200"
              }
              _focus={{ outline: "none" }}
              _active={{ outline: "none" }}
              isLoading={loading}
            >
              Create an Account
            </Button>
            <HStack>
              <Divider />
              <Text>Or</Text>
              <Divider />
            </HStack>
            <Button
              leftIcon={<FaGoogle />}
              mt="3vh"
              mb="15vh"
              width="100%"
              _focus={{ outline: "none" }}
              _active={{ outline: "none" }}
            >
              Sign in with Google
            </Button>
          </form>
        </Stack>
      </Box>
    </SimpleGrid>
  );
};

export default SignUp;
