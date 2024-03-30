const logoutLink = document.getElementById('logout');

    function returnHome() {
    window.location.href = "/home";
    }

//------------------------- Validate Inputs -------------------------
    function validateNumber(phone) {
    let phoneRegex = /^[0-9]+$/; // This regex matches any sequence of digits
    return phoneRegex.test(phone)
    }

    function validateNameField(name) {
        let lettersOnly = /^[a-zA-Zא-ת\s]*$/;
        return lettersOnly.test(name);
    }

    const isValidEmail = email => {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
    }

    const setError = (element, message) => {
        const inputControl = element.parentElement;
        const errorDisplay = inputControl.querySelector('.error')

        errorDisplay.innerText = message;
        inputControl.classList.add('error');
        inputControl.classList.remove('success');
    }
    const setSuccess = (element) => {
        const inputControl = element.parentElement;
        const errorDisplay = inputControl.querySelector('.error')

        errorDisplay.innerText = '';
        inputControl.classList.add('success');
        inputControl.classList.remove('error');
    }
