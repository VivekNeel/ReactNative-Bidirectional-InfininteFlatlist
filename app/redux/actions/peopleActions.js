import {FETCHING_PEOPLE_FAILURE, FETCHING_PEOPLE_REQUEST, FETCHING_PEOPLE_SUCCESS} from './types'

export const fetchPeopleRequest = () => ({type: FETCHING_PEOPLE_REQUEST})
export const fetchPeopleSuccess = (json, onEndReached) => ({type: FETCHING_PEOPLE_SUCCESS, payload: json, check: onEndReached})
export const fetchPeopleFailure = (error) => ({type: FETCHING_PEOPLE_FAILURE, payload: error})

export const fetchPeople = (page, onEndReached) => {
    return async dispatch => {
        dispatch(fetchPeopleRequest());
        try {
            const url = `https://api.stackexchange.com/2.2/answers?page=${page}&pagesize=5&order=desc&sort=activity&site=stackoverflow`
            console.log(url)
            let response = await fetch(url)
            let json = await response.json()
            dispatch(fetchPeopleSuccess(json.items, onEndReached))
        } catch (error) {
            dispatch(fetchPeopleFailure(error))
        }
    }
}