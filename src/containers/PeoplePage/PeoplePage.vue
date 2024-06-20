<script>
import itemsList from "@/components/PeoplePage/itemsList.vue";
import ErrorMassage from "@/components/ErrorMessage/ErrorMassage.vue";
import {getApiResource} from "@/utils/network.js";
import {getPeopleId, getPeopleImage} from "@/services/getPeopleData.js";
import {API_PEOPLE} from '@/constans/api.js'
import {useQueryParams} from "@/hook/useQueryParams.js";
import {useRoute} from "vue-router";
import router from "@/router/index.js";

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
    }

    const query = useQueryParams()
    if (query.fullPath.includes('/people/?page=')) {
      const queryPage = query.fullPath.replace('/people/?page=', '')
      console.log(queryPage)
      console.log(query.fullPath)
      getResource(API_PEOPLE+queryPage)

    } else {
      //this.$router.push({ path: '/people/?page=1' })
      const queryPage = 1
      console.log(1)
      getResource(API_PEOPLE+queryPage)
    }


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