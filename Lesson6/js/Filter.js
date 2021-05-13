Vue.component('filteres', {
    props: ['products', 'filtered'],
    data() {
        return {
            userSearch: '',
        }
    },
    methods: {
        filter() {
            console.log(this.products);
            let regexp = new RegExp(this.userSearch, 'i');

            this.filtered.length = 0;

            this.products.filter(el => regexp.test(el.product_name)).forEach(element => {
                this.filtered.push(element);
            });

            //this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    template: `
        <form action="#" class="search-form" @submit.prevent="filter">
            <input type="text" class="search-field" v-model="userSearch">
            <button class="btn-search" type="submit">
                <i class="fas fa-search"></i>
            </button>
        </form>
    `
});