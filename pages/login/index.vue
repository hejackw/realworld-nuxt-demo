<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{ isLogin ? "Sign in" : "Sign up" }}</h1>
          <p class="text-xs-center">
            <!-- <a href="">Have an account?</a> -->
            <nuxt-link v-if="isLogin" to="/register"
              >Need an account?</nuxt-link
            >
            <nuxt-link v-else to="/login">Have an account?</nuxt-link>
          </p>

          <ul class="error-messages">
            <template v-for="(messages, field) in errors">
              <li v-for="(message, index) in messages" :key="index">
                {{ field }} {{ message }}
              </li>
            </template>
          </ul>

          <form @submit.prevent="handleSubmit">
            <fieldset class="form-group" v-if="!isLogin">
              <input
                class="form-control form-control-lg"
                type="text"
                required
                v-model="user.username"
                placeholder="Your Name"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="email"
                required
                v-model="user.email"
                placeholder="Email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                required
                v-model="user.password"
                placeholder="Password"
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              {{ isLogin ? "Sign in" : "Sign up" }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login, register } from "@/api/user";

// 仅在客户端加载 js-cookie 包
const Cookie = process.client ? require('js-cookie') : undefined
export default {
  name: "loginPage",
  middleware: "notAuthenticated",
  computed: {
    isLogin() {
      return this.$route.path === "/login";
    },
  },
  data() {
    return {
      // isLogin: true,
      user: {
        username: "jonzona",
        email: "jon@163.com",
        password: "266120plm",
      },
      errors: {},
    };
  },
  methods: {
    async handleSubmit() {
      try {
        const { data } = this.isLogin
          ? await login({
              user: this.user,
            })
          : await register({
              user: this.user,
            });
        this.$store.commit("setUser", data.user);
         Cookie.set("user", data.user);
        this.$router.push("/");
      } catch (error) {
        this.errors = error.response?.data.errors;
      }
    },
  },
  // // watch为什么不行，奇怪
  // watch: {
  //   $route: {
  //     immediate: true, // 一旦监听到路由的变化立即执行
  //     handler(to, from) {
  //       if (to.path === "/login") {
  //         this.isLogin = true
  //         console.log("login====>>>")
  //       } else if (to.path === "/register") {
  //         this.isLogin = false
  //           console.log("register====>>>")
  //       }
  //     },
  //   },
  // },
};
</script>

<style>
</style>
