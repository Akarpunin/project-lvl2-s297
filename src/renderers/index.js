import renderTree from './tree';
import renderPlain from './plain';
import renderJson from './json';

const getRenderFunction = (renderMethod) => {
  const mapping = {
    tree: renderTree,
    plain: renderPlain,
    json: renderJson,
  };
  return mapping[renderMethod];
};

export default getRenderFunction;
