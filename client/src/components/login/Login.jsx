import React, { useState, useContext } from "react";
import Navbar from "../Navbar";
import { Button, ButtonGroup, Heading, VStack, Text} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useNavigate,useLocation } from "react-router";
import * as Yup from "yup";
import TextField from "./TextField";
import axios from "axios";
import { AccountContext } from "../hooks/AccountContext";

const Login = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const {setUser} = useContext(AccountContext);
  return (
    <>
      <Navbar />
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object({
          email: Yup.string()
            .required("Email required!"),
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
              if(!data.loggedIn) {
                setError(data.status)
              } else if (data.loggedIn) {
                if (location.state?.from) {
                navigate(location.state.from);
                } else {
                  navigate("/dashboard");
                }
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
          h="50vh"
          spacing="1rem"
        >
          <Heading>Log In</Heading>
          <Text as="p" color="red.500">{error}</Text>
          <TextField
            name="email"
            placeholder="Enter your email"
            autoComplete="off"
            label="Email"
            type="email"
          />

          <TextField
            name="password"
            placeholder="Enter password"
            autoComplete="off"
            label="Password"
            type="password"
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
