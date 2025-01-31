import { useDispatch } from "react-redux";
import { TAppDispatchType } from "../store";

export const useAppDispatch = () => useDispatch<TAppDispatchType>();