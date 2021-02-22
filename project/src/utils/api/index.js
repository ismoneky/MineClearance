import server from '../server/http'

const getarr = async function(){
    var {data} = await server.get('http://www.aaa.com')
    return data
}

export {
    getarr
}