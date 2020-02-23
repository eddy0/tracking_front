import axios from 'axios'
import {Api} from './index'
import {clean, log} from '../utils'


class AirwayApi extends Api {
    all() {
        const url = '/awb/'
        return this.axios({
            url: url,
            method: 'get',
        })
    }

    add(data) {
        const url = '/awb/add'
        return this.axios({
            url: url,
            method: 'post',
            data: data,
        })
    }

    update(id, data) {
        const url = `/awb/${id}`
        return this.axios.patch(url, data)
    }

    toggle(id) {
        const url = `/awb/${id}`
        return this.axios.put(url, '')
    }

    delete(id) {
        const url = `/awb/${id}`
        return this.axios.delete(url)
    }
}


const getAwbs = () => {
    return new AirwayApi().all().then((r) => {
        const {data} = r
        let awbs = data.map((t) => {
            return clean(t)
        })
        return awbs
    }).catch((err) => {
        log('err', err)
        return []
    })
}


const addAwbs = (awb) => {
    return new AirwayApi().add(awb).then(({data}) => {
        let d = clean(data)
        return d
    })
}


const toggleAwb = (id) => {
    return new AirwayApi().toggle(id).then((r) => {
        console.log('r', r)
        return r
    })
}


const updateAwb = (id, data) => {
    return new AirwayApi().update(id, data).then((r) => {
        console.log(r)
        let d = clean(r.data)
        return d
    })

}


const deleteAwb = (id) => {
    return new AirwayApi().delete(id)
}

export {
    getAwbs,
    addAwbs,
    toggleAwb,
    updateAwb,
    deleteAwb,
}