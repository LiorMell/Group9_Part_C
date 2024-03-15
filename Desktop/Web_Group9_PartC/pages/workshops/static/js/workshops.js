// Add event listeners to filter input fields
document.getElementById("nameFilter").addEventListener("input", filterWorkshops);
document.getElementById("dateFilter").addEventListener("input", filterWorkshops);
document.getElementById("chefFilter").addEventListener("input", filterWorkshops);
document.getElementById("cityFilter").addEventListener("input", filterWorkshops);

    filterWorkshops();

function filterWorkshops() {
    let nameFilter = document.getElementById("nameFilter").value.toLowerCase();
    let dateFilter = document.getElementById("dateFilter").value;
    let chefFilter = document.getElementById("chefFilter").value.toLowerCase();
    let cityFilter = document.getElementById("cityFilter").value.toLowerCase();

    let filteredWorkshops = workshops.filter(function(workshop) {
        return (workshop.name.toLowerCase().includes(nameFilter)) &&
               (workshop.date === dateFilter || dateFilter === "") &&
               (workshop.chef.toLowerCase().includes(chefFilter)) &&
               (workshop.city.toLowerCase().includes(cityFilter));
    });
    displayWorkshopInfo(filteredWorkshops);
}

document.querySelectorAll(".workshop-banner").forEach(banner => {
    banner.addEventListener("click", function() {
        // Extract workshop information from the banner's dataset
        const workshop = {
            name: banner.dataset.name,
            date: banner.dataset.date,
            city: banner.dataset.city,
            time: banner.dataset.time,
            chef: banner.dataset.chef,
            price: banner.dataset.price,
            photo: banner.dataset.photo,
            background_color: banner.dataset.background_color
        };

    });
});


function displayWorkshopInfo(filteredWorkshops) {
    let workshopInfo = "";
    filteredWorkshops.forEach(function(workshop, index) {
        workshopInfo += `
            <a href="workshopSubscription?name=${encodeURIComponent(workshop.name)}&date=${encodeURIComponent(workshop.date)}&city=${encodeURIComponent(workshop.city)}
                    &time=${encodeURIComponent(workshop.time)}&chef=${encodeURIComponent(workshop.chef)}&price=${encodeURIComponent(workshop.price)}
                    &photo=${encodeURIComponent(workshop.photo)}&background_color=${encodeURIComponent(workshop.background_color)}">

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
                <div>
                
                </div>
                    <div class="price-banner">
                         <h3>${workshop.price}</h3>
                    </div>
                </div>
            </div>
            </a>
        `;
    });
    document.getElementById("workshopInfo").innerHTML = workshopInfo;
}
