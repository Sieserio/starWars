<script>
import "@/style/index.css"
import '@/containers/HomePage/HomePage.css'
import CategoryPage from "@/components/HomePage/CategoryPage.vue";
export default {
  components: {CategoryPage}

}
</script>

<template>
  <h1 class="page-title homeTitle">Home</h1>
  <div class="category-container">
    <CategoryPage
        src="https://starwars-visualguide.com/assets/img/categories/character.jpg"
        title="Characters"
        wayHref="people"
        styles="category-text color-red"
        class="child-container"/>
    <CategoryPage
        src="https://starwars-visualguide.com/assets/img/categories/planets.jpg"
        title="Planets"
        wayHref="planets"
        styles="category-text color-yellow"
        class="child-container"/>
  </div>


</template>