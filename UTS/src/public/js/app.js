(function() {
    const elTopLinks = document.querySelector('.header__top__links')
    const isToken = document.cookie.split('=')[0] === 'access_token'
    const headNavOption = document.querySelector('.header__nav__option')
    const cart = headNavOption.children[2]
    const atc = document.querySelector('.atc')
    const cartData = JSON.parse(localStorage.getItem('cart')) || []
    const price = document.querySelector('.total__price__cart')
    if(isToken) {
        elTopLinks.remove()
    }
    let totalQty = 0
    let totalPrice = 0
    cartData.forEach(data => {
        totalQty += Number(data.qty)
        totalPrice += Number(data.qty * data.price)
    })
    cart.querySelector('span').innerHTML = totalQty
    price.innerHTML = `Rp. ${totalPrice}`
    atc.addEventListener('click', e => {
        const qty = document.querySelector('.qty-val').value
        const name = document.querySelector('.product__name').innerHTML
        const productPrice = document.querySelector('.product__price').innerHTML
        const newData = {
            name: name,
            qty: qty,
            price: productPrice
        }
        const dataIndex = cartData.findIndex(data => data.name === newData.name)
        if (dataIndex < 0) {
            cartData.push(newData)
        } else {
            cartData.splice(dataIndex, 1, newData)
        }
        localStorage.setItem('cart', JSON.stringify(cartData))
        let totalQty = 0
        let totalPrice = 0
        cartData.forEach(data => {
            totalQty += Number(data.qty)
            totalPrice += Number(data.qty * data.price)
        })
        cart.querySelector('span').innerHTML = totalQty
        price.innerHTML = `Rp. ${totalPrice}`
    })
})()