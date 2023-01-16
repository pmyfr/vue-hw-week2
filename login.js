// 拆解流程進行開發步驟：
// 1.切版
// 2.登入功能
    // - 取得 html username, password
    // - 發出請求
    // - 驗證登入
// 3.進入產品頁面
    //- 驗證登入
// 4.列出品項內容
// 5.細節呈現


import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
// 建立基本路由
const site = 'https://vue3-course-api.hexschool.io/v2'; 

const app = createApp({
  data(){
    return {
      user:{
        username:'',
        password:'',
      } 
    }
  },
  //建立方法
  methods: {
   login(){
    const url =`${site}/admin/signin`; //登入驗證網址
    axios.post(url, this.user)
    .then((res) =>{
    const { expired, token } = res.data; //解構寫法 
    //存入cookie
    document.cookie = `hexToken=${token}; expired=${new Date(expired)};`;
    //轉址到第2週主線產品頁面
    window.location = './product.html';
    })
    .catch((err) =>{
     alert(err.response.data.message);
    });
   },
  },
  
});
app.mount('#app');
