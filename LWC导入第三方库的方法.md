# LWC导入第三方库的方法

[TOC]

在LWC中，我们当然可以使用第三方库的代码。今天我会用 ```highCharts``` 来手把手教你怎么调用。

## 准备工作

1. 下载你想使用的第三方库代码到本地。

2. 作为静态资源，上传到Salesforce。

3. 在 ```js``` 文件中：

   - 导入静态资源

     ```javascript
     import resourceName from '@salesforce/resourceUrl/resourceName';
     ```

   - 从```LightningElemengt``` 模组导入标准方法：

     ```js
     import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
     ```

## 标准方法讲解

[```lightning/platformResourceLoader```](https://developer.salesforce.com/docs/component-library/bundle/lightning-platform-resource-loader/documentation) 方法内提供了两个方法：```loadScript``` 和 ```loadStyle```。两个方法都返回一个Promises对象，二者可以链接或者并行使用。

```js
loadScript(self, fileUrl): Promise
```

该方法会访问静态资源中的 JavaScript 文件，并且加载完成后返回一个 ```resolves``` 的 Promise

- ```self``` 继承了 ```LightningElement``` 组件的映射，在方法中的值必须为 ```this``` 。只有在继承了```LightningElement``` 的模组中才能调用此方法
- ```fileUrl``` 一个指向 JavaScript 文件路径的字符串。构建这个字符串需要声明一个指向静态资源文件的路径的 ```resourceName```

加载 CSS 文件的方法也类似：
```js
loadScript(self, fileUrl): Promise
```

## JavaScript 中的 DOM 操作

虽然在LWC组件中手动进行 DOM 操作是不被推荐的，但是很多第三方库会掌控 DOM。

所以添加了 ```lwc:dom="manua"``` 属性的元素会被重定向至一个空的原生 HTML 元素，这样对它进行的操作将脱离 LWC 框架的限制。

```html
<template>
    <div lwc:dom="manual"></div>
</template
```

## 示例

这个组件利用了 ```highCharts``` 库显示了我们小组每天的产出时间：

首先下载 [highcharts](https://github.com/highcharts/highcharts) 源码包 / 核心 JavaScript 文件

在 VSCode 中，创建一个新的组件。包裹 highcharts 的元素为一个 ```div``` 元素，因此组件的 HTML 代码如下：

```html
<template>
    <div>
        <div id="container" lwc:dom="manual"></div>
    </div>
</template>
```

在 JavaScript 类文件中，导入 ```loadStyle(可选)``` ```loadScript``` 方法，导入 highcharts 核心文件，其中，```highcharts``` 是上传到静态资源时设定的资源名。

在```renderedCallback()```方法中，第一次render时，我们调用加载方法加载样式和方法，由于调用方法都会返回 Promise 对象，因此我们可以使用 ```Promise.all()``` 来确保所有文件都已成功加载。在回调函数中，在没有错误、文件都被加载的情况下，才会调用第三方库的工作方法，这样，我们就确保了所有来自第三方库的方法、样式都正确地引用到环境中并且被使用了。

下面是我的 JavaScript 代码：

```javascript
import { LightningElement } from "lwc";
import { loadScript } from "lightning/platformResourceLoader";
import HIGHCHARTS from "@salesforce/resourceUrl/highcharts";

export default class CDP_trial extends LightningElement {
  renderedCallback() {
    Promise.all([
      loadScript(this, HIGHCHARTS)
        .then(() => console.log("Highcharts loaded"))
        .catch(error => console.log("Error in loading Highcharts"))
    ])
    .then(() => {
        this.runHighcharts();
    })
    .catch(error => {
        window.console.log("The error is: " + error);
    });
  }
    
  runHighcharts() {
  Highcharts.chart(this.template.querySelector('div'), {
        chart: {
                type: 'area',
                zoomType: 'x',
                panning: true,
                panKey: 'shift'
            },
            title: {
                text: '2021 春季'
            },
            xAxis: {
                allowDecimals: false,
                type: 'datetime',
                dateTimeLabelFormats: {
                    day: '%b %e'
                },
                title: {
                    text: '日期'
                }
            },
            yAxis: {
                startOnTick: true,
                endOnTick: false,
                maxPadding: 0.35,
                title: {
                    text: '时间'
                },
                labels: {
                    format: '{value} mins'
                }
            },
            tooltip: {
                pointFormat: '{series.name} 学习了 <b>{point.y}</b>mins'
            },
            legend: {
                enabled: true
            },

            series: [{
                name: 'FO',
                lineColor: Highcharts.getOptions().colors[1],
                color: Highcharts.getOptions().colors[2],
                fillOpacity: 0.3,
                data: [
                    163,90,60,148,0
                ],
                pointStart: Date.UTC(2021, 1, 22),
                pointInterval: 24 * 3600 * 1000 // one day
            }, {
                name: 'BZ',
                lineColor: Highcharts.getOptions().colors[2],
                color: Highcharts.getOptions().colors[3],
                fillOpacity: 0.3,
                data: [
                    120,141,67,141,0
                ],
                pointStart: Date.UTC(2021, 1, 22),
                pointInterval: 24 * 3600 * 1000 // one day
            }, {
                name: 'SZ',
                lineColor: Highcharts.getOptions().colors[3],
                color: Highcharts.getOptions().colors[4],
                fillOpacity: 0.3,
                data: [
                    90,0,0,0,0
                ],
                pointStart: Date.UTC(2021, 1, 22),
                pointInterval: 24 * 3600 * 1000 // one day
            }]
    });
  }
  
    
}
```

### 上述代码中需要注意的几点：

- 为了避免命名冲突，静态资源的文件路径的变量名与第三方库中的方法名 **不能** 相同。

  例如，```HIGHCHARTS``` 是静态文件的路径名，```Highcharts``` 是第三方库的方法名。

- 必须确保所有文件都已经被调用之后，才能进入到第三方库的工作函数。

### 补充

由于我的代码中只加载了一个核心 JavaScript 文件，下面给大家参考如何加载文件库中的文件、 CSS 文件和多个核心文件：

```javascript
import HIGHCHARTS from "@salesforce/resourceUrl/highchartsZip"
// ...
Promise.all([
    loadScript(this, HIGHCHARTS + '/core/highcharts.source.js'),
    loadScript(this, HIGHCHARTS + '/core/3d.source.js'),
    loadScript(this, HIGHCHARTS + '/core/map.source.js'),
    loadStyle(this, HIGHCHARTS + '/style.css')
]).then(() => { /* callback */ });
```

