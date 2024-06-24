<script>
import {getPerson} from "@/api/people.js";
import {computed, onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import {getPeopleId, getPeopleImage} from "@/services/getPeopleData.js";
import '@/style/index.css'
import '@/containers/PersonPage/PersonPage.css'


export default {
  setup() {
    const personData = ref('');
    const route = useRoute();
    const img = ref(null)

    const getImg = (id) => {
      return getPeopleImage(id)
    }

    const personId = computed(() => {
      const id = route.fullPath.replace('/people/', '')
      return id;
    });


  onMounted( ()=> {
    fetchPerson(parseInt(personId.value))
  });

    async function fetchPerson(id) {
      const response = await getPerson(id)
      personData.value = await response
      img.value = getImg(id)
      console.log(personData.value)
    }

    return {
      personData,
      img,
    };
  }
};
</script>

<template>
  <div class="person-wrapper">
     <img :src="img" alt="person photo" class="personIMg">

    <div class="person-info-wrapper">
      <h2 class="person-title-name"> {{personData.name}}</h2>
      <p class="person-main-info">Birth Year: {{personData.birth_year}}</p>
      <p class="person-main-info">Height : {{personData.height}}</p>
      <p class="person-main-info">Mass : {{personData.mass}}</p>
      <p class="person-main-info">Gender : {{personData.gender}}</p>
      <p class="person-main-info">Hair Color: {{personData.hair_color}}</p>
      <p class="person-main-info">Skin Color: {{personData.skin_color}}</p>
<!--      <h2>Homeworld: {{personData.homeworld }}</h2>-->
      <p></p>
    </div>
  </div>
</template>