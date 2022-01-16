import React, { useState, useContext } from "react";
import Navbar from "../Navbar";
import { Button, ButtonGroup, Heading, VStack, Text} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import TextField from "./TextField";
import axios from "axios";
import { AccountContext } from "../hooks/AccountContext";

const Login = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const {setUser} = useContext(AccountContext)
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
            .post("/auth/login", {
              username: vals.username,
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
              if(!data.loggedIn) {
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
          <Heading>Log In</Heading>
          <Text as="p" color="red.500">{error}</Text>
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
          />

          <ButtonGroup pt="1rem">
            <Button colorScheme="teal" type="submit">
              Log In
            </Button>
            <Button onClick={() => navigate("/register")}>
              Create Account
            </Button>
          </ButtonGroup>
        </VStack>
      </Formik>
    </>
  );
};

export default Login;
