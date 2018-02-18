const apiURL = 'http://localhost:3001'


const headers = {
  'Accept': 'application/json',
  'Authorization': 'coolToken'
}


//  Get All Posts
export const fetchPosts = () =>
    fetch(`${apiURL}/posts`, { headers })
    .then(data => data.json())


//  Get All Categories
export const fetchCategories = () =>
    fetch(`${apiURL}/categories`, { headers })
    .then(data => data.json())


//  Get Post By ID
export const fetchPostByID = (id) =>
    fetch(`${apiURL}/posts/${id}`, { headers })
    .then(data => data.json())



// POST /posts/:id

export const voteThisPost = (id, option) => {
    return fetch(`${apiURL}/posts/${id}`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            option: option
        })
    })
    .then(data => data.json())
}