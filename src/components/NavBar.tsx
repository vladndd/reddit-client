import React from "react";
import NextLink from "next/link";
import { Box, Link, Flex, Text, Button } from "@chakra-ui/core";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import { useRouter } from "next/router";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const router = useRouter();
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
      <>
        <Box>
          <NextLink href="/create-post">
            <Button color="black" as={Link}>
              create post
            </Button>
          </NextLink>
        </Box>
        <Box ml={"auto"}>
          <Flex align="baseline">
            <Text color="white" mr={5} fontSize="20px">
              {data.me.username}
            </Text>
            <Button
              isLoading={logoutFetching}
              onClick={async () => {
                await logout();
                router.reload();
              }}
              variant="link"
            >
              logout
            </Button>
          </Flex>
        </Box>
      </>
    );
  }

  return (
    <Flex
      position="sticky"
      alignItems={"baseline"}
      zIndex={1}
      top={0}
      bg="black"
      p={4}
    >
      <NextLink href="/">
        <Link mr={8} fontSize={26} color="white">
          Caracall Forum
        </Link>
      </NextLink>
      {body}
    </Flex>
  );
};
