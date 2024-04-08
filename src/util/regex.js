export default ({   
// Định nghĩa rules
// Kiểm tra yêu cầu nhập ()
isRequired(value){
    return value ? undefined :  value || "Bạn chưa nhập trường này";
},
// Kiểm tra nhập đúng định dạng gmail
isEmail(value){
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined :  value || "Vui lòng nhập đúng định dạng";
},
// Check có phải là màu RGB không
isColor(value){
            var regex = /^rgb\(((\s*(\d|[1-9]\d|1\d\d|2[0-4][0-9]|25[0-5])\s*),){2}(\s*(\d|[1-9]\d|1\d\d|2[0-4][0-9]|25[0-5])\s*)\)$/;
            return regex.test(value) ? undefined :  value || "Vui lòng nhập đúng định dạng màu RGB";
},
// Kiểm tra ký tự nhập phải trên số yêu cầu (required)
isMinLength(min , value){
            return value.length >= min ? undefined : value || `Vui lòng nhập đúng ${min} ký tự`
},
// Bao gồm cả chữ hoa, chữ thường, số, ký tự đặc biệt và ít nhất 8 ký tự
isPassword(value){
    var regex = /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/;
    return regex.test(value) ? undefined :  value || "Vui lòng nhập đúng định dạng";
},
// Gồm chuỗi và số từ 3 đến 16 ký tự
isUsername(value){
    var regex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    return regex.test(value) ? undefined :  value || "Vui lòng nhập đúng định dạng";
},
/* Format YYYY-MM-dd */
isDateUs(value){
    var regex = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
    return regex.test(value) ? undefined :  value || "Vui lòng nhập đúng định dạng";
},
/* Format dd-mmm-YYYY hoặc
               dd/mmm/YYYY hoặc
               dd.mmm.YYYY */
isDate(value){
    var regex = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]|(?:Jan|Mar|May|Jul|Aug|Oct|Dec)))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2]|(?:Jan|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec))\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)(?:0?2|(?:Feb))\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9]|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep))|(?:1[0-2]|(?:Oct|Nov|Dec)))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/ ;
    return regex.test(value) ? undefined :  value || "Vui lòng nhập đúng định dạng";
},
// Check slug(Seo)
isSlug(value){
    var regex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/ ;
    return regex.test(value) ? undefined :  value || "Vui lòng nhập đúng định dạng";
},
// Check Duplicate String
isDuplicateString(value){
    var regex = /(\b\w+\b)(?=.*\b\1\b)/;
    return regex.test(value) ? undefined :  value || "Vui lòng nhập đúng định dạng";
},
// Check Phone 0 -> 9
isPhone(value){
    return /(84|0[3|5|7|8|9])+([0-9]{8})\b/.test(value);
}
})




