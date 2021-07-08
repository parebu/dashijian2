$(function() {
    var layer = layui.layer
    var form = layui.form
    infoUserInfo()
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称长度必须在1~6个字符之间'
            }
        }

    })



    function infoUserInfo() {

        $.get('/my/userinfo', function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            form.val('userInfo', res.data)
        })
    }


    $('#btnReset').on('click', function(e) {
        e.preventDefault();
        infoUserInfo()
    })


    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        $.post('/my/userinfo', $(this).serialize(), function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg(res.message)
            window.parent.getUserInfo()
        })
    })
})