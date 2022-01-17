import React from "react";
import Navbar from "../Navbar";
import { Button, ButtonGroup, Heading, Text, VStack } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import TextField from "./TextField";
import axios from "axios";
import { useContext } from "react";
import { AccountContext } from "../hooks/AccountContext";
import { useState } from "react";

const Register = () => {
  const {setUser} = useContext(AccountContext);
  const [error,setError] = useState(null);
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object({
          email: Yup.string()
            .required("email required!"),
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
              email: vals.email,
              password: vals.password,
            })
            .then((res) => {
              if (!res) return;
              console.log(res.data);
              return res.data;
            })
            .then(data => {
              if(!data) return;
              setUser({...data});
              if(data.status) {
                setError(data.status)
              } else if (data.loggedIn) {
                navigate("/dashboard");
                console.log(data);
              }
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
          <Text as="p" color="red.500">{error}</Text>
          <TextField
            name="email"
            placeholder="Enter email"
            autoComplete="off"
            label="Email"
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
