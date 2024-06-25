<script>
import { ref, onMounted, watch, computed } from 'vue';
import itemsList from "@/components/PeoplePage/itemsList.vue";
import ErrorMassage from "@/components/ErrorMessage/ErrorMassage.vue";
import PeopleNav from "@/components/PeoplePage/PeopleNav/PeopleNav.vue";
import TagSelector from "@/components/TagSelector.vue";
import { useRoute } from "vue-router";
import { getPeople, getPeopleTegs } from "@/api/people.js";
import { getPeopleId, getPeopleImage } from "@/services/getPeopleData.js";
import router from "@/router/index.js";

export default {
  methods: { getPeopleTegs },
  components: { PeopleNav, ErrorMassage, itemsList, TagSelector },
  setup() {
    const peopleList = ref(null);
    const error = ref(false);
    const prevPage = ref(null);
    const nextPage = ref(null);
    const isLoading = ref(false);
    const route = useRoute();

    const page = computed(() => route.query.page || '1');

    const tags = computed(() => {
      const routeTags = route.query.tag;
      return routeTags ? (Array.isArray(routeTags) ? routeTags : [routeTags]) : [];
    });

    onMounted(() => {
      fetchData(parseInt(page.value), tags.value);
    });

    watch(() => [route.query.page, route.query.tag], (newValues) => {
      const [newPage, newTags] = newValues;
      fetchData(parseInt(newPage), tags.value);
    });

    const changePage = (newPage) => {
      router.push({query: {...route.query, page: newPage.toString()}});
    };

    async function refactorPeopleList(peopleList) {
      if (peopleList) {
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

    async function fetchData(page, tags) {
      isLoading.value = true;
      try {
        const response = await getPeople(page, tags);
        peopleList.value = await refactorPeopleList(response.results);
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

    const availableTags = ['tag1', 'tag2', 'tag3', 'tag4'];

    return {
      peopleList,
      error,
      prevPage,
      nextPage,
      changePage,
      isLoading,
      page,
      availableTags
    };
  }
};
</script>

<template>
  <h1 class="page-title">People</h1>
  <h2 style="color: #6a83b4; font-size: 16px">{{ page }}</h2>
  <h2 style="color: #6a83b4; font-size: 16px" v-if="isLoading">Loading</h2>
  <TagSelector :availableTags="availableTags"/>
  <div>
    <button @click="changePage(parseInt(page) - 1)" v-if="prevPage">Prev</button>
    <button @click="changePage(parseInt(page) + 1)" v-if="nextPage">Next</button>
  </div>
  <ErrorMassage v-if="error === true"/>
  <itemsList v-if="!error && !isLoading" :peopleList="peopleList"/>
  <RouterView/>
</template>

<style>

</style>
