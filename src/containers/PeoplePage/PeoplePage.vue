<script>
import {ref, onMounted, watch, computed} from 'vue';
import itemsList from "@/components/PeoplePage/itemsList.vue";
import ErrorMassage from "@/components/ErrorMessage/ErrorMassage.vue";
import PeopleNav from "@/components/PeoplePage/PeopleNav/PeopleNav.vue";
import {useRoute} from "vue-router";
import router from "@/router/index.js";
import {useStore} from "vuex";

export default {
  components: {PeopleNav, ErrorMassage, itemsList},
  setup() {

    const route = useRoute();
    const store = useStore();
    const peopleList = computed(() => store.state.people.peopleList);
    const isLoading = computed(() => store.state.people.isLoading);
    const error = computed(() => store.state.people.error);
    const prevPage = computed(() => store.state.people.prevPage);
    const nextPage = computed(() => store.state.people.nextPage);

    // computed - аналог memo в реакте
    const page = computed(() => {
      return route.query.page || '1';
    });

    onMounted(() => {
      store.dispatch('fetchPeople', parseInt(page.value));
    });

    watch(() => route.query.page, (newValue) => {
      if (typeof newValue === 'string') {
        store.dispatch('fetchPeople', parseInt(newValue));
      }
    });

    const changePage = (newPage) => {
      router.push({ query: { ...route.query, page: newPage.toString() } });
    };


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
  <h2 style="color: #6a83b4; font-size: 16px">{{page}}</h2>
  <div>
    <button @click="changePage(parseInt(page) - 1)" :disabled="isLoading" v-if="prevPage">Prev</button>
    <button @click="changePage(parseInt(page) + 1)" :disabled="isLoading" v-if="nextPage">Next</button>
  </div>
  <h2 style="color: #6a83b4; font-size: 16px" v-if="isLoading && !peopleList">СУКА ЗАГРУЗКА!!!!!!!</h2>
  <ErrorMassage v-if="error"/>
  <itemsList v-if="!error && peopleList" :peopleList="peopleList"/>
  <RouterView/>
</template>

<style>

</style>

<!--По поводу PeopleNav. Зачастую, не делают отдельные пагинаторы, как в твоем случае PeopleNav. Делают один и потом кидаются пропсами-->