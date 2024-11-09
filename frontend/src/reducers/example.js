const exampleReducer = (state={}, action)=>{
    switch(action.type){
        case "TEST_EXAMPLE":
            console.log('Test rreducer called');
            console.log(action?.payload)
            return {...state, data: action?.payload};
        default:
            return state
    }
}

export default exampleReducer;