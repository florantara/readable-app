//  Get All Posts
export const fetchPosts = () =>
    fetch('http://localhost:3001/posts', {
        headers: { Authorization: 'coolToken' }
    }).then(data => data.json())


//  Get All Categories
export const fetchCategories = () =>
    fetch('http://localhost:3001/categories', {
        headers: { Authorization: 'coolToken' }
    }).then(data => data.json())