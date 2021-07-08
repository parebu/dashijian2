$(function() {

    var form = layui.form
    form.verify({


        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        samePwd: function(value) {
            var pwd = $('[name=oldPwd]').val()
            if (pwd === value) {
                return '新旧密码不能重复'
            }

        },
        rePwd: function(value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次输入不一样'
            }
        }

    })

    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        $.post('/my/updatepwd', $('.layui-form').serialize(), function(res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            layui.layer.msg(res.message)

            $('.layui-form')[0].reset()
        })
    })
})