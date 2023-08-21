import React from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";

type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useEffectOnce = (fn: () => void) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(fn, []);
};
