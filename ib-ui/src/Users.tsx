import { FC } from "react";
import { useGetUsersQuery } from "./backend/generated/graphql";
import { fakeImage } from "./fakeImage";
import QR from "./QR";

const Users: FC<{}> = () => {
  const network = "tday";
  const { data } = useGetUsersQuery({ variables: { network } });
  if (!data) return null;
  const users = data.getUsers;
  return (
    <div className="grid grid-cols-3 gap-5 m-5">
      {users.map(({ badgeId, firstName }, key) => (
        <div
          key={key}
          className="p-5 border border-black rounded overflow-hidden flex justify-between items-center"
        >
          <QR word={`h`} size={120} bgColor="FFFFF66" />
          <div>
            <div className="font-corben text-2xl">Hi, my name is</div>
            <div className="font-zeyada text-6xl font-900 mt-8 text-red-700">
              {firstName}
            </div>
          </div>
          <div
            className="h-[100px] w-[100px] rounded-full border"
            style={{
              backgroundImage: fakeImage(badgeId),
              backgroundSize: "cover",
            }}
          ></div>
        </div>
      ))}
    </div>
  );
};

export default Users;
