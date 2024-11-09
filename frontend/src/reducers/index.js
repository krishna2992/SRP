import { combineReducers } from "redux";
import authReducer from './auth.js';
import paymentsReducer from "./payments.js";
import exampleReducer from "./example.js";

export default combineReducers({authReducer, paymentsReducer, exampleReducer});