
module.exports = (query) => {
    const filterStatus = [
        {
            name: 'All',
            status: "",
            class:""
        },
        {
            name: 'Active',
            status: 'active',
            class:""
        },
        {
            name: 'Inactive',
            status: 'inactive',
            class:""
        }
    ]
    
    const sttUrl = query.status

    if (sttUrl) {
        const index = filterStatus.findIndex((item)=> {
            return item.status == sttUrl
        })

        filterStatus[index].class = 'active'
    }
    else {
        filterStatus[0].class = 'active'
    }

    return filterStatus
}