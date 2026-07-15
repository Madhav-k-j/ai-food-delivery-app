import api from "../../utils/api"

import {
    createOrderRequest,
    createOrderSuccess,
    createOrderFail,
    paymentRequest,
    paymentSuccess,
    paymentFail,
    myOrdersRequest,
    myOrdersSuccess,
    myOrdersFail,
    orderDetailsRequest,
    orderDetailsSuccess,
    orderDetailsFail
} from "../slices/orderSlice"

//create order
export const createOrder = (session_id) => async(dispatch) =>{
    try{

        dispatch(createOrderRequest());
        const {data} = await api.post("/v1/eats/orders/new",{session_id},
            {
                headers:{
                    "Content-Type": "application/json"
                }
            }
        )

        dispatch(createOrderSuccess(data))

    }catch(error)
    {
       dispatch(createOrderFail(error.response?.data?.message))
    }
}


//payment
// payment
export const payment = (items, restaurant) => async (dispatch) => {
    console.log("1. PAYMENT ACTION STARTED");

    try {
        console.log("2. BEFORE PAYMENT REQUEST");

        dispatch(paymentRequest());

        console.log("3. BEFORE API CALL");

        const { data } = await api.post(
            "/v1/payment/process",
            { items, restaurant },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        console.log("4. PAYMENT RESPONSE:", data);

        if (data.url) {
            console.log("5. REDIRECTING TO STRIPE:", data.url);
            window.location.assign(data.url);
        }

        dispatch(paymentSuccess());

    } catch (error) {
        console.error("PAYMENT ERROR FULL:", error);
        console.error("PAYMENT ERROR RESPONSE:", error.response?.data);

        alert(error.response?.data?.message || error.message || "Payment failed");

        dispatch(
            paymentFail(error.response?.data?.message || "Payment failed")
        );
    }
};

//my orders
export const myOrders = () => async(dispatch) =>{
    try{

        dispatch(myOrdersRequest());
        const {data} = await api.get("/v1/eats/orders/me/myOrders")

        dispatch(myOrdersSuccess(data.orders))

    }catch(error)
    {
       dispatch(myOrdersFail(error.response?.data?.message))
    }
}

//orderDetails
export const getOrderDetails = (id) => async(dispatch) =>{
    try{

        dispatch(orderDetailsRequest());
        const {data} = await api.get(`/v1/eats/orders/${id}`)

        dispatch(orderDetailsSuccess(data.order))

    } catch (error) {
    console.log("PAYMENT ERROR:", error.response?.data || error);
    alert(error.response?.data?.message || "Payment failed");

    dispatch(
        paymentFail(error.response?.data?.message || "Payment failed")
    );
}
};

