<template>
  <div class="w-full mb-12 xl:mb-0 px-4 mx-auto mt-24">
    <div
      class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded"
    >
      <div class="rounded-t mb-0 px-4 py-3 border-0">
        <div class="flex flex-wrap items-center">
          <div class="relative w-full px-4 max-w-full flex-grow flex-1">
            <h3 class="font-semibold text-base text-blueGray-700">
              {{ title }}
            </h3>
          </div>
          <div
            class="relative w-full px-4 max-w-full flex-grow flex-1 text-right"
          >
            <button
              class="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              @click="add"
            >
              Add New
            </button>
          </div>
        </div>
      </div>

      <div class="block w-full overflow-x-auto">
        <table class="items-center bg-transparent w-full border-collapse">
          <thead>
            <tr>
              <th
                v-for="heading in headings"
                class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              >
                {{ heading }}
              </th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="item in data">
              <template
                v-for="(value, key) in item"
                :key="key"
                >
              <td
                v-if="key != 'id'"
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
              >
              <span v-if="value">{{ value }}</span>
              <span v-if="!value">N/A</span>
              </td>
              </template>
              <td
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
              >
              <button type="button" class="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" @click="edit(item.id)">Edit</button>
              </td>
              <td
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
              >
              <button type="button" class="rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" @click="deleteItem(item.id)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import {toast} from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
export default {
  props: {
    title: String,
    data: Array,
    headings: Array,
    api: String
  },
  methods:{
    async deleteItem(id)
    {
      const token = localStorage.getItem("token");
      this.$axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await this.$axios.delete(`${this.api}/delete/${id}`);
      toast.success(response.data.message);
      this.$router.push(`/manage-${this.api}s`);
    },
    edit(id){
      console.log(id);
      if(this.api === 'department' ){
        this.$router.push({ name: `EditDepartments`, params: { id } });
      }else if (this.api === 'team'){
        this.$router.push({ name: `EditTeams`, params: { id } });
      }
    },
    add()
    {
      this.$router.push(`/add-${this.api}`);
    }
  }
};


</script>
