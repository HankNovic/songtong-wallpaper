/**
 * uni-app Promise 适配器
 * 将 uni-app 的回调式 API 转换为 Promise 形式
 * 使 uni-app API 支持 async/await 语法
 */
uni.addInterceptor({
  /**
   * 拦截器：转换返回值
   * 如果返回值是 Promise，则将其转换为标准的 Promise 格式
   * @param {*} res - API 返回的原始值
   * @returns {*} 转换后的值或 Promise
   */
  returnValue (res) {
    // 判断返回值是否为 Promise（检查是否有 then 方法）
    if (!(!!res && (typeof res === "object" || typeof res === "function") && typeof res.then === "function")) {
      // 不是 Promise，直接返回原值
      return res;
    }
    // 是 Promise，转换为标准格式
    return new Promise((resolve, reject) => {
      // 等待原 Promise 完成
      res.then((res) => {
        // 如果返回值为空，直接 resolve
        if (!res) return resolve(res) 
        // uni-app 的 Promise 格式：[error, success]
        // 如果第一个元素存在，表示有错误，reject
        // 否则 resolve 第二个元素（成功的数据）
        return res[0] ? reject(res[0]) : resolve(res[1])
      });
    });
  },
});