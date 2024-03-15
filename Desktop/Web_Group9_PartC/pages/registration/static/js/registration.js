const customer_form = document.getElementById('Customer')
const customer_email = document.getElementById('customer_email');
const customer_password = document.getElementById('customer_password');
const customer_password2 = document.getElementById('customer_password2');
const customer_first_name = document.getElementById('customer_first_name');
const customer_last_name = document.getElementById('customer_last_name');
const customer_phone = document.getElementById('customer_phone');
const customer_birthdate = document.getElementById('customer_birthdate');
const card_number = document.getElementById('card_number');
const card_valid_until = document.getElementById('card_valid_until');
const CCV = document.getElementById('CCV');
//---------------------------------

function showCreditCard() {
    let checkbox = document.getElementById("showCreditCard_Checkbox");
    let detailsSection = document.getElementById("detailsSection");

    if (checkbox.checked) {
        detailsSection.style.display = "block"; // Show hiddenSection
    } else {
        detailsSection.style.display = "none"; // Hide hiddenSection
    }
}

// Customer Validate inputs
customer_form.addEventListener('submit', function(event) {
    event.preventDefault();

    if(validateInputs_customer()) {
        const customerData = {
            customer_email: document.getElementById('customer_email').value,
            customer_password: document.getElementById('customer_password').value,
            customer_first_name: document.getElementById('customer_first_name').value,
            customer_last_name: document.getElementById('customer_last_name').value,
            customer_phone: document.getElementById('customer_phone').value,
            customer_birthdate: document.getElementById('customer_birthdate').value,
            card_number: document.getElementById('card_number').value,
            card_valid_until: document.getElementById('card_valid_until').value,
            CCV: document.getElementById('CCV').value
        };

        fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customerData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                console.log('Registration successful:', data);
                alert("הטופס נשלח בהצלחה - לקוח!")
                window.location.href = data.redirect; // Use the redirect URL from the server response
            } else {
                console.error('Registration failed:', data);
                // Show error message to the user
                alert('כתובת הדוא"ל קיימת במערכת');
                window.location.reload();
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
});

    const validateInputs_customer = () => {
        const emailValue = customer_email.value.trim();
        const customer_passwordValue = customer_password.value.trim();
        const customer_password2Value = customer_password2.value.trim();
        const customer_firstnameValue = customer_first_name.value.trim();
        const customer_lastnameValue = customer_last_name.value.trim();
        const customer_phoneValue = customer_phone.value.trim();
        const customer_birthdateValue = customer_birthdate.value.trim();

        const card_numberValue = card_number.value.trim();
        const card_valid_untilValue = card_valid_until.value.trim();
        const ccvValue = CCV.value.trim();

        const today = new Date();
        const birthdate = new Date(customer_birthdateValue);

        let ans=true;

        if(emailValue === '') {
            setError(customer_email, 'נא למלא דואר אלקטרוני');
            ans = false;
        } else if (!isValidEmail(emailValue)) {
            setError(customer_email, 'כתובת דואר אלקטרוני לא תקינה');
            ans = false;
        } else {
            setSuccess(customer_email);
        }

        if(customer_passwordValue === ''){
            setError(customer_password, 'נא למלא סיסמא')
            ans = false;
        } else if (customer_passwordValue.length < 6){
            setError(customer_password, 'סיסמא חייבת להיות לפחות 6 תווים.')
            ans = false;
        } else {
            setSuccess(customer_password);
        }

        if(customer_password2Value === ''){
            setError(customer_password2, 'נא לאמת את הסיסמא')
            ans = false;
        } else if (customer_password2Value !== customer_passwordValue){
            setError(customer_password2, "הסיסמאות לא תואמות")
            ans = false;
        } else {
            setSuccess(customer_password2);
        }

        if(customer_firstnameValue === ''){
            setError(customer_first_name, 'נא למלא שם פרטי')
            ans = false;
        } else if (!validateNameField(customer_firstnameValue)){
            setError(customer_first_name, "נא להכניס אותיות בלבד")
            ans = false;
        } else {
            setSuccess(customer_first_name);
        }

        if(customer_lastnameValue === ''){
            setError(customer_last_name, 'נא למלא שם משפחה')
            ans = false;
        } else if (!validateNameField(customer_lastnameValue)){
            setError(customer_last_name, "נא להכניס אותיות בלבד")
            ans = false;
        } else {
            setSuccess(customer_last_name);
        }

        if(customer_phoneValue === ''){
            setError(customer_phone, 'נא למלא מספר טלפון')
            ans = false;
        } else if ((customer_phoneValue.length !== 10) || (!validateNumber(customer_phoneValue))){
            setError(customer_phone, "מספר טלפון חייב להכיל 10 ספרות בלבד")
            ans = false;
        } else {
            setSuccess(customer_phone);
        }

        if ((customer_birthdateValue !== '') && (birthdate > today)){
            setError(customer_birthdate, "תאריך הלידה לא חוקי")
            ans = false;
        } else {
            setSuccess(customer_birthdate);
        }

        if(card_numberValue === ''){
            setError(card_number, 'נא למלא מספר כרטיס אשראי')
            ans = false;
        } else if ((card_numberValue.length !== 16) || (!validateNumber(card_numberValue))){
            setError(card_number, "מספר אשראי חייב להכיל 16 ספרות בלבד")
            ans = false;
        } else {
            setSuccess(card_number);
        }

        if(card_valid_untilValue === ''){
            setError(card_valid_until, 'נא למלא תוקף כרטיס')
            ans = false;
        } else if ((card_valid_untilValue.length !== 7) || (!validateCreditCardExpiry(card_valid_untilValue))){
            setError(card_valid_until, "נדרש תאריך עתידי בפורמט נדרש MM/YYYY")
            ans = false;
        } else {
            setSuccess(card_valid_until);
        }

        if(ccvValue === ''){
            setError(CCV, 'נא למלא CCV')
            ans = false;
        } else if ((ccvValue.length !== 3) || (!validateNumber(ccvValue))){
            setError(CCV, "CCV חייב להכיל 3 ספרות בלבד")
            ans = false;
        } else {
            setSuccess(CCV);
        }

        return ans;
    };

    function validateCreditCardExpiry(expiryDate) {

        let expiryRegex = /^(0[1-9]|1[0-2])\/(20)\d{2}$/; //valid format (MM/YYYY)

        if (!expiryRegex.test(expiryDate)){
            return false
        }else {
             const [expiryMonth, expiryYear] = expiryDate.split('/');
             const today = new Date();

            const currentMonth = today.getMonth() + 1;
            const currentYear = today.getFullYear();

            if (parseInt(expiryYear) < currentYear) {
                return false;
            } else if (parseInt(expiryYear) === currentYear) {
                return parseInt(expiryMonth) >= currentMonth;
            } else {
                return true;
            }
        }
    }