import axios from "axios";
import {
    CREATE_ORDER_REQUSET,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    GET_MY_ORDERS_REQUSET,
    GET_MY_ORDERS_SUCCESS,
    GET_MY_ORDERS_FAIL,
    GET_ORDER_BY_ORDER_ID_REQUSET,
    GET_ORDER_BY_ORDER_ID_SUCCESS,
    GET_ORDER_BY_ORDER_ID_FAIL,
    CREATE_CHECKOUT_SESSION_REQUSET,
    CREATE_CHECKOUT_SESSION_SUCCESS,
    CREATE_CHECKOUT_SESSION_FAIL,
    UPDATE_ORDER_TO_PAID_REQUSET,
    UPDATE_ORDER_TO_PAID_SUCCESS,
    UPDATE_ORDER_TO_PAID_FAIL,
    UPDATE_ORDER_TO_DELIVERED_REQUSET,
    UPDATE_ORDER_TO_DELIVERED_SUCCESS,
    UPDATE_ORDER_TO_DELIVERED_FAIL,
} from "../constants/orderConstants";

import { RESET_CART } from "../constants/cartConstants";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { errorInterface } from "../../interfaces/components/public";
import { RootState, AppDispatch } from "../store";
const BACKEND_API = process.env.REACT_APP_API_URL;

export const createOrder =
    () => async (dispatch: AppDispatch, getState: () => RootState) => {
        const { userLogin } = getState();
        try {
            dispatch({ type: CREATE_ORDER_REQUSET });
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userLogin.userInfo?.token}`,
                },
            };

            const { data } = await axios.post(
                `${BACKEND_API}/orders`,
                JSON.parse(localStorage.getItem("shippingData") as string),
                config
            );
            dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });

            // remove cart from localStorage and redux
            localStorage.removeItem("cartItems");
            dispatch({ type: RESET_CART });
        } catch (error: errorInterface) {
            dispatch({
                type: CREATE_ORDER_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };

export const getMyOrders =
    (page = 1) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
        const { userLogin } = getState();
        try {
            dispatch({ type: GET_MY_ORDERS_REQUSET });
            const config = {
                headers: {
                    Authorization: `Bearer ${userLogin.userInfo?.token}`,
                },
            };

            const { data } = await axios.get(
                `${BACKEND_API}/orders/myorders?page=${page}`,
                config
            );
            dispatch({ type: GET_MY_ORDERS_SUCCESS, payload: data });
        } catch (error: errorInterface) {
            dispatch({
                type: GET_MY_ORDERS_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };

export const getOrderByOrderId =
    (id: string) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
        const { userLogin } = getState();
        try {
            dispatch({ type: GET_ORDER_BY_ORDER_ID_REQUSET });
            const config = {
                headers: {
                    Authorization: `Bearer ${userLogin.userInfo?.token}`,
                },
            };

            const { data } = await axios.get(
                `${BACKEND_API}/orders/${id}`,
                config
            );
            dispatch({ type: GET_ORDER_BY_ORDER_ID_SUCCESS, payload: data });
        } catch (error: errorInterface) {
            dispatch({
                type: GET_ORDER_BY_ORDER_ID_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };

export const createCheckoutSession =
    (id: string) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
        const { userLogin } = getState();
        try {
            dispatch({ type: CREATE_CHECKOUT_SESSION_REQUSET });
            const config = {
                headers: {
                    Authorization: `Bearer ${userLogin.userInfo?.token}`,
                },
            };

            const { data } = await axios.post(
                `${BACKEND_API}/orders/${id}/create-checkout-session`,
                {},
                config
            );
            dispatch({ type: CREATE_CHECKOUT_SESSION_SUCCESS, payload: data });
        } catch (error: errorInterface) {
            dispatch({
                type: CREATE_CHECKOUT_SESSION_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };

export const updateOrderToPaid =
    (id: string, process: string) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
        const { userLogin } = getState();
        try {
            dispatch({ type: UPDATE_ORDER_TO_PAID_REQUSET });
            const config = {
                headers: {
                    Authorization: `Bearer ${userLogin.userInfo?.token}`,
                },
            };

            const { data } = await axios.patch(
                `${BACKEND_API}/orders/${id}/pay/${process}`,
                {},
                config
            );
            dispatch({ type: UPDATE_ORDER_TO_PAID_SUCCESS, payload: data });
        } catch (error: errorInterface) {
            dispatch({
                type: UPDATE_ORDER_TO_PAID_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };

export const updateOrderToDelivered =
    (id: string) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
        const { userLogin } = getState();
        try {
            dispatch({ type: UPDATE_ORDER_TO_DELIVERED_REQUSET });
            const config = {
                headers: {
                    Authorization: `Bearer ${userLogin.userInfo?.token}`,
                },
            };

            const { data } = await axios.patch(
                `${BACKEND_API}/orders/${id}/deliver`,
                {},
                config
            );
            dispatch({
                type: UPDATE_ORDER_TO_DELIVERED_SUCCESS,
                payload: data,
            });
        } catch (error: errorInterface) {
            dispatch({
                type: UPDATE_ORDER_TO_DELIVERED_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };
