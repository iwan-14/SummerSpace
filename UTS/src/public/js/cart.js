Vue.component('cart-item', {
    props: ['name', 'price', 'photo', 'qty'],
    computed: {
        getPriceInRupiah() {
            return `Rp. ${this.price}`
        },
        getTotalPriceInRupiah() {
            return `Rp. ${this.price * this.qty}`
        }
    },
    template: `
        <tr>
            <td class="product__cart__item">
                <div class="product__cart__item__pic">
                    <img src="img/shopping-cart/cart1.jpg" height="90" width="90" alt="">
                </div>
                <div class="product__cart__item__text">
                    <h6>{{ name }}</h6>
                    <h5>{{ getPriceInRupiah }}</h5>
                </div>
            </td>
            <td class="quantity__item">
                <div class="quantity">
                    <div class="pro-qty-2">
                        <input type="text" :value="qty">
                    </div>
                </div>
            </td>
            <td class="cart__price">{{ this.getTotalPriceInRupiah }}</td>
            <td class="cart__close" @click="$emit('remove', name)"><i class="fa fa-close"></i></td>
        </tr>
    `
})

Vue.component('cart-total', {
    props: ['total'],
    computed: {
        getTotalInRupiah() {
            let rupiah = '';		
            const angkarev = this.total.toString().split('').reverse().join('');
            for(var i = 0; i < angkarev.length; i++) if(i%3 == 0) rupiah += angkarev.substr(i,3)+'.';
            return 'Rp. '+rupiah.split('',rupiah.length-1).reverse().join('');
        }
    },
    template: `
        <div class="cart__total">
            <h6>Cart total</h6>
            <ul>
                <li>Subtotal <span>{{ getTotalInRupiah }}</span></li>
                <li>Total <span>{{ getTotalInRupiah }}</span></li>
            </ul>
            <a href="./checkout.html" class="primary-btn">Proceed to checkout</a>
        </div>
    `
})

Vue.component('cart-wrapper', {
    data: function() {
        return {
            cartData: []
        }
    },
    created() {
        const cartData = JSON.parse(localStorage.getItem('cart')) || []
        this.cartData = cartData
    },
    computed: {
        getTotal() {
            let total = 0
            this.cartData.forEach(data => {
                total += data.price * data.qty
            })
            return total
        }
    },
    methods: {
        removeItem(name) {
            const productIndex = this.cartData.findIndex(data => data.name === name)
            this.cartData.splice(productIndex, 1)
            localStorage.setItem('cart', JSON.stringify(this.cartData))
        }
    },
    template: `
    <div class="container">
        <div class="row">
            <div class="col-lg-8">
                <div class="shopping__cart__table">
                    <table>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <cart-item 
                                v-for="(item, index) in cartData" 
                                :key="index" 
                                :name="item.name"
                                :qty="item.qty"
                                :price="item.price"
                                @remove="removeItem"
                            />
                        </tbody>
                    </table>
                </div>
                <div class="row">
                    <div class="col-lg-6 col-md-6 col-sm-6">
                        <div class="continue__btn">
                            <a href="./shop.html">Continue Shopping</a>
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-6">
                        <div class="continue__btn update__btn">
                            <a href="./shopping-cart.html"><i class="fa fa-spinner"></i> Update cart</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-4">
                <div class="cart__discount">
                    <h6>Discount codes</h6>
                    <form action="#">
                        <input type="text" placeholder="Coupon code">
                        <button type="submit">Apply</button>
                    </form>
                </div>
                <cart-total :total="getTotal" />
            </div>
        </div>
    </div>
    `
})

new Vue({
    el: '#cart'
})
