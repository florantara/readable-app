import { GET_CATEGORIES } from '../actions/types'

const categoriesInitialState = {
    categories: []
}

export function categoriesReducer ( state = categoriesInitialState, action ){
    switch (action.type){

        case GET_CATEGORIES:
            return { ...state, categories: action.categories.categories }

        default:
            return state
    }
}
