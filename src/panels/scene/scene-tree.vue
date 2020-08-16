<template>
  <div>
    <sceneNode :element="sceneInfo"></sceneNode>
    <div style="height:300px;" @drop="foo"></div>
  </div>
</template>
<script>
// 场景的面板
// import { treeMap } from "@/editor-runtime/utils/Tree";
import sceneNode from "./scene-node";
import SceneManger from "@/scene-manager";
import Vue from "vue";

Vue.component("sceneNode", sceneNode);

// import Vue from "vue";

const instance = SceneManger();

export default {
  computed: {
    sceneInfo() {
      return instance.getScene().sceneInfo;
    }
  },
  methods: {
    foo() {
      console.log("foo");
    }
  }
  /*   watch: {
    sceneInfo() {
      console.log(this.sceneInfo);
    }
  } */

  /*   methods: {
    renderNode(element) {
      // const h = this.$createElement;
      return (
        <div>
          <span>{element.url}</span>
          <ul>{element.children}</ul>
        </div>
      );
    }
  },

  render() {
    return treeMap(this.sceneInfo, element => {
      console.log(element);
      return this.renderNode(element);
    });
  } */
};
</script>
