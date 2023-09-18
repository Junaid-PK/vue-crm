<script setup>
import TableComponent from '../components/TableComponent.vue';
</script>
<template>
    <h1 class="font-bold text-xl">
        Manage Users
    </h1>
    <TableComponent title="All Users" :data="users" :headings="['Name','Email', 'Modify Permissions']"></TableComponent>
</template>

<script>
    export default {
        data(){
            return{
                users : [],
            }
        },
        async created(){
            // fetch data from api
            const token = localStorage.getItem('token');
            this.$axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await this.$axios.get('/users');
            console.log(response.data);
            this.users = response.data;
        },
        
    }
</script>