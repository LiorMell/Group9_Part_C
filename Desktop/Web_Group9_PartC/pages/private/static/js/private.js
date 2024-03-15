    // Add event listeners to filter input fields
document.getElementById("nameFilter").addEventListener("input", filterWorkshops);
document.getElementById("dateFilter").addEventListener("input", filterWorkshops);
document.getElementById("chefFilter").addEventListener("input", filterWorkshops);
document.getElementById("cityFilter").addEventListener("input", filterWorkshops);

filterWorkshops();

async function filterWorkshops() {
    let nameFilter = document.getElementById("nameFilter").value.toLowerCase();
    let dateFilter = document.getElementById("dateFilter").value;
    let chefFilter = document.getElementById("chefFilter").value.toLowerCase();
    let cityFilter = document.getElementById("cityFilter").value.toLowerCase();

    let filteredWorkshops = my_workshops.filter(function (workshop) {
        return (workshop.name.toLowerCase().includes(nameFilter)) &&
            (workshop.date === dateFilter || dateFilter === "") &&
            (workshop.chef.toLowerCase().includes(chefFilter)) &&
            (workshop.city.toLowerCase().includes(cityFilter));
    });

    displayWorkshopInfo(filteredWorkshops);
}

async function displayWorkshopInfo(filteredWorkshops) {
    let workshopInfo = "";
    for (const workshop of filteredWorkshops) {
            let response = await fetch(`/getWorkshopQuantity/${workshop.name}`);
            let data = await response.json();
            let current_quantity = data.quantity;

            workshopInfo += `
            <div class="row-flex">
                <div class="workshop-banner" style="background-color: ${workshop.background_color}">
                    <img class="workshopImg" src="${workshop.photo}" alt="next Workshop Img"> <!-- Wrapped photo with quotes -->
                    <div class="banner-section">        
                        <h1>${workshop.name}</h1>
                        <h2>${workshop.date}</h2>
                    </div>
                    <div class="banner-section">
                        <h2>${workshop.city}</h2>
                        <h2>${workshop.time}</h2>
                        <h2>${workshop.chef}</h2>
                    </div>
    
                    <div class="price-banner">
                         <h3>${workshop.price}</h3>
                    </div>
                </div>
                <div class = "quantity">
                    <h5>עדכון מספר נרשמים:</h5>
                    <br>
                    <a class="operator" href="/minus/${encodeURIComponent(workshop.name)}/${encodeURIComponent(workshop.date)}">-</a>
                    <span class = "num"> ${ current_quantity }</span>
                    <a class="operator" href="/plus/${encodeURIComponent(workshop.name)}/${encodeURIComponent(workshop.date)}">+</a>
                    <br>
                    <br>
                    <h6>ניתן לרשום עד 5 משתתפים</h6>
                </div>
                
                <div class="column-flex">             
                <div class="cancel_btn">
                    <a href="/deleteWorkshop/${encodeURIComponent(workshop.name)}/${encodeURIComponent(workshop.date)}">ביטול סדנה</a>
                </div>
                </div>
            </div>
    `;
    }
    document.getElementById("workshopInfo").innerHTML = workshopInfo;
}
