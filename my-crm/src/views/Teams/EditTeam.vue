<template>
    <h1 class="text-center font-bold text-xl">Edit Department</h1>
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" action="#" method="POST" @submit.prevent="edit">
        <div>
          <label
            for="email"
            class="block text-sm font-medium leading-6 text-gray-900"
          >Team Name</label>
          <div class="mt-2">
            <input
              id="email"
              name="email"
              type="text"
              required
              v-model="this.formData.name"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label
            for="dept"
            class="block text-sm font-medium leading-6 text-gray-900"
          > Select Department </label>
          <div class="mt-2">
            <select class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" id="" v-model="this.formData.department">
              <option v-for="item in departments" :value="item" :key="item.id">
                {{ item.name }}
              </option>
            </select>
          </div>
        </div>
        <div>
          <label
            for="dept"
            class="block text-sm font-medium leading-6 text-gray-900"
          > Select Team Lead </label>
          <div class="mt-2">
            <select class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" id="" v-model="this.formData.user">
              <option v-for="item in users" :value="item" :key="item.id">
                {{ item.name }}
              </option>
            </select>
          </div>
        </div>
        <button
          type="submit"
          class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Update
        </button>
      </form>
    </div>
  </template>

<script>
import {toast} from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
  data(){
    return{
      team_id : this.$route.params.id,
      formData:{
        name: '',
        department: [],
        user: [],
      },
      departments: [],
      users: [],
    }
  },
  async created(){
    const token = localStorage.getItem("token");
    this.$axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response = await this.$axios.get("/departments");
    const response2 = await this.$axios.get("/users");
    this.departments = response.data;
    this.users = response2.data;
    const response3 = await this.$axios.get("/team/show", {
      params: {
        team_id: this.$route.params.id,
      },
    });
    this.formData.name = response3.data.data.name;
  },
  methods:{
    async edit(){
      const token = localStorage.getItem("token");
      this.$axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      console.log(this.formData);
      const data = {
        'name': this.formData.name,
        'department_id': this.formData.department.id,
        'teamlead_id': this.formData.user.id
      };
      const response = await this.$axios.put(`/team/update/${this.$route.params.id}`, data);
      toast.success(response.data.message);
      this.$router.push('/manage-teams');
    }
  }
}

</script>