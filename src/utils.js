const save = (payload) => {
    localStorage.setItem('user', JSON.stringify(payload.user))
    localStorage.setItem('token', payload.token)
}

const log = window.console.log.bind(console)

export {
    save,
    log,
}
