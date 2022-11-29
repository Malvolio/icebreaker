import { FC, PropsWithChildren, useState } from "react";
import { countOf } from "./countOf";
import { useErrorStack } from "./ErrorDetection";

const DisplayErrors = () => {
  const [expanded, setExpanded] = useState(false);
  const { errorStack, clearErrors } = useErrorStack();

  return errorStack.length ? (
    <div>
      {expanded ? (
        <div className="max-h-96 overflow-auto bg-gray-100 border border-gray-500">
          <div className="flex justify-around gap-5 px-5 py-1 items-center">
            <button
              className="px-2 py-1 border rounded-xl"
              onClick={() => setExpanded(false)}
            >
              hide
            </button>
            <h2 className="font-bold">Errors</h2>
            <button
              className="px-2 py-1 border rounded-xl"
              onClick={() => clearErrors()}
            >
              clear
            </button>
          </div>
          {errorStack.map((error: any, key) => {
            const errorText = String(
              (typeof error === "object" && error["stack"]) || error
            ).split("\n");
            return (
              <div
                key={key}
                className="border rounded-sm border-gray-500 p-1 m-1"
              >
                {errorText.map((errorLine, key) => (
                  <div key={key}>{errorLine}</div>
                ))}
              </div>
            );
          })}
        </div>
      ) : (
        <button
          onClick={() => setExpanded(true)}
          className="px-2 py-1 border text-red-400 border-red-200 rounded-xl"
        >
          {countOf(errorStack.length, "error")}
        </button>
      )}
    </div>
  ) : null;
};

const PageFrame: FC<PropsWithChildren<{ headline: string }>> = ({
  headline,
  children,
}) => (
  <div className="flex flex-col justify-between h-full w-full bg-yellow-100 p-5 text-gray-800">
    <h1 className="mt-24 text-4xl">{headline}</h1>
    {children}
    <DisplayErrors />
  </div>
);
export default PageFrame;
