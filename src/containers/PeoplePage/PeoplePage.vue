<script>
import {API_PEOPLE} from '../../constans/api.js'
import {getPeopleId, getPeopleImage} from "@/services/getPeopleData.js";
import {getApiResource} from "@/utils/network.js";
import itemsList from "@/components/PeoplePage/itemsList.vue";

export default {
  components: {itemsList},
  data() {
    return{
      API_PEOPLE: API_PEOPLE,
      peopleList: null,
      people: null,
    }
  },
  beforeMount() {
    const  getResource = async (url) => {
      const api_data = await getApiResource(url)

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
      this.people = this.peopleList
      console.log(this.people)
    }
    getResource(API_PEOPLE)
    },

  }
</script>


<template>

  <itemsList :peopleList="this.people"/>

</template>


<style>

</style>