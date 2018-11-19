/**
 * @ Name： statusTags 提供标签增删改的功能，根据提供的样式进行渲染
 * @ Author： YWang
 * @ License： MIT 
 */

layui.define('jquery', function (exports) {
  var $ = layui.$

    // 字符常量
    ,
    MO_NAME = 'statusTags',
    MO_ATTR = 'data-Tagindex'

    // 外部接口
    ,
    statusTags = {

      // 设置全局项
      set: function (options) {
          var that = this;
          that.config = $.extend({}, that.config, options);
          return that;
        }
        // 数据监听
        ,
      on: function (name, events, callback) {
        return layui.onevent.call(this, MO_NAME + name, events, callback);
      }
    }

    // 操作当前实例
    ,
    thisIns = function () {
      var that = this;

      return {
        // 添加
        add: function (options) {
            that.add.call(that, options);
          }

          // 删除
          ,
        remove: function (options) {
            that.remove.call(that, options);
          }

          // 清空
          ,
        empty: function () {
            that.empty.call(that);
          }

          // 获取数据
          ,
        getData: function () {
            return that.getData.call(that);
          }

          // 数据重载
          ,
        reload: function (options) {
            that.reload.call(that, options);
          }

          // 排序
          ,
        sort: function (value) {
          that.sort.call(that, value);
        }
      }
    }

    // 构造器
    ,
    Class = function (options) {
      var that = this;
      that.config = $.extend({}, that.config, statusTags.config, options);
      that.render();
    };

  // 默认参数
  Class.prototype.config = {
    // 基础配置
    el: '',
    data: [],
    template: '',
    i: 0,
    sort: 'asc',

    // tag 是对象时额外配置
    isObj: false,
    title: "title"

    // 异步获取数据时额外配置


  };

  // 初始化
  Class.prototype.render = function () {
    var that = this,
      options = that.config,
      isStr = false;

    options.el = typeof (options.el) === 'string' ? $(options.el) : options.el;

    // 判断数据类型

    options.isObj = options.data.every(function (item) {
      return typeof item === 'object'
    })

    isStr = options.data.every(function (item) {
      return typeof item === 'string'
    })

    isStr || options.isObj ? that.renderView() : layui.hint().error('传入的数据不符合数据类型');



  };

  // 渲染视图
  Class.prototype.renderView = function () {
    var that = this,
      options = that.config,
      el = options.el;

    el.html('');

    // 添加 tag 选项
    options.data.forEach(function (item) {
      var value = options.isObj ? item[options.title] : item,
        html = $(options.template.replace(/\@title/g, value).replace(/\@remove/g, 'layui-' + MO_NAME + '_remove'));
      html.attr(MO_ATTR, options.i);
      html.find('.layui-' + MO_NAME + '_remove').on('click', that.remove.bind(that, value, options.i));

      if (options.sort === 'desc') {
        el.prepend(html);
      } else {
        el.append(html);
      }

      options.i++;
    })
  }

  // 添加
  Class.prototype.add = function (value) {
    var that = this,
      options = that.config,
      isExist = false;

    isExist = options.data.some(function (item) {
      if (options.isObj) {
        return item[options.title] === value[options.title];
      } else {
        return item === value;
      }
    })

    if (!isExist && value.trim()) {
      options.data.push(value);
      var val = options.isObj ? value[options.title] : value,
        html = $(options.template.replace(/\@title/g, val).replace(/\@remove/g, 'layui-' + MO_NAME + '_remove'));
      html.attr(MO_ATTR, options.i);
      html.find('.layui-' + MO_NAME + '_remove').on('click', that.remove.bind(that, val, options.i));
      if (options.sort === 'desc') {
        options.el.prepend(html);
      } else {
        options.el.append(html);
      }
      options.i++;
    }
  };

  // 删除 tag
  Class.prototype.remove = function (value, i, ele) {
    var that = this,
      options = that.config,
      index = -1;

    options.el.find('[' + MO_ATTR + '=' + i + ']').remove();
    if (options.isObj) {
      value = options.data.filter(item => {
        return item[options.title] === value

      })
    }
    index = options.data.indexOf(value);

    if (index != -1) {
      options.data.splice(index, 1);
    }


  };

  // 清空
  Class.prototype.empty = function () {
    var that = this,
      options = that.config;
    options.data = [];
    options.el.html('');
    options.i = 0;
  };

  // 获取数据
  Class.prototype.getData = function () {
    var that = this,
      options = that.config;
    return options.data;
  }

  // 数据重载
  Class.prototype.reload = function (options) {
    var that = this;
    that.config.i = 0;
    that.config = $.extend({}, that.config, options);
    that.render();
  };

  // 排序
  Class.prototype.sort = function (value) {
    var that = this;
    if ((value !== that.config.sort) && (value === 'toggle' || value === 'asc' || value === 'desc')) {
      if (value === 'toggle') {
        that.config.sort = that.config.sort === 'asc' ? 'desc' : 'asc';
      } else {
        that.config.sort = value;
      }
      that.render();
    }

  };

  // 核心入口
  statusTags.render = function (options) {
    var ins = new Class(options);
    return thisIns.call(ins);
  };

  // 输出插件
  exports('statusTags', statusTags);


})