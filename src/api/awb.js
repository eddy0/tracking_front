import axios from 'axios'
import {Api} from './index'
import {clean, log} from '../utils'


class AirwayApi extends Api {
    all() {
        const url = this.baseUrl + '/awb/'
        return axios({
            url: url,
            method: 'get',
            headers: {'z-token': this.getToken()}
        })
    }

    add(data) {
        const url = this.baseUrl + '/awb/add'
        return axios({
            url: url,
            method: 'post',
            data: data,
            headers: {'z-token': this.getToken()}
        })
    }

    update(id, data) {
        const url = this.baseUrl + `/awb/${id}`
        return axios({
            method: 'patch',
            url,
            data,
            headers: {'z-token': this.token}
        })
    }

    toggle(id) {
        const url = this.baseUrl + `/awb/${id}`
        return axios({
            method: 'put',
            url,
            headers: {'z-token': this.getToken()}
        })
    }

    delete(id) {
        const url = this.baseUrl + `/awb/${id}`
        return axios.delete(url,
            {
                headers: {'z-token': this.getToken()}
            })
    }
}


const getAwbs = () => {
    return new AirwayApi().all().then((r) => {
        let todos = r.data.map((t) => {
            return clean(t)
        })
        return todos
    }).catch((err) => {
        log('err', err)
        return []
    })
}


const addAwbs = (awb) => {
    return new AirwayApi().add(awb).then((r) => {
            let d = clean(r.data)
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