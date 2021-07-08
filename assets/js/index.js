$(function() {
    getUserInfo()
    var layer = layui.layer
    $('#btn').on('click', function() {
        layer.confirm('确认退出？', { icon: 3, title: '提示' }, function(index) {
            //do something

            //清空本地存储中的token
            layer.close(index);
            localStorage.removeItem('token')
                // 重新跳转到登陆页面
            location.href = '/login.html'
                // 关闭confirm 询问框

        })
    })
})


function getUserInfo() {
    $.get('/my/userinfo', function(res) {
        if (res.status !== 0) {
            return layer.msg(res.message)
        }



        renderAvatar(res.data)
    })
}

function renderAvatar(data) {
    var name = data.nickname || data.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    if (data.user_pic !== null) {
        $('.layui-nav-img').attr('src', data.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}