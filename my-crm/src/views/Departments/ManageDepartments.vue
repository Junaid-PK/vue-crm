<script setup>
import TableComponent from "../../components/TableComponent.vue";
</script>

<template>
  <h1 class="font-bold text-xl">Manage Departments</h1>

  <TableComponent
    title="All Departments"
    :data="departments"
    :headings="headings"
    api="department"
  ></TableComponent>
</template>

<script>
export default {
  data() {
    return {
      departments: [],
      headings: [],
    };
  },
  async created() {
    const token = localStorage.getItem("token");
    this.$axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response = await this.$axios.get("/departments");
    this.departments = response.data;
    if (response.data.length > 0) {
      this.headings = JSON.parse(JSON.stringify(Object.keys(response.data[0])));
      this.headings = this.headings.filter((key) => key !== "id");
      this.headings.push("Edit", "Delete");
      console.log(this.headings);
    } else {
      console.warn("Response data is empty.");
    }
  },
};
</script>
