import {useDispatch} from "react-redux";
import {AppDispatch} from "../store/store";

type DispatchFun = () => AppDispatch

export const useAppDispatch: DispatchFun = useDispatch