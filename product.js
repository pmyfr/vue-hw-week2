import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
// 建立基本路由
const site = 'https://vue3-course-api.hexschool.io/v2';
const api_path = 'myp'; 

const app = createApp({
  data() {
    return {
      products: [],
      tempProduct: {}
    }
},
  methods: {
    checkLogin () { //確認登入是否有成功
        const url =`${site}/api/user/check`;
        axios.post(url)
        .then((res) =>{
         this.getProducts();
        })
        .catch((err) => {
         windows.location = './login.html';
        }
        )
    },
    getProducts () { //get產品資料
        const url = `${site}/api/${api_path}/admin/products/all`;
        axios.get(url)
        .then((res) =>{
        this.products = res.data.products;
        console.log(this.products);
        })
        .catch((err) =>{  

        })
    }, 
   },

//取出cookie
mounted(){
  const cookieValue = document.cookie
  .split('; ')
  .find((row) => row.startsWith('hexToken='))
  ?.split('=')[1];
  //axios header 把token以token的方式送出
  axios.defaults.headers.common['Authorization'] = cookieValue;
  this.checkLogin();

}


})
;
app.mount('#app');

