<template>
  <div>
    <!-- preview-panel -->
    <div ref="pixiContainer"></div>
  </div>
</template>

<script>
import * as PIXI from "pixi.js";
import Scene from "@/editor-runtime/Scene.ts";
import PixiRenderer from "@/editor-runtime/renderer/PixiRenderer";
import Renderer from "@/editor-runtime/renderer";

class MyScene extends Scene {
  constructor() {
    super();
  }

  onCreate() {
    console.log("Scene ready!");
  }
}

// 预览的窗口，目前先实现与游戏内容一致的窗口（既无法缩放到能看见场景外的东西）
export default {
  mounted() {
    // 初始化pixi
    const app = new PIXI.Application({
      width: 256, // default: 800
      height: 256, // default: 600
      antialias: true, // default: false
      transparent: false, // default: false
      resolution: 1 // default: 1
    });
    this.$refs.pixiContainer.appendChild(app.view);

    new PixiRenderer(app);

    console.log(Renderer.getRenderer());

    // 初始化测试场景
    const demoScene = new MyScene();
    demoScene.loadFromSceneInfo({
      objects: [
        {
          url: "1.jpg"
        }
      ]
    });
  }
};
</script>

<style lang="scss"></style>
