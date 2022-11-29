import { useEffect, useState } from "react";
import create from "zustand";
import { combine } from "zustand/middleware";

const pushIfDifferent = <A>(as: A[], a: A, maxLength: number) =>
  a === as[0] ? as : [a, ...as].slice(0, maxLength);

export const useErrorStack = create(
  combine(
    {
      errorStack: [] as unknown[],
    },
    (set) => ({
      pushError: (error: unknown) =>
        set(({ errorStack }) => ({
          errorStack: pushIfDifferent(errorStack, error, 10),
        })),
      clearErrors: () => set(() => ({ errorStack: [] })),
    })
  )
);

export const usePushError = (e: unknown) => {
  const { pushError } = useErrorStack();
  useEffect(() => {
    if (e) {
      pushError(e);
    }
  }, [e, pushError]);
};

export const useTryError = () => {
  const { pushError } = useErrorStack();
  const tryError = async <U extends { errors?: unknown }>(
    f: () => Promise<U>
  ) => {
    try {
      const u = await f();
      pushError(u.errors);
      return u;
    } catch (e) {
      pushError(e);
      throw e;
    }
  };
  return tryError;
};
