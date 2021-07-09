$(function() {
    gitArtilce()

    function gitArtilce() {
        $.get('/my/article/cates', function(res) {

            var htmlStr = template('tpl_table', res)

            $('tbody').html(htmlStr)
        })
    }

    var indexAdd = null
    $('#btnAdd').on('click', function() {
        indexAdd = layui.layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#add').html()
        });
    })

    $('body').on('submit', '#form-add', function(e) {
        e.preventDefault();
        $.post('/my/article/addcates', $(this).serialize(), function(res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }

            layui.layer.msg(res.message)
            gitArtilce()
            layer.close(indexAdd)

        })
    })

    var indexEdit = null
    $('body').on('click', '#btnEdit', function() {
        indexEdit = layui.layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#edit').html()
        });

        var id = $(this).attr('data-id')
        $.get('/my/article/cates/' + id, function(res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }

            layui.form.val('form-edit', res.data)

        })
    })


    $('body').on('submit', '#form-edit', function(e) {
        e.preventDefault()
        $.post('/my/article/updatecate', $(this).serialize(), function(res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }

            layer.close(indexEdit)
            layui.layer.msg(res.message)
            gitArtilce()
        })
    })
    $('body').on('click', '#btnDel', function() {
        var id = $(this).attr('data-id')
        layui.layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
            $.get('/my/article/deletecate/' + id, function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg(res.message)
                layer.close(index)
                gitArtilce()
            })
        })

    });

})