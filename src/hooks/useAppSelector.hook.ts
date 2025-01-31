import { useSelector, TypedUseSelectorHook } from "react-redux";
import { IRootStateType } from "../store";

export const useAppSelector: TypedUseSelectorHook<IRootStateType> = useSelector;