<script>
import {computed, onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import {getPlanetInfo} from "@/api/planet.js";
import {getPlanetsImage} from "@/services/getPeopleData.js";
import '@/containers/PlanetPage/PlanetPage.css'
export default {
  setup() {

    const planetInfo = ref('')
    const img = ref('')
    const route = useRoute()

    const IdPlanet = computed( () => {
      const id =  route.fullPath.replace('/planets/', '')
      return id;
    } )

    const imgId = (id) => {
      return getPlanetsImage(id)
    }

    onMounted( ()=> {
      fetchPlanetInfo(parseInt(IdPlanet.value))
    } )

    async function fetchPlanetInfo(id) {
      const response = await getPlanetInfo(id)
      planetInfo.value = await response
      console.log(planetInfo.value)
      img.value = imgId(id)
      // console.log(img.value)
    }

    return {
      planetInfo,
      img
    };
  }
};
</script>

<template>
  <div class="planet-wrapper">
    <img :src="img" alt="planet photo" onerror="src='https://starwars-visualguide.com/assets/img/big-placeholder.jpg'" class="planet-img">

    <div class="planet-info-wrapper">

      <h2 class="planet-title-name"> {{planetInfo.name}}  </h2>
      <p class="planet-main-text"> Population: {{planetInfo.population }} </p>
      <p class="planet-main-text"> Rotation Period: {{planetInfo.rotation_period}} days </p>
      <p class="planet-main-text"> Orbital Period: {{planetInfo.orbital_period}} days </p>
      <p class="planet-main-text"> Diameter: {{planetInfo.diameter}} km </p>
      <p class="planet-main-text"> Gravity: {{planetInfo.gravity}} Standart </p>
      <p class="planet-main-text"> Terrain: {{planetInfo.terrain}} </p>
      <p class="planet-main-text"> Surface Water: {{planetInfo.surface_water}} % </p>
      <p class="planet-main-text"> Climate: {{planetInfo.climate}} </p>

    </div>

  </div>
</template>