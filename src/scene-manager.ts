import Scene from "@/editor-runtime/Scene";
import Vue from "vue";

const instance = new Vue({
  data: {
    activeScene: new Scene()
  },

  methods: {
    getScene(): Scene {
      return this.activeScene;
    },

    setScene(scene: Scene) {
      this.activeScene = scene;
    }
  }
});

export default function() {
  return instance;
}
