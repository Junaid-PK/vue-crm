<template>
    <h1 class="text-center font-bold text-xl">Add New Department</h1>
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" action="#" method="POST" @submit.prevent="add">
        <div>
          <label
            for="email"
            class="block text-sm font-medium leading-6 text-gray-900"
          ></label>
          <div class="mt-2">
            <input
              id="email"
              name="email"
              type="text"
              placeholder="Enter Department Name"
              required
              v-model="data.name"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <button
          type="submit"
          class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add
        </button>
      </form>
    </div>
  </template>
  <script>
  import {toast} from 'vue3-toastify';
  import 'vue3-toastify/dist/index.css';
  export default {
    props: ["id"],
    data() {
      return {
        data: [],
      };
    },
    methods: {
      async add() {
        const token = localStorage.getItem("token");
        this.$axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const response = await this.$axios.post('/department/add', {'name':this.data.name});
        console.log(response);
        toast.success(response.data.message);
        // window.location.reload();
        this.$router.push('/manage-departments');
      },
    },
  };
  </script>
  