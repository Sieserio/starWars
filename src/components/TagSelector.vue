<template>
  <div>
    <select v-model="selectedTag">
      <option v-for="tag in availableTags" :key="tag" :value="tag">{{ tag }}</option>
    </select>
    <button @click="addTag">Add Tag</button>
    <button @click="console.log(activeTags)">Console tags</button>
    <button @click="console.log(route.query.tag)">Console route</button>
    <div v-for="(tag, index) in activeTags" :key="tag" class="tag">
      {{ tag }}
      <button @click="removeTag(index)">X</button>
    </div>
  </div>
</template>

<script>
import {onMounted, ref, watch} from 'vue';
import {useRoute, useRouter} from 'vue-router';

export default {
  props: {
    availableTags: {
      type: Array,
      required: true,
    },
  },

  setup(props) {
    const selectedTag = ref(props.availableTags[0]);
    const route = useRoute();
    const router = useRouter();
    const activeTags = ref([])
    console.log(activeTags.value)

    const addTag = () => {
      activeTags.value.push(selectedTag.value);
      router.push({query: {...route.query, tag: activeTags.value}});
    };

    const removeTag = (value) => {
      activeTags.value.splice(value, 1);
      router.push({query: {...route.query, tag: activeTags.value}})
      // route.query.tag = activeTags.value
      console.log(activeTags.value)
    };

    onMounted(() => {
      if (route.query.tag) {
        const tegss = route.query.tag
        for (let i = 0; i < tegss.length; i++) {
          activeTags.value.push(tegss[i]);
        }
        console.log(activeTags.value)
      }
    });

    return {
      selectedTag,
      addTag,
      removeTag,
      activeTags,
      route
    };
  },
};
</script>

<style>
.tag {
  display: inline-block;
  padding: 5px;
  margin: 5px;
  background-color: #d1d1d1;
  border-radius: 5px;
}
</style>
