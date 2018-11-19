# statusTags
一个 tag 标签组件，根据用户提供的模板，和数据生成tags，提供了 增、删、排序、数据重载等功能。
## 效果图

![image](https://images.gitee.com/uploads/images/2018/1119/210008_60bcfcfc_1994789.gif)

##使用


```
// 调用 render 方法
/**
* @title 代表tag的值所在的位置
* @remove 放在类（class）属性中，代表点击该元素触发删除事件
*/
var tag = statusTags.render({
            el: "#tags",
            template: '<li class="mb-2">' +
              '<span class="text">@title</span>' +             
              '<button class="remove @remove">Remove</button>' + 
              '</li>',
            data: [Layui','LayuiAdmin','React'],
            sort: 'asc' //排序方式 asc: 升序、desc: 降序 
      });


// 调用方法

// 添加
$('.add').on('click', function () {
    tag.add($('#input').val());
    $('#input').val('');
})

// 清空
$('.empty').on('click', function () {
    tag.empty();
})

// 获取数据
$('.getdata').on('click', function () {
    console.log(tag.getData());
})

// 重载
$('.reload').on('click', function () {
    tag.reload({
        data: ['Layui','Vue'],
    });
})

// 排序： toggle表示切换排序方式
$('.sort').on('click', function () {
    tag.sort('toggle');
})
            

```



## 参数

| 参数     | 类型         | 说明                                                             |
| -------- | ------------ | ---------------------------------------------------------------- |
| el       | string / DOM | 渲染tag项的容器                                                  |
| data     | array        | tags 数据                                                        |
| template | string       | tag 的模板 ，在模板中添加 @title 代表会被替换为tag的值， 某个元素的class中添加@remove 代表点击该元素触发删除事件                                                      |
| sort     | string       | 排序，asc / desc ，默认asc                                       |
| title    | string       | 如果每一项tag的数据是一个对象时，需要指定显示那个属性，默认title |

## 方法

| 方法    | 说明                        |
| ------- | --------------------------- |
| add     | 添加tag，参数：value        |
| remove  | 删除tag，参数：value        |
| empty   | 清空 tags ，参数：无        |
| getData | 获取tags数据                |
| reload  | 数据重载，参数:options      |
| sort    | 排序，参数：asc/desc/toggle |
