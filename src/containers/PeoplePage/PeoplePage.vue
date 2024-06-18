<script>
import {API_PEOPLE} from '../../constans/api.js'
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
      console.log(api_data)

      this.peopleList = api_data.results.map(({name, url}) => {
        return {
          name,
          url
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
    <li v-for="(elem,index) in this.people" :key='index' >{{elem.name}} </li>
  </ul>
</template>


<style>

</style>