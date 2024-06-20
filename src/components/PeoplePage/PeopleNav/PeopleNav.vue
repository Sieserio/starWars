<script >

export default {
  props : {
    // getResource:{
    //   type: Function
    // },
    prevPage:{
      type: String
    },
    nextPage:{
      type: String
    },
    counterPage:{
      type: Number
    },
  },

}
</script>

<template>
  <ul class="nav-list">
    <li class="nav-link">
      <RouterLink :to="'/people/?page=' + (counterPage + 1)" class="nav-a">след</RouterLink>
    </li>
  </ul>
  <RouterView/>
</template>