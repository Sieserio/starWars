<script>
import itemsList from "@/components/PeoplePage/itemsList.vue";
import ErrorMassage from "@/components/ErrorMessage/ErrorMassage.vue";
import PeopleNav from "@/components/PeoplePage/PeopleNav/PeopleNav.vue";
import {getApiResource} from "@/utils/network.js";
import {getPeopleId, getPeopleImage, getPeoplePageId} from "@/services/getPeopleData.js";
import {API_PEOPLE} from '@/constans/api.js'
import {useQueryParams} from "@/hook/useQueryParams.js";


export default {
  components: {PeopleNav, ErrorMassage, itemsList},
  data() {
    return{
      API_PEOPLE: API_PEOPLE,
      peopleList: null,
      error: false,
      prevPage: null,
      nextPage: null,
      counterPage: 1,
    }
  },
  created() {
    const  getResource = async (url) => {
       const api_data = await getApiResource(url)
        if (api_data) {
          this.peopleList = api_data.results.map(({name, url}) => {
            const id = getPeopleId(url)
            const img = getPeopleImage(id)
            return {
              id,
              name,
              img
            }
          })
        //console.log(api_data)
        this.prevPage = api_data.previous
        //console.log(this.prevPage)
        this.nextPage = api_data.next
        //console.log(this.nextPage)
        this.counterPage = getPeoplePageId(url)
        this.error = false
      } else {
        this.error = true
      }
    }

    const query = useQueryParams()
    if (query.fullPath.includes('/people/?page=')) {
      const queryPage = query.fullPath.replace('/people/?page=', '')
      getResource(API_PEOPLE+queryPage)
    } else {
      const queryPage = 1
      getResource(API_PEOPLE+queryPage)
    }


    },

  }
</script>


<template>
  <h1 class="page-title">People</h1>
  <PeopleNav  :prevPage="prevPage" :nextPage="nextPage" :counterPage="counterPage" :getRes="0" />
  <ErrorMassage v-if="error===true"/>
  <itemsList v-else-if="error===false" :peopleList="this.peopleList"/>
<RouterView/>
</template>


<style>

</style>