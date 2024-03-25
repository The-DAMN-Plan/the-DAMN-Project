function sideNav(state=false,action) {
    if (action.type == 'SET_SIDE_NAV') {
        return !state;
    }
    return state;
    
}

export default sideNav;