<script>
// 场景的面板

import SceneManger from "@/scene-manager";
// import Vue from "vue";

const instance = SceneManger();

export default {
  computed: {
    sceneInfo() {
      return instance.getScene();
    }
  },
  watch: {
    sceneInfo() {
      console.log(this.sceneInfo);
    }
  },
  render(h) {
    return h("div", "123123");
  }
};
</script>
