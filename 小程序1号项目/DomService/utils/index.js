var barcode = require('./barcode');
var qrcode = require('./qrcode');

function convert_length(length) {
  return Math.round(wx.getSystemInfoSync().windowWidth * length / 750);
}

function barc(id, code, width, height) {
  barcode.code128(wx.createCanvasContext(id), code, convert_length(width), convert_length(height))
}

function qrc(id, code, width, height) {
  qrcode.api.draw(code, {
    ctx: wx.createCanvasContext(id),
    width: convert_length(width),
    height: convert_length(height)
  })
}

module.exports = {
  barcode: barc,
  qrcode: qrc
}
// ---------------------
//   作者：十二指环
// 来源：CSDN
// 原文：https://blog.csdn.net/wtdask/article/details/73776356 
// 版权声明：本文为博主原创文章，转载请附上博文链接！