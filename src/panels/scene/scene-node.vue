<template>
  <div
    @drop="onDrop"
    @dragover="ondragover"
    @dragleave="ondragexit"
    @dragend="ondragend"
    class="scene-node"
    :class="{ 'drag-over': isDragover }"
  >
    <div class="object-name" draggable>
      <i
        class="toggle-icon"
        v-if="element.children && 0 < element.children.length"
        @click="isShowChildren = !isShowChildren"
        :class="{ open: isShowChildren }"
      >
        <ion-icon name="chevron-forward-outline"></ion-icon
      ></i>

      {{ element.name || element.url }}
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
      isShowChildren: false,
      isDragover: false
    };
  },
  methods: {
    onDrop() {
      console.log("onDrop");
      this.isDragover = false;
    },
    ondragover(event) {
      // console.log("ondragover");
      if (this.element.children) {
        // 如果有子元素，则自己本身是容器，所以阻止事件冒泡
        this.isDragover = true;
        event.stopPropagation();
      }

      event.preventDefault();
      return;
    },

    ondragexit() {
      this.isDragover = false;
    },

    ondragend() {
      console.log("ondragend");
      this.isDragover = false;
    }
  }
  //   components: {
  //     sceneNode
  //   }
};
</script>
<style lang="scss" scoped>
.scene-node {
  &.drag-over {
    background-color: rgba(255, 255, 255, 0.1);
  }
}

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
