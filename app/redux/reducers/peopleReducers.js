import {FETCHING_PEOPLE_FAILURE, FETCHING_PEOPLE_REQUEST, FETCHING_PEOPLE_SUCCESS} from '../actions/types'

const initialState = {
    isFetching: false,
    errorMessage: "",
    peopleArray: []
}

const peopleReducer = (state = initialState, action) => {

    switch (action.type) {
        case FETCHING_PEOPLE_REQUEST:
            return {
                ...state,
                isFetching: true
            }
            break
        case FETCHING_PEOPLE_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.payload
            }
            break
        case FETCHING_PEOPLE_SUCCESS:
            console.log('state', action.check);
            if (action.check) {
                return {
                    ...state,
                    isFetching: false,
                    peopleArray: state
                        .peopleArray
                        .concat(action.payload)
                }
            } else {
                return {
                    ...state,
                    isFetching: false,
                    peopleArray: action
                        .payload
                        .concat(state.peopleArray)

                }
            }

            break
        default:
            return state
    }
}

export default peopleReducer