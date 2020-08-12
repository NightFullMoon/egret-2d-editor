import * as PIXI from "pixi.js";
import "./d.ts";
import RendererManager from "./index";

/**
 * Pixi.js 的渲染器
 */
class PixiRenderer {
  // foo = "";
  app: PIXI.Application;
  constructor(app: PIXI.Application) {
    RendererManager.setRenderer(this);
    this.app = app;
  }

  /**
   * 加载url对应的图片并加入场景
   * @param urls
   */
  loadAndAddSprites(urls: Array<string>): Promise<void> {
    return new Promise(resolve => {
      PIXI.Loader.shared.add(urls).load(() => {
        urls.forEach(url => {
          const sprite = new PIXI.Sprite(
            PIXI.Loader.shared.resources[url].texture
          );

          sprite.interactive = true;

          let startX = 0;
          let startY = 0;

          let startMouseX = 0;
          let startMouseY = 0;

          let isMouseDown = false;

          sprite.on("mousedown", (event: PIXI.InteractionEvent) => {
            // console.log(event);
            const positon = event.data.global;
            startMouseX = positon.x;
            startMouseY = positon.y;

            startX = sprite.x;
            startY = sprite.y;
            // console.log(positon);

            isMouseDown = true;
          });

          sprite.on("mousemove", (event: PIXI.InteractionEvent) => {
            if (!isMouseDown) {
              return;
            }

            const positon = event.data.global;
            const offsetX = positon.x - startMouseX;
            const offsetY = positon.y - startMouseY;

            sprite.x = startX + offsetX;
            sprite.y = startY + offsetY;
          });

          sprite.on("mouseup", () => {
            isMouseDown = false;
          });

          this.app.stage.addChild(sprite);
        });

        resolve();
      });
    });

    // return Promise.resolve();
  }
}

// 先把这个类型强制等同于PixiRenderer，后面再改成interface
type Renderer = PixiRenderer;

export default PixiRenderer;
export { Renderer };
