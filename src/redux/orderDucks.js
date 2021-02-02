import serviceStore from '../services/service'

import { logout } from './authDucks'
import { CART_CLEAR_ITEMS } from './cartDucks'

//TYPES

export const ORDER_CREATE_REQUEST = 'ORDER_CREATE_REQUEST'
export const ORDER_CREATE_SUCCESS = 'ORDER_CREATE_SUCCESS'
export const ORDER_CREATE_FAIL = 'ORDER_CREATE_FAIL'
export const ORDER_CREATE_RESET = 'ORDER_CREATE_RESET'

export const ORDER_DETAILS_REQUEST = 'ORDER_DETAILS_REQUEST'
export const ORDER_DETAILS_SUCCESS = 'ORDER_DETAILS_SUCCESS'
export const ORDER_DETAILS_FAIL = 'ORDER_DETAILS_FAIL'

export const ORDER_PAY_REQUEST = 'ORDER_PAY_REQUEST'
export const ORDER_PAY_SUCCESS = 'ORDER_PAY_SUCCESS'
export const ORDER_PAY_FAIL = 'ORDER_PAY_FAIL'
export const ORDER_PAY_RESET = 'ORDER_PAY_RESET'

export const ORDER_LIST_MY_REQUEST = 'ORDER_LIST_MY_REQUEST'
export const ORDER_LIST_MY_SUCCESS = 'ORDER_LIST_MY_SUCCESS'
export const ORDER_LIST_MY_FAIL = 'ORDER_LIST_MY_FAIL'
export const ORDER_LIST_MY_RESET = 'ORDER_LIST_MY_RESET'

export const ORDER_LIST_REQUEST = 'ORDER_LIST_REQUEST'
export const ORDER_LIST_SUCCESS = 'ORDER_LIST_SUCCESS'
export const ORDER_LIST_FAIL = 'ORDER_LIST_FAIL'

export const ORDER_DELIVER_REQUEST = 'ORDER_DELIVER_REQUEST'
export const ORDER_DELIVER_SUCCESS = 'ORDER_DELIVER_SUCCESS'
export const ORDER_DELIVER_FAIL = 'ORDER_DELIVER_FAIL'
export const ORDER_DELIVER_RESET = 'ORDER_DELIVER_RESET'

//REDUCERS
export const orderCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case ORDER_CREATE_REQUEST:
			return {
				loading: true,
			}
		case ORDER_CREATE_SUCCESS:
			return {
				loading: false,
				success: true,
				order: action.payload,
			}
		case ORDER_CREATE_FAIL:
			return {
				loading: false,
				error: action.payload,
			}
		case ORDER_CREATE_RESET:
			return {}
		default:
			return state
	}
}

export const orderDetailsReducer = (
	state = { loading: true, orderItems: [], shippingAddress: {} },
	action
) => {
	switch (action.type) {
		case ORDER_DETAILS_REQUEST:
			return {
				...state,
				loading: true,
			}
		case ORDER_DETAILS_SUCCESS:
			return {
				loading: false,
				order: action.payload,
			}
		case ORDER_DETAILS_FAIL:
			return {
				loading: false,
				error: action.payload,
			}
		default:
			return state
	}
}

export const orderPayReducer = (state = {}, action) => {
	switch (action.type) {
		case ORDER_PAY_REQUEST:
			return {
				loading: true,
			}
		case ORDER_PAY_SUCCESS:
			return {
				loading: false,
				success: true,
			}
		case ORDER_PAY_FAIL:
			return {
				loading: false,
				error: action.payload,
			}
		case ORDER_PAY_RESET:
			return {}
		default:
			return state
	}
}

export const orderDeliverReducer = (state = {}, action) => {
	switch (action.type) {
		case ORDER_DELIVER_REQUEST:
			return {
				loading: true,
			}
		case ORDER_DELIVER_SUCCESS:
			return {
				loading: false,
				success: true,
			}
		case ORDER_DELIVER_FAIL:
			return {
				loading: false,
				error: action.payload,
			}
		case ORDER_DELIVER_RESET:
			return {}
		default:
			return state
	}
}

export const orderListMyReducer = (state = { orders: [] }, action) => {
	switch (action.type) {
		case ORDER_LIST_MY_REQUEST:
			return {
				loading: true,
			}
		case ORDER_LIST_MY_SUCCESS:
			return {
				loading: false,
				orders: action.payload,
			}
		case ORDER_LIST_MY_FAIL:
			return {
				loading: false,
				error: action.payload,
			}
		case ORDER_LIST_MY_RESET:
			return { orders: [] }
		default:
			return state
	}
}

export const orderListReducer = (state = { orders: [] }, action) => {
	switch (action.type) {
		case ORDER_LIST_REQUEST:
			return {
				loading: true,
			}
		case ORDER_LIST_SUCCESS:
			return {
				loading: false,
				orders: action.payload,
			}
		case ORDER_LIST_FAIL:
			return {
				loading: false,
				error: action.payload,
			}
		default:
			return state
	}
}

//ACTIONS

export const createOrder = order => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_CREATE_REQUEST,
		})

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		}

		const { data } = await serviceStore.post(`/api/orders`, order, config)

		dispatch({
			type: ORDER_CREATE_SUCCESS,
			payload: data,
		})
		dispatch({
			type: CART_CLEAR_ITEMS,
			payload: data,
		})
		localStorage.removeItem('cartItems')
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message
		if (message === 'Not authorized, token failed') {
			dispatch(logout())
		}
		dispatch({
			type: ORDER_CREATE_FAIL,
			payload: message,
		})
	}
}

export const getOrderDetails = id => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_DETAILS_REQUEST,
		})

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		}

		const { data } = await serviceStore.get(`/api/orders/${id}`, config)

		dispatch({
			type: ORDER_DETAILS_SUCCESS,
			payload: data,
		})
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message
		if (message === 'Not authorized, token failed') {
			dispatch(logout())
		}
		dispatch({
			type: ORDER_DETAILS_FAIL,
			payload: message,
		})
	}
}

export const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_PAY_REQUEST,
		})

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		}

		const { data } = await serviceStore.put(
			`/api/orders/${orderId}/pay`,
			paymentResult,
			config
		)

		dispatch({
			type: ORDER_PAY_SUCCESS,
			payload: data,
		})
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message
		if (message === 'Not authorized, token failed') {
			dispatch(logout())
		}
		dispatch({
			type: ORDER_PAY_FAIL,
			payload: message,
		})
	}
}

export const deliverOrder = order => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_DELIVER_REQUEST,
		})

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		}

		const { data } = await serviceStore.put(
			`/api/orders/${order._id}/deliver`,
			{},
			config
		)

		dispatch({
			type: ORDER_DELIVER_SUCCESS,
			payload: data,
		})
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message
		if (message === 'Not authorized, token failed') {
			dispatch(logout())
		}
		dispatch({
			type: ORDER_DELIVER_FAIL,
			payload: message,
		})
	}
}

export const listMyOrders = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_LIST_MY_REQUEST,
		})

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		}

		const { data } = await serviceStore.get(`/api/orders/myorders`, config)

		dispatch({
			type: ORDER_LIST_MY_SUCCESS,
			payload: data,
		})
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message
		if (message === 'Not authorized, token failed') {
			dispatch(logout())
		}
		dispatch({
			type: ORDER_LIST_MY_FAIL,
			payload: message,
		})
	}
}

export const listOrders = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_LIST_REQUEST,
		})

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		}

		const { data } = await serviceStore.get(`/api/orders`, config)

		dispatch({
			type: ORDER_LIST_SUCCESS,
			payload: data,
		})
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message
		if (message === 'Not authorized, token failed') {
			dispatch(logout())
		}
		dispatch({
			type: ORDER_LIST_FAIL,
			payload: message,
		})
	}
}
