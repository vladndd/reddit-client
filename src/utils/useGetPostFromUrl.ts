import { usePostQuery } from "../generated/graphql";
import { useGetIntId } from "./useGetIntId";

export const useGetPostFromUrl = () => {
  const intId = useGetIntId()
  return usePostQuery({
    pause: intId === -1, // if whe got bad one wich === -1 , we pause our query
    variables: {
      // if we got good one ...
      id: intId,
    },
  });
};
