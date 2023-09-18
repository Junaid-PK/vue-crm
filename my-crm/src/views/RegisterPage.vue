<template>
    <div
      class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8"
    >
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          class="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2
          class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
        >
          Registeration Page
        </h2>
      </div>
  
      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form class="space-y-6" action="#" method="POST" @submit.prevent="registerUser">
            <div>
            <label
              for="email"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Name</label
            >
            <div class="mt-2">
              <input
                id="name"
                name="name"
                type="text"
                required
                v-model="formData.name"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <div class="error" v-if="errors.name">{{ errors.name }}</div>
          </div>
          <div>
            <label
              for="email"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Email address</label
            >
            <div class="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autocomplete="email"
                required
                v-model="formData.email"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <div class="text-red-700" v-if="errors.email">{{ errors.email }}</div>
          </div>
  
          <div>
            <div class="flex items-center justify-between">
              <label
                for="password"
                class="block text-sm font-medium leading-6 text-gray-900"
                >Password</label
              >
            </div>
            <div class="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autocomplete="current-password"
                required
                v-model="formData.password"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <div class="text-red-700" v-if="errors.password">{{ errors.password }}</div> 
          </div>


          <div>
            <div class="flex items-center justify-between">
              <label
                for="password"
                class="block text-sm font-medium leading-6 text-gray-900"
                >Confirm Password</label
              >
            </div>
            <div class="mt-2">
              <input
                id="cpassword"
                name="password"
                type="password"
                autocomplete="current-password"
                required
                v-model="formData.confirm_password"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>            
            <div class="text-red-700" v-if="errors.confirm_password">{{ errors.confirm_password }}</div>
          </div>
  
          <div>
            <button
              type="submit"
              class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Register Now
            </button>
          </div>
        </form>
  
        <p class="mt-10 text-center text-sm text-gray-500">
          Already a member?
          {{ " " }}
          <RouterLink class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500" to="/login">Login</RouterLink>
        </p>
      </div>
    </div>
  </template>
  

<script>
import {toast} from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
export default{
  data() {
    return {
      formData: {
        name: "",
        email: "",
        password: "",
        confirm_password: "",
      },
      errors: {
        name: "",
        email: "",
        password: "",
        confirm_password: "",
      }
    }
  },

  methods: {
    async registerUser(){
      try {
        const response = await this.$axios.post("/register", this.formData);
        console.log(response.data.message);
        toast.success(response.data.message);
        this.$router.push('/login');
      } catch (error) {
        if (error.response && error.response.data && error.response.data.errors) {
          const apiErrors = error.response.data.errors;
          for (const key in apiErrors) {
            if (Object.hasOwnProperty.call(apiErrors, key)) {
              this.errors[key] = apiErrors[key][0];
            }
          }
        } else {
          toast.error('Something went Wrong'); 
          console.error("Registration failed:", error);
        }
      }
    }
  }
}
</script>