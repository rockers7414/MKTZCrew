$(function () {
    $('#center').html($('<div>').attr('class', 'hometitle'));
    $(document).ready(function () {
        $.ajax({
            url: '/Data/AnnouncementMGR',
            async: false,
            type: 'POST',
            dataType: 'json',
            data: {
                r: 'list'
            },
            success: function (response) {
                var table = $('<table>').attr({
                    id: 'list'
                });
                var tr = $('<tr>');
                tr.append($('<th>').html('標題').attr({
                    width: '70px'
                }))
                    .append($('<th>').html('內容'))
                    .append($('<th>').html('日期').attr({
                        width: '160px'
                    }));
                table.append(tr);
                $.each(response, function () {
                    var tr = $('<tr>');
                    tr.append($('<td>').html(this.title))
                        .append($('<td>').html(this.content).css('text-align', 'left'))
                        .append($('<td>').html(this.udate));

                    table.append(tr);
                });
                $('#center').append(table);
            }
        });
        $('#center').attr('class', 'home');
    });

    $('#file').live('click', function () {
        $('#center').html($('<div>').attr('class', 'filetitle'));
        $.ajax({
            url: '/Data/FileMGR',
            async: false,
            type: 'POST',
            dataType: 'json',
            data: {
                r: 'list'
            },
            success: function (response) {
                if (response == "401") {
                    alert("權限不足");
                    location.reload();
                } else {
                    var table = $('<table>').attr({
                        id: 'list'
                    }).css('clear', 'none');
                    var tr = $('<tr>');
                    tr.append($('<th>').html('檔名').attr({
                        width: '150px'
                    }))
                        .append($('<th>').html('說明'))
                        .append($('<th>').html('日期').attr({
                            width: '160px'
                        }));
                    table.append(tr);
                    $.each(response, function () {
                        var tr = $('<tr>');
                        tr.append($('<td>').html($('<a>').attr({
                            href: this.link,
                            target: 'view_window'
                        }).html(this.name)).append($('<p>').html("MD5:" + this.md5)))
                            .append($('<td>').html(this.desc).css('text-align', 'left'))
                            .append($('<td>').html(this.date));

                        table.append(tr);
                    });
                    $('#center').append(table);
                }
            }
        });
        $('#center').attr('class', 'file');
    });

    $('#home').live('click', function () {
        $('#center').html($('<div>').attr('class', 'hometitle'));
        $.ajax({
            url: '/Data/AnnouncementMGR',
            async: false,
            type: 'POST',
            dataType: 'json',
            data: {
                r: 'list'
            },
            success: function (response) {
                if (response == "401") {
                    alert("權限不足");
                    location.reload();
                } else {
                    var table = $('<table>').attr({
                        id: 'list'
                    });
                    var tr = $('<tr>');
                    tr.append($('<th>').html('標題').attr({
                        width: '70px'
                    }))
                        .append($('<th>').html('內容'))
                        .append($('<th>').html('日期').attr({
                            width: '160px'
                        }));
                    table.append(tr);
                    $.each(response, function () {
                        var tr = $('<tr>');
                        tr.append($('<td>').html(this.title))
                            .append($('<td>').html(this.content).css('text-align', 'left'))
                            .append($('<td>').html(this.udate));

                        table.append(tr);
                    });
                    $('#center').append(table);
                }
            }
        });
        $('#center').attr('class', 'home');
    });

    $('#jobratio').live('click', function () {
        $('#center').html($('<div>').attr('class', 'jobratiotitle'));
        var div = $('<div>').attr({
            id: 'chart'
        });
        $('#center').append(div);

        $.ajax({
            url: '/Data/MemberMGR',
            async: false,
            type: 'POST',
            dataType: 'json',
            data: {
                r: 'list'
            },
            success: function (response) {
                var ro = 0;
                var kn = 0;
                var ef = 0;
                var ma = 0;
                var de = 0;
                var dk = 0;
                var il = 0;
                var sum = 0;
                $.each(response, function () {
                    switch (this.Job) {
                    case "ro":
                        ro++;
                        break;
                    case "kn":
                        kn++;
                        break;
                    case "ef":
                        ef++;
                        break;
                    case "ma":
                        ma++;
                        break;
                    case "de":
                        de++;
                        break;
                    case "dk":
                        dk++;
                        break;
                    case "il":
                        il++;
                        break;
                    }
                    sum++;
                });

                var data = [
                    ['王族(' + (ro / sum * 100).toFixed(2) + '%)', ro],
                    ['騎士(' + (kn / sum * 100).toFixed(2) + '%)', kn],
                    ['妖精(' + (ef / sum * 100).toFixed(2) + '%)', ef],
                    ['法師(' + (ma / sum * 100).toFixed(2) + '%)', ma],
                    ['黑暗妖精(' + (de / sum * 100).toFixed(2) + '%)', de],
                    ['龍騎士(' + (dk / sum * 100).toFixed(2) + '%)', dk],
                    ['幻術師(' + (il / sum * 100).toFixed(2) + '%)', il]
                ];

                var plot1 = jQuery.jqplot('chart', [data], {
                    seriesColors: ["#579575", "#d8b83f", "#ff5800", "#0085cc", "#4bb2c5", "#9900FF", "#FFFF00"],
                    seriesDefaults: {
                        renderer: jQuery.jqplot.PieRenderer,
                        rendererOption: {
                            showDataLables: true
                        }
                    },
                    grid: {
                        background: 'rgba(255,0,0,0)',
                        borderColor: 'rgba(255,0,0,0)'
                    },
                    legend: {
                        show: true,
                        location: 'e'
                    }
                });
            }
        });
        $('#center').attr('class', 'jobratio');
    });

    $('#claninfo').live('click', function () {
        $('#center').html($('<div>').attr('class', 'claninfotitle'));
        $.ajax({
            url: '/Data/ClanInfo',
            async: false,
            type: 'POST',
            dataType: 'json',
            data: {
                r: 'info'
            },
            success: function (response) {
                if (response == "401") {
                    alert("權限不足");
                    location.reload();
                } else {
                    $('#center').append($('<div>').html(response[0]).attr({
                        id: 'content'
                    }).css('text-align', 'left').css('color', 'white').css('display', 'inline-block').css('width', '750px'));
                }
            }
        });
        $('#center').attr('class', 'claninfo');
    });

    $('#logout').live('click', function () {
        $.ajax({
            url: '/Authentication/Logout',
            async: false,
            type: 'POST',
            success: function (response) {
                location.reload();
            }
        });
    });

    $('a[name="job"]').live('click', function () {
        $('#center').html($('<div>').attr('class', 'ranktitle'));
        $.ajax({
            url: '/Data/MemberMGR',
            async: false,
            type: 'POST',
            dataType: 'json',
            data: {
                r: 'list',
                job: this.id
            },
            success: function (response) {
                if (response == "401") {
                    alert("權限不足");
                    location.reload();
                } else {
                    var div = $('<div>').attr({
                        id: 'joblist'
                    });
                    var ul = $('<ul>').append($('<li>').append($('<a>').attr({
                        href: 'javascript:void(0);',
                        name: 'job',
                        id: 'ro'
                    }).html('王族')))
                        .append($('<li>').append($('<a>').attr({
                            href: 'javascript:void(0);',
                            name: 'job',
                            id: 'kn'
                        }).html('騎士')))
                        .append($('<li>').append($('<a>').attr({
                            href: 'javascript:void(0);',
                            name: 'job',
                            id: 'ef'
                        }).html('妖精')))
                        .append($('<li>').append($('<a>').attr({
                            href: 'javascript:void(0);',
                            name: 'job',
                            id: 'ma'
                        }).html('法師')))
                        .append($('<li>').append($('<a>').attr({
                            href: 'javascript:void(0);',
                            name: 'job',
                            id: 'de'
                        }).html('黑暗妖精')))
                        .append($('<li>').append($('<a>').attr({
                            href: 'javascript:void(0);',
                            name: 'job',
                            id: 'dk'
                        }).html('龍騎士')))
                        .append($('<li>').append($('<a>').attr({
                            href: 'javascript:void(0);',
                            name: 'job',
                            id: 'il'
                        }).html('幻術師')));
                    div.html(ul);
                    $('#center').append(div);

                    var table = $('<table>').attr({
                        id: 'list'
                    });
                    var tr = $('<tr>');
                    tr.append($('<th>').html('名次').attr({
                        width: '50px'
                    }))
                        .append($('<th>').html('名稱'))
                        .append($('<th>').html('職業').attr({
                            width: '70px'
                        }))
                        .append($('<th>').html('等級').attr({
                            width: '70px'
                        }))
                        .append($('<th>').html('更新日期').attr({
                            width: '200px'
                        }));
                    table.append(tr);
                    var lv_sum = 0;
                    var lv_aver = 0;
                    var number = 0;
                    $.each(response, function (index) {
                        var tr = $('<tr>');
                        tr.append($('<td>').html(index + 1));
                        tr.append($('<td>').html(this.ID));
                        switch (this.Job) {
                        case "ro":
                            tr.append($('<td>').html('王族'));
                            break;
                        case "kn":
                            tr.append($('<td>').html('騎士'));
                            break;
                        case "ef":
                            tr.append($('<td>').html('妖精'));
                            break;
                        case "ma":
                            tr.append($('<td>').html('法師'));
                            break;
                        case "de":
                            tr.append($('<td>').html('黑暗妖精'));
                            break;
                        case "dk":
                            tr.append($('<td>').html('龍騎士'));
                            break;
                        case "il":
                            tr.append($('<td>').html('幻術師'));
                            break;
                        default:
                            tr.append($('<td>').html('null'));
                            break;
                        }
                        tr.append($('<td>').html(this.Level));
                        if (this.Level != "null") {
                            lv_sum += this.Level;
                            lv_aver = lv_sum / ++number;
                        }
                        tr.append($('<td>').html(this.Date_level));

                        table.append(tr);
                    });

                    $('#center').append($('<div>').attr({
                        id: 'updatediv'
                    })).append($('<div>').attr({
                        id: 'averdiv'
                    }).html('平均等級：' + lv_aver)).append(table);
                    $('#list').css('clear', 'none');
                }
            }
        });
    });

    $('#rank').live('click', function () {
        $('#center').html($('<div>').attr('class', 'ranktitle'));
        $.ajax({
            url: '/Data/MemberMGR',
            async: false,
            type: 'POST',
            dataType: 'json',
            data: {
                r: 'list'
            },
            success: function (response) {
                if (response == "401") {
                    alert("權限不足");
                    location.reload();
                } else {
                    var div = $('<div>').attr({
                        id: 'joblist'
                    });
                    var ul = $('<ul>').append($('<li>').append($('<a>').attr({
                        href: 'javascript:void(0);',
                        name: 'job',
                        id: 'ro'
                    }).html('王族')))
                        .append($('<li>').append($('<a>').attr({
                            href: 'javascript:void(0);',
                            name: 'job',
                            id: 'kn'
                        }).html('騎士')))
                        .append($('<li>').append($('<a>').attr({
                            href: 'javascript:void(0);',
                            name: 'job',
                            id: 'ef'
                        }).html('妖精')))
                        .append($('<li>').append($('<a>').attr({
                            href: 'javascript:void(0);',
                            name: 'job',
                            id: 'ma'
                        }).html('法師')))
                        .append($('<li>').append($('<a>').attr({
                            href: 'javascript:void(0);',
                            name: 'job',
                            id: 'de'
                        }).html('黑暗妖精')))
                        .append($('<li>').append($('<a>').attr({
                            href: 'javascript:void(0);',
                            name: 'job',
                            id: 'dk'
                        }).html('龍騎士')))
                        .append($('<li>').append($('<a>').attr({
                            href: 'javascript:void(0);',
                            name: 'job',
                            id: 'il'
                        }).html('幻術師')));
                    div.html(ul);
                    $('#center').append(div);

                    var table = $('<table>').attr({
                        id: 'list'
                    });
                    var tr = $('<tr>');
                    tr.append($('<th>').html('名次').attr({
                        width: '50px'
                    }))
                        .append($('<th>').html('名稱'))
                        .append($('<th>').html('職業').attr({
                            width: '70px'
                        }))
                        .append($('<th>').html('等級').attr({
                            width: '70px'
                        }))
                        .append($('<th>').html('更新日期').attr({
                            width: '200px'
                        }));
                    table.append(tr);
                    var lv_sum = 0;
                    var lv_aver = 0;
                    var number = 0;
                    $.each(response, function (index) {
                        var tr = $('<tr>');
                        tr.append($('<td>').html(index + 1));

                        if (index < 3) {
                            tr.append($('<td>').html(this.ID).css('background-image', 'url("/css/winner.png")').css('background-position', 'left').css('background-repeat', 'no-repeat'));
                            tr.css('background-color', '#324696');
                        } else if (index + 1 == response.length) {
                            tr.append($('<td>').html(this.ID).css('background-image', 'url("/css/loser.png")').css('background-position', 'left').css('background-repeat', 'no-repeat'));
                            tr.css('background-color', '#963232');
                        } else
                            tr.append($('<td>').html(this.ID));

                        switch (this.Job) {
                        case "ro":
                            tr.append($('<td>').html('王族'));
                            break;
                        case "kn":
                            tr.append($('<td>').html('騎士'));
                            break;
                        case "ef":
                            tr.append($('<td>').html('妖精'));
                            break;
                        case "ma":
                            tr.append($('<td>').html('法師'));
                            break;
                        case "de":
                            tr.append($('<td>').html('黑暗妖精'));
                            break;
                        case "dk":
                            tr.append($('<td>').html('龍騎士'));
                            break;
                        case "il":
                            tr.append($('<td>').html('幻術師'));
                            break;
                        default:
                            tr.append($('<td>').html('null'));
                            break;
                        }
                        tr.append($('<td>').html(this.Level));
                        if (this.Level != "null") {
                            lv_sum += this.Level;
                            lv_aver = lv_sum / ++number;
                        }
                        tr.append($('<td>').html(this.Date_level));

                        table.append(tr);
                    });

                    $('#center').append($('<div>').attr({
                        id: 'updatediv'
                    })).append($('<div>').attr({
                        id: 'averdiv'
                    }).html('平均等級：' + lv_aver)).append(table);
                }
            }
        });
        $('#center').attr('class', 'rank');
        $('#list').css('clear', 'none');
    });

    $('#membercentermgr').live('click', function () {
        $('#center').attr('class', 'membercenter').css('text-align', 'left');
        var ul = $('<ul>').append($('<li>').append($('<a>').attr({
            href: 'javascript:void(0);',
            id: 'updatememberInfo'
        }).html('更新個人資料')));
        var div = $('<span>').attr({
            id: 'form'
        }).css('display', 'inline-block');
        div.html($('<span>').html('舊  密  碼：')).append($('<input>').attr({
            type: 'password',
            id: 'oldpassword'
        }).css('width', '200px')).append("</br>")
            .append($('<span>').html('新  密  碼：')).append($('<input>').attr({
                type: 'password',
                id: 'newpassword1'
            }).css('width', '200px')).append("</br>")
            .append($('<span>').html('確認密碼：')).append($('<input>').attr({
                type: 'password',
                id: 'newpassword2'
            }).css('width', '200px')).append("<hr />")
            .append($('<span>').html('論壇帳號：')).append($('<input>').attr({
                type: 'text',
                id: 'forumaccount'
            }).css('width', '200px')).append("</br>")
            .append($('<span>').html('論壇密碼：')).append($('<input>').attr({
                type: 'password',
                id: 'forumpassword'
            }).css('width', '200px')).append("<hr />");

        for (i = 1; i <= 15; i++) {
            div.append($('<span>').html('樣式' + i + '：')).append('</br>').append($('<textarea>').attr({
                rows: '5',
                cols: '60',
                id: 'content' + i
            })).append("</br>");
        }

        div.append($('<div>').html($('<a>').attr({
                href: 'javascript:void(0)',
                id: 'canclememberInfo'
            }).html('取消'))
            .append($('<a>').attr({
                href: 'javascript:void(0)',
                id: 'submitmemberInfo'
            }).html('送出')));

        $('#center').html($('<div>').html(ul).attr({
            id: 'submenu'
        })).append(div);
        div.hide();

        $.ajax({
            url: '/Data/MemberMGR',
            async: false,
            type: 'POST',
            dataType: 'json',
            data: {
                r: 'pinfo'
            },
            success: function (response) {
                if (response == "401") {
                    alert("權限不足");
                    location.reload();
                } else {
                    var div = $('#center').append('</br>');
                    div.append($('<span>').html('論壇帳號：').css('color', 'white')).append($('<span>').html(response.a).css('color', '#AAA')).append('</br>')
                        .append($('<span>').html('論壇密碼：').css('color', 'white')).append($('<span>').html(response.p).css('color', '#AAA')).append('<hr />');

                    $.each(response.pc, function (index, value) {
                        div.append($('<span>').html('樣式' + index + '：').css('color', 'white')).append('</br>')
                            .append($('<span>').html(value).css('color', '#AAA')).append('</br>');
                    });
                }
            }
        });
    });

    $('#submitmemberInfo').live('click', function () {
        var oldpassword = $('#oldpassword').val();
        var newpassword1 = $('#newpassword1').val();
        var newpassword2 = $('#newpassword2').val();

        var forumaccount = $('#forumaccount').val();
        var forumpassword = $('#forumpassword').val();

        var postcontent = new Array();

        for (i = 1; i <= 15; i++) {
            postcontent[i - 1] = $('#content' + i).val().replace(/(\r\n|[\r\n])/g, '<br />');
        }

        if (oldpassword == "") {
            alert('請輸入原密碼');
        } else if (newpassword1 != newpassword2) {
            alert('新密碼確認失敗');
        } else {
            oldpassword = $.md5(oldpassword);
            if (newpassword1 != "")
                newpassword1 = $.md5(newpassword1);

            $.ajax({
                url: '/Data/MemberMGR',
                async: false,
                type: 'POST',
                dataType: 'json',
                data: {
                    r: 'uinfo',
                    op: oldpassword,
                    np: newpassword1,
                    fa: forumaccount,
                    fp: forumpassword,
                    plist: $.toJSON(postcontent)
                },
                success: function (response) {
                    if (response == "401") {
                        alert("權限不足");
                        location.reload();
                    } else if (response == "302") {
                        alert("更新成功");
                        $('#membercentermgr').trigger('click');
                    } else if (response == "204") {
                        alert("密碼錯誤");
                        $('#membercentermgr').trigger('click');
                    }
                }
            });
        }
    });

    $('#updatememberInfo').live('click', function () {
        $.ajax({
            url: '/Data/MemberMGR',
            async: false,
            type: 'POST',
            dataType: 'json',
            data: {
                r: 'pinfo'
            },
            success: function (response) {
                if (response == "401") {
                    alert("權限不足");
                    location.reload();
                } else {
                    $('#forumaccount').val(response.a);
                    $('#forumpassword').val(response.p);

                    $.each(response.pc, function (index, value) {
                        var i = index + 1;
                        var content = value.replace(/<br\s*[\/]?>/gi, '\n');
                        $('#content' + i).val(content);
                    });
                    $('#form').slideToggle('medium', function () {
                        if ($('#form').is(':visible'))
                            $('#form').css('display', 'inline-block');
                    });
                }
            }
        });
    });

    $('#canclememberInfo').live('click', function () {
        $('#form').slideUp();
    });

    $('#post').live('click', function () {
        var ul = $('<ul>').append($('<li>').append($('<a>').attr({
            href: 'javascript:void(0);',
            id: 'newpost'
        }).html('發佈留言')));
        var div = $('<div>').attr({
            id: 'form'
        });
        div.html($('<span>').html('標題：')).append($('<input>').attr({
            type: 'text',
            id: 'title'
        }).css('width', '200px'))
            .append($('<input>').attr({
                type: 'checkbox',
                id: 'hide'
            }).css('width', '20px')).append($('<span>').html('僅守護騎士可見')).append("</br>")
            .append($('<textarea>').attr({
                rows: '5',
                cols: '60',
                id: 'content'
            })).append("</br>")
            .append($('<div>').html($('<a>').attr({
                    href: 'javascript:void(0)',
                    id: 'cancelpost'
                }).html('取消'))
                .append($('<a>').attr({
                    href: 'javascript:void(0)',
                    id: 'submitpost'
                }).html('送出')));
        $('#center').html($('<div>').html(ul).attr({
            id: 'submenu'
        })).append(div);
        div.hide();

        $.ajax({
            url: '/Data/PostMGR',
            async: false,
            type: 'POST',
            dataType: 'json',
            data: {
                r: 'postlist'
            },
            success: function (response) {
                var table = $('<table>').attr({
                    id: 'list'
                });
                var tr = $('<tr>');
                tr.append($('<th>').html('標題'))
                    .append($('<th>').html('作者').attr({
                        width: '120px'
                    }))
                    .append($('<th>').html('日期').attr({
                        width: '160px'
                    }));
                table.append(tr);
                $.each(response, function () {
                    var tr = $('<tr>');

                    if (this.hide == true) {
                        tr.css('background-color', '#324696');
                        tr.append($('<td>').html($('<a>').html(this.title + " (僅守護騎士可見)").attr({
                            name: 'postid',
                            id: this.date,
                            href: 'javascript:void(0);'
                        })).css('text-align', 'left'));
                    } else {
                        tr.append($('<td>').html($('<a>').html(this.title).attr({
                            name: 'postid',
                            id: this.date,
                            href: 'javascript:void(0);'
                        })).css('text-align', 'left'));
                    }

                    tr.append($('<td>').html(this.author))
                        .append($('<td>').html(this.date));

                    table.append(tr);
                });
                $('#center').append(table);
            }
        });
    });

    $('#newpost').live('click', function () {
        var div = $('#form');
        div.html($('<span>').html('標題：')).append($('<input>').attr({
            type: 'text',
            id: 'title'
        }).css('width', '200px'))
            .append($('<input>').attr({
                type: 'checkbox',
                id: 'hide'
            }).css('width', '20px')).append($('<span>').html('僅守護騎士可見')).append("</br>")
            .append($('<textarea>').attr({
                rows: '5',
                cols: '60',
                id: 'content'
            })).append("</br>")
            .append($('<div>').html($('<a>').attr({
                    href: 'javascript:void(0)',
                    id: 'cancelpost'
                }).html('取消'))
                .append($('<a>').attr({
                    href: 'javascript:void(0)',
                    id: 'submitpost'
                }).html('送出')));

        $('#title').val('');
        $('#content').val('');

        $("#content").cleditor({
            width: 598, // width not including margins, borders or padding
            height: 250, // height not including margins, borders or padding
            controls: // controls to add to the toolbar
            "bold italic underline strikethrough | font size " +
                "style | color highlight removeformat | bullets numbering | outdent " +
                "indent | alignleft center alignright | undo redo | " +
                "rule image link unlink",
            colors: // colors in the color popup
            "FFF FCC FC9 FF9 FFC 9F9 9FF CFF CCF FCF " +
                "CCC F66 F96 FF6 FF3 6F9 3FF 6FF 99F F9F " +
                "BBB F00 F90 FC6 FF0 3F3 6CC 3CF 66C C6C " +
                "999 C00 F60 FC3 FC0 3C0 0CC 36F 63F C3C " +
                "666 900 C60 C93 990 090 399 33F 60C 939 " +
                "333 600 930 963 660 060 366 009 339 636 " +
                "000 300 630 633 330 030 033 006 309 303",
            fonts: // font names in the font popup
            "Arial,Arial Black,Comic Sans MS,Courier New,Narrow,Garamond," +
                "Georgia,Impact,Sans Serif,Serif,Tahoma,Trebuchet MS,Verdana",
            sizes: // sizes in the font size popup
            "1,2,3,4,5,6,7",
            styles: // styles in the style popup
            [
                ["Paragraph", "<p>"],
                ["Header 1", "<h1>"],
                ["Header 2", "<h2>"],
                ["Header 3", "<h3>"],
                ["Header 4", "<h4>"],
                ["Header 5", "<h5>"],
                ["Header 6", "<h6>"]
            ],
            useCSS: false, // use CSS to style HTML when possible (not supported in ie)
            docType: // Document type contained within the editor
            '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">',
            docCSSFile: // CSS file used to style the document contained within the editor
            "",
            bodyStyle: // style to assign to document body contained within the editor
            "margin:4px; font:10pt Arial,Verdana; cursor:text"
        });

        $('#submitpost').html('新增').attr({
            name: ''
        });
        $('#form').slideDown();
    });

    $('#cancelpost').live('click', function () {
        $('#form').slideUp();
    });

    $('#submitpost').live('click', function () {
        var title = $('#title').val();
        var content = $('#content').val();
        var hide = $('#hide').is(':checked');

        if (title == "")
            alert('標題不可為空白');
        else if (content == "")
            alert('內容不可為空白');
        else {
            var action;
            if (this.name == "")
                action = 'new';
            else
                action = 'update';

            $.ajax({
                url: '/Data/PostMGR',
                async: false,
                type: 'POST',
                data: {
                    r: action,
                    t: title,
                    c: content,
                    h: hide
                },
                success: function (response) {
                    if (response == "307") {
                        alert("新增成功");
                        $('#post').trigger('click');
                    } else if (response == "302") {
                        alert("更新成功");
                        $('#post').trigger('click');
                    } else if (response == "401") {
                        alert("權限不足");
                        location.reload();
                    }
                }
            });
        }
    });

    $('a[name="postid"]').live('click', function () {
        var postid = this.id;
        $.ajax({
            url: '/Data/PostMGR',
            async: false,
            type: 'POST',
            dataType: 'json',
            data: {
                r: 'postinfo',
                d: postid
            },
            success: function (response) {
                if (response == "401") {
                    alert("權限不足");
                } else {
                    var div = $('<div>').attr({
                        id: 'form'
                    });
                    div.html($('<span>').html('標題：' + response[0].post[0])).append("</br>")
                        .append($('<span>').html('作者：' + response[0].post[3])).append("</br>")
                        .append($('<span>').html('內容：')).append("</br>")
                        .append($('<div>').html(response[0].post[1])).append("</br>")
                        .append($('<span>').html('日期：' + response[0].post[2] + ' '));

                    if (response[0].post[3] == response[0].post[4] ||
                        response[0].post[4] == "系統管理員" ||
                        response[0].post[4] == "血盟管理員") {
                        div.append($('<a>').attr({
                            href: 'javascript:void(0);',
                            name: 'modifypost',
                            id: postid
                        }).html('編輯'));
                        if (response[0].post[4] == "系統管理員" || response[0].post[4] == "血盟管理員")
                            div.append($('<a>').attr({
                                href: 'javascript:void(0);',
                                name: 'delpost',
                                id: postid
                            }).html('刪除').css('margin-left', '5px'));
                        div.append("<hr />");
                    } else
                        div.append("<hr />");


                    for (i = 1; i <= response.length - 1; i++) {
                        var replypost = $('<div>');

                        replypost.html($('<span>').html('作者：' + response[i].author)).append('</br>')
                            .append($('<span>').html(response[i].content)).append('</br>');

                        if (response[i].author == response[i].memberName ||
                            response[0].post[4] == "系統管理員" ||
                            response[0].post[4] == "血盟管理員") {
                            if (response[0].post[4] == "系統管理員" || response[0].post[4] == "血盟管理員") {
                                replypost.append($('<span>').html('日期' + response[i].date + ' ')
                                    .append($('<a>').attr({
                                            href: 'javascript:void(0);',
                                            name: 'modifyreply',
                                            id: response[i].date
                                        }).html('編輯')
                                        .append($('<a>').attr({
                                            href: 'javascript:void(0);',
                                            name: 'delreply',
                                            id: response[i].date
                                        }).html('刪除').css('margin-left', '5px'))));
                            } else
                                replypost.append($('<span>').html('日期' + response[i].date + ' ')
                                    .append($('<a>').attr({
                                        href: 'javascript:void(0);',
                                        name: 'modifyreply',
                                        id: response[i].date
                                    }).html('編輯')));
                        } else
                            replypost.append($('<span>').html('日期' + response[i].date));

                        div.append(replypost).append("<hr />");
                    }

                    var reply = $('<div>');
                    reply.html('回覆：</br>').append($('<textarea>').attr({
                        id: 'replycontent'
                    })).append("</br>")
                        .append($('<a>').attr({
                            href: 'javascript:void(0)',
                            id: 'submitreplypost',
                            name: postid
                        }).html('送出'));
                    div.append(reply);

                    $('#center').html(div).append($('<div>').attr({
                        id: 'modifycontent'
                    }).css('display', 'none'));

                    $("#replycontent").cleditor({
                        width: 598, // width not including margins, borders or padding
                        height: 200, // height not including margins, borders or padding
                        controls: // controls to add to the toolbar
                        "bold italic underline strikethrough | font size " +
                            "style | color highlight removeformat | bullets numbering | outdent " +
                            "indent | alignleft center alignright | undo redo | " +
                            "rule image link unlink",
                        colors: // colors in the color popup
                        "FFF FCC FC9 FF9 FFC 9F9 9FF CFF CCF FCF " +
                            "CCC F66 F96 FF6 FF3 6F9 3FF 6FF 99F F9F " +
                            "BBB F00 F90 FC6 FF0 3F3 6CC 3CF 66C C6C " +
                            "999 C00 F60 FC3 FC0 3C0 0CC 36F 63F C3C " +
                            "666 900 C60 C93 990 090 399 33F 60C 939 " +
                            "333 600 930 963 660 060 366 009 339 636 " +
                            "000 300 630 633 330 030 033 006 309 303",
                        fonts: // font names in the font popup
                        "Arial,Arial Black,Comic Sans MS,Courier New,Narrow,Garamond," +
                            "Georgia,Impact,Sans Serif,Serif,Tahoma,Trebuchet MS,Verdana",
                        sizes: // sizes in the font size popup
                        "1,2,3,4,5,6,7",
                        styles: // styles in the style popup
                        [
                            ["Paragraph", "<p>"],
                            ["Header 1", "<h1>"],
                            ["Header 2", "<h2>"],
                            ["Header 3", "<h3>"],
                            ["Header 4", "<h4>"],
                            ["Header 5", "<h5>"],
                            ["Header 6", "<h6>"]
                        ],
                        useCSS: false, // use CSS to style HTML when possible (not supported in ie)
                        docType: // Document type contained within the editor
                        '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">',
                        docCSSFile: // CSS file used to style the document contained within the editor
                        "",
                        bodyStyle: // style to assign to document body contained within the editor
                        "margin:4px; font:10pt Arial,Verdana; cursor:text"
                    });
                }
            }
        });
    });

    $('#backpost').live('click', function () {
        $('#form').show();
        $('#modifycontent').hide();
    });

    $('a[name="modifypost"]').live('click', function () {
        var postid = this.id;
        $.ajax({
            url: '/Data/PostMGR',
            async: false,
            type: 'POST',
            dataType: 'json',
            data: {
                r: 'post',
                d: postid
            },
            success: function (response) {
                var div = $('#modifycontent');

                div.html($('<span>').html($('<a>').attr({
                    href: 'javascript:void(0)',
                    id: 'backpost',
                    name: postid
                }).html('返回').css('color', '#F90'))).append('<br />')
                    .append($('<textarea>').attr({
                        id: 'content'
                    })).append('<br />')
                    .append($('<a>').attr({
                        href: 'javascript:void(0)',
                        id: 'submitmodifiedpost',
                        name: postid
                    }).html('送出'));

                $('#content').val(response);

                $("#content").cleditor({
                    width: 598, // width not including margins, borders or padding
                    height: 200, // height not including margins, borders or padding
                    controls: // controls to add to the toolbar
                    "bold italic underline strikethrough | font size " +
                        "style | color highlight removeformat | bullets numbering | outdent " +
                        "indent | alignleft center alignright | undo redo | " +
                        "rule image link unlink",
                    colors: // colors in the color popup
                    "FFF FCC FC9 FF9 FFC 9F9 9FF CFF CCF FCF " +
                        "CCC F66 F96 FF6 FF3 6F9 3FF 6FF 99F F9F " +
                        "BBB F00 F90 FC6 FF0 3F3 6CC 3CF 66C C6C " +
                        "999 C00 F60 FC3 FC0 3C0 0CC 36F 63F C3C " +
                        "666 900 C60 C93 990 090 399 33F 60C 939 " +
                        "333 600 930 963 660 060 366 009 339 636 " +
                        "000 300 630 633 330 030 033 006 309 303",
                    fonts: // font names in the font popup
                    "Arial,Arial Black,Comic Sans MS,Courier New,Narrow,Garamond," +
                        "Georgia,Impact,Sans Serif,Serif,Tahoma,Trebuchet MS,Verdana",
                    sizes: // sizes in the font size popup
                    "1,2,3,4,5,6,7",
                    styles: // styles in the style popup
                    [
                        ["Paragraph", "<p>"],
                        ["Header 1", "<h1>"],
                        ["Header 2", "<h2>"],
                        ["Header 3", "<h3>"],
                        ["Header 4", "<h4>"],
                        ["Header 5", "<h5>"],
                        ["Header 6", "<h6>"]
                    ],
                    useCSS: false, // use CSS to style HTML when possible (not supported in ie)
                    docType: // Document type contained within the editor
                    '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">',
                    docCSSFile: // CSS file used to style the document contained within the editor
                    "",
                    bodyStyle: // style to assign to document body contained within the editor
                    "margin:4px; font:10pt Arial,Verdana; cursor:text"
                });

                $('#form').hide();
                div.show();
            }
        });
    });

    $('a[name="modifyreply"]').live('click', function () {
        var replyid = this.id;
        $.ajax({
            url: '/Data/PostMGR',
            async: false,
            type: 'POST',
            dataType: 'json',
            data: {
                r: 'reply',
                d: replyid
            },
            success: function (response) {
                var div = $('#modifycontent');

                div.html($('<span>').html($('<a>').attr({
                    href: 'javascript:void(0)',
                    id: 'backpost',
                    name: replyid
                }).html('返回').css('color', '#F90'))).append('<br />')
                    .append($('<textarea>').attr({
                        id: 'content'
                    })).append('<br />')
                    .append($('<a>').attr({
                        href: 'javascript:void(0)',
                        id: 'submitmodifiedreply',
                        name: replyid
                    }).html('送出'));

                $('#content').val(response);

                $("#content").cleditor({
                    width: 598, // width not including margins, borders or padding
                    height: 200, // height not including margins, borders or padding
                    controls: // controls to add to the toolbar
                    "bold italic underline strikethrough | font size " +
                        "style | color highlight removeformat | bullets numbering | outdent " +
                        "indent | alignleft center alignright | undo redo | " +
                        "rule image link unlink",
                    colors: // colors in the color popup
                    "FFF FCC FC9 FF9 FFC 9F9 9FF CFF CCF FCF " +
                        "CCC F66 F96 FF6 FF3 6F9 3FF 6FF 99F F9F " +
                        "BBB F00 F90 FC6 FF0 3F3 6CC 3CF 66C C6C " +
                        "999 C00 F60 FC3 FC0 3C0 0CC 36F 63F C3C " +
                        "666 900 C60 C93 990 090 399 33F 60C 939 " +
                        "333 600 930 963 660 060 366 009 339 636 " +
                        "000 300 630 633 330 030 033 006 309 303",
                    fonts: // font names in the font popup
                    "Arial,Arial Black,Comic Sans MS,Courier New,Narrow,Garamond," +
                        "Georgia,Impact,Sans Serif,Serif,Tahoma,Trebuchet MS,Verdana",
                    sizes: // sizes in the font size popup
                    "1,2,3,4,5,6,7",
                    styles: // styles in the style popup
                    [
                        ["Paragraph", "<p>"],
                        ["Header 1", "<h1>"],
                        ["Header 2", "<h2>"],
                        ["Header 3", "<h3>"],
                        ["Header 4", "<h4>"],
                        ["Header 5", "<h5>"],
                        ["Header 6", "<h6>"]
                    ],
                    useCSS: false, // use CSS to style HTML when possible (not supported in ie)
                    docType: // Document type contained within the editor
                    '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">',
                    docCSSFile: // CSS file used to style the document contained within the editor
                    "",
                    bodyStyle: // style to assign to document body contained within the editor
                    "margin:4px; font:10pt Arial,Verdana; cursor:text"
                });

                $('#form').hide();
                div.show();
            }
        });
    });

    $('#submitreplypost').live('click', function () {
        var content = $('#replycontent').val();

        if (content == "")
            alert('內容不可為空白');
        else {
            $.ajax({
                url: '/Data/PostMGR',
                async: false,
                type: 'POST',
                data: {
                    r: "newreply",
                    c: content,
                    d: this.name
                },
                success: function (response) {
                    if (response == "308") {
                        alert("回覆成功");
                        $('#post').trigger('click');
                    } else if (response == "401") {
                        alert("權限不足");
                        location.reload();
                    }
                }
            });
        }
    });

    $('#submitmodifiedreply').live('click', function () {
        var content = $('#content').val();

        if (content == "")
            alert('內容不可為空白');
        else {
            $.ajax({
                url: '/Data/PostMGR',
                async: false,
                type: 'POST',
                data: {
                    r: "updatereply",
                    c: content,
                    d: this.name
                },
                success: function (response) {
                    if (response == "302") {
                        alert("修改成功");
                        $('#post').trigger('click');
                    } else if (response == "401") {
                        alert("權限不足");
                        location.reload();
                    }
                }
            });
        }
    });

    $('#submitmodifiedpost').live('click', function () {
        var content = $('#content').val();

        if (content == "")
            alert('內容不可為空白');
        else {
            $.ajax({
                url: '/Data/PostMGR',
                async: false,
                type: 'POST',
                data: {
                    r: "update",
                    c: content,
                    d: this.name
                },
                success: function (response) {
                    if (response == "302") {
                        alert("修改成功");
                        $('#post').trigger('click');
                    } else if (response == "401") {
                        alert("權限不足");
                        location.reload();
                    }
                }
            });
        }
    });
});