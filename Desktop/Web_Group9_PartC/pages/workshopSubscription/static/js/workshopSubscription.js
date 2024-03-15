const form = document.getElementById('form')
const customer_first_name = document.getElementById('customer_first_name');
const customer_last_name = document.getElementById('customer_last_name');
const customer_email = document.getElementById('customer_email');
const customer_phone = document.getElementById('customer_phone');
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let a = 1;

form.addEventListener('submit', function(event){
    event.preventDefault();

        if (validateInputs()) {

            const subscriptionData = {
                form: document.getElementById('form').value,
                customer_first_name: document.getElementById('customer_first_name').value,
                customer_last_name: document.getElementById('customer_last_name').value,
                customer_email: document.getElementById('customer_email').value,
                customer_phone: document.getElementById('customer_phone').value,
                customer_allergy: document.getElementById('customer_allergy').value,

                workshop_name: urlParams.has('name') ? urlParams.get('name') : "",
                workshop_date: urlParams.has('date') ? urlParams.get('date') : "",
                quantity: a
            }

            fetch('/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(subscriptionData)
            })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                console.log('Workshop Registration Successful:', data);
                alert("נרשמת לסדנה בהצלחה! איזה כיף לך!");
                window.location.href = data.redirect;
            } else {
                console.log(data.message)
                console.log(sessionStorage['userId'])
                console.error('Workshop Registration Failed:', data);
                // Show error message to the user
                if (data.message == 'Please connect first') {
                    alert('רק משתמשים מחוברים יכולים להירשם, תתחבר :)');
                    window.location.reload();
                } else{
                    console.log(data.message)
                    alert('אנא הירשם עם המייל של הלקוח המחובר בלבד :)');
                    window.location.reload();
                }
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
            }

});

const validateInputs = () => {
    const customer_firstnameValue = customer_first_name.value.trim();
    const customer_lastnameValue = customer_last_name.value.trim();
    const emailValue = customer_email.value.trim();
    const customer_phoneValue = customer_phone.value.trim();
    let ans = true;

    if(emailValue === '') {
        setError(customer_email, 'נא למלא דואר אלקטרוני');
        ans = false;
    } else if (!isValidEmail(emailValue)) {
        setError(customer_email, 'כתובת דואר אלקטרוני לא תקינה');
        ans = false;
    } else {
        setSuccess(customer_email);
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

    return ans;
};


    // Function to parse query parameters from URL
function parseQueryString() {

    return {
        name: urlParams.has('name') ? urlParams.get('name') : "",
        date: urlParams.has('date') ? urlParams.get('date') : "",
        city: urlParams.has('city') ? urlParams.get('city') : "",
        time: urlParams.has('time') ? urlParams.get('time') : "",
        chef: urlParams.has('chef') ? urlParams.get('chef') : "",
        price: urlParams.has('price') ? urlParams.get('price') : "",
        photo: urlParams.has('photo') ? urlParams.get('photo') : "",
        background_color: urlParams.has('background_color') ? urlParams.get('background_color') : ""
    };

}

// Retrieve workshop from query string
const workshop = parseQueryString();


 // Display workshop details in HTML
const workshopDetailsDiv = document.getElementById('workshopDetails');
workshopDetailsDiv.innerHTML = `
    <div class="workshop-banner" style="background-color: ${workshop.background_color}">
        <img class="workshopImg" src=${workshop.photo} alt="${workshop.name} Workshop Img"/>
    
        <div class="banner-section">
            <h1>${workshop.name}</h1>
            <h2>${workshop.date}</h2>
        </div>
        <div class="banner-section">
            <h2>${workshop.city}</h2>
            <h2>${workshop.time}</h2>
            <h2>${workshop.chef}</h2>
        </div>
        <div>
            <div class="price-banner">
                <h3>${workshop.price} שח</h3>
            </div>
        </div>
    </div>
`;

// -------------- Quantity Button----------------

// Quantity counter functionality
const plus = document.querySelector(".plus")
const minus = document.querySelector(".minus")
const num = document.querySelector(".num")

plus.addEventListener("click", () => {
    if (a < 5) {
        a++;
    }
    num.innerText = a;
});
minus.addEventListener("click", () => {
    if (a > 1) {
        a--;
    }
    num.innerText = a;
});