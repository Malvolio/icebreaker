import { FC } from "react";
import { useParams } from "react-router-dom";
import { useGetUsersQuery } from "./backend/generated/graphql";
import { fakeImage, fakeUrl } from "./fakeImage";
import QR from "./QR";
import { urlOfBadge } from "./urlOf";

const calcPin = (n: number) => ((n * 1549) % 8929) + 1000;
const PageSize = 6;
const nthPage = <A,>(as: A[], n: number) =>
  n >= 0 ? as.slice(n * PageSize, (n + 1) * PageSize) : as;

const Users: FC<{}> = () => {
  const { pageNo } = useParams();

  const network = "tday";
  const { data } = useGetUsersQuery({ variables: { network } });
  if (!data) return null;

  const pageNumber = Number(pageNo ?? "-1");
  const users = nthPage(data.getUsers, pageNumber);

  return (
    <div className="grid grid-cols-2 gap-5 m-5">
      {users.map(({ badgeId, firstName }, key) => (
        <div
          key={key}
          className={`p-5 border border-black rounded overflow-hidden flex justify-between items-center  {key && (key % 3 == 0) ? 'pagebreak' : '' }`}
        >
          <QR
            word={urlOfBadge(
              { badgeId, network },
              "https://staging.icebreaker.biz"
            )}
            size={120}
            bgColor="FFFFF66"
          />
          <div>
            <div className="font-corben text-2xl">Hi, my name is</div>
            <div className="font-zeyada text-6xl font-900 mt-8 text-red-700">
              {firstName}
            </div>
          </div>
          <div>
            <img
              style={{
                height: 100,
                width: 100,
                borderRadius: 50,
              }}
              src={fakeUrl(badgeId)}
            />
            <div className="text-sm flex justify-center">
              <span>{calcPin(badgeId)}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Users;
