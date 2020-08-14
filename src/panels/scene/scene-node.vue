<template>
  <div>
    {{ element.url }}
    <sceneNode
      v-for="(element, index) in element.children"
      :element="element"
      :key="index"
    ></sceneNode>
  </div>
</template>

<script>
export default {
  props: {
    element: {
      type: Object,
      default: () => {
        return {};
      }
    }
  }
  //   components: {
  //     sceneNode
  //   }
};
</script>

<style></style>
