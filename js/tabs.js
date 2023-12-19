 const tabs = document.querySelectorAll('.tab_btn');
    const all_content = document.querySelectorAll('.content');
    const line = document.querySelector('.line');

    // Початкове положення для line (наприклад, перший таб)
    if (tabs.length > 0 && line) {
      const firstTab = tabs[0];
      line.style.width = firstTab.offsetWidth + "px";
      line.style.left = firstTab.offsetLeft + "px";
      line.style.top = firstTab.offsetTop - "px";
    }

    tabs.forEach((tab, index) => {
      tab.addEventListener('click', (e) => {
        tabs.forEach(tab => { tab.classList.remove('active') });
        tab.classList.add('active');

        line.style.width = e.target.offsetWidth + "px";
        line.style.left = e.target.offsetLeft + "px";
        line.style.top = e.target.offsetTop - "px";

        all_content.forEach(content => { content.classList.remove('active') });
        all_content[index].classList.add('active');

        // Викликати функцію для відображення маршруту при кліку на вкладку
        if (e.target.textContent.trim() === 'Україна-Франція') {
          showMap('France');
        } else if (e.target.textContent.trim() === 'Україна-Німеччина') {
          showMap('Germany');
        }
      })
    });

  function initMap() {
  const ukraineFranceBtn = document.querySelector('.tab_btn:nth-child(1)');
  const ukraineGermanyBtn = document.querySelector('.tab_btn:nth-child(2)');

  const pointUkraine = new google.maps.LatLng(48.92343611257329, 24.724225756809833);
  const pointFrance = new google.maps.LatLng(48.87712494447772, 2.3594509026506167);
  const pointGermany = new google.maps.LatLng(52.5179250773887, 13.405538697085147);

  const myOptions = {
    zoom: 7,
    center: pointUkraine
  };

  const mapFrance = new google.maps.Map(document.getElementById('mapFrance'), myOptions);
  const mapGermany = new google.maps.Map(document.getElementById('mapGermany'), myOptions);

  const directionsServiceFrance = new google.maps.DirectionsService();
  const directionsServiceGermany = new google.maps.DirectionsService();

  const directionsDisplayFrance = new google.maps.DirectionsRenderer({ map: mapFrance });
  const directionsDisplayGermany = new google.maps.DirectionsRenderer({ map: mapGermany });

  const markerUkraine = new google.maps.Marker({
    position: pointUkraine,
    title: "Україна",
    label: "U",
    map: mapFrance // Початкова карта: Франція
  });

  const markerFrance = new google.maps.Marker({
    position: pointFrance,
    title: "Франція",
    label: "F",
    map: mapFrance // Початкова карта: Франція
  });

  const markerGermany = new google.maps.Marker({
    position: pointGermany,
    title: "Німеччина",
    label: "G",
    map: mapGermany // Початкова карта: Німеччина
  });

  // Отримання маршрутів при завантаженні
  calculateAndDisplayRoute(directionsServiceFrance, directionsDisplayFrance, pointUkraine, pointFrance);
  calculateAndDisplayRoute(directionsServiceGermany, directionsDisplayGermany, pointUkraine, pointGermany);

  ukraineFranceBtn.addEventListener('click', function () {
    calculateAndDisplayRoute(directionsServiceFrance, directionsDisplayFrance, pointUkraine, pointFrance);
  });

  ukraineGermanyBtn.addEventListener('click', function () {
    calculateAndDisplayRoute(directionsServiceGermany, directionsDisplayGermany, pointUkraine, pointGermany);
  });
}

function calculateAndDisplayRoute(directionsService, directionsDisplay, origin, destination) {
  directionsService.route({
    origin: origin,
    destination: destination,
    avoidTolls: true,
    avoidHighways: false,
    travelMode: google.maps.TravelMode.DRIVING
  }, function (response, status) {
    if (status === 'OK') {
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}