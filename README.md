# clone-icode-repo [NPM](https://www.npmjs.com/package/clone-icode-repo)
clone repo from icode just for `developer of baidu`, support https and ssh.

***

## Installation

 Run `npm install clone-icode-repo`

## Usage
**precondition: the access to icode**

```js
	var clone = require('clone-icode-repo');
	var url = 'ssh://huangwenming@icode.baidu.com:8235/baidu/animation/mars';
	var dest = './temp';
	clone(url, dest, {type: 'ssh'}, function (err) {
        if (err) {
            console.log('error: ' + err);
        } else {
            console.log('the repo is pulled from icode successfully!');
        }
    });
```
* the url parameter (string) is the address of code repository, its structure is:
`[protocol://] + [username@] + [origin/] + [reponame] + [#branch]`

* the reponame is required, the value of protocol defaults to https.

* the dest parameter (string) is the file folder to store the pulled code.

* the third parameter is an object, used to determine which protocol(ssh or https) to use.

* the fourth parameter is callback for git clone.

