
const save = (payload) => {
    localStorage.setItem('user', JSON.stringify(payload.user))
    localStorage.setItem('token', JSON.stringify(payload.token))
}

export {
    save
}
