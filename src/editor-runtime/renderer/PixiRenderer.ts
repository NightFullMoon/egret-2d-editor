import * as PIXI from "pixi.js";
import "./d.ts";
import RendererManager from "./index";

/**
 * Pixi.js 的渲染器
 */
class PixiRenderer implements Renderer {
  foo = "";
  constructor(app: PIXI.Application) {
    RendererManager.setRenderer(this);
  }
}

export default PixiRenderer;
