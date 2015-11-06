# geetest-proxy
> subscribable Geetest-js-sdk wrapper

## 开始
```
npm i --save geetest-proxy
```

## 使用
```browserify
var geetest = require('geetest-proxy');
var captcha = geetest(document.getElementById('#captcha'), {
  gt: GEETEST_ID
});
captcha.on('success', function (value) {
  fetch('/validate', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(value)
  }).then(function (response) {
    ...
  });
});
```

## API
### geetest(container, config)
- **container**, 放置验证码的 DOM 容器节点
- **config**, 传递给 Geetest 的配置项，可参考[官方文档](http://www.geetest.com/install/sections/idx-client-sdk.html#id3)
    - **config.gt**, Geetest ID，为必填项

``geetest(container, config)`` 方法将返回一个 EventEmitter 实例，后续的校验事件将通过该实例发布。

## 事件
- 标准事件
    - success
    - fail
    - abuse
    - forbidden
- 扩展事件
    - MESSAGE, 完整的事件信息，主要用于调试

**标准事件**都将接受到一个可传递给后台校验的数据包，即
```
{
    geetest_challenge: '',
    geetest_validate: '',
    geetest_seccode: ''
}
```

## License
the MIT License
