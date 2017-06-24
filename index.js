var gitclone = require('git-clone');
var rm = require('rimraf').sync;

module.exports = clone;
/**
 * clone 'repo' to 'dest' and callback by 'callback(err)'
 * @param {string} repo
 * @param {string} dest
 * @param {Object} options
 * @param {Function} callback
 */
function clone(repo, dest, options, callback) {
    if (typeof options === 'function') {
        callback = options;
        options = null;
    }
    options = options || {};


    repo = normalize(repo);
    var url = getUrl(repo, options);
    // console.log(url);
    // console.log(repo.checkout);
    gitclone(url, dest, { checkout: repo.checkout, shallow: repo.checkout === 'master' }, function (err) {
        if (err === undefined) {
            // 删除掉.git文件
            rm(dest + '/.git');
            callback();
        } else {
            callback(err);
        }
    })
}
/**
 * parse repo by Reg and get the key feature
 * @param {string} repo
 * @returns {{protocol: (*|string), username: (*|string), origin: string, repoName: *, checkout: (*|string)}}
 */
function normalize(repo) {
    // the construct of repo：[protocol]+[username]+[origin]+[reponame]+[branch]
    var reg = /(.*:\/\/)?((.*)@)?(icode.*?\/)?([^#]+)(#(.+))?$/;
    var matches = reg.exec(repo);
    var protocol = matches[1] || 'https://';
    var username = matches[3] || '';
    var origin = matches[4] || '';
    var repoName = matches[5];
    var checkout = matches[7] || 'master';
    return {
        protocol: protocol,
        username: username,
        origin: 'icode.baidu.com',
        repoName: repoName,
        checkout: checkout
    }
}
/**
 * get the url of repo given
 * @param {Object} repo
 * @param {Object} options
 * @returns {string}
 */
function getUrl(repo, options) {
    // the type of clone: https or ssh

    // ssh必须指定用户名
    // https可以不指定用户名，可通过提示输入用户名和密码
    var httpsReg = /https/;
    var sshReg = /ssh/;
    var protocol = options.type || 'https';
    var username;
    var origin;

    if (!protocol) {
        protocol = sshReg.test(repo.protocol) ? 'ssh' : 'https';
    }

    username = repo.username ? repo.username + '@' : '';

    // 不指定username只能使用https
    protocol = username ? protocol : 'https';
    // ssh需要指定端口号，https不需要指定端口号
    origin = protocol === 'https' ? repo.origin : repo.origin + ':8235';

    var url = protocol + '://' + username + origin + '/' + repo.repoName;
    return url;
}

