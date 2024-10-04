function toggle() {
    const container = document.getElementById('container');
    container.classList.toggle('sign-in');
    container.classList.toggle('sign-up');
}

function showAlert(message) {
    alert(message);
}

function validateForm() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const cpassword = document.getElementById('cpassword').value;

    // Validate email
    if (!email.endsWith('@bmsce.ac.in')) {
        showAlert('Please enter a valid BMSCE email address (e.g., xxx@bmsce.ac.in)');
        return false;
    }

    // Validate password and confirm password
    if (password !== cpassword) {
        showAlert('Password and Confirm Password do not match.');
        return false;
    }

    // Redirect to homepage after successful signup
    window.location.href = 'homepage.html';

    return true;
}

function signIn() {
    const signInUsername = document.getElementById('signInUsername').value;
    const signInPassword = document.getElementById('signInPassword').value;

    // Redirect to homepage after successful login
    window.location.href = 'homepage.html';
}

document.getElementById("registerForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    const response = await fetch('/register', {
        method: 'POST',
        body: formData
    });
    const responseData = await response.text();
    if (response.ok) {
        window.location.href = '/homepage.html'; // Redirect to homepage on success
    } else {
        // Show specific error messages based on server response
        switch (responseData) {
            case 'UserExists':
                showAlert('User already exists. Please use a different email.');
                break;
            case 'InvalidEmail':
                showAlert('Please enter a valid BMSCE email address (e.g., xxx@bmsce.ac.in)');
                break;
            case 'PasswordsMismatch':
                showAlert('Password and Confirm Password do not match.');
                break;
            default:
                showAlert('An error occurred. Please try again later.');
                break;
        }
    }
});
