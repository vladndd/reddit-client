import { Flex, IconButton } from "@chakra-ui/core";
import React from "react";
import { useState } from "react";
import {
  PostSnippetFragment,
  useVoteMutation,
  VoteMutationVariables,
} from "../generated/graphql";

interface UpdootSectionProps {
  post: PostSnippetFragment;
  // PostsQuery["posts"]["posts"][0]
}

export const UpdootSection: React.FC<UpdootSectionProps> = ({ post }) => {
  const [loadingState, setLoadingState] = useState<
    "not-loading" | "downdoot-loading" | "updoot-loading"
  >("not-loading");
  const [, vote] = useVoteMutation();
  return (
    <Flex pr={10} flexDirection="column" alignItems="center">
      <IconButton
        onClick={async () => {
          setLoadingState("updoot-loading");
          await vote({
            postId: post.id,
            value: 1,
          });
          setLoadingState("not-loading");
        }}
        isLoading={loadingState === "updoot-loading"}
        icon="chevron-up"
        aria-label="updoot post"
      />
      {post.points}
      <IconButton
        onClick={async () => {
          setLoadingState("downdoot-loading");
          await vote({
            postId: post.id,
            value: -1,
          });
          setLoadingState("not-loading");
        }}
        isLoading={loadingState === "downdoot-loading"}
        icon="chevron-down"
        aria-label="downdoot post"
      />
    </Flex>
  );
};
