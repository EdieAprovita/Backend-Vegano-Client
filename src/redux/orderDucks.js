import axios from 'axios'

//CONSTANTS

const orderData = {
	loading: false,
	success: false,
	orderItems: [],
	orders: [],
	shippingAddress: {},
	error: undefined,
}

//TYPES

const ORDER_CREATE_REQUEST = 'ORDER_CREATE_REQUEST'
const ORDER_CREATE_SUCCESS = 'ORDER_CREATE_SUCCESS'
const ORDER_CREATE_FAIL = 'ORDER_CREATE_FAIL'
const ORDER_CREATE_RESET = 'ORDER_CREATE_RESET'

const ORDER_DETAILS_REQUEST = 'ORDER_DETAILS_REQUEST'
const ORDER_DETAILS_SUCCESS = 'ORDER_DETAILS_SUCCESS'
const ORDER_DETAILS_FAIL = 'ORDER_DETAILS_FAIL'

const ORDER_PAY_REQUEST = 'ORDER_PAY_REQUEST'
const ORDER_PAY_SUCCESS = 'ORDER_PAY_SUCCESS'
const ORDER_PAY_FAIL = 'ORDER_PAY_FAIL'
const ORDER_PAY_RESET = 'ORDER_PAY_RESET'

const ORDER_LIST_MY_REQUEST = 'ORDER_LIST_MY_REQUEST'
const ORDER_LIST_MY_SUCCESS = 'ORDER_LIST_MY_SUCCESS'
const ORDER_LIST_MY_FAIL = 'ORDER_LIST_MY_FAIL'
const ORDER_LIST_MY_RESET = 'ORDER_LIST_MY_RESET'

const ORDER_LIST_REQUEST = 'ORDER_LIST_REQUEST'
const ORDER_LIST_SUCCESS = 'ORDER_LIST_SUCCESS'
const ORDER_LIST_FAIL = 'ORDER_LIST_FAIL'

const ORDER_DELIVER_REQUEST = 'ORDER_DELIVER_REQUEST'
const ORDER_DELIVER_SUCCESS = 'ORDER_DELIVER_SUCCESS'
const ORDER_DELIVER_FAIL = 'ORDER_DELIVER_FAIL'
const ORDER_DELIVER_RESET = 'ORDER_DELIVER_RESET'

//REDUCERS

export default function orderReducer(state = orderData, action) {
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
		case ORDER_DETAILS_REQUEST:
			return {
				...state,
				loading: true,
			}
		case ORDER_DETAILS_SUCCESS:
			return {
				...state,
				loading: true,
				order: action.payload,
			}
		case ORDER_DETAILS_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			}
		case ORDER_PAY_REQUEST:
			return {
				...state,
				loading: true,
			}
		case ORDER_PAY_SUCCESS:
			return {
				...state,
				loading: false,
				success: true,
			}
		case ORDER_PAY_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			}
		case ORDER_PAY_RESET:
			return {
				...state,
			}
		case ORDER_DELIVER_REQUEST:
			return {
				...state,
				loading: true,
			}
		case ORDER_DELIVER_SUCCESS:
			return {
				...state,
				loading: false,
				error: action.payload,
			}
		case ORDER_DELIVER_FAIL:
			return {
				loading: false,
				error: action.payload,
			}
		case ORDER_DELIVER_RESET:
			return {
				...state,
			}
		case ORDER_LIST_MY_REQUEST:
			return {
				...state,
				loading: true,
			}
		case ORDER_LIST_MY_SUCCESS:
			return {
				...state,
				orders: action.payload,
			}
		case ORDER_LIST_MY_FAIL:
			return {
				...state,
				error: action.payload,
			}
		case ORDER_LIST_MY_RESET:
			return {
				orders: [],
			}
		case ORDER_LIST_REQUEST:
			return {
				loading: true,
			}
		case ORDER_LIST_SUCCESS:
			return {
				loading: true,
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
