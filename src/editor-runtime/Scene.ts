/* eslint-disable */

import RenderManager from './renderer'
import { Renderer } from "./renderer/PixiRenderer";
import { each } from 'lodash'

interface Tree<T> {
  children?: Array<T>;
}

/**
 * 遍历树结构的函数
 * @param {Tree} tree
 * @param {function} callback
 */
function traverse<T extends Tree<T>>(tree: T, callback: (node: T) => void) {
  if (!tree) {
    return
  }

  callback(tree)

  if (tree.children) {
    each(tree.children, (e: T) => {
      traverse(e, callback);
    });
  }
}

/**
 * 加载函数
 * @param {string} url
 * @returns Promise
 */
function load(url: string): Promise<void> {
  return Promise.resolve();
}

/**
 * 场景的信息
 */
interface SceneInfo extends Tree<SceneInfo> {
  /**
   * 场景的名字
   */
  name: string;

  /**
   * 场景内的对象树
   */
  children: Array<SceneInfo>;

  /**
   * 精灵的url
   */
  url?: string
}

// let 

/**
 * 场景的基类
 */
class Scene {
  _timmer = 0;

  renderer: Renderer;

  public sceneInfo: SceneInfo = {
    name: '',
    children: []
  };

  constructor() {
    this.renderer = RenderManager.getRenderer()
  }

  /**
   * 场景开始加载前触发
   * @protected
   */
  protected onCreate() { }

  /**
   * 资源加载完毕时触发
   * @protected
   */
  protected onReady() { }

  /**
   * 固定帧率的回调函数
   * @protected
   */
  protected onFixedUpdate() { }

  /**
   * 场景被销毁前的回调函数
   * @protected
   */
  protected beforeDestory() { }

  /**
   * 从 sceneInfo 对象加载场景所需要的资源
   */
  async loadFromSceneInfo(sceneInfo: SceneInfo) {
    this.sceneInfo = sceneInfo;

    this.onCreate();

    const loaders: Array<Promise<void>> = [];

    let urls: Array<string> = []

    traverse(sceneInfo, obj => {
      // console.log(obj)
      // loaders.push(load(obj.url || ''));
      // console.log(obj.url)
      if (!!obj.url) {
        urls.push(obj.url)
      }

    });

    // console.log(urls)
    await this.renderer.loadAndAddSprites(urls)

    await Promise.all(loaders);
    this.onReady();

    this._timmer = setInterval(() => {
      this.onFixedUpdate();
    }, 1000 / 60);
  }
}

export default Scene;

/* eslint-enable */
