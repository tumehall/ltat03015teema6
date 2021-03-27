(function() {
    "use strict";
    
    //clock

    document.addEventListener("DOMContentLoaded", function() {
        
        let c = document.getElementById("clock");
       
        //setTimeout(updateClock, 2000);
        setInterval(updateClock, 1000);
        
        function updateClock() {
            
            let date = new Date();
            let h = date.getHours();
            let m = date.getMinutes();
            let s = date.getSeconds();
            let ampm = h >= 12 ? 'pm' : 'am';
            h = h % 12;

            /* if (h < 10) {
                h = "0" + h;
            } */

            if (m < 10) {
                m = "0" + m;
            }

            if (s < 10) {
                s = "0" + s;
            }

            c.innerHTML = h + ":" + m + ":" + s + " " + ampm;
            
        };
        
    });
    
    // forms
    
    document.getElementById("form").addEventListener("submit", estimateDelivery);
    
    let e = document.getElementById("delivery");
    e.innerHTML = "0,00 &euro;";
    
    function estimateDelivery(event) {
        event.preventDefault();
        
        let tarneSumma = 0;
        let linn = document.getElementById("linn");
        let kingitus = document.getElementById("v1").checked;
        let kontaktivaba = document.getElementById("v2").checked;
        let tarne = 0;
        if (document.getElementById("r1").checked == true) tarne = 1;
        else if (document.getElementById("r2").checked == true) tarne = 2;
        else if (document.getElementById("r3").checked == true) tarne = 3;
        
        let fname = document.getElementById("fname");
        let lname = document.getElementById("lname");
        
        let tarneHind = 0;
        
        if (linn.value === "") {
            
            alert("Palun valige linn nimekirjast");
            
            linn.focus();
            
            return;  
        }
        
        else if (fname.value == "" || /\d/.test(fname.value) === true) {
            alert("Eesnimi ei tohi olla tühi ega sisaldada numbreid");
            fname.focus();
            return;
        }
        
        else if (lname.value == "" || /\d/.test(lname.value) === true) {
            alert("Perekonnanimi ei tohi olla tühi ega sisaldada numbreid");
            lname.focus();
            return;
        }
        
        if (tarne == 0) {
            alert("Palun vali tarneviis");
            return;
        }

        
        
        // Tarnete hinnad. Siin annaks koodi kokku tõmmata, aga nii, nagu praegu, on lihtne hindu vajadusel muuta.
        if (linn.value == "tln") tarneSumma += 0;
        else if (linn.value == "trt") tarneSumma += 2.5;
        else if (linn.value == "nrv") tarneSumma += 2.5;
        else if (linn.value == "prn") tarneSumma += 3; 
        
        // Kingitusena saatmine lisab 5€ (v.a. juhul, kui klient ise järele tuleb)
        if (kingitus == true) tarneSumma += 5;
        
        // Kulleriga tarne on 2€ kallim ja kontaktivabalt veel 1€ kallim. Kulleriga on tarne miinimumsumma 4€.
        if (tarne == 1) {
            tarneSumma += 2;
            if (kontaktivaba == true) tarneSumma += 1;
            if (tarneSumma < 4) tarneSumma = 4;
        }
        
        // Kui klient ise järele tuleb, siis on hoolimata muudest tingimustest tarne hind 0
        if (tarne == 3) tarneSumma = 0;
        
        // Kirjutame tarne hinna HTML-i
        e.innerHTML = tarneSumma + " &euro;";
        
        console.log("Tarne hind on arvutatud");
    }
    
})();

// map

let mapAPIKey = "Agc_Bpr00As8p0ut9_2JddiDK3CfNXC-9qitFXJEsQRZpKW2cppErkjvB3aGBd9t";

let map;

function GetMap() {
    
    "use strict";
    
    let centerPoint = new Microsoft.Maps.Location(
            58.36885, 
            26.94851
        );

    let pin1 = new Microsoft.Maps.Location(
            58.38104, 
            26.71992
        );
    
    let pin2 = new Microsoft.Maps.Location(
            58.37520,
            27.24506
        );
    
    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        center: centerPoint,
        zoom: 10,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        disablePanning: false
    });
    
        
    let infobox = new Microsoft.Maps.Infobox(map.getCenter(), {
            visible: false
        });
    /* var infobox = new Microsoft.Maps.Infobox(map.getCenter(), { title: 'Map Center', description: 'Seattle', visible: false }); */
    infobox.setMap(map);
    
    let pushpin1 = new Microsoft.Maps.Pushpin(pin1, {
            title: 'Peahoone esindus',
            //subTitle: 'Hea koht',
            //text: 'UT'
        });
    
    Microsoft.Maps.Events.addHandler(pushpin1, 'click', function () {
        infobox.setOptions({
            title: 'Peahoone esindus',
            description: 'Telefon: +372 7606 654',
            location: pushpin1.getLocation(),
            visible: true
        });
    });
    
    let pushpin2 = new Microsoft.Maps.Pushpin(pin2, {
            title: 'Pärapõrgu esindus',
            // subTitle: 'Pärapõrgu esindus',
            // text: 'Pärapõrgu esindus'
        });
    
    Microsoft.Maps.Events.addHandler(pushpin2, 'click', function () {
        infobox.setOptions({
            title: 'Pärapõrgu esindus',
            description: 'Telefon: levi puudub',
            location: pushpin2.getLocation(),
            visible: true
        });
    });

    map.entities.push(pushpin1);
    map.entities.push(pushpin2);
    
    

}

// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE

