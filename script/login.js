$(function(){
    $('#login').live('click', function(){
        var account = $("#account").val();
        var password = $.md5($("#password").val());
        
        $.ajax({
            url: '/Authentication/Login',
            async: false,
            type: 'POST',
            data: {
                a: account,
                p: password
            },
            success: function(response) {
                if (response == "200")
                    window.location = "/";
                else if (response == "201")
                    alert("登入失敗：帳號或密碼錯誤");
                else if (response == "202")
                    alert("登入失敗：已登入");   
                else if (response == "203")
                    alert("登入失敗：您的帳號尚末審核");
            }
        });
    });
    
    $('#regist').live('click', function(){
        $('#dialog').hide();
        $('#registdialog').show();
    });
    
    $('#apply').live('click', function(){
        var account = $('#regaccount').val();
        var password1 = $('#regpassword').val();
        var password2 = $('#regpassword2').val();
        
        if (account == "")
            alert("帳號不可為空");
        else if (password1 == "")
            alert("密碼不可為空");
        else if (password1 != password2)
            alert("密碼不一致");
        else {
            $.ajax({
            url: '/Authentication/Register',
            async: false,
            type: 'POST',
            data: {
                a: account,
                p: $.md5(password1)
            },
            success: function(response) {
                if (response == "300")
                    window.location = "/";
                else if (response == "301")
                    alert("帳號已被申請");
            }
        });
        }
    });
    
    $('#cancle').live('click', function(){
        $('#dialog').show();
        $('#registdialog').hide();
        
        $('#regaccount').val() = "";
        $('#regpassword').val() = "";
        $('#regpassword2').val() = "";
    });
});
