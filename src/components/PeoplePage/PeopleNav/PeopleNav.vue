<script >
import router from "@/router/index.js";
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
  computed : {
    pathNew () {
      return  '/people/?page=' + (this.counterPage + 1)
    }
  },
  methods : {
    goPath() {
      console.log(1) // не работает переход с помощью кнопки, изменяется url но автоматически не переходит
    }
  }

}
</script>

<template>
  <ul class="nav-list">
    <li class="nav-link">
      <RouterLink :to="pathNew" @click="goPath()" class="nav-a">след</RouterLink>
    </li>
  </ul>
  <RouterView/>
</template>