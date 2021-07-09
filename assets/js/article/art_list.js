$(function() {
    var laypage = layui.laypage
    template.defaults.imports.dataFormat = function(data) {
        var dt = new Date(data)
        let y = padZero(dt.getFullYear())
        let m = padZero(dt.getMonth() + 1)
        let d = padZero(dt.getDate)

        let hh = padZero(dt.getHours())
        let mm = padZero(dt.getMinutes())
        let ss = padZero(dt.getSeconds())

        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }

    function padZero(n) {
        return n < 10 ? '0' + n : n
    }




    var q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
    }


    getArticleList()
    initCate()

    function getArticleList() {
        $.get('/my/article/list', q, function(res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            var htmlStr = template('tlp-table', res.data)
            $('tbody').html(htmlStr)
            renderPage(res.total)
        })
    }

    function initCate() {
        $.get('/my/article/cates', function(res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            // console.log(res);
            var htmlStr = template('tlp-cate', res)
            $('[name=cate_id]').html(htmlStr)
            layui.form.render()

        })
    }
    $('#form_search').on('submit', function(e) {
        e.preventDefault();
        var cate_id = $('[name=cate_id]').val()
        var state = $('[name=state]').val()
        q.cate_id = cate_id
        q.state = state
        getArticleList()
    })

    function rederPage(total) {

        // console.log(total);
    }


    // 定义渲染分页的方法
    function renderPage(total) {
        // 调用 laypage.render() 方法来渲染分页的结构
        laypage.render({
            elem: 'pageBox', // 分页容器的 Id
            count: total, // 总数据条数
            limit: q.pagesize, // 每页显示几条数据
            curr: q.pagenum, // 设置默认被选中的分页
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            // 分页发生切换的时候，触发 jump 回调
            // 触发 jump 回调的方式有两种：
            // 1. 点击页码的时候，会触发 jump 回调
            // 2. 只要调用了 laypage.render() 方法，就会触发 jump 回调
            jump: function(obj, first) {
                // 可以通过 first 的值，来判断是通过哪种方式，触发的 jump 回调
                // 如果 first 的值为 true，证明是方式2触发的
                // 否则就是方式1触发的
                console.log(first)
                console.log(obj.curr)
                    // 把最新的页码值，赋值到 q 这个查询参数对象中
                q.pagenum = obj.curr
                    // 把最新的条目数，赋值到 q 这个查询参数对象的 pagesize 属性中
                q.pagesize = obj.limit
                    // 根据最新的 q 获取对应的数据列表，并渲染表格
                    // initTable()
                if (!first) {
                    getArticleList()
                }
            }
        })
    }

})