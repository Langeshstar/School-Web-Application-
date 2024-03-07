function toggleLoginForm() {
    var loginContainer = document.getElementById('loginContainer');
    var contentDiv = document.querySelector('.content');

    // Toggle visibility of content and login container
    if (loginContainer.style.display === 'none') {
        contentDiv.style.display = 'none';
        loginContainer.style.display = 'block';
    } else {
        contentDiv.style.display = 'block';
        loginContainer.style.display = 'none';
    }
}

// Function to close the login form and show content
function closeLoginForm() {
    var loginContainer = document.getElementById('loginContainer');
    var contentDiv = document.querySelector('.content');

    // Hide login container and show content
    loginContainer.style.display = 'none';
    contentDiv.style.display = 'block';
}

function handleUserTypeChange() {
    var userType = $('input[name="userType"]:checked').val();

    if (userType === "student") {
        $("#studentForm").show();
        $("#teacherForm").hide();
        $("#studentsSignup").show();
        $("#teacherSignup").hide();
    } else {
        $("#studentForm").hide();
        $("#teacherForm").show();
        $("#studentsSignup").hide();
        $("#teacherSignup").show();
    }
}

// Event listener for the user type change
$('input[name="userType"]').change(handleUserTypeChange);

// Function to handle the registration popup
function signUp(userType) {
    if (userType === "student") {
        $("#ShowStudentModal").modal();
    } else {
        $("#ShowTeacherModal").modal();
    }

    hideMessages(); // Assuming you want to hide messages when opening the modal
}

// Function to hide registration messages
function hideMessages() {
    $("#messageStudent1, #messageStudent2, #messageTeacher1, #messageTeacher2").hide();
}

// Event listeners for opening registration modals
$("#studentsSignup").click(function () {
    signUp("student");
});

$("#teacherSignup").click(function () {
    signUp("teacher");
});
// Function to handle saving student registration form

// Contents of your JavaScript code
function SaveStudentForm() {
    var name = $("#user").val();
    var regno = $('#Regno').val();
    var clas = $("#Class").val();
    var pwd = $("#Passwrd").val();

    if (name == "" || clas == "" || pwd == "") {
        $("#messageStudent1").hide();
        $("#messageStudent2").show();
        return false;
    }

    var data = $("#StudentRegistrationForm").serialize();
    var url = '/Register/SaveStudentData';

    $.ajax({
        type: "post",
        data: data,
        url: url,
        success: function (result) {
            if (result === "Registration Successfully") {
                $("#messageStudent1").show();
                $("#messageStudent2").hide();
                $("#StudentRegistrationForm")[0].reset();
                $("#ShowStudentModal").modal('hide');
            } else {
                $("#messageStudent1").hide();
                $("#messageStudent2").show();
            }
        },
        error: function (error) {
            console.log(error);
            $("#messageStudent1").hide();
            $("#messageStudent2").show();
        }
    });
}



// Event listener for saving student form
/*$("#saveStudentBtn").click(SaveStudentForm);
*/
// Similar functions and event listeners for teacher registration can be added

// Function to handle hiding messages when opening the teacher registration modal
function ShowTeacherRegistration() {
    $("#ShowTeacherModal").modal();
    hideMessages();
}

// Event listener for opening teacher registration modal
/*$("#teacherSignup").click(ShowTeacherRegistration);
*/
// Function to handle saving teacher registration form
function SaveTeacherForm() {
    var username = $("#username").val();
    var subject = $("#subjects").val();
    var clas = $("#class").val();
    var email = $("#Email").val();
    var pwd = $("#Password").val();

    if (username == "" || subject == "" || clas == "" || email == "" || pwd == "") {
        $("#messageTeacher1").hide();
        $("#messageTeacher2").show();
        return false;
    }


    var data = $("#TeacherRegistrationForm").serialize();
    var url = '/Register/SaveTeacherData';
    $.ajax({
        type: "post",
        data: data,
        url: url,
        success: function (result) {
            $("#messageTeacher1").show();
            $("#messageTeacher2").hide();
            $("#TeacherRegistrationForm")[0].reset();
            $("#ShowTeacherModal").modal('hide');
        }
    });
}


// Initialize the form validation
$(document).ready(function () {
    $('#loginForm').validate({
        rules: {
            Email: {
                required: true,
                email: true
            },
            Regno: {
                required: true,
            },
            Password: {
                required: true
            }
        },
        messages: {
            Regno: {
                required: "Please enter your Register Number",
            },
            Email: {
                required: "Please enter your Email address",
                email: "Please enter a valid Email address"
            },
            Password: {
                required: "Please enter your password"
            }
        },
        errorElement: 'div',
        errorPlacement: function (error, element) {
            error.addClass('invalid-feedback');
            element.closest('.input-group').append(error);
        },
        highlight: function (element, errorClass, validClass) {
            $(element).addClass('is-invalid');
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).removeClass('is-invalid');
        }
    });
});

//Login System
function StudentLogin() {
    var regno = $('#Regno').val();
    var pass = $('#password').val();
    var url = '/Register/CheckValidUser';

    var secURL = '/Register/AfterLogin';

    $.ajax({
        type: "POST",
        url: url,
        data: { RegNo: regno, Password: pass },
        success: function (result) {
            if (result === "Success") {
                StudentLogin
                window.location.href = secURL;
            } else {
                alert(result); // Show error message
            }
        },
        error: function (e) {
            console.log(e);
            alert("An error occurred during the login process.");
        }
    });
}
function TeacherLogin() {
    var email = $('#email').val();
    var pwd = $('#passwrd').val();
    var url = '/Register/CheckValidUsers';

    var secURL = '/Register/AfterLogin';

    $.ajax({
        type: "POST",
        url: url,
        data: { Email: email, Password: pwd },
        success: function (result) {
            if (result === "Success") {
                TeacherLogin
                window.location.href = secURL;
            } else {
                alert(result);
            }
        },
        error: function (e) {
            console.log(e);
            alert("An error occurred during the login process.");
        }
    });
}
