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
