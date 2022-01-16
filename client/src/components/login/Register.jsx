import React from "react";
import Navbar from "../Navbar";
import { Button, ButtonGroup, Heading, VStack } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import TextField from "./TextField";
import axios from "axios";

const Register = () => {
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
          const vals = { ...values };
          actions.resetForm();
          axios
            .post("/auth/register", {
              username: vals.username,
              password: vals.password,
            })
            .then((res) => {
              if (!res) return;
              console.log(res.data);
              return res.data;
            })
            .then(data => {
              console.log(data);
            })
            .catch((err) => {
              console.log(err);
              return;
            });
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
            type="password"
          />

          <ButtonGroup pt="1rem">
            <Button colorScheme="orange" type="submit">
              Register
            </Button>
            <Button
              onClick={() => navigate("/login")}
              leftIcon={<ArrowBackIcon />}
            >
              Back
            </Button>
          </ButtonGroup>
        </VStack>
      </Formik>
    </>
  );
}

export default Register;
