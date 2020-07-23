import "./d.ts";

/**
 * @static
 */
let _renderer: Renderer;

const RenderManager = {
  setRenderer(renderer: Renderer) {
    _renderer = renderer;
  },

  getRenderer(): Renderer {
    return _renderer;
  }
};

export default RenderManager;
