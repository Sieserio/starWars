<script>
import {computed, onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import {getPlanetInfo} from "@/api/planet.js";
import {getPlanetsImage} from "@/services/getPeopleData.js";

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
      // console.log(planetInfo.value)
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
  <div>
    <img :src="img" alt="planet photo">

    <div>

      <h2> {{planetInfo.name}}  </h2>

    </div>

  </div>
</template>