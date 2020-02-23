const log = console.log.bind(console)

const now = (unix) => {
    return new Date(unix).toLocaleDateString('en-US', {hour: '2-digit'})
}


const saveToken = (token) => {
    window.localStorage.token = token
}

const clearToken = () => {
    window.localStorage.token = ''
}


const transfer = (str) => {
    let l = str.split('_')
    if (l.length <= 1) {
        return str
    } else {
        const r = l.map((item, index) => {
            if (index === 0) {
                return item
            } else {
                let a = item[0].toUpperCase()
                a = a + item.slice(1)
                return a
            }
        })
        return r.join('')
    }
}

const clean = (data) => {
    let d = {}
    Object.keys(data).map((key) => {
        const value = data[key]
        let k = transfer(key)
        d[k] = value
    })
    return d
}


export {
    log,
    saveToken,
    now,
    clean,
}


