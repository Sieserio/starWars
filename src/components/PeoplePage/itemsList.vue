<script >
import '@//components/PeoplePage/ItemsList.css'
  export default {
    props: {
      peopleList: {
        type: Object
      },
    },
    methods: {

    }
  }
</script>



<template>
  <ul class="list-container">
    <li v-for="(elem,index) in peopleList" :key="index"  class="list-item" >
      <a href="#" class="link-item">
        <img :src="elem.img" alt="elem.name" class="person-img"/>
        <p class="person-name">{{elem.name}}</p>
      </a>
     </li>

  </ul>

</template>



<style>

</style>