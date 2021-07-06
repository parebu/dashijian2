$(function() {

    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })


    var form = layui.form
    var layer = layui.layer
        //通过form.verify（）函数自定义校验规则
    form.verify({
            pwd: [
                /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
            ],

            repwd: function(value) {
                var pwd = $('.reg-box [name=password]').val()
                if (pwd !== value) {
                    return '两次密码不一样'
                }
            }


        })
        // 注册页面绑定事件


    $('#form_reg').on('submit', function(e) {
        e.preventDefault();
        var data = {
            username: $('#form_reg[name=username]').val(),
            password: $('#form_reg[name=password]').val()
        }
        $.post('/api/reguser', data, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg(res.message)

            $('#link_login').click()
        })
    })


    $('#form_login').on('submit', function(e) {
        e.preventDefault()
        var data = {
            username: $('#form_login[name=username]').val(),
            password: $('#form_login[name=password]').val()
        }
        $.post('/api/login', data, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('登陆成功')
            console.log(res);
            localStorage.setItem('token', res.token)
            location.href = '/index.html'
        })
    })
})