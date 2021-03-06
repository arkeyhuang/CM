$(document).ready(function () {
	t = $('#table_course_personal').DataTable({
        dom: 'Bfrtip',
        buttons: [ {
            extend: 'excelHtml5',
            customize: function( xlsx ) {
                var sheet = xlsx.xl.worksheets['sheet1.xml'];
                $('row c[r^="C"]', sheet).attr( 's', '2' );
            }
        } ]
	});

    $('#table_course_personal tbody').on( 'click', 'tr', function () {
        if ( $(this).hasClass('selected') ) {
            $(this).removeClass('selected');
        }
        else {
            t.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    } );
    $('#e_11 tbody').on( 'click', 'tr', function () {
        if ( $(this).hasClass('selected') ) {
            $(this).removeClass('selected');
        }
        else {
            t.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    } );

    $('#delete').click( function () {
        course_id = t.row('.selected').data()[0];
        console.log(course_id)
        student_type = t.row('.selected').data()[2]
        class_grade = t.row('.selected').data()[3]
        class_name = t.row('.selected').data()[4]
        combine_data = student_type+'-'+class_grade+'_'+class_name
        t.row('.selected').remove().draw( false );
        $.ajax({
            type: 'POST',
            url: '/class_delete_one_row/',
            data: {'course_id': course_id, 'old_data':combine_data},
            dataType: 'json',
            success: function(result){
                alert('Pass');
            },
            error: function(){
                alert('Delete fail');
            }
        })

    } );

    $('#delete_e_11').click( function () {
        teacher_id = $('#e_11').DataTable().row('.selected').data()[0];
        teacher_name = $('#e_11').DataTable().row('.selected').data()[1];
        $('#e_11').DataTable().row('.selected').remove().draw( false );
    } );

    $('#edit_teacher_info').click( function(){
        teacher_code = document.getElementById('teacher_code_2').value
        teacher_name = document.getElementById('teacher_name_2').value
        time_first_season = document.getElementById('time_first_season_2').value
        time_second_season = document.getElementById('time_second_season_2').value
        class_order = document.getElementById('class_order_2').value
        t.row('.selected').data([teacher_code, teacher_name, time_first_season, time_second_season, class_order]).draw();
    });

	$('#check_table').click( function(){

	    var table_info = t.rows().data();
	    var table_str = JSON.stringify(table_info);
	    $.ajax({
            type: 'POST',
            url: '/teacher_save_and_config/',
            data: {"teacher_table": table_str},
            dataType: "json",
            success: function(result){
                alert('Yes');
            },
            error: function (){
                alert('No');
            }

	    })

	});
    $("#submit_semester_expect").click( function () {
        modify_0 = document.getElementById('modify_0').value;
        modify_1 = document.getElementById('modify_1').value;
        $.ajax({
            type: 'POST',
            url: '/teacher_change_expect/',
            data: {"modify_0": modify_0, 'modify_1':modify_1},
            dataType: "json",
            success: function(result){
                if (result['status']=='Success'){
                    alert('修改期望成功')
                }else{
                    alert(result['status'])
                }
            },
            error: function (){
                alert('No');
            }
        });
    });
    $("#a_search_course_id").click( function(){
        course_id = document.getElementById('a_0').value
        $.ajax({
            type: 'POST',
            url: '/class_search_from_course_id/',
            data: {'course_id': course_id},
            dataType: "json",
            success: function(result){
                if (result['status'] == 'Success'){
                    document.getElementById('a_1').value = result['raw_data'][0]
                    document.getElementById('a_2').value = result['raw_data'][1]
                    document.getElementById('a_3').value = result['raw_data'][2]
                    document.getElementById('a_4').value = result['raw_data'][3]
                    document.getElementById('a_5').value = result['raw_data'][4]
                    document.getElementById('a_6').value = result['raw_data'][5]
                    document.getElementById('a_7').value = result['raw_data'][6]
                    document.getElementById('a_8').value = result['raw_data'][7]
                    document.getElementById('a_9').value = result['raw_data'][8]
                    document.getElementById('a_10').value = result['raw_data'][9]
                    document.getElementById('a_1').setAttribute('disabled', 'disabled')
                    document.getElementById('a_5').setAttribute('disabled', 'disabled')
                    document.getElementById('a_6').setAttribute('disabled', 'disabled')
                    document.getElementById('a_7').setAttribute('disabled', 'disabled')
                    document.getElementById('a_8').setAttribute('disabled', 'disabled')
                    document.getElementById('a_9').setAttribute('disabled', 'disabled')
                    document.getElementById('a_10').setAttribute('disabled', 'disabled')
                }else{
                    document.getElementById('a_1').value = ''
                    document.getElementById('a_2').value = ''
                    document.getElementById('a_3').value = ''
                    document.getElementById('a_4').value = ''
                    document.getElementById('a_5').value = ''
                    document.getElementById('a_6').value = ''
                    document.getElementById('a_7').value = ''
                    document.getElementById('a_8').value = ''
                    document.getElementById('a_9').value = ''
                    document.getElementById('a_10').value = ''
                    document.getElementById('a_1').removeAttribute('disabled')
                    document.getElementById('a_5').removeAttribute('disabled')
                    document.getElementById('a_6').removeAttribute('disabled')
                    document.getElementById('a_7').removeAttribute('disabled')
                    document.getElementById('a_8').removeAttribute('disabled')
                    document.getElementById('a_9').removeAttribute('disabled')
                    document.getElementById('a_10').removeAttribute('disabled')
                }
            },
            error: function (){
                alert('No');
            }
        });
    })
    $("#search_teacher_id").click( function(){
        teacher_str = document.getElementById('e_11_teacher_str').value;
        console.log(teacher_str);
        $.ajax({
            type: 'POST',
            url: '/class_get_teacher_name/',
            data: {'teacher_str': teacher_str},
            dataType: "json",
            success: function(result){
                if (result['status'] == 'Success'){
                    document.getElementById('helpBlock1').innerHTML = result['teacher_id'];
                    document.getElementById('helpBlock2').innerHTML = result['teacher_name'];
                }else{
                    alert('没有找到该教师')
                }
            },
            error: function (){
                alert('No');
            }
        });
    })
    $("#add_teacher_id").click( function(){
        teacher_id = document.getElementById('helpBlock1').innerText;
        teacher_name = document.getElementById('helpBlock2').innerText;
        $("#e_11").DataTable().row.add([teacher_id, teacher_name]).draw();
        $('#add_teacher_e_11').modal('hide');
    })
    initFileInput("excelFile","/class_table_upload/")
});
function submit_checkbox_info(){
    str1 = "";
    if (document.getElementById('c_student_type_1').checked == true){
        str1 += "本科 ";
    }
    if (document.getElementById('c_student_type_2').checked == true){
        str1 += "法学硕士 ";
    }
    if (document.getElementById('c_student_type_3').checked == true){
        str1 += "法律硕士 ";
    }
    if (document.getElementById('c_student_type_4').checked == true){
        str1 += "法学博士 ";
    }
    str2 = "";
    if (document.getElementById('c_semester_1').checked == true){
        str2 += "一 ";
    }
    if (document.getElementById('c_semester_2').checked == true){
        str2 += "二 ";
    }
    $.ajax({
        type: 'POST',
        url: '/class_filter_by_submit/',
        data: {'type': str1, 'semester':str2, 'table_id': 'table_course_personal'},
        dataType: "json",
        success: function(result){
            console.log(result['result'])
            $('#table_course_personal').DataTable().clear();
            for (var i = 0; i < result['result'].length; i++){
                $('#table_course_personal').DataTable().row.add(result['result'][i])
            }
            $('#table_course_personal').DataTable().draw();
        },
        error: function (){
            alert('No');
        }
    });
}
function add_course_info(length){
    row_data = Array();
    for (var i=0; i < Number(length); i++ ){
        if ( document.getElementById('a_'+String(i)).value !== undefined ){
            row_data[i] = document.getElementById('a_'+String(i)).value;
            if (i==0){
                row_data[i] = row_data[i].toUpperCase();
            }
        }else{
            row_data[i] = "";
        }
//        console.log(document.getElementById(i).value);
    }
    t.row.add(row_data).draw();
    old_data = ''
    var row_str = JSON.stringify(row_data);
    $.ajax({
        type: 'POST',
            url:'/class_save_one_row/',
            data: {"row_data": row_str, 'old_data':old_data},
            dataType: "json",
            success: function (result) {
                alert('success');
            },
            error: function () {
                alert('fail');
            }

    })
}
function edit_course_info(){
    if ( t.row('.selected').length === 0 ){
        alert('没有选中的课程')
        return
    }
    $('#editModal').modal('show');
    document.getElementById('e_0').value = t.row('.selected').data()[0];
    document.getElementById('e_1').value = t.row('.selected').data()[1];
    document.getElementById('e_2').innerHTML = '<option>'+t.row('.selected').data()[2]+'</option>'+document.getElementById('e_2').innerHTML;
    document.getElementById('e_3').innerHTML = '<option>'+t.row('.selected').data()[3]+'</option>'+document.getElementById('e_3').innerHTML;
    document.getElementById('e_4').innerHTML = '<option>'+t.row('.selected').data()[4]+'</option>'+document.getElementById('e_4').innerHTML;
    document.getElementById('e_5').innerHTML = '<option>'+t.row('.selected').data()[5]+'</option>'+document.getElementById('e_5').innerHTML;
    document.getElementById('e_6').innerHTML = '<option>'+t.row('.selected').data()[6]+'</option>'+document.getElementById('e_6').innerHTML;
    document.getElementById('e_7').innerHTML = '<option>'+t.row('.selected').data()[7]+'</option>'+document.getElementById('e_7').innerHTML;
    document.getElementById('e_8').value = t.row('.selected').data()[8];
    document.getElementById('e_9').value = t.row('.selected').data()[9];
    document.getElementById('e_10').value = t.row('.selected').data()[10];
	$.ajax({
	    type: 'POST',
        url:'/class_get_suit_teacher/',
        data: {"course_id": t.row('.selected').data()[0]},
        dataType: "json",
        success: function (result) {
            var teacher_list = result['result_list'];
            $('#e_11').DataTable({
                dom: '<"top">rt<"bottom"><"clear">',
                "searching": false,
                "ordering": false,
                 "retrieve": true,
                "data": teacher_list,
                "column":[
                    {title: '工号'},
                    {title: '姓名'}
                ]
            });
        },
        error: function () {
            alert('fail');
        }

	})

}
function request_course(){
    if ( t.row('.selected').length === 0 ){
        alert('没有选中的课程')
        return
    }
    $('#requestModal').modal('show');
    document.getElementById('e_0').value = t.row('.selected').data()[0];
    document.getElementById('e_1').value = t.row('.selected').data()[1];
    document.getElementById('e_2').innerHTML = '<option>'+t.row('.selected').data()[2]+'</option>'+document.getElementById('e_2').innerHTML;
    document.getElementById('e_4').value = t.row('.selected').data()[3];
    document.getElementById('e_5').innerHTML = '<option>'+t.row('.selected').data()[4]+'</option>'+document.getElementById('e_5').innerHTML;
    document.getElementById('e_6').innerHTML = '<option>'+t.row('.selected').data()[5]+'</option>'+document.getElementById('e_6').innerHTML;
    document.getElementById('e_7').innerHTML = '<option>'+t.row('.selected').data()[6]+'</option>'+document.getElementById('e_7').innerHTML;
    document.getElementById('e_8').value = t.row('.selected').data()[7];
    document.getElementById('e_9').value = t.row('.selected').data()[8];
    document.getElementById('e_10').value = t.row('.selected').data()[9];
}
function cancel_request(){
    if ( t.row('.selected').length === 0 ){
        alert('没有选中的课程')
        return
    }
    $('#cancelModal').modal('show');
    console.log(t.row('.selected').data());
    document.getElementById('c_0').value = t.row('.selected').data()[0];
    document.getElementById('c_1').value = t.row('.selected').data()[1];
    document.getElementById('c_2').innerHTML = '<option>'+t.row('.selected').data()[2]+'</option>'+document.getElementById('e_2').innerHTML;
    document.getElementById('c_4').value = t.row('.selected').data()[3];
    document.getElementById('c_5').innerHTML = '<option>'+t.row('.selected').data()[4]+'</option>'+document.getElementById('e_5').innerHTML;
    document.getElementById('c_6').innerHTML = '<option>'+t.row('.selected').data()[5]+'</option>'+document.getElementById('e_6').innerHTML;
    document.getElementById('c_7').innerHTML = '<option>'+t.row('.selected').data()[6]+'</option>'+document.getElementById('e_7').innerHTML;
    document.getElementById('c_8').value = t.row('.selected').data()[7];
    document.getElementById('c_9').value = t.row('.selected').data()[8];
    document.getElementById('c_10').value = t.row('.selected').data()[9];
}

function submit_edit_info(){
    row_data = Array();
    for (var i=0; i < 12; i++ ){
        if ( document.getElementById('e_'+String(i)).value !== undefined ){
            row_data[i] = document.getElementById('e_'+String(i)).value;
            if (i==0){
                row_data[i] = row_data[i].toUpperCase();
            }
        }else{
            row_data[i] = "";
        }
//        console.log(document.getElementById(i).value);
    }
    str = "";
    for (var j=0; j < $("#e_11").DataTable().rows().data().length; j++){
        str += $("#e_11").DataTable().rows(j).data()[0][1];
        if( j <  $("#e_11").DataTable().rows().data().length-1){
            str += ',';
        }
    }
    student_type = t.row('.selected').data()[2]
    class_grade = t.row('.selected').data()[3]
    class_name = t.row('.selected').data()[4]
    combine_data = student_type+'-'+class_grade+'_'+class_name
    console.log(combine_data)
    row_data[11] = str;
    t.row('.selected').data(row_data).draw();
    console.log(row_data);
    var row_str = JSON.stringify(row_data);
    $.ajax({
        type: 'POST',
        url:'/class_save_one_row/',
        data: {"row_data": row_str, 'old_data':combine_data},
        dataType: "json",
        success: function (result) {
            alert('success');
        },
        error: function () {
            alert('fail');
        }

    })

}
function submit_request(){
    course_id = document.getElementById('e_0').value;
    $.ajax({
        type: 'POST',
        url:'/teacher_request_course/',
        data: {"course_id": course_id},
        dataType: "json",
        success: function (result) {
            if (result['status'] == 'Success'){
                alert('申报成功')
                t.row('.selected').data()[t.row('.selected').data().length-1] = '已申报';
                t.row('.selected').data(t.row('.selected').data()).draw();
            }else{
                alert(result['status'])
            }
            $('#requestModal').modal('hide')
        },
        error: function () {
            alert('fail');
        }

    })
}
function submit_cancel(){
    course_id = document.getElementById('c_0').value;
    status = 'cancel'
    $.ajax({
        type: 'POST',
        url:'/teacher_request_course/',
        data: {"course_id": course_id, 'status':status},
        dataType: "json",
        success: function (result) {
            if (result['status'] == 'Success'){
                alert('取消申报成功')
            }else{
                alert(result['status'])
            }
            $('#cancelModal').modal('hide')
        },
        error: function () {
            alert('fail');
        }

    })
}
function initFileInput(ctrlName, uploadUrl) {
    var control = $('#' + ctrlName);
    control.fileinput({
        language: 'zh', //设置语言
        uploadUrl: uploadUrl, //上传的地址
        uploadAsync: true, //默认异步上传
        showCaption: true,//是否显示标题
        showUpload: true, //是否显示上传按钮
        browseClass: "btn btn-primary", //按钮样式
        allowedFileExtensions: ["xls", "xlsx", 'txt'], //接收的文件后缀
        maxFileCount: 1,//最大上传文件数限制
        previewFileIcon: '<i class="glyphicon glyphicon-file"></i>',
        showPreview: true, //是否显示预览
        previewFileIconSettings: {
            'docx': '<i ass="fa fa-file-word-o text-primary"></i>',
            'xlsx': '<i class="fa fa-file-excel-o text-success"></i>',
            'xls': '<i class="fa fa-file-excel-o text-success"></i>',
            'pptx': '<i class="fa fa-file-powerpoint-o text-danger"></i>',
            'jpg': '<i class="fa fa-file-photo-o text-warning"></i>',
            'pdf': '<i class="fa fa-file-archive-o text-muted"></i>',
            'zip': '<i class="fa fa-file-archive-o text-muted"></i>',
        },
        uploadExtraData: function () {
            var extraValue = "test";
            return {"excelType": extraValue};
        }
    });
}

$("#excelFile").on("fileuploaded", function (event, data, previewId, index) {
    console.log(data);
    if(data.response.result == 'Pass')
    {
        alert(data.files[index].name + "上传成功!");
    //关闭
        $(".close").click();
    }
    else{
        alert(data.files[index].name + "上传失败!" + data.response.message);
    //重置
    $("#excelFile").fileinput("clear");
    $("#excelFile").fileinput("reset");
    $('#excelFile').fileinput('refresh');
    $('#excelFile').fileinput('enable');
    }
})