$(function () {
    $('#claninfo').live('click', function () {
        $('#center').html($('<div>').attr('class', 'claninfotitle'));
        var ul = $('<ul>').append($('<li>').append($('<a>').attr({
            href: 'javascript:void(0);',
            id: 'updateclanInfo'
        }).html('修改血盟資訊')));
        var div = $('<span>').attr({
            id: 'form'
        }).css('display', 'inline-block');
        div.html($('<textarea>').attr({
            rows: '16',
            cols: '70',
            id: 'modifycontent'
        }))
            .append($('<div>').html($('<a>').attr({
                    href: 'javascript:void(0)',
                    id: 'cancleclaninfo'
                }).html('取消'))
                .append($('<a>').attr({
                    href: 'javascript:void(0)',
                    id: 'submitclaninfo'
                }).html('送出')));
        $('#center').append($('<div>').html(ul).attr({
            id: 'submenu'
        })).append(div);
        div.hide();

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
    });

    $('#submitclaninfo').live('click', function () {
        var content = $('#modifycontent').val();
        $.ajax({
            url: '/Data/ClanInfo',
            async: false,
            type: 'POST',
            dataType: 'json',
            data: {
                r: 'update',
                c: content.replace(/(\r\n|[\r\n])/g, '<br />')
            },
            success: function (response) {
                if (response == "401") {
                    alert("權限不足");
                    location.reload();
                } else if (response == "302") {
                    alert("更新成功");
                    $('#claninfo').trigger('click');
                }
            }
        });
    });

    $('#updateclanInfo').live('click', function () {
        //var content = $('#content').html().replace(/<br\s*[\/]?>/gi, '\n');
        var content = $('#content').html();
        $('#modifycontent').val(content);

        $("#modifycontent").cleditor({
            width: 580, // width not including margins, borders or padding
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


        $('#form').slideToggle('medium', function () {
            if ($('#form').is(':visible'))
                $('#form').css('display', 'inline-block');
        });
    });

    $('#cancleclaninfo').live('click', function () {
        $('#form').slideUp();
        $('#content').show();
    });

    $('#announcementmgr').live('click', function () {
        var ul = $('<ul>').append($('<li>').append($('<a>').attr({
            href: 'javascript:void(0);',
            id: 'newannouncement'
        }).html('新增公告')));
        var div = $('<div>').attr({
            id: 'form'
        });
        div.html($('<span>').html('標題：')).append($('<input>').attr({
            type: 'text',
            id: 'title'
        }).css('width', '200px')).append("</br>")
            .append($('<span>').css('float', 'left')).append($('<textarea>').attr({
                rows: '5',
                cols: '60',
                id: 'content'
            })).append("</br>")
            .append($('<div>').html($('<a>').attr({
                    href: 'javascript:void(0)',
                    id: 'cancelannouncement'
                }).html('取消'))
                .append($('<a>').attr({
                    href: 'javascript:void(0)',
                    id: 'submitannouncement'
                }).html('送出')));
        $('#center').html($('<div>').html(ul).attr({
            id: 'submenu'
        })).append(div);
        div.hide();

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
                    .append($('<th>').html('內容').css('text-align', 'left'))
                    .append($('<th>').html('日期').attr({
                        width: '160px'
                    }))
                    .append($('<th>').html('').attr({
                        width: '50px'
                    }))
                    .append($('<th>').html('').attr({
                        width: '50px'
                    }));
                table.append(tr);
                $.each(response, function () {
                    var tr = $('<tr>');
                    tr.append($('<td>').html(this.title))
                        .append($('<td>').html(this.content))
                        .append($('<td>').html(this.udate))
                        .append($('<td>').html($('<a>').attr({
                            href: 'javascript:void(0);',
                            name: 'updateannouncement',
                            id: this.date
                        }).html('更新')))
                        .append($('<td>').html($('<a>').attr({
                            href: 'javascript:void(0);',
                            name: 'deleteannouncement',
                            id: this.date
                        }).html('刪除')));

                    table.append(tr);
                });
                $('#center').append(table);
            }
        });
    });

    $('a[name="updateannouncement"]').live('click', function () {
        var key = this.id;

        var div = $('#form');
        div.html($('<span>').html('標題：')).append($('<input>').attr({
            type: 'text',
            id: 'title'
        }).css('width', '200px')).append("</br>")
            .append($('<span>').css('float', 'left')).append($('<textarea>').attr({
                rows: '5',
                cols: '60',
                id: 'content'
            })).append("</br>")
            .append($('<div>').html($('<a>').attr({
                    href: 'javascript:void(0)',
                    id: 'cancelannouncement'
                }).html('取消'))
                .append($('<a>').attr({
                    href: 'javascript:void(0)',
                    id: 'submitannouncement'
                }).html('送出')));

        $.ajax({
            url: '/Data/AnnouncementMGR',
            async: false,
            type: 'POST',
            dataType: 'json',
            data: {
                r: 'info',
                t: key
            },
            success: function (response) {
                if (response == "401") {
                    alert("權限不足");
                    location.reload();
                } else {
                    $('#title').val(response[0]);
                    //$('#content').val(response[1].replace(/<br\s*[\/]?>/gi, '\n'));
                    $('#content').val(response[1]);

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

                    $('#submitannouncement').html('更新').attr({
                        name: key
                    });
                    $('#form').slideDown();
                }
            }
        });
    });

    $('a[name="deleteannouncement"]').live('click', function () {
        var ans = confirm("您確定要刪除此公告？");
        if (ans) {
            $.ajax({
                url: '/Data/AnnouncementMGR',
                async: false,
                type: 'POST',
                data: {
                    r: 'del',
                    d: this.id
                },
                success: function (response) {
                    if (response == "401") {
                        alert("權限不足");
                        location.reload();
                    } else if (response == "305") {
                        alert("刪除成功");
                        $('#announcementmgr').trigger('click');
                    }
                }
            });
        }
    });

    $('#submitannouncement').live('click', function () {
        var title = $('#title').val();
        var content = $('#content').val();

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
                url: '/Data/AnnouncementMGR',
                async: false,
                type: 'POST',
                data: {
                    r: action,
                    t: title,
                    c: content,
                    d: this.name
                },
                success: function (response) {
                    if (response == "304") {
                        alert("新增成功");
                        $('#announcementmgr').trigger('click');
                    } else if (response == "302") {
                        alert("更新成功");
                        $('#announcementmgr').trigger('click');
                    } else if (response == "401") {
                        alert("權限不足");
                        location.reload();
                    }
                }
            });
        }
    });

    $('#newannouncement').live('click', function () {
        var div = $('#form');
        div.html($('<span>').html('標題：')).append($('<input>').attr({
            type: 'text',
            id: 'title'
        }).css('width', '200px')).append("</br>")
            .append($('<span>').css('float', 'left')).append($('<textarea>').attr({
                rows: '5',
                cols: '60',
                id: 'content'
            })).append("</br>")
            .append($('<div>').html($('<a>').attr({
                    href: 'javascript:void(0)',
                    id: 'cancelannouncement'
                }).html('取消'))
                .append($('<a>').attr({
                    href: 'javascript:void(0)',
                    id: 'submitannouncement'
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

        $('#submitannouncement').html('新增').attr({
            name: ''
        });
        $('#form').slideDown();
    });

    $('#cancelannouncement').live('click', function () {
        $('#form').slideUp();
    });

    $('#membermgr').live('click', function () {
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
                    var table = $('<table>').attr({
                        id: 'list'
                    });
                    var tr = $('<tr>');
                    tr.append($('<th>').html('名次').attr({
                        width: '40px'
                    }))
                        .append($('<th>').html('名稱'))
                        .append($('<th>').html('職業').attr({
                            width: '70px'
                        }))
                        .append($('<th>').html('等級').attr({
                            width: '40px'
                        }))
                        .append($('<th>').html('更新日期').attr({
                            width: '170px'
                        }))
                        .append($('<th>').html('審核').attr({
                            width: '35px'
                        }))
                        .append($('<th>').html('工具').attr({
                            width: '35px'
                        }))
                        .append($('<th>').html('').attr({
                            width: '35px'
                        }))
                        .append($('<th>').html('').attr({
                            width: '35px'
                        }))
                        .append($('<th>').html('').attr({
                            width: '35px'
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
                        tr.append($('<td>').html($('<input>').attr({
                            type: 'checkbox',
                            name: 'validation',
                            id: this.ID,
                            checked: this.Validation
                        })));
                        tr.append($('<td>').html($('<input>').attr({
                            type: 'checkbox',
                            name: 'enabletools',
                            id: this.ID,
                            checked: this.EnableTools
                        })));
                        tr.append($('<td>').html($('<a>').attr({
                            href: 'javascript:void(0);',
                            name: 'updatemember',
                            id: this.ID
                        }).html('更新')));
                        tr.append($('<td>').html($('<a>').attr({
                            href: 'javascript:void(0);',
                            name: 'deletemember',
                            id: this.ID
                        }).html('刪除')));
                        tr.append($('<td>').html($('<a>').attr({
                            href: 'javascript:void(0);',
                            name: 'clearmacmember',
                            id: this.ID
                        }).html('清除')));
                        table.append(tr);
                    });

                    $('#center').html($('<div>').attr({
                        id: 'updatediv'
                    })).append($('<div>').attr({
                        id: 'averdiv'
                    }).html('平均等級：' + lv_aver)).append(table);
                }
            }
        });
    });

    $('a[name="deletemember"]').live('click', function () {
        var ans = confirm("您確定要刪除此成員？");
        if (ans) {
            $.ajax({
                url: '/Data/MemberMGR',
                async: false,
                type: 'POST',
                data: {
                    r: 'del',
                    a: this.id
                },
                success: function (response) {
                    if (response == "401") {
                        alert("權限不足");
                        location.reload();
                    } else if (response == "305") {
                        alert("刪除成功");
                        $('#membermgr').trigger('click');
                    }
                }
            });
        }
    });

    $('input[name="enabletools"]').live('click', function () {
        $.ajax({
            url: '/Data/MemberMGR',
            async: false,
            type: 'POST',
            dataType: 'json',
            data: {
                r: 'enabletools',
                a: this.id,
                value: this.checked
            },
            success: function (response) {
                if (response == "302") {
                    alert("更新成功");
                    $('#membermgr').trigger('click');
                }
            }
        });
    });

    $('input[name="validation"]').live('click', function () {
        $.ajax({
            url: '/Data/MemberMGR',
            async: false,
            type: 'POST',
            dataType: 'json',
            data: {
                r: 'validation',
                a: this.id,
                value: this.checked
            },
            success: function (response) {
                if (response == "302") {
                    alert("更新成功");
                    $('#membermgr').trigger('click');
                }
            }
        });
    });

    $('a[name="clearmacmember"]').live('click', function () {
        $.ajax({
            url: '/Data/MemberMGR',
            async: false,
            type: 'POST',
            dataType: 'json',
            data: {
                r: 'clearMac',
                a: this.id
            },
            success: function (response) {
                if (response == "401") {
                    alert("權限不足");
                    location.reload();
                } else if (response == "302") {
                    alert("清除成功");
                }
            }
        });
    });

    $('a[name="updatemember"]').live('click', function () {
        var div = $('<div>').attr({
            id: 'form'
        });
        var select = $('<select>').attr({
            id: 'job'
        });
        var job = {
            "王族": "ro",
            "騎士": "kn",
            "妖精": "ef",
            "法師": "ma",
            "黑暗妖精": "de",
            "龍騎士": "dk",
            "幻術師": "il"
        };
        $.each(job, function (key, value) {
            select.append($('<option>').attr({
                value: value
            }).html(key));
        });
        div.html('名稱：').append($('<input>').attr({
            type: 'text',
            id: 'ID',
            disabled: 'disabled'
        }))
            .append('等級：').append($('<input>').attr({
                type: 'text',
                id: 'level'
            }))
            .append('職業：').append(select)
            .append($('<div>').html($('<a>').attr({
                href: 'javascript:void(0)',
                id: 'submitmember'
            }).html('送出')).css('display', 'inline'));
        $('#updatediv').html(div);
        div.hide();
        $('#submitupdate').attr({
            name: this.id
        });

        $.ajax({
            url: '/Data/MemberMGR',
            async: false,
            type: 'POST',
            dataType: 'json',
            data: {
                r: 'info',
                a: this.id
            },
            success: function (response) {
                if (response == "401") {
                    alert("權限不足");
                    location.reload();
                } else {
                    $('#ID').val(response[0]);
                    $('#level').val(response[2]);
                    $('#job').children().each(function () {
                        if ($(this).val() == response[1]) this.selected = true;
                    });
                    div.append('</br>').append("更新日期：" + response[3]);
                    div.slideDown();
                }
            }
        });
    });

    $('#submitupdate').live('click', function () {
        var ID = $('#ID').val();
        var job = $('#job').val();
        var lv = $('#level').val();

        if (ID == "")
            alert('名稱不可為空白');
        else if (lv == "")
            alert('等級不可為空白');
        else {
            $.ajax({
                url: '/Data/MemberMGR',
                async: false,
                type: 'POST',
                data: {
                    r: 'update',
                    a: ID,
                    job: job,
                    level: lv
                },
                success: function (response) {
                    if (response == "302") {
                        alert("更新成功");
                        $('#membermgr').trigger('click');
                    }
                }
            });
        }
    });

    $('#filemgr').live('click', function () {
        var ul = $('<ul>').append($('<li>').append($('<a>').attr({
            href: 'javascript:void(0);',
            id: 'newfile'
        }).html('新增檔案')));
        var div = $('<div>').attr({
            id: 'form'
        });
        div.html($('<span>').html('標 題：')).append($('<input>').attr({
            type: 'text',
            id: 'name'
        }).css('width', '200px')).append("</br>")
            .append($('<span>').html('MD5：')).append($('<input>').attr({
                type: 'text',
                id: 'md5'
            }).css('width', '200px')).append("</br>")
            .append($('<span>').html('連結：')).append($('<input>').attr({
                type: 'text',
                id: 'link'
            }).css('width', '200px')).append("</br>")
            .append($('<span>').html('說明：')).append($('<input>').attr({
                type: 'text',
                id: 'desc'
            }).css('width', '200px')).append("</br>")
            .append($('<div>').html($('<a>').attr({
                    href: 'javascript:void(0)',
                    id: 'cancelfile'
                }).html('取消'))
                .append($('<a>').attr({
                    href: 'javascript:void(0)',
                    id: 'submitfile'
                }).html('送出')));
        $('#center').html($('<div>').html(ul).attr({
            id: 'submenu'
        })).append(div);
        div.hide();

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
                    });
                    var tr = $('<tr>');
                    tr.append($('<th>').html('檔名').attr({
                        width: '150px'
                    }))
                        .append($('<th>').html('說明'))
                        .append($('<th>').html('日期').attr({
                            width: '85px'
                        }))
                        .append($('<th>').html('').attr({
                            width: '35px'
                        }))
                        .append($('<th>').html('').attr({
                            width: '35px'
                        }));
                    table.append(tr);
                    $.each(response, function () {
                        var tr = $('<tr>');
                        tr.append($('<td>').html($('<a>').attr({
                            href: this.link,
                            target: 'view_window'
                        }).html(this.name)).append($('<p>').html("MD5:" + this.md5)))
                            .append($('<td>').html(this.desc).css('text-align', 'left'))
                            .append($('<td>').html(this.date))
                            .append($('<td>').html($('<a>').attr({
                                href: 'javascript:void(0);',
                                name: 'updatefile',
                                id: this.name
                            }).html('更新')))
                            .append($('<td>').html($('<a>').attr({
                                href: 'javascript:void(0);',
                                name: 'deletefile',
                                id: this.name
                            }).html('刪除')));

                        table.append(tr);
                    });
                    $('#center').append(table);
                }
            }
        });
    });

    $('#newfile').live('click', function () {
        $('#name').val('');
        $('#md5').val('');
        $('#link').val('');
        $('#submitfile').html('新增').attr({
            name: ''
        });
        $('#form').slideDown();
    });

    $('#cancelfile').live('click', function () {
        $('#form').slideUp();
    });

    $('a[name="updatefile"]').live('click', function () {
        var key = this.id;
        $.ajax({
            url: '/Data/FileMGR',
            async: false,
            type: 'POST',
            dataType: 'json',
            data: {
                r: 'info',
                n: key
            },
            success: function (response) {
                if (response == "401") {
                    alert("權限不足");
                    location.reload();
                } else {
                    $('#name').val(response[0]);
                    $('#link').val(response[1]);
                    $('#md5').val(response[2]);
                    $('#desc').val(response[3]);
                    $('#submitfile').html('更新').attr({
                        name: key
                    });
                    $('#form').slideDown();
                }
            }
        });
    });

    $('#submitfile').live('click', function () {
        var name = $('#name').val();
        var link = $('#link').val();
        var md5 = $('#md5').val();
        var desc = $('#desc').val();

        if (name == "")
            alert('檔名不可為空白');
        else if (link == "")
            alert('連結不可為空白');
        else if (md5 == "")
            alert('MD5不可為空白');
        else {
            $.ajax({
                url: '/Data/FileMGR',
                async: false,
                type: 'POST',
                data: {
                    r: 'update',
                    n: name,
                    l: link,
                    m: md5,
                    d: desc,
                    o: this.name
                },
                success: function (response) {
                    if (response == "306") {
                        alert("新增/更新成功");
                        $('#filemgr').trigger('click');
                    } else if (response == "401") {
                        alert("權限不足");
                        location.reload();
                    }
                }
            });
        }
    });

    $('a[name="deletefile"]').live('click', function () {
        var ans = confirm("您確定要刪除此檔案？");
        if (ans) {
            $.ajax({
                url: '/Data/FileMGR',
                async: false,
                type: 'POST',
                data: {
                    r: 'del',
                    n: this.id
                },
                success: function (response) {
                    if (response == "401") {
                        alert("權限不足");
                        location.reload();
                    } else if (response == "305") {
                        alert("刪除成功");
                        $('#filemgr').trigger('click');
                    }
                }
            });
        }
    });

    $('a[name="delpost"]').live('click', function () {
        var ans = confirm("您確定要刪除此篇留言？");
        if (ans) {
            $.ajax({
                url: '/Data/PostMGR',
                async: false,
                type: 'POST',
                data: {
                    r: 'del',
                    d: this.id
                },
                success: function (response) {
                    if (response == "401") {
                        alert("權限不足");
                        location.reload();
                    } else if (response == "305") {
                        alert("刪除成功");
                        $('#post').trigger('click');
                    }
                }
            });
        }
    });

    $('a[name="delreply"]').live('click', function () {
        var ans = confirm("您確定要刪除此篇回覆？");
        if (ans) {
            $.ajax({
                url: '/Data/PostMGR',
                async: false,
                type: 'POST',
                data: {
                    r: 'delreply',
                    d: this.id
                },
                success: function (response) {
                    if (response == "401") {
                        alert("權限不足");
                        location.reload();
                    } else if (response == "305") {
                        alert("刪除成功");
                        $('#post').trigger('click');
                    }
                }
            });
        }
    });
    
    $('#submitmember').live('click', function () {
        var ID = $('#ID').val();
        var job = $('#job').val();
        var lv = $('#level').val();

        if (ID == "")
            alert('名稱不可為空白');
        else if (lv == "")
            alert('等級不可為空白');
        else {
            $.ajax({
                url: '/Data/MemberMGR',
                async: false,
                type: 'POST',
                data: {
                    r: 'update',
                    a: ID,
                    job: job,
                    level: lv
                },
                success: function (response) {
                    if (response == "302") {
                        alert("更新成功");
                        $('#membermgr').trigger('click');
                    }
                }
            });
        }
    });
});