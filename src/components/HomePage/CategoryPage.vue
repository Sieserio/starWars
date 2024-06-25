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
  <a :href=" '/'+ wayHref + '/' ">
    <img :src="src" :alt="title" class="category-img">
    <span :class="styles ">{{title.toUpperCase()}}</span>
  </a>

</div>

</template>