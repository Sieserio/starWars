<script>
import '@/components/HomePage/CategoryPage.css'
export default {
  props : {
    src: {
      type: String
    },
    title: {
      type: String
    },
    styles:{
      type: String
    },
    wayHref: {
      type: String
    }
  }
}


</script>



<template>

<div class="category-wrapper">
  <router-link :to=" '/'+ wayHref + '/' ">
    <img :src="src" :alt="title" class="category-img">
    <span :class="styles ">{{title.toUpperCase()}}</span>
  </router-link>

</div>

</template>