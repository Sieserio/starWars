<script >
import  '@/components/Navigation/Navigation.vue'
import Navigation from "@/components/Navigation/Navigation.vue";
import '@/style/App.css'
export default {

  components : {Navigation},

}

</script>



<template>
<div class="app-wrapper">
  <Navigation/>
  <router-view></router-view>
</div>


</template>



<style scoped>


</style>
