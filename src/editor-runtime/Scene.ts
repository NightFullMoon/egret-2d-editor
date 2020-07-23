interface Tree {
  children?: Array<Tree>;
}

/**
 * 遍历树结构的函数
 * @param {Tree} tree
 * @param {function} callback
 */
function traverse(tree: Tree, callback) {}

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
interface SceneInfo {
  /**
   * 场景的名字
   */
  name: string;

  /**
   * 场景内的对象树
   */
  objects: Tree;
}

/**
 * 场景的基类
 */
class Scene {
  _timmer = 0;

  constructor() {}

  /**
   * 场景开始加载前触发
   * @protected
   */
  onCreate() {}

  /**
   * 资源加载完毕时触发
   * @protected
   */
  onReady() {}

  /**
   * 固定帧率的回调函数
   * @protected
   */
  onFixedUpdate() {}

  /**
   * 场景被销毁前的回调函数
   * @protected
   */
  beforeDestory() {}

  /**
   * 从 sceneInfo 对象加载场景所需要的资源
   */
  async loadFromSceneInfo(sceneInfo: SceneInfo) {
    this.onCreate();

    const loaders: Array<Promise<void>> = [];
    traverse(sceneInfo.objects, obj => {
      loaders.push(load(obj.url));
    });

    await Promise.all(loaders);
    this.onReady();

    this._timmer = setInterval(() => {
      this.onFixedUpdate();
    }, 1000 / 60);
  }
}
