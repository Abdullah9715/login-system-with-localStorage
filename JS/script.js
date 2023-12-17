const getFieldValue = id => document.getElementById(id).value;

const setFieldValue = (Id, value) => {
    document.getElementById(Id).value = value;
}

const notificationAlert = (msg, type) => {
    let bgcolor;
    switch (type) {
        case "success":
            bgcolor = "linear-gradient(to right ,#EAD867,#37CF41)"
            break;
        case "error":
            bgcolor = "linear-gradient(to right , #D55D56,#DB2E1D)"
            break;
        case "default":
            bgcolor = "linear-gradient(to right ,#BA86B5,#CA16B8)"
    }
    Toastify({
        text: msg,
        duration: 4000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: bgcolor,
        },
        onClick: function() {} // Callback after click
    }).showToast();
}


let registeredEmail = []
const handleSubmit = () => {
    event.preventDefault();

    let firstName = getFieldValue('firstName');
    let lastName = getFieldValue('lastName');
    let fullName = firstName + " " + lastName;
    let email = getFieldValue('email');
    let password = getFieldValue('password');
    let confirmPassword = getFieldValue('confirmPassword');

    firstName = firstName.trim();
    lastName = lastName.trim();
    fullName = fullName.trim();
    email = email.trim();
    password = password.trim();
    confirmPassword = confirmPassword.trim();

    if (firstName.length < 3) {
        notificationAlert("please enter First name", "error")
        return;
    }
    if (lastName.length < 3) {
        notificationAlert("please enter Last name", "error")
        return;
    }
    if (email.length < 3) {
        notificationAlert("please enter email", "error")
        return;
    }
    if (registeredEmail.includes(email)) {
        notificationAlert('user have already registered')
        return
    }
    registeredEmail.push(email);

    if (password.length < 3) {
        notificationAlert("please enter passsword", "error")
        return;
    }
    const uppercaseRegex = /[A-Z]/,
        lowercaseRegex = /[a-z]/,
        numberRegex = /[0-9]/;

    if (!uppercaseRegex.test(password) || !lowercaseRegex.test(password) || !numberRegex.test(password)) {
        notificationAlert('Password must contain at least one uppercase letter, one lowercase letter, and one number.');
        return;
    }
    if (confirmPassword.length < 3) {
        notificationAlert("please enter confirm password", "error")
        return;
    }
    if (password !== confirmPassword) {
        notificationAlert("please match your password")
        return
    }
    const allData = { fullName, email, password, confirmPassword }

    const dataInLocal = JSON.parse(localStorage.getItem('users')) || [];
    dataInLocal.push(allData);
    localStorage.setItem('users', JSON.stringify(dataInLocal));

    window.location.href = 'login.html'

}


const handleLogin = () => {
    event.preventDefault();
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    if (email.length < 3) {
        notificationAlert("please enter email", "error")
        return;
    }
    if (password.length < 3) {
        notificationAlert("please enter passsword", "error")
        return;
    }
    const dataInLocal = JSON.parse(localStorage.getItem('users'));
    const matchData = dataInLocal.find(allData => allData.email === email && allData.password === password);

    const io = { email, password }
    localStorage.setItem('userss', JSON.stringify(io));

    if (matchData) {
        notificationAlert('Successfully Loing', 'success')
        window.location.href = 'welcome.html'
        return

    } else {
        console.log("Invalid email or password");
        notificationAlert('Invalid email or password', 'error')
        return
    }

}