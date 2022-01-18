import React, { useContext } from "react";
import { AccountContext } from "../hooks/AccountContext";
import Navbar from "../Navbar";
import {
  Heading,
  Text,
  ButtonGroup,
  Button,
  VStack,
  Flex,
  Avatar,
  Input,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Form, Formik } from "formik";
import TextField from "../login/TextField";

function UserSettings() {
  return (
    <>
      <Navbar />
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values, actions) => {
          const vals = { ...values };
          actions.resetForm();
          // axios
          //   .post("/auth/login", {
          //     email: vals.email,
          //     password: vals.password,
          //   })
          //   .then((res) => {
          //     if (!res) return;
          //     console.log(res.data);
          //     return res.data;
          //   })
          //   .then(data => {
          //     if(!data) return;
          //     setUser({...data});
          //     if(!data.loggedIn) {
          //       setError(data.status)
          //     } else if (data.loggedIn) {
          //       if (location.state?.from) {
          //       navigate(location.state.from);
          //       } else {
          //         navigate("/dashboard");
          //       }
          //       console.log(data);
          //     }
          //   })
          //   .catch((err) => {
          //     console.log(err);
          //     return;
          //   });
        }}
      >
        <VStack>
          <Heading mt={"50px"}>Profile Page</Heading>
          <Flex flexDirection={"column"} alignContent={"center"}>
            <Avatar alignSelf={"center"} mt={"50px"} mb={"40px"}size={"2xl"} src={"https://bit.ly/ryan-florence"} />
            <Text ml={"150px"}><Input id="file-upload" name="avatar" type="file" border={"none"} size={"lg"}/></Text>
            <VStack
              as={Form}
              w={{ base: "90%", md: "500px" }}
              m="auto"
              justify="center"
              spacing="1rem"
            >
              <TextField
                name="name"
                autoComplete="off"
                label="Name"
                type="email"
              />
              <TextField name="email" autoComplete="off" label="Email" />
              <TextField
                name="password"
                autoComplete="off"
                label="Password"
                type="password"
              />
              <TextField
                name="contact"
                placeholder="Enter your phone number"
                autoComplete="off"
                label="Contact"
                type="tel"
              />
              <Button colorScheme="teal" type="submit">
                Update Details
              </Button>
            </VStack>
          </Flex>
        </VStack>
      </Formik>
    </>
  );
}

export default UserSettings;
