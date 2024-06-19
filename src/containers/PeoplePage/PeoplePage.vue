<script>
import itemsList from "@/components/PeoplePage/itemsList.vue";
import ErrorMassage from "@/components/ErrorMessage/ErrorMassage.vue";
import {getApiResource} from "@/utils/network.js";
import {getPeopleId, getPeopleImage} from "@/services/getPeopleData.js";
import {API_PEOPLE} from '@/constans/api.js'



export default {
  components: {ErrorMassage, itemsList},
  data() {
    return{
      API_PEOPLE: API_PEOPLE,
      peopleList: null,
      error: false,
    }
  },
  created() {
    const  getResource = async (url) => {
      const api_data = await getApiResource(url)
      if (api_data) {
        this.peopleList = api_data.results.map(({name, url}) => {
          const id = getPeopleId(url)
          const img = getPeopleImage(id)
          //console.log(img)
          return {
            id,
            name,
            img
          }
        })
        this.error = false
      } else {
        this.error = true
      }


      console.log(this.peopleList)
    }
    getResource(API_PEOPLE)
    },

  }
</script>


<template>
  <h1 class="page-title">People</h1>
  <ErrorMassage v-if="error===true"/>
  <itemsList v-else-if="error===false" :peopleList="this.peopleList"/>
<RouterView/>
</template>


<style>

</style>