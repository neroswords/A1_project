const aReducer = (state = String, action) => {
    switch (action.type) {
        case 'aut':
            state = action.access_token
            console.log(state)
            return state;
        default:
            return state;
    }
}

export default aReducer;