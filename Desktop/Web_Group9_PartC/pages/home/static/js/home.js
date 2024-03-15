const login_email = document.getElementById("login_email")
const login_password = document.getElementById("login_password")
const form = document.getElementById("form")

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (validateInputs()) {
        const loginData = {
            login_email: document.getElementById('login_email').value,
            login_password: document.getElementById('login_password').value
        };

     fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            console.log('Login successful:', data);
            window.location.href = data.redirect; // Use the redirect URL from the server response
        } else {
            console.error('Login failed:', data);
            const errorMessage = document.getElementById('login-error-message');
            errorMessage.textContent = data.message;
            errorMessage.style.display = 'block';
            }
        })
    .catch(error => {
    console.error('Error:', error);
        });
    }
    });


    //validateInputs
    const validateInputs = () =>{
        const emailValue = login_email.value.trim();
        const passwordValue = login_password.value.trim();
        let ans = true;

         if(emailValue === '') {
            setError(login_email, 'נא למלא דואר אלקטרוני');
            ans = false;
        } else if (!isValidEmail(emailValue)) {
            setError(login_email, 'כתובת דואר אלקטרוני לא תקינה');
            ans = false;
        } else {
            setSuccess(login_email);
        }

        if(passwordValue === ''){
            setError(login_password, 'נא למלא סיסמא')
            ans = false;
        } else if (passwordValue.length < 6){
            setError(login_password, 'סיסמא חייבת להיות לפחות 6 תווים.')
            ans = false;
        } else {
            setSuccess(login_password);
        }
        return ans;
    }