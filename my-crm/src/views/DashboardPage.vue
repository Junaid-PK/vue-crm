<script setup>
    import SideBar from "../components/SideBarComponent.vue";
</script>
<template>
<!-- Header -->
<header class="border-b md:flex md:items-center md:justify-between p-4 pb-0 shadow-lg md:pb-4">
  <div class="flex items-center justify-between mb-4 md:mb-0">
    <h1 class="leading-none text-2xl text-grey-darkest">
      <a class="no-underline text-grey-darkest hover:text-black" href="#">
        CRM
      </a>
    </h1>
  </div>
  <button class="rounded-md bg-sky-900 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-500/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" @click="logout">Logout</button>
</header>
<!-- Sidebar -->
<section id="sidebar">
    <div class="relative min-h-screen md:flex" data-dev-hint="container">
    <input type="checkbox" id="menu-open" class="hidden" />

    <label for="menu-open" class="absolute right-2 bottom-2 shadow-lg rounded-full p-2 bg-gray-100 text-gray-600 md:hidden" data-dev-hint="floating action button">
        <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
    </label>

    <SideBar></SideBar>

    <main id="content" class="flex-1 p-6 lg:px-8">
        <div class="max-w-7xl mx-auto">
            <!-- Replace with your content -->
            <router-view></router-view>
            <!-- /End replace -->
        </div>
    </main>
</div>
</section>
</template>

<script>
import { RouterView } from 'vue-router';

export default {
    methods: {
        logout() {
            localStorage.clear();
            this.$router.push('/login');
        }
    },
    components: { RouterView }
}
</script>
