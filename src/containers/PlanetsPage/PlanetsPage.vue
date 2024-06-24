<script>
import {onMounted, ref, computed} from "vue";
import router from "@/router/index.js";
import {useRoute} from "vue-router";
import {getPlanets} from "@/api/planet.js";
import {getPlanetsId, getPlanetsImage} from "@/services/getPeopleData.js";
import PlanetsList from "@/components/PlanetsPage/PlanetsList.vue";
import '@/style/index.css'

export default {
  components: {PlanetsList},
  setup() {
    const planetsList = ref(null);
    const error = ref(false);
    const route = useRoute();

    const page = computed( ()=> {
      return route.query.page || '1';
    } )

    onMounted( ()=> {
      fetchData(+page.value)
    } )

    async function fetchData(page) {
      try {
        const response = await getPlanets(page);
        console.log(response)
        planetsList.value = await refactorPlanetsList(response.results)
        console.log(planetsList.value)
        error.value = false
      } catch (e) {
        error.value = true;
        console.error('Ошибка загрузки данных планет:', e);
      }
    }

    async function refactorPlanetsList(list) {
      if (list) {
        return list.map( (elem) => {
          const id = getPlanetsId(elem.url)
          return {
            id : id,
            name : elem.name,
            img: getPlanetsImage(id)
          }
        } )
      }
    }

    return {
      planetsList,
      error
    }

  }
}
</script>



<template>
  <h1 class="page-title">Planets</h1>
  <PlanetsList v-if='!error' :planetsList="planetsList "/>
</template>