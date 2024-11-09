const authReducer = (state={}, action)=>{
    switch(action.type){
        case "USER_DATA":
            const data = (action?.payload)
            return {...state, data: data};
        default:
            return state
    }
}

export default authReducer;