import { useParams } from "react-router";

export const useStandardParams = () => {
  const { network, badgeId } = useParams();
  return { network: network || "", badgeId: Number(badgeId) || 0 };
};
