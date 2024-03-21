
// Contructor function // đối tượng 'Validator'
export default{
     Validator(options) {
        //  console.log(options.rules)
        // tạo một object để lưu trữ các lần rule
        selectorRules = {};
        // Hàm thực hiện validate
        validate =(inputElement,rule) =>{
            var errorMessager ;
            console.log("LoiNe")
            var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
        // lấy rule từng rule ra 
            var Rules = selectorRules[rule.selector];
            // Lặp qua từng rule & kiểm tra
            // Nếu xuất hiện lỗi sẽ dừng vòng lặp
        for(var i = 0 ; i < Rules.length ; i++) {
            errorMessager = Rules[i] (inputElement.value);
            if(errorMessager) break;
        }
            if(errorMessager) {
              errorElement.innerText = errorMessager;
              inputElement.parentElement.classList.add('invalid');
            }else {
              errorElement.innerText = '';
              inputElement.parentElement.classList.remove('invalid');
            }
            return !errorMessager;
        }
    
        // Lấy Element của form cần validate
        var formElement = document.querySelector(options.form)
    
        if(formElement) {
            // sử lý yêu cầu mặc định 
            formElement.onsubmit = function(e) {
                e.preventDefault();
                var isFormInvalid = true;
                // lặp qua từng rule và validate luôn 
                options.rules.forEach(function (rule) {
                    
                    var inputElement = document.querySelector(rule.selector);
                    var isValid = validate(inputElement,rule);
                    if(!isValid) {
                        isFormInvalid = false; 
                    }
                });
                if(isFormInvalid){
                    // submit với javascript
                    if(typeof options.onsubmit === 'function'){
                        var enableInputs = formElement.querySelectorAll('[name]:not([disabled])');
                        var formValues = Array.from(enableInputs).reduce(function(values, input) {
                            values[input.name] = input.value
                            return  values;
                        }, {});
                        options.onsubmit(formValues);
                    }
                    // submit với hành vi mặc định của form html
                    else {
                        formElement.submit();
                    }
                }
            }
            
            // Lặp qua từng rule và xử lý (onchange , onsubmit , oninput,....)
            options.rules.forEach(function (rule) {
                // Câu điều kiện check có phải là một mảng hay không  (Array.isArray)
                if(Array.isArray(selectorRules[rule.selector])) {
                    
                    selectorRules[rule.selector].push(rule.test);
    
                }else {
                    selectorRules[rule.selector] = [rule.test];
                }
                // Lưu lại các rules cho mỗi input
                var inputElement = document.querySelector(rule.selector);
               // xử lý trường hợp blur ra khỏi input
                if(inputElement) {
                    inputElement.onblur = function() {
                        validate(inputElement,rule);
                    }
                // xử lý trường hợp người dùng nhập input
                   inputElement.oninput =function(){
                    var errorElement = inputElement.parentElement.querySelector(options.errorSelector);  
                    errorElement.innerText = '';
                    inputElement.parentElement.classList.remove('invalid');
                   }
                }
            });
            console.log(selectorRules);
        }
    },

    // Định nghĩa rules
    // Kiểm tra yêu cầu nhập ()
    isRequired(selector , messager){
        return {
            selector: selector,
            test: function(value) {
                return value.trim() ? undefined :  messager || "Bạn chưa nhập trường này";
            }
        };
    },
    // Kiểm tra nhập đúng định dạng gmail
    isEmail(selector , messager){
        return {
            selector: selector,
            test: function(value) {
                var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                return regex.test(value) ? undefined :  messager || "Vui lòng nhập đúng định dạng";
            }
        };
    },
    // Check có phải là màu RGB không
    isColor(selector , messager){
        return {
            selector: selector,
            test: function(value) {
                var regex = /^rgb\(((\s*(\d|[1-9]\d|1\d\d|2[0-4][0-9]|25[0-5])\s*),){2}(\s*(\d|[1-9]\d|1\d\d|2[0-4][0-9]|25[0-5])\s*)\)$/;
                ;
                return regex.test(value) ? undefined :  messager || "Vui lòng nhập đúng định dạng màu RGB";
            }
        };
    },
    // Kiểm tra ký tự nhập phải trên số yêu cầu (required)
    isMinLength(selector , min , messager){
        return {
            selector: selector,
            test: function(value) {
                return value.length >= min ? undefined : messager || `Vui lòng nhập đúng ${min} ký tự`
            }
        };
    },
    // Validate kiểm tra trùng mật khẩu
    isComfirmed(selector , getConfirmValue, messager) {
        return {
            selector : selector,
            test : function(value) {
                return value === getConfirmValue() ? undefined : messager || 'Gía trị nhập vào không chính xác';
            }
        }
    }
}