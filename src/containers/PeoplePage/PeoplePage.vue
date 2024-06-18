<script>
import {API_PEOPLE} from '../../constans/api.js'
import {getPeopleId, getPeopleImage} from "@/services/getPeopleData.js";
import {getApiResource} from "@/utils/network.js";


export default {
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
  <ul>
    <li v-for="(elem,index) in this.people" :key='index' >{{elem.name}}

    </li>
  </ul>
</template>


<style>

</style>