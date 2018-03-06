import * as APIUtils from '../utils/api-utils'
import { GET_CATEGORIES } from '../actions/types'

// Categories

export const grabCategories = categories => ({
    type: GET_CATEGORIES,
    categories
})

export const getCategories= () => dispatch =>
    APIUtils.fetchCategories().then(categories =>
      dispatch(grabCategories(categories))
    )
