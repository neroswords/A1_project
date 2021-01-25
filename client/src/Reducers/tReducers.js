const tReducer = (state = Boolean, action) => {
    switch (action.type) {
        case 'testcase':
            state = action.change
            console.log(state)
            return state;
        default:
            return state;
    }
}

export default tReducer;