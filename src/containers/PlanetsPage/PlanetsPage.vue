<script>
import {onMounted, ref, computed, watch} from "vue";
import router from "@/router/index.js";
import {useRoute} from "vue-router";
import {getPlanets} from "@/api/planet.js";
import {getPlanetsId, getPlanetsImage} from "@/services/getPeopleData.js";
import PlanetsList from "@/components/PlanetsPage/PlanetsList.vue";
import '@/style/index.css'
import '@/containers/PeoplePage/PeoplePage.css'

export default {
  components: {PlanetsList},
  setup() {
    const planetsList = ref(null);
    const error = ref(false);
    const prevPage = ref(null);
    const nextPage = ref(null);
    const route = useRoute();

    const page = computed( ()=> {
      return route.query.page || '1';
    } )

    watch(() => route.query.page, (newValue, oldValue) => {
      if (typeof newValue === 'string') {
        fetchData(parseInt(newValue));
      }
    });

    const changePage = (newPage) => {
      console.log(route.query)
      router.push({ query: { ...route.query, page: newPage.toString() } });
    };

    onMounted( ()=> {
      fetchData(+page.value)
    } )

    async function fetchData(page) {
      try {
        const response = await getPlanets(page);
        console.log(response)
        planetsList.value = await refactorPlanetsList(response.results)
        console.log(planetsList.value)
        nextPage.value = response.next
        prevPage.value = response.previous
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
      error,
      changePage,
      prevPage,
      nextPage,
      page
    }

  }
}
</script>



<template>
  <h1 class="page-title">Planets</h1>

  <div class="navigation-page-wrapper">
    <button @click="changePage(parseInt(page) - 1)" v-if="prevPage" class="navigation-btn nav-text">Prev</button>
    <h2 class="navigation-page nav-text">{{page}}</h2>
    <button @click="changePage(parseInt(page) + 1)" v-if="nextPage "class="navigation-btn nav-text">Next</button>
  </div>


  <PlanetsList v-if='!error' :planetsList="planetsList "/>
</template>