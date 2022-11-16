import { FC, PropsWithChildren } from "react";

const PageFrame: FC<PropsWithChildren<{ headline: string }>> = ({
  headline,
  children,
}) => (
  <div className="flex flex-col justify-between h-full w-full bg-yellow-100 p-5 text-gray-800">
    <h1 className="mt-32 mb-12 text-4xl">{headline}</h1>
    {children}
  </div>
);
export default PageFrame;
