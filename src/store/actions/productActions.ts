import axios from "axios";

import {
    ALL_PRODUCTS_REQUSET,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    PRODUCT_DETAILS_REQUSET,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    MY_PRODUCTS_REQUEST,
    MY_PRODUCTS_SUCCESS,
    MY_PRODUCTS_FAIL,
    CREATE_PRODUCT_REQUEST,
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_FAIL,
    EDIT_MY_PRODUCTS_REQUEST,
    EDIT_MY_PRODUCTS_SUCCESS,
    EDIT_MY_PRODUCTS_FAIL,
    DELETE_MY_PRODUCTS_REQUEST,
    DELETE_MY_PRODUCTS_SUCCESS,
    DELETE_MY_PRODUCTS_FAIL,
    TOP_RATED_BEST_SALE_PRODUCTS_REQUEST,
    TOP_RATED_BEST_SALE_PRODUCTS_SUCCESS,
    TOP_RATED_BEST_SALE_PRODUCTS_FAIL,
} from "../constants/productConstants";

import {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    errorInterface,
    FilterDateInterface,
} from "../../interfaces/components/public";
import { RootState, AppDispatch } from "../store";

const BACKEND_API = process.env.REACT_APP_API_URL;

export const GetAllProducts =
    (
        filterData: FilterDateInterface | null,
        page: number = 1,
        pageType: string = "home"
    ) =>
    async (dispatch: AppDispatch) => {
        try {
            dispatch({ type: ALL_PRODUCTS_REQUSET });
            const { data } = await axios.get(
                `${BACKEND_API}/products?${
                    filterData
                        ? `filterData=${JSON.stringify(filterData)}&`
                        : ""
                }page=${page}${pageType && `&pageType=${pageType}`}`
            );
            dispatch({ type: ALL_PRODUCTS_SUCCESS, payload: data });
        } catch (error: errorInterface) {
            dispatch({
                type: ALL_PRODUCTS_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };

export const productDetails = (id: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUSET });
        const { data } = await axios.get(`${BACKEND_API}/products/${id}`);
        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data.product });
    } catch (error: errorInterface) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const myProducts =
    (page = 1) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
        const { userLogin } = getState();
        try {
            dispatch({ type: MY_PRODUCTS_REQUEST });
            const config = {
                headers: {
                    Authorization: `Bearer ${userLogin.userInfo?.token}`,
                },
            };

            const { data } = await axios.get(
                `${BACKEND_API}/products/myProducts/all?page=${page}`,
                config
            );
            dispatch({ type: MY_PRODUCTS_SUCCESS, payload: data });
        } catch (error: errorInterface) {
            dispatch({
                type: MY_PRODUCTS_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };

export const createProduct =
    (formData: object) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
        const { userLogin } = getState();
        try {
            dispatch({ type: CREATE_PRODUCT_REQUEST });
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${userLogin.userInfo?.token}`,
                },
            };

            const { data } = await axios.post(
                `${BACKEND_API}/products`,
                formData,
                config
            );
            dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: data });
        } catch (error: errorInterface) {
            dispatch({
                type: CREATE_PRODUCT_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };

export const editProduct =
    (productId: string, formData: object) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
        const { userLogin } = getState();
        try {
            dispatch({ type: EDIT_MY_PRODUCTS_REQUEST });
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${userLogin.userInfo?.token}`,
                },
            };

            const { data } = await axios.patch(
                `${BACKEND_API}/products/updateMyProduct/${productId}`,
                formData,
                config
            );
            dispatch({ type: EDIT_MY_PRODUCTS_SUCCESS, payload: data.product });
        } catch (error: errorInterface) {
            dispatch({
                type: EDIT_MY_PRODUCTS_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };

export const deleteProduct =
    (productId: string) =>
    async (dispatch: AppDispatch, getState: () => RootState) => {
        const { userLogin } = getState();
        try {
            dispatch({ type: DELETE_MY_PRODUCTS_REQUEST });
            const config = {
                headers: {
                    Authorization: `Bearer ${userLogin.userInfo?.token}`,
                },
            };

            const { data } = await axios.delete(
                `${BACKEND_API}/products/deletetMyProduct/${productId}`,
                config
            );
            dispatch({
                type: DELETE_MY_PRODUCTS_SUCCESS,
                payload: data.message,
            });
        } catch (error: errorInterface) {
            dispatch({
                type: DELETE_MY_PRODUCTS_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };

export const getTopRatedBestSaleProducts =
    () => async (dispatch: AppDispatch) => {
        try {
            dispatch({ type: TOP_RATED_BEST_SALE_PRODUCTS_REQUEST });

            const { data } = await axios.get(
                `${BACKEND_API}/products/topRated&bestSale_Products`
            );
            dispatch({
                type: TOP_RATED_BEST_SALE_PRODUCTS_SUCCESS,
                payload: data,
            });
        } catch (error: errorInterface) {
            dispatch({
                type: TOP_RATED_BEST_SALE_PRODUCTS_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };
