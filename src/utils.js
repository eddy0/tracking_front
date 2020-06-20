
const save = (payload) => {
    localStorage.setItem('user', JSON.stringify(payload.user))
    localStorage.setItem('token', payload.token)
}

const log = console.log.bind(console)

export {
    log,
    save,
}
