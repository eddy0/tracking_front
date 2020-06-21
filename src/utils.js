
const save = (payload) => {
    localStorage.setItem('user', JSON.stringify(payload.user))
    localStorage.setItem('token', payload.token)
}

export const log = console.log.bind(console)

export {
    save,
}
