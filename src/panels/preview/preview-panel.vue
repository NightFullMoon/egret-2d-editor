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
import SceneManger from "@/scene-manager";

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
      width: 800, // default: 800
      height: 600, // default: 600
      antialias: true, // default: false
      transparent: false, // default: false
      resolution: 1 // default: 1
    });
    this.$refs.pixiContainer.appendChild(app.view);

    new PixiRenderer(app);

    // console.log(Renderer.getRenderer());

    // const aPng = "/logo.png";

    // PIXI.Loader.shared.add(aPng).load(() => {
    //   //Create the cat sprite
    //   const cat = new PIXI.Sprite(PIXI.Loader.shared.resources[aPng].texture);

    //   //Add the cat to the stage
    //   app.stage.addChild(cat);
    // });

    // 初始化测试场景
    let demoScene = new MyScene();
    demoScene = new MyScene();
    demoScene.loadFromSceneInfo({
      children: [
        {
          url: "/logo.png"
        },
        {
          url: "/image1.png"
        },
        {
          url: "/image2.png"
        }
      ]
    });
    console.log("set scene");
    SceneManger().setScene(demoScene);
  }
};
</script>

<style lang="scss"></style>
