import PageFrame from "./PageFrame";
import { useStandardParams } from "./useStandardParams";

const Done = () => {
  const { network } = useStandardParams();

  return network ? (
    <PageFrame headline="You completed the quiz!">
      <p>
        Network with your colleagues by scanning their QR codes and seeing what
        you have in common.
      </p>
      <p> The more scans the more points you earn ! </p>
    </PageFrame>
  ) : null;
};

export default Done;
