Vue.component('checkout-wrapper', {
    data: function() {
        return {
            user: {
                name: '',
                email: '',
                country: '',
                address: '',
                city: '',
                postcode: '',
                phone: ''
            },
            createAccount: false,
            isLoading: true,
            access_token: null
        }
    },
    async created() {
        const cookie = document.cookie.split('=')
        const token = cookie[1]
        if (!token) {
            this.isLoading = false
            return
        }
        this.access_token = token
        try {
            const user = await axios.get(`/user/${token}`)
            this.user = user.data
            this.isLoading = false
        } catch(err) {
            console.log(err)
        }
    },
    methods: {
        getPriceInRupiah(price) {
            let rupiah = '';		
            const angkarev = price.toString().split('').reverse().join('');
            for(var i = 0; i < angkarev.length; i++) if(i%3 == 0) rupiah += angkarev.substr(i,3)+'.';
            return 'Rp. '+rupiah.split('',rupiah.length-1).reverse().join('');
        },
        async submit() {
            const userData = this.user
            const localItems = JSON.parse(localStorage.getItem('cart')) || []
            userData.cart = localItems
            try {
                await axios.post(`/user/checkout/${this.access_token}`, this.user)
                window.location.assign('/payment-verified')
            } catch(err) {
                console.log(err)
            }
        }
    },
    computed: {
        getCart() {
            const items = []
            const localItems = JSON.parse(localStorage.getItem('cart')) || []
            localItems.forEach(item => {
                items.push({
                    name: item.name,
                    price: this.getPriceInRupiah(item.qty * item.price)
                })
            })
            return items
        },
        getTotalPrice() {
            const localItems = JSON.parse(localStorage.getItem('cart')) || []
            let totalPrice = 0
            localItems.forEach(item => {
                const price = item.qty * item.price
                totalPrice += price
            })
            return this.getPriceInRupiah(totalPrice)
        }
    },
    template: `
    <div class="container" v-if="!isLoading">
        <div v-if="!access_token">
            login dulu bos
        </div>
        <div class="checkout__form" v-if="access_token">
            <form action="#" @submit.prevent="submit">
                <div class="row">
                    <div class="col-lg-8 col-md-6">
                        <h6 class="coupon__code"><span class="icon_tag_alt"></span> Have a coupon? <a href="#">Click
                        here</a> to enter your code</h6>
                        <h6 class="checkout__title">Billing Details</h6>
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="checkout__input">
                                    <p>Full Name<span>*</span></p>
                                    <input type="text" v-model="user.name">
                                </div>
                            </div>
                        </div>
                        <div class="checkout__input">
                            <p>Country<span>*</span></p>
                            <input type="text" v-model="user.country">
                        </div>
                        <div class="checkout__input">
                            <p>Address<span>*</span></p>
                            <input type="text" placeholder="Street Address" class="checkout__input__add" v-model="user.address">
                        </div>
                        <div class="checkout__input">
                            <p>Town/City<span>*</span></p>
                            <input type="text" v-model="user.city">
                        </div>
                        <div class="checkout__input">
                            <p>Country/State<span>*</span></p>
                            <input type="text" v-model="user.country">
                        </div>
                        <div class="checkout__input">
                            <p>Postcode / ZIP<span>*</span></p>
                            <input type="text" v-model="user.postcode">
                        </div>
                        <div class="row">
                            <div class="col-lg-6">
                                <div class="checkout__input">
                                    <p>Phone<span>*</span></p>
                                    <input type="text" v-model="user.phone">
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="checkout__input">
                                    <p>Email<span>*</span></p>
                                    <input type="text" v-model="user.email">
                                </div>
                            </div>
                        </div>
                        <div class="checkout__input__checkbox">
                            <label for="acc">
                                Create an account?
                                <input type="checkbox" id="acc" v-model="createAccount">
                                <span class="checkmark"></span>
                            </label>
                            <p>Create an account by entering the information below. If you are a returning customer
                            please login at the top of the page</p>
                        </div>
                        <div class="checkout__input" v-if="createAccount">
                            <p>Account Password<span>*</span></p>
                            <input type="text">
                        </div>
                        <div class="checkout__input__checkbox">
                            <label for="diff-acc">
                                Note about your order, e.g, special noe for delivery
                                <input type="checkbox" id="diff-acc">
                                <span class="checkmark"></span>
                            </label>
                        </div>
                        <div class="checkout__input">
                            <p>Order notes<span>*</span></p>
                            <input type="text"
                            placeholder="Notes about your order, e.g. special notes for delivery.">
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6">
                        <div class="checkout__order">
                            <h4 class="order__title">Your order</h4>
                            <div class="checkout__order__products">Product <span>Total</span></div>
                            <ul class="checkout__total__products">
                                <li v-for="(cart, index) in getCart">{{ cart.name }}<span>{{ cart.price }}</span></li>
                            </ul>
                            <ul class="checkout__total__all">
                                <li>Subtotal <span>{{ getTotalPrice }}</span></li>
                                <li>Total <span>{{ getTotalPrice }}</span></li>
                            </ul>
                            <ul class="checkout__input__checkbox">
                                <li><a href="#">Create an Account?</a></li>
                            </ul>
                            <div class="checkout__input__checkbox">
                                <img src="/img/payment.png" alt="">
                            </div>
                            <button type="submit" class="site-btn">PLACE ORDER</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
    `
})

new Vue({
    el: '#checkout'
})
