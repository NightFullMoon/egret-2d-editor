<template>
  <div>
    <div class="object-name">
      <i
        class="toggle-icon"
        v-if="element.children && 0 < element.children.length"
        @click="isShowChildren = !isShowChildren"
        :class="{ open: isShowChildren }"
      >
        <ion-icon name="chevron-forward-outline"></ion-icon
      ></i>

      {{ element.url }}
    </div>
    <div class="children" v-show="isShowChildren">
      <sceneNode
        v-for="(element, index) in element.children"
        :element="element"
        :key="index"
      ></sceneNode>
    </div>
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
  },
  data() {
    return {
      isShowChildren: false
    };
  }
  //   components: {
  //     sceneNode
  //   }
};
</script>
<style lang="scss" scoped>
.object-name {
  color: #ccc;
  font-size: 13px;
  line-height: 22px;

  cursor: pointer;

  .toggle-icon {
    display: inline-block;
    transition: transform 0.3s;
    &.open {
      transform: rotateZ(90deg);
    }
  }
}
.children {
  padding-left: 1em;
}
</style>
