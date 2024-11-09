const paymentsReducer = (state={}, action)=>{
    switch(action.type){
        case "STUDENT_ALL_PAYMENTS":
            console.log(action?.payload)
            return {...state, data:action?.payload};
        default:
            return state
    }
}

export default paymentsReducer;