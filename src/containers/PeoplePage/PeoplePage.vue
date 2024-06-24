<script>
import {ref, onMounted, watch, computed} from 'vue';
import itemsList from "@/components/PeoplePage/itemsList.vue";
import ErrorMassage from "@/components/ErrorMessage/ErrorMassage.vue";
import PeopleNav from "@/components/PeoplePage/PeopleNav/PeopleNav.vue";
import {useRoute} from "vue-router";
import {getPeople} from "@/api/people.js";
import {getPeopleId, getPeopleImage} from "@/services/getPeopleData.js";
import router from "@/router/index.js";
import '@/containers/PeoplePage/PeoplePage.css'

export default {
  components: {PeopleNav, ErrorMassage, itemsList},
  setup() {
    // ref - аналог useState в реакте
    // reactive - аналог useReducer в реакте
    // По-хорошему делать не кучу ref, а один reactive объект
    const peopleList = ref(null);
    const error = ref(false);
    const prevPage = ref(null);
    const nextPage = ref(null);
    const isLoading = ref(false);
    const route = useRoute();

    // computed - аналог memo в реакте
    const page = computed(() => {
      return route.query.page || '1';
    });

    onMounted(() => {
      fetchData(parseInt(page.value));
    });

    // Отслеживание изменений параметров URL
    watch(() => route.query.page, (newValue, oldValue) => {
      if (typeof newValue === 'string') {
        fetchData(parseInt(newValue));
      }
    });

    const changePage = (newPage) => {
      console.log(route.query)
      router.push({ query: { ...route.query, page: newPage.toString() } });
    };

    async function refactorPeopleList(peopleList) {
      if (peopleList) {
        console.log(peopleList)
        return peopleList.map((item) => {
          const id = getPeopleId(item.url);
          return {
            id: id,
            name: item.name,
            img: getPeopleImage(id)
          };
        });
      }
    }

    async function fetchData(page)  {
      isLoading.value = true;
      try {
        const response = await getPeople(page);
        console.log(response);
        peopleList.value = await refactorPeopleList(response.results);
        console.log(peopleList.value);
        prevPage.value = response.previous;
        nextPage.value = response.next;
        error.value = false;
      } catch (e) {
        error.value = true;
        console.error('Ошибка загрузки данных:', e);
      } finally {
        isLoading.value = false;
      }
    }

    return {
      peopleList,
      error,
      prevPage,
      nextPage,
      changePage,
      isLoading,
      page
    };
  }
};
</script>

<template>
  <h1 class="page-title">People</h1>


    <div class="navigation-page-wrapper">
      <button @click="changePage(parseInt(page) - 1)" v-if="prevPage" class="navigation-btn nav-text">Prev</button>
      <h2 class="navigation-page nav-text">{{page}}</h2>
      <button @click="changePage(parseInt(page) + 1)" v-if="nextPage "class="navigation-btn nav-text">Next</button>
    </div>


  <h2 style="color: #6a83b4; font-size: 16px" v-if="isLoading">Loading</h2>
  <ErrorMassage v-if="error === true"/>
  <itemsList v-if="!error && !isLoading" :peopleList="peopleList"/>
  <RouterView/>
</template>

<style>

</style>

<!--По поводу PeopleNav. Зачастую, не делают отдельные пагинаторы, как в твоем случае PeopleNav. Делают один и потом кидаются пропсами-->