<script >
import { createRouter } from 'vue-router'
import PeoplePage from './containers/PeoplePage/PeoplePage.vue'
import {getApiResource} from "@/utils/network.js";
import  '@/components/Navigation/Navigation.vue'
import Navigation from "@/components/Navigation/Navigation.vue";

export default {

  components : {Navigation, PeoplePage},

}

</script>



<template>
  <Navigation/>
<router-view></router-view>
<!--<PeoplePage/>-->

</template>



<style scoped>


</style>
