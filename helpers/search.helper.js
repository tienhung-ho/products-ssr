
module.exports = (query) => {
    let obj = {
        keyword: '',
        regex: ''
    }

    if(query.keyword) {
        obj.keyword = query.keyword.trim()
        const regex = new RegExp(obj.keyword, 'i')
        obj.regex = regex
    }

    return obj
}