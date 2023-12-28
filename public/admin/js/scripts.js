    // Status
try {
    
    const allButtonStatus = document.querySelectorAll('[button-status]')
    if (allButtonStatus.length > 0) {

        allButtonStatus.forEach((item) => {
            let url = new URL(window.location.href)
            item.addEventListener("click", () => {
                const status = item.getAttribute(`button-status`)

                if (status != '') {
                    url.searchParams.set('status', status)
                }
                else {
                    url.searchParams.delete('status')
                }

                window.location.href = url.href
            })
        })
    }

    // END Status

    // Search

    const formSearch = document.querySelector('#form-search')
    if (formSearch) {
        formSearch.addEventListener('submit', (e) => {
            e.preventDefault()
            let url = new URL(window.location.href)
            var keySearch = e.target.elements.keyword.value
            
            if (keySearch != '') {
                url.searchParams.set('keyword', keySearch)
            }
            else {
                url.searchParams.delete('keyword')
            }

            window.location.href = url.href


        })

    }

    // END Search


    // Pagination
    const allPagination = document.querySelectorAll('[pagination-pos]')

    if (allPagination.length > 0) {
        allPagination.forEach((button) => {
            let url = new URL(window.location.href)
            button.addEventListener('click', () => {
                var keyPagination = button.getAttribute('pagination-pos')
                if (keyPagination != '') {
                    url.searchParams.set('page', keyPagination)
                }
                else {
                    url.searchParams.delete('page')
                }

                window.location.href = url.href
            })
        })
    }

    // END Partination

    // Change Status
    const buttonsChangeStatus = document.querySelectorAll('[button-change-status]')
    const formChangeStatus = document.querySelector('#form-change-status')
    const path = formChangeStatus.getAttribute('data-path')

    if (buttonsChangeStatus.length > 0) {
        buttonsChangeStatus.forEach(item => {
            item.addEventListener('click', () => {
                const statusCurrent = item.getAttribute("data-status")
                const id = item.getAttribute('data-id')

                const statusChange = statusCurrent == 'active' ? 'inactive' : 'active'
                const action = path + `/${statusChange}/${id}?_method=PATCH`
                formChangeStatus.action = action
                formChangeStatus.setAttribute('action', action)

                formChangeStatus.submit()
            })
        })
    }

    // END Change Status

    // ChangeMULTI
    const checkMulti = document.querySelector("[checkbox-multi]")

    if (checkMulti) {
        const inputCheckAll = checkMulti.querySelector("input[name='checkall']")
        const inputIDs = checkMulti.querySelectorAll("input[name='id']")
        
        inputCheckAll.addEventListener('click', () => {
            if (inputCheckAll.checked) {
                inputIDs.forEach(input => {
                    input.checked = true
                })
            }
            else {
                inputIDs.forEach(input => {
                    input.checked = false
                })
            }
        })

        inputIDs.forEach(input => {
            input.addEventListener('click', () => {

                const countInputs = checkMulti.querySelectorAll("input[name='id']:checked")
                
                if (countInputs.length == inputIDs.length) {
                    inputCheckAll.checked = true
                }

                else {
                    inputCheckAll.checked = false
                }
            })
        })
        
    }

    // END ChangeMULTI

    // Form-multi-change
    const formChangeMulti = document.querySelector("[form-change-multi]")

    if (formChangeMulti) {
        formChangeMulti.addEventListener('submit', (e) => {
            e.preventDefault()
            const inputCheckAll = checkMulti.querySelector("input[name='checkall']")
            const inputChecked = checkMulti.querySelectorAll("input[name='id']:checked")
            const typeChange = e.target.elements.type.value

            if (typeChange == 'delete-multi') {
                const isConfirm = confirm("Are you sure about that!")

                if (!isConfirm) {
                    return
                }
            }

            if (inputChecked.length > 0) {
                const ids = []
                const inputIds = formChangeMulti.querySelector("input[name='ids']")

                inputChecked.forEach(input => {

                    if (typeChange == "change-position") {
                        const position = input.closest("tr").querySelector("input[name='position']").value
        
                        ids.push(`${input.value}-${position}`)
                    }
                    else {

                        ids.push(input.value)
                    }
                })   

                inputIds.value = ids.join(', ')
                formChangeMulti.submit()
            }
            else {
                alert("Choose one product please!")
            }
        })
    }

    // END Form-multi-change


    // DELETE ITEM

    const buttonsDelete = document.querySelectorAll('[button-delete]')
    const formDeleteItem = document.querySelector('#form-delete-item')
    const pathDelete = formDeleteItem.getAttribute('data-path')
    if (buttonsDelete.length > 0) {
        buttonsDelete.forEach(item => {
            item.addEventListener('click', () => {
                const id = item.getAttribute('data-id')
                console.log(pathDelete);
                const confirmDelete = confirm("Are you sure about that!")
                if (confirmDelete) {
                    const action = pathDelete + `/${id}?_method=DELETE`
                    formDeleteItem.action = action
                    formDeleteItem.setAttribute('action', action)
    
                    formDeleteItem.submit()
                }
            })
        })
    }
    // END DELTE ITEM

    // SHOW ALERT

    const showAlert = document.querySelector('[show-alert]')

    if (showAlert) {
        
        const closeAlert = showAlert.querySelector('[close-alert]')
        let dataTime = showAlert.getAttribute('data-time')

        closeAlert.addEventListener('click', () => {
            showAlert.classList.add('alert-hidden')
        })

        setTimeout(() => {
           
            showAlert.classList.add('alert-hidden')

        }, dataTime)

    }

  }
  catch (error) {
    
  }
  // END SHOW ALERT 


  // START UPLOAD IMAGE

  const uploadImage = document.querySelector('[upload-image]')

  if (uploadImage) {
    const imageInput = uploadImage.querySelector('[upload-image-input]')
    const imagePreview = uploadImage.querySelector('[upload-image-preview]')

    imageInput.addEventListener('change', (e)=> {
      if (e.target.files.length) {
        const image = URL.createObjectURL(e.target.files[0])

        imagePreview.src = image

      }
      
    })

  }

  // END UPLOAD IMAGE
