## 轻巧的加载预显示行 - lwc place holder

[TOC]

### 背景介绍

在加载一个数据量比较大的组件时，在元素被渲染出来之前页面上会存在一些空白区域，元素加载完成突然被渲染之后，空白区域又会被突然填满，用户体验上并不友好。因此，在设计Lightning组件的时候，为了更加良好的用户体验，我引入了预显示行。

它和官方ui库提供的 ```lightning-spinner``` 的区别在于，```spinner``` 并不占位，因此在数据元素加载出来之后，仍然会造成组件空间突变的非良好体验。

实现

在有思路之后，我们立即行动。先把基本元素给写出来，我们的目标是一个不含有任何信息的预显示行。

把预显示行分割成两部分：左和右，然后在单元格内，用粗潜灰线提示为加载中的信息内容，并分为上下两部分，上半部分的线要比下半部分的线短，这样整体看上去会比较美观。同时，在整个元素的上下部分，添加细的灰色分割线，用来提示整体行的空间位置。

下面来解构设计内容

- 分左右部分
- 粗-浅-灰线提示为内容行
- 每个部分分上下线部分
- 上部分线比下部分线短
- 每个元素的上下用细-略浅-灰提示为分割线

根据我们解构的设计元素，写出CSS部分：

```css

.field {
  padding: 1.5rem 1rem;
}

.border-bottom {
  border-bottom: 1px solid #d9dbdd;
}
.field-name {
  width: 30%;
  padding-right: 0.75rem;
}

.field-value {
  width:70%;
}

.left-column, .right-column{
  float: left;
  display: block;
  width: 50%;
}
.text {
  border-radius: 15rem;
  display: block;
  margin-bottom: .75rem;
  background-color: #f2f2f3;
  height: .5rem;
}
.text-shorter {
  width: 20%;
}
.text:last-child {
  margin-bottom: 0;
}
.text-secondary {
  background-color: #e9eaec;
}
.text-medium {
  width: 60%;
}
.text {
  border-radius: 15rem;
  display: block;
  margin-bottom: .75rem;
  background-color: #f2f2f3;
  height: .5rem;
}
.text-thin{height:6px;border-radius: 15rem}
```

在HTML中，根据设计结构，分别写出占用元素：

```HTML
<template>
  <div class="slds-clearfix detail-panel-root slds-card">
    <div class="left-column">
      <template for:each={rows} for:item="row">
        <div key={row.id} class="field border-bottom">
          <div class="text text-primary text-shorter text-thin"></div>
          <div class="text text-secondary text-medium text-thin"></div>
        </div>
      </template>
    </div>
    <div class="right-column">
      <template for:each={rows} for:item="row">
        <div key={row.id} class="field border-bottom">
          <div class="text text-primary text-shorter text-thin"></div>
          <div class="text text-secondary text-medium text-thin"></div>
        </div>
      </template>
    </div>
    </div>
</template>
```

注意到，为了实现自定义显示行数，我们在各个列的元素上包裹了一个 ```for:each``` 迭代属性，在js文件中我们需要实现这个循环：

```js
import { LightningElement,api } from 'lwc';

export default class LoadingPlaceHolder extends LightningElement {
  @api
  rowNumber
  get rows() {
    const number = (!!this.rowNumber ? this.rowNumber : 1)
    var row = {}
    var rows = []
    for(let i = 0; i < number; i++) {
      row.id = i
      rows.push(row)
    }
    return rows
  }
}
```

因此，在我们想要使用这个预加载行组件时，只要用属性 ```row-number``` 来设定需要几行即可。

### 使用例子

在我的某个组件中，我想要在组件完成加载之前，显示3行预加载行，则我的组件会这样去调用：

```html
<template if:false={loaded}>
    <c-loading-place-holder row-number="3"></c-loading-place-holder>
</template>
<template if:true={loaded}>
    <!-- 组件内容 -->
</template>
```

用 ```loaded``` 参数控制，在加载完数据之前，显示三行预加载行。

在js文件中，定义 ```loaded``` 参数，并且在钩子函数中，控制这个变量的值：

```js
@track loaded = false
@wire(getRecords, {}) 
wiredRecord({error, data}) {
	if (data) {
		// ...
		this.loaded = true
	}
}
```

### 完整代码

完整的代码已经放在我的[git](https://github.com/Lanjidechao/sfdc-ui-placeholder-lwc)上了，有兴趣可以尝试一下。