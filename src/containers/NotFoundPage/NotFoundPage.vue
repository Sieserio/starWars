<script >
import '@/containers/NotFoundPage/NotFoundPage.css'
import { useRoute } from 'vue-router'

export default {
  methods: {
    getPath() {
      const route = useRoute();
      const address = route.query['page'].replace(/^\//, '');;
      return address;
    }
  }
}

</script>

<template>
  <img  class="not-found-img" src='@/containers/NotFoundPage/img/not-found.png' alt="error 404"  >
  <p class="not-found-text" >No match for /{{getPath()}}</p>
</template>