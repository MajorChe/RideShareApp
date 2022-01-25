import React, { useContext } from "react";
import { AccountContext } from "../hooks/AccountContext";
import Navbar from "../Navbar";
import {
  Heading,
  Button,
  VStack,
  Flex,
  Avatar,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import TextField from "../login/TextField";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserSettings() {
  const {user,setUser} = useContext(AccountContext);
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <Formik
        initialValues={{ name: user.name, email: user.email, password: "", contact: user.contact}}
        onSubmit={(values, actions) => {
          const vals = { ...values };
          actions.resetForm();
          axios.put("/user/update", {
            name: vals.name,
            email: vals.email,
            password: vals.password,
            contact: vals.contact,
          })
          .then((res) => {
            if (!res) return;
            return res.data;
          })
          .then ((data) => {
            if (!data) return;
            setUser({...data});
            navigate("/");
          })
          .catch((err) => {
            console.log(err);
            return;
          })
        }}
      >
        <VStack>
          <Heading mt={"50px"}>Profile Page</Heading>
          <Flex flexDirection={"column"} alignContent={"center"}>
            <Avatar alignSelf={"center"} mt={"50px"} mb={"40px"}size={"2xl"} src={user.avatar} />
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
                type="text"
                required
              />
              <TextField name="email" autoComplete="off" label="Email" required/>
              <TextField
                name="password"
                autoComplete="off"
                label="Password"
                type="password"
                required
              />
              <TextField
                name="contact"
                placeholder="Enter your phone number"
                autoComplete="off"
                label="Contact"
                type="tel"
              />
              <Button colorScheme="blue" type="submit">
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
