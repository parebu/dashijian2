$(function() {

    getUserInfo()

    $('#btn').on('click', function() {
        layer.confirm('确认退出?', { icon: 3, title: '提示' }, function(index) {
            //do something

            layer.close(index);
            localStorage.removeItem('token')
            location.href = '/login.html'
        })
    })




    function getUserInfo() {
        $.get('/my/userinfo', function(res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }

            layui.layer.msg(res.message)
            console.log(res);
            renderAvatar(res.data)
        })
    }

    function renderAvatar(data) {
        var name = data.username || data.nickname
        $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
        if (data.user_pic !== null) {
            $('.layui-nav-img').attr('src', data.user_pic).val()
            $('.text-avatar').hide()
        } else {
            $('.layui-nav-img').hide()
            var first = name[0].toUpperCase()
            $('.text-avatar').html(first).show()
        }
    }
})