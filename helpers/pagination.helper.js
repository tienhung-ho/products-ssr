
module.exports = (paginationObj, query, counterProduct) => {
    if (query.page) {
        paginationObj.currPage = parseInt(query.page)
    }

    paginationObj.skip = (paginationObj.currPage - 1) * paginationObj.limitItem

    paginationObj.numberPage = Math.ceil(counterProduct / paginationObj.limitItem)

    return paginationObj
}
