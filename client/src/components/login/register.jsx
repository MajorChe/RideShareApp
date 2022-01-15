import React from 'react';
import Navbar from '../Navbar';
import { Button, ButtonGroup, Heading, VStack } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import TextField from "./TextField";

function Register() {
  const navigate = useNavigate();
  return (
    <>
    <Navbar />
    <Formik
      initialValues={{ username: "", password: "" }}
      validationSchema={Yup.object({
        username: Yup.string()
          .required("Username required!")
          .min(6, "Username too short!")
          .max(28, "Username too long!"),
        password: Yup.string()
          .required("Password required!")
          .min(6, "Password too short!")
          .max(28, "Password too long!"),
      })}
      onSubmit={(values, actions) => {
        alert(JSON.stringify(values, null, 2));
        actions.resetForm();
      }}
    >
      <VStack
        as={Form}
        w={{ base: "90%", md: "500px" }}
        m="auto"
        justify="center"
        h="100vh"
        spacing="1rem"
      >
        <Heading>Register</Heading>
        <TextField
          name="username"
          placeholder="Enter username"
          autoComplete="off"
          label="Username"
        />

        <TextField
          name="password"
          placeholder="Enter password"
          autoComplete="off"
          label="Password"
          type = "password"
        />

        <ButtonGroup pt="1rem">
          <Button colorScheme="orange" type="submit">
            Log In
          </Button>
          <Button onClick={() => navigate("/login")} leftIcon={<ArrowBackIcon />}>Back</Button>
        </ButtonGroup>
      </VStack>
    </Formik>
    </>
  )
}

export default Register