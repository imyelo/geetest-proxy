var geetest = require('..');

var GEETEST_ID = '09d63b4c30fd364f8e6c7c602f13ea56';

document.querySelector('#captcha-foo button').addEventListener('click', function () {
  var captcha = geetest(document.getElementById('captcha-foo'), {
    gt: GEETEST_ID  
  });
  captcha.on('MESSAGE', function (info) {
    console.log('[FOO] MESSAGE: ', info);
  });
  captcha.on('success', function (info) {
    alert('[FOO] success');
  });
});

document.querySelector('#captcha-bar button').addEventListener('click', function () {
  var captcha = geetest(document.getElementById('captcha-bar'), {
    gt: GEETEST_ID  
  });
  captcha.on('MESSAGE', function (info) {
    console.log('[BAR] MESSAGE: ', info);
  });
  captcha.on('success', function (info) {
    alert('[BAR] success');
  });
});
