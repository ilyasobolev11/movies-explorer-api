const BLACK_LIST = ['__v', 'password'];

function deleteTechProperties(target) {
  let res = null;

  function deleteProperties(obj) {
    const currentObj = obj;
    BLACK_LIST.forEach((prop) => {
      if (Object.prototype.hasOwnProperty.call(obj, prop)) {
        delete currentObj[prop];
      }
    });
  }

  if (!target) return target;

  if (Array.isArray(target)) {
    if (!target.length) return target;
    res = target.map((i) => {
      const elem = i?.toObject();
      deleteProperties(elem);
      return elem;
    });

    return res;
  }

  res = target?.toObject();
  deleteProperties(res);

  return res;
}

module.exports = { deleteTechProperties };
