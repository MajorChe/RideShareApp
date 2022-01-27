import { Heading, Image, SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import Navbar from "./Navbar"

export const TechStack = () => {
  return(
    <>
    <Heading align="center" fontSize={"80px"} mt={"50px"}><u>OUR TECH STACK</u></Heading>
    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={"30px"} mt={"70px"} px={"150px"} alignItems={"center"}>
      <Image width={"350px"}src={"https://wiki.postgresql.org/images/thumb/a/a4/PostgreSQL_logo.3colors.svg/540px-PostgreSQL_logo.3colors.svg.png"}></Image>
      <Image width={"350px"}src={"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/512px-React-icon.svg.png"}></Image>
      <Image width={"350px"}src={"https://chakra-ui.com/og-image.png"}></Image>
      <Image width={"350px"}src={"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Redis_Logo.svg/467px-Redis_Logo.svg.png"}></Image>
      <Image width={"350px"}src={"https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png"}></Image>
      <Image width={"350px"}src={"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/590px-Node.js_logo.svg.png"}></Image>
    </SimpleGrid>
    </>
  );
};
