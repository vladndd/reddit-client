import React from "react";
import NextLink from "next/link";
import { Box, Link, Flex, Text, Button } from "@chakra-ui/core";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery();
  let body = null;

  // data is loading
  if (fetching) {
    body = null;

    // user is not logged in
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">
          <Link mr={2} color="white">
            login
          </Link>
        </NextLink>
        <NextLink href="/register">
          <Link color="white">register</Link>
        </NextLink>
      </>
    );
    // user is logged in
  } else {
    body = (
      <Box>
        <Flex align="center">
          <Text color="white" mr={5} fontSize="x">
            {data.me.username}
          </Text>
          <Button
            isLoading={logoutFetching}
            onClick={() => logout()}
            variant="link"
          >
            logout
          </Button>
        </Flex>
      </Box>
    );
  }

  return (
    <Flex bg="black" p={4}>
      <Box ml={"auto"}>{body}</Box>
    </Flex>
  );
};
