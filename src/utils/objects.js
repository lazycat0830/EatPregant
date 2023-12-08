import _ from 'lodash';

const importByFilepath = (filePath) => {
  let define = require(filePath); // eslint-disable-line global-require,import/no-dynamic-require
  if (typeof define === 'object' && define.__esModule) { // eslint-disable-line no-underscore-dangle
    // Babel/ES6 module compatability
    define = _.get(define, 'default');
  }
  return define;
};

/**
 * Generate A Singleton Instance
 */
function generateSingletonInstance(symbol, constFunc) {
  if (_.isUndefined(global[symbol])) {
    global[symbol] = constFunc();
  }
  return global[symbol];
}


const asyncEach = async (list, action, sequence = true) => {
  if (sequence) {
    if (_.isArray(list)) {
      for (let index = 0; index < list.length; index += 1) {
        await action(list[index]); // eslint-disable-line no-await-in-loop
      }
    } else {
      const keys = _.keys(list);
      for (let index = 0; index < keys.length; index += 1) {
        const key = keys[index];
        await action(list[key], key); // eslint-disable-line no-await-in-loop
      }
    }
  } else {
    const promiseList = [];
    _.each(list, (item) => {
      promiseList.push(action(item));
    });
    await Promise.all(promiseList);
  }
};

export {
  importByFilepath,
  generateSingletonInstance,
  asyncEach,
};
