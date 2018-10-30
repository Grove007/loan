

//表单验证demo
// jquery.validator.addMethod(
//       function(value){
//         if(value.trim()!=="")
//           return /^1[34578]\d{9}$/.text(value);
//           return true;
//         }
//       );

//       $(".form_only").validata({
//         rules:{
//           uname:"required",//用户名必须填写
//           mobile:{required:true,mobile:true},
//           idcard:{required:true,},
//         }

//       });

//表单验证


// 字符验证
    jQuery.validator.addMethod("stringCheck", function(value, element) {
          return this.optional(element) || /^[\u0391-\uFFE5\w]+$/.test(value);
        }, "只能包括中文字、英文字母、数字和下划线");
    // 中文字两个字节
    jQuery.validator.addMethod("byteRangeLength", function(value, element, param) {
            var length = value.length;
          for(var i = 0; i < value.length; i++){
               if(value.charCodeAt(i) > 127){
                  length++;
                }
            }
    return this.optional(element) || ( length >= param[0] && length <= param[1] );
}, "请确保输入的值在3-15个字节之间(一个中文字算2个字节)");

             // 手机号码验证
    jQuery.validator.addMethod("isMobile", function(value, element) {
        var length = value.length;
        var mobile = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/;
        return this.optional(element) || (length == 11 && mobile.test(value));
    }, " ");


    //身份证号码验证
    jQuery.validator.addMethod("isIdCardNo", function(value, element) {
return this.optional(element) || idCardNoUtil.checkIdCardNo(value);
}, "请正确输入您的身份证号码");
      
            $("#commentForm").validate({
        rules : {
          username: {
          required:true,
          stringCheck:true,
          byteRangeLength:[3,15]
          },
          phone : {
                required : true,
                minlength : 11,
                // 自定义方法：校验手机号在数据库中是否存在
                // checkPhoneExist : true,
                isMobile : true
            },
            card:{
                required:true,
                isIdCardNo:true
            },
            address:{
                required:true,
                stringCheck:true,
                byteRangeLength:[3,100]
            }
        },

        messages : {
            username:{
                required: "请填写真实姓名",
                stringCheck: "姓名只能包括中文字、英文字母、数字和下划线",
            byteRangeLength: "姓名名必须在3-15个字符之间(一个中文字算2个字符)"
          },
            phone:{
                required : "请输入手机号",
                minlength : "确认手机不能小于11个字符",
                isMobile : "请正确填写您的手机号码"
            },
            card:{
                required:"请输入身份证号",
                isIdCardNo:"请输入正确的身份证号"
            },
            address:{
                required: "请输入您的详细地址",
                stringCheck: "请正确输入您的详细地址",
                byteRangeLength: "请详实您的详细地址以便于我们联系您"
            }
        },

        errorPlacement : function(error, element){
               error.appendTo(element.next().next());
             },
         ignore:".codeCls"
      });




