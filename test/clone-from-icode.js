/**
 * Created by huangwenming on 2017/6/24.
 */

// test just for developers of baidu
var clone = require('../index.js');
var url = 'ssh://huangwenming@icode.baidu.com:8235/baidu/map-car/violation-web#mapauto';
// var url = 'https://icode.baidu.com/baidu/map-car/violation-web#mapauto';
// var url = 'ssh://huangwenming@icode.baidu.com:8235/baidu/animation/mars';
// var url = 'ssh://icode.baidu.com:8235/baidu/animation/mars';
// var url = 'ssh://baidu/animation/mars';
var dest = './temp';
clone(url, dest, {type: 'ssh'}, function (err) {
    if (err) {
        console.log('error: ' + err);
    } else {
        console.log('the repo is pulled from icode successfully!');
    }
});