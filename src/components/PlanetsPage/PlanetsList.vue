<script>
import '@/components/PlanetsPage/PlanetsList.css'
export default {
  props : {
    planetsList: {
      type: Object
    }
  },
}
</script>



<template>
  <ul class="list-container">
    <li v-for="(elem,index) in planetsList" :key="index" class="list-planets-item">
    <router-link :to=" '/planets/' + elem.id " class="link-planets-item">
      <img :src=" elem.img" :alt="elem.name" class="planets-img" onerror="src='https://starwars-visualguide.com/assets/img/placeholder.jpg'">
      <p class="planets-name">{{elem.name}}</p>
    </router-link>
    </li>
  </ul>
</template>