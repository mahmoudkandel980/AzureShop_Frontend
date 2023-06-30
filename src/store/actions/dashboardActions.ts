import axios from "axios";
import {
    DASHBOARD_ALL_USERS_REQUSET,
    DASHBOARD_ALL_USERS_SUCCESS,
    DASHBOARD_ALL_USERS_FAIL,
    DASHBOARD_USERS_OVERVIEW_REQUSET,
    DASHBOARD_USERS_OVERVIEW_SUCCESS,
    DASHBOARD_USERS_OVERVIEW_FAIL,
    DASHBOARD_PODUCTS_OVERVIEW_REQUSET,
    DASHBOARD_PODUCTS_OVERVIEW_SUCCESS,
    DASHBOARD_PODUCTS_OVERVIEW_FAIL,
    DASHBOARD_DELETE_USER_USERS_PAGE_REQUSET,
    DASHBOARD_DELETE_USER_USERS_PAGE_SUCCESS,
    DASHBOARD_DELETE_USER_USERS_PAGE_FAIL,
    DASHBOARD_EDIT_USER_USERS_PAGE_REQUSET,
    DASHBOARD_EDIT_USER_USERS_PAGE_SUCCESS,
    DASHBOARD_EDIT_USER_USERS_PAGE_FAIL,
    DASHBOARD_DELETE_PRODUCT_PROCUCTS_PAGE_REQUSET,
    DASHBOARD_DELETE_PRODUCT_PROCUCTS_PAGE_SUCCESS,
    DASHBOARD_DELETE_PRODUCT_PROCUCTS_PAGE_FAIL,
    DASHBOARD_EDIT_PRODUCT_PROCUCTS_PAGE_REQUSET,
    DASHBOARD_EDIT_PRODUCT_PROCUCTS_PAGE_SUCCESS,
    DASHBOARD_EDIT_PRODUCT_PROCUCTS_PAGE_FAIL,
    DASHBOARD_USERS_WANT_TO_BE_SELLERS_REQUSET,
    DASHBOARD_USERS_WANT_TO_BE_SELLERS_SUCCESS,
    DASHBOARD_USERS_WANT_TO_BE_SELLERS_FAIL,
    DASHBOARD_USERS_WANT_TO_BE_SELLERS_NUMBERS_REQUSET,
    DASHBOARD_USERS_WANT_TO_BE_SELLERS_NUMBERS_SUCCESS,
    DASHBOARD_USERS_WANT_TO_BE_SELLERS_NUMBERS_FAIL,
    DASHBOARD_UPDATE_USER_WANT_TO_BE_SELLER_REQUSET,
    DASHBOARD_UPDATE_USER_WANT_TO_BE_SELLER_SUCCESS,
    DASHBOARD_UPDATE_USER_WANT_TO_BE_SELLER_FAIL,
    DASHBOARD_ALL_ORDERS_REQUSET,
    DASHBOARD_ALL_ORDERS_SUCCESS,
    DASHBOARD_ALL_ORDERS_FAIL,
} from "../constants/dashboardConstants";

import {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    errorInterface,
    FilterDateInterface,
} from "../../interfaces/components/public";
import { RootState, AppDispatch } from "../store";

const BACKEND_API = process.env.REACT_APP_API_URL;

// OVERVIEW
export const dashboard_usersOverView =
    () => async (dispatch: AppDispatch, getState: () => RootState) => {
        const { userLogin } = getState();
        try {
            dispatch({ type: DASHBOARD_USERS_OVERVIEW_REQUSET });
            const config = {
                headers: {
                    Authorization: `Bearer ${userLogin.userInfo?.token}`,
                },
            };

            const { data } = await axios.get(
                `${BACKEND_API}/users/dashboard/overview`,
                config
            );
            dispatch({ type: DASHBOARD_USERS_OVERVIEW_SUCCESS, payload: data });
        } catch (error: errorInterface) {
            dispatch({
                type: DASHBOARD_USERS_OVERVIEW_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };

export const dashboard_productsOverView =
    () => async (dispatch: AppDispatch, getState: () => RootState) => {
        const { userLogin } = getState();
        try {
            dispatch({ type: DASHBOARD_PODUCTS_OVERVIEW_REQUSET });
            const config = {
                headers: {
                    Authorization: `Bearer ${userLogin.userInfo?.token}`,
                },
            };

            const { data } = await axios.get(
                `${BACKEND_API}/products/dashboard/overview`,
                config
            );
            dispatch({
                type: DASHBOARD_PODUCTS_OVERVIEW_SUCCESS,
                payload: data,
            });
        } catch (error: errorInterface) {
            dispatch({
                type: DASHBOARD_PODUCTS_OVERVIEW_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };

// USERS
export const dashboard_allUsers =
    (filterData: FilterDateInterface | null, page: number) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
        const { userLogin } = getState();
        try {
            dispatch({ type: DASHBOARD_ALL_USERS_REQUSET });
            const config = {
                headers: {
                    Authorization: `Bearer ${userLogin.userInfo?.token}`,
                },
            };

            const { data } = await axios.get(
                `${BACKEND_API}/users/dashboard/users?${
                    filterData
                        ? `filterData=${JSON.stringify(filterData)}&`
                        : ""
                }page=${page}`,
                config
            );
            dispatch({ type: DASHBOARD_ALL_USERS_SUCCESS, payload: data });
        } catch (error: errorInterface) {
            dispatch({
                type: DASHBOARD_ALL_USERS_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };

export const dashboard_deleteUser =
    (userId: string) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
        const { userLogin } = getState();
        try {
            dispatch({ type: DASHBOARD_DELETE_USER_USERS_PAGE_REQUSET });
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userLogin.userInfo?.token}`,
                },
            };

            const { data } = await axios.delete(
                `${BACKEND_API}/users/dashboard/users/${userId}`,
                config
            );
            dispatch({
                type: DASHBOARD_DELETE_USER_USERS_PAGE_SUCCESS,
                payload: data,
            });
        } catch (error: errorInterface) {
            dispatch({
                type: DASHBOARD_DELETE_USER_USERS_PAGE_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };

export const dashboard_editUser =
    (userId: string, formData: object) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
        const { userLogin } = getState();
        try {
            dispatch({ type: DASHBOARD_EDIT_USER_USERS_PAGE_REQUSET });
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${userLogin.userInfo?.token}`,
                },
            };

            const { data } = await axios.patch(
                `${BACKEND_API}/users/dashboard/users/${userId}`,
                formData,
                config
            );
            dispatch({
                type: DASHBOARD_EDIT_USER_USERS_PAGE_SUCCESS,
                payload: data,
            });
        } catch (error: errorInterface) {
            dispatch({
                type: DASHBOARD_EDIT_USER_USERS_PAGE_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };

// PRODUCTS
export const dashboard_deleteProduct =
    (productId: string) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
        const { userLogin } = getState();
        try {
            dispatch({ type: DASHBOARD_DELETE_PRODUCT_PROCUCTS_PAGE_REQUSET });
            const config = {
                headers: {
                    Authorization: `Bearer ${userLogin.userInfo?.token}`,
                },
            };

            const { data } = await axios.delete(
                `${BACKEND_API}/products/dashboard/products/${productId}`,
                config
            );
            dispatch({
                type: DASHBOARD_DELETE_PRODUCT_PROCUCTS_PAGE_SUCCESS,
                payload: data,
            });
        } catch (error: errorInterface) {
            dispatch({
                type: DASHBOARD_DELETE_PRODUCT_PROCUCTS_PAGE_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };

export const dashboard_editProduct =
    (productId: string, formData: object) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
        const { userLogin } = getState();
        try {
            dispatch({ type: DASHBOARD_EDIT_PRODUCT_PROCUCTS_PAGE_REQUSET });
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${userLogin.userInfo?.token}`,
                },
            };

            const { data } = await axios.patch(
                `${BACKEND_API}/products/dashboard/products/${productId}`,
                formData,
                config
            );
            dispatch({
                type: DASHBOARD_EDIT_PRODUCT_PROCUCTS_PAGE_SUCCESS,
                payload: data,
            });
        } catch (error: errorInterface) {
            dispatch({
                type: DASHBOARD_EDIT_PRODUCT_PROCUCTS_PAGE_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };

export const dashboard_usersWantToBeSellers =
    (page: number) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
        const { userLogin } = getState();
        try {
            dispatch({ type: DASHBOARD_USERS_WANT_TO_BE_SELLERS_REQUSET });
            const config = {
                headers: {
                    Authorization: `Bearer ${userLogin.userInfo?.token}`,
                },
            };

            const { data } = await axios.get(
                `${BACKEND_API}/users/dashboard/usersWantToBeSellers?page=${page}`,
                config
            );
            dispatch({
                type: DASHBOARD_USERS_WANT_TO_BE_SELLERS_SUCCESS,
                payload: data,
            });
        } catch (error: errorInterface) {
            dispatch({
                type: DASHBOARD_USERS_WANT_TO_BE_SELLERS_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };

export const dashboard_usersWantToBeSellersNumbers =
    () => async (dispatch: AppDispatch, getState: () => RootState) => {
        const { userLogin } = getState();
        try {
            dispatch({
                type: DASHBOARD_USERS_WANT_TO_BE_SELLERS_NUMBERS_REQUSET,
            });
            const config = {
                headers: {
                    Authorization: `Bearer ${userLogin.userInfo?.token}`,
                },
            };

            const { data } = await axios.get(
                `${BACKEND_API}/users/dashboard/usersWantToBeSellersNumbers`,
                config
            );
            dispatch({
                type: DASHBOARD_USERS_WANT_TO_BE_SELLERS_NUMBERS_SUCCESS,
                payload: data,
            });
        } catch (error: errorInterface) {
            dispatch({
                type: DASHBOARD_USERS_WANT_TO_BE_SELLERS_NUMBERS_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };

export const dashboard_updateuserWantToBeSeller =
    (userId: string, role: string) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
        const { userLogin } = getState();
        try {
            dispatch({ type: DASHBOARD_UPDATE_USER_WANT_TO_BE_SELLER_REQUSET });
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userLogin.userInfo?.token}`,
                },
            };
            const { data } = await axios.patch(
                `${BACKEND_API}/users/dashboard/usersWantToBeSellers/${userId}`,
                { role },
                config
            );
            dispatch({
                type: DASHBOARD_UPDATE_USER_WANT_TO_BE_SELLER_SUCCESS,
                payload: data,
            });
        } catch (error: errorInterface) {
            dispatch({
                type: DASHBOARD_UPDATE_USER_WANT_TO_BE_SELLER_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };

// ORDERS
export const dashboard_allOrders =
    (filterData: FilterDateInterface | null, page: number) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
        const { userLogin } = getState();
        try {
            dispatch({ type: DASHBOARD_ALL_ORDERS_REQUSET });
            const config = {
                headers: {
                    Authorization: `Bearer ${userLogin.userInfo?.token}`,
                },
            };

            const { data } = await axios.get(
                `${BACKEND_API}/orders/dashboard?${
                    filterData
                        ? `filterData=${JSON.stringify(filterData)}&`
                        : ""
                }page=${page}`,
                config
            );
            dispatch({ type: DASHBOARD_ALL_ORDERS_SUCCESS, payload: data });
        } catch (error: errorInterface) {
            dispatch({
                type: DASHBOARD_ALL_ORDERS_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };
