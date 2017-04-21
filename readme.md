# DRAFT_NNA
> 一个基于draft.js和draft-js-plugins的富文本编辑器

## 依赖
+ [draftjs](https://github.com/facebook/draft-js)
+ [draft-js-plugins](https://github.com/draft-js-plugins/draft-js-plugins)
+ [draftjs-utils](https://github.com/jpuri/draftjs-utils)
+ [ant design](https://github.com/ant-design/ant-design)

## 插件说明
  
### *image插件*
提供了插入图片功能

```
    export default (Component,config)=>{ decorators,initialize,ImageComponent }
```
> 参数说明
 
+ Component: React组件，默认使用antd中的Button

+ config:

| Name                      | Type                                           | Description                                                                                 |
| ------------------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------- |
| upload                    | (file:File,store)=>Promise<string>             | 上传方法,返回Promise<string>,file用户选中的图片文件，store用于更新上传状态                          | 
| decorator                 |  Function                                      | 包装器，用于包裹wrapperImage组件                                                               |
| wrapperImage              | new() => React.Component<any,any>              | Block的展现组件                                                                                | 
> 返回值说明
+ decorators: 装饰器，参见draftjs的decorator
+ initialize: 调用插件时的初始化方法
+ ImageComponent: React组件，提供了图片按钮和弹层

### *inline.toolbar插件*
快捷编辑弹层功能

```
    export default (Component,config)=>{ initialize,onChange,InlineToolbar }
```
> 参数说明
+ Component React组件，默认使用antd中的Button
+ config    暂时没用
> 返回值说明
+ onChange:      当编辑器的选中状态变化是触发，用于判断是否需要弹出层
+ initialize:    调用插件时的初始化方法
+ InlineToolbar: React组件，弹层组件

### *link插件*
插入链接功能

```
    export default (Component,config)=>{handlePastedText,initialize,decorators,LinkComponent }
```
> 参数说明
+ Component React组件，默认使用antd中的Button
+ config    暂时没用
> 返回值说明
+ handlePastedText 当在编辑器中黏贴内容是触发
+ decorators:      decorators
+ initialize:      调用插件时的初始化方法
+ LinkComponent:   React组件，提供添加链接和移除链接功能
### *video插件*
插入视屏功能

```
    export default (Component,config)=>{initialize,decorators,VideoComponent }
```
> 参数说明
+ Component React组件，默认使用antd中的Button
+ config:

| Name                      | Type                                           | Description                                                                                 |
| ------------------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------- |
| decorator                 |  Function                                      | 包装器，用于包裹wrapperImage组件                                                               |
| wrapperComponent              | new() => React.Component<any,any>              | Block的展现组件                                                                                | 

> 返回值说明
+ decorators:      decorators
+ initialize:      调用插件时的初始化方法
+ VideoComponent:  React组件，提供添加视屏功能

### *draft-js-plugins插件列表*
+ draft-js-linkify-plugin
+ draft-js-hashtag-plugin
+ draft-js-emoji-plugin
+ draft-js-focus-plugin
+ draft-js-plugins-editor
+ draft-js-autosave-plugin