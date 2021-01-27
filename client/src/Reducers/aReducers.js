const aReducer = (state = Boolean, action) => {
    switch (action.type) {
        case 'atestcase':
            state = action.change
            return state;
        default:
            return state;
    }
}

export default aReducer;