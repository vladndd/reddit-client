import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useMeQuery, usePostsQuery } from "../generated/graphql";
import React, { useState } from "react";
import { Layout } from "../components/Layout";
import { Box, Button, Flex, Heading, Link, Stack, Text } from "@chakra-ui/core";
import { UpdootSection } from "../components/UpdootSection";
import NextLink from "next/link";
import { EditDeletePostButtons } from "../components/EditDeletePostButtons";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 5,
    cursor: null as null | string,
  });

  const [{ data, fetching, stale }] = usePostsQuery({
    variables,
  });

  if (!fetching && !data) {
    return <div>you got query failed</div>;
  }

  return (
    <Layout>
      {!data && fetching ? (
        <p>loading..</p>
      ) : (
        <Stack spacing={8}>
          {data &&
            !fetching &&
            data!.posts.posts.map((p) =>
              !p ? null : (
                <Flex key={p.id} p={5} shadow="md" borderWidth="1px">
                  <UpdootSection post={p} />
                  <Box flex={1}>
                    <NextLink href="/post/[id]" as={`/post/${p.id}`}>
                      <Link>
                        <Heading fontSize="xl">{p.title}</Heading>
                      </Link>
                    </NextLink>
                    <Text>posted by {p.creator.username}</Text>
                    <Flex alignItems="center">
                      <Text flex={1} mt={4}>
                        {p.textSnippet}
                      </Text>
                      <EditDeletePostButtons
                        id={p.id}
                        creatorId={p.creator.id}
                      />
                    </Flex>
                  </Box>
                </Flex>
              )
            )}
        </Stack>
      )}
      {data && data.posts.hasMore ? (
        <Flex>
          <Button
            onClick={() => {
              setVariables({
                limit: variables.limit,
                cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
              });
            }}
            isLoading={stale}
            m="auto"
            my={8}
          >
            load more
          </Button>
        </Flex>
      ) : null}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
