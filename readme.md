### sdk文档

##### 播放sdk支持功能

播放，快进，倍速，全屏，分辨率切换

##### 视频格式与支持平台

| 浏览器/格式 | Mp4  | mov  | mv4  |
| :---------- | ---- | ---- | ---- |
| Chrome      | ✔    | ✔    | ✔    |
| Firefox     | ✔    | ✔    | ✔    |
| Mac Safari  | ✔    | ✔    | ✔    |
| opera       | ✔    | ✔    | ✔    |


- 支持现在浏览器不支持IE
- mac safari 分辨率切换存在问题，但是视频可以正常播放
- 在苹果手机上qq浏览器，uc浏览器，safari都不支持切换分辨率，qq和uc浏览器可以支持全屏播放

##### 步骤一在页面中引入文件

> umd方式

```
<script src="../dir/video.min.js"></script>
```

> import方式

```
import video from 'video'
```

##### 步骤二放置播放器容器

```
<div id="con1"></div>
```

- 说明：容器可以使用id的方式指定，只支持单个播放器输出
- 对于播放器的尺寸适配问题，需要用户自行处理自适应问题

##### 步骤三初始化代码

```
new video(options)
```

> 关于options配置说明：
>
> 1.contanier（必填）：对应htmldom节点，包含以下几种类型 id class(不能重名)
>
> 2.mediaId（必填）：对应媒体文件的id
>
> 3.appId（必填）：点播中台分发appId
>
> 4.appKey（必填）: 点播中台分发appKey
>
> 5.userId（非必填）：存储断点信息
>
> 6.ticket（非必填）：播放凭证（业务侧如果配置了鉴权策略，则必需）
>
> 7.platform（非必填）：埋点对应平台类型，可以传递phone pc
>
> 8.sessionId（非必填）：本次播放的会话id

#### 环境地址

> 直接使用线上环境地址，需要使用线上的appKey及mediaId

#### 需要注意

1.组件使用时存放的路径建议放在public/libs/**

eslint可能会校验打包之后的video.min.js文件，需要在项目根目录下创建

.eslintignore文件，内容如下

```
# eslint 忽略文件
public
```

