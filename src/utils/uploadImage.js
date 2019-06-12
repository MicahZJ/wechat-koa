import OSS from "ali-oss";

export default class UploadImage {
  constructor() {}
  // 随机字符串
  randomString(num) {
    let chars = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z"
    ];
    let res = "";
    for (let i = 0; i < num; i++) {
      var id = Math.ceil(Math.random() * 35);
      res += chars[id];
    }
    console.log("res", res);
    return res;
  }

  /**
   * 创建oss客户端对象
   * @returns {*}
   */
  async createOssClient() {
    return new Promise((resolve, reject) => {
      let client = new OSS({
        region: "oss-cn-hangzhou",
        accessKeyId: "",
        accessKeySecret: "",
        bucket: "micahzj"
      });
      resolve(client);
    });
  }

  /**
   * 文件上传
   * @param option 参考csdn: https://blog.csdn.net/qq_27626333/article/details/81463139
   */
  async ossUploadFile(option) {
    let file = option.file;
    const self = this;
    return new Promise((resolve, reject) => {
      let randomStr = self.randomString(4); //  4位随机字符串
      let extensionName = file.name.substr(file.name.indexOf(".")); // 文件扩展名
      let fileName = "/images/" + randomStr + extensionName; // 文件名字（相对于根目录的路径 + 文件名）
      // 执行上传
      self.createOssClient().then(client => {
        // 上传处理
        // 分片上传文件
        client
          .multipartUpload(fileName, file, {
            progress: function(p) {
              let e = {};
              e.percent = Math.floor(p * 100);
              // console.log('Progress: ' + p)
              option.onProgress(e);
            }
          })
          .then(
            val => {
              console.info(val);
              if (val.res.statusCode === 200) {
                option.onSuccess(val);
                // 异步上传,返回数据
                resolve({
                  fileName: file.name,
                  fileUrl: val.res.requestUrls[0]
                });
                return val;
              } else {
                option.onError("上传失败");
              }
            },
            err => {
              option.onError("上传失败");
              reject(err);
            }
          );
      });
    });
  }
}
