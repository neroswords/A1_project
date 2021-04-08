const aReducer = (state = Boolean, action) => {
    switch (action.type) {
        case 'change':
            state = !state
            return state;
        default:
            return state;
    }
}

export default aReducer;