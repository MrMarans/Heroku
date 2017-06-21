var saveInput;
(function (saveInput) {
    /*
Aufgabe: 9
Name: Metzger, Ron
Matrikel: 254878
Datum: 11.06.2017
    
Hiermit versichere ich, dass ich diesen Code selbst geschrieben habe. Er wurde nicht kopiert und auch nicht diktiert.
*/
    window.addEventListener("load", start);
    var sorts = ["Erdbeer", "Himbeer", "Erdbeere"];
    var Eissorten;
    var Toppings;
    var Behaelter;
    var toppings = ["Schokosoße", "Erdbeersoße"];
    var inputsEis = [];
    var inputsTopping = [];
    var behaelters = ["Waffel", "Becher"];
    var InputsBehaelter = [];
    var Warenkorb;
    var Bestellung;
    function start() {
        Eissorten = document.getElementById("Eissorten");
        Toppings = document.getElementById("Toppings");
        Behaelter = document.getElementById("Behaelter");
        Warenkorb = document.getElementById("Warenkorb");
        Bestellung = document.getElementById("sendOrder");
        createProduktauswahl();
        Eissorten.addEventListener("change", change);
        Toppings.addEventListener("change", change);
        Behaelter.addEventListener("change", change);
        Bestellung.addEventListener("click", sendOrder);
    }
    function createProduktauswahl() {
        for (var i = 0; i < sorts.length; i++) {
            createInput(sorts[i]);
        }
        for (var i = 0; i < toppings.length; i++) {
            createCheckbox(toppings[i]);
        }
        for (var i = 0; i < behaelters.length; i++) {
            createRadio(behaelters[i]);
        }
    }
    function createInput(_sort) {
        var label = document.createElement("label");
        var input = document.createElement("input");
        label.innerText = _sort;
        label.appendChild(input);
        input.type = "number";
        input.min = "0";
        input.value = "0";
        label.id = _sort;
        Eissorten.appendChild(label);
        inputsEis.push(input);
    }
    function createCheckbox(_topping) {
        var label = document.createElement("label");
        var input = document.createElement("input");
        label.innerText = _topping;
        label.appendChild(input);
        input.type = "checkbox";
        label.id = _topping;
        Toppings.appendChild(label);
        inputsTopping.push(input);
    }
    function createRadio(_behaelters) {
        var label = document.createElement("label");
        var input = document.createElement("input");
        label.innerText = _behaelters;
        label.appendChild(input);
        input.type = "radio";
        input.name = "behaelters";
        input.required = true;
        label.id = _behaelters;
        Behaelter.appendChild(label);
        InputsBehaelter.push(input);
    }
    function change() {
        var sum = 0;
        for (var i = 0; i < inputsEis.length; i++) {
            sum += parseInt(inputsEis[i].value);
        }
        for (var i = 0; i < inputsTopping.length; i++) {
            if (inputsTopping[i].checked) {
                sum += 2;
            }
        }
        for (var i = 0; i < InputsBehaelter.length; i++) {
            if (InputsBehaelter[i].checked) {
                sum += 1.5;
            }
        }
        changeWarenkorb(sum);
    }
    function changeWarenkorb(_sum) {
        var Warenliste = document.getElementById("Warenliste");
        Warenliste.innerText = "";
        for (var i = 0; i < inputsEis.length; i++) {
            if (parseInt(inputsEis[i].value) > 0) {
                Warenliste.innerText += sorts[i] + " " + (parseInt(inputsEis[i].value) * 1) + "€" + "\n";
            }
        }
        for (var i = 0; i < inputsTopping.length; i++) {
            if (inputsTopping[i].checked) {
                Warenliste.innerText += toppings[i] + " 2€" + "\n";
            }
        }
        for (var i = 0; i < InputsBehaelter.length; i++) {
            if (InputsBehaelter[i].checked) {
                Warenliste.innerText += behaelters[i] + " 1,5€" + "\n";
            }
        }
        var summeHtml = document.getElementById("Summe");
        summeHtml.innerText = _sum.toString() + " €";
    }
    function sendOrder() {
        var Korrektur = ["Hast du folgendes auch wirklich ausgefülllt? \n"];
        var Vorname = document.getElementById("Vorname");
        var Nachname = document.getElementById("Nachname");
        var Strasse = document.getElementById("Strasse");
        var PLZ = document.getElementById("PLZ");
        var Ort = document.getElementById("Ort");
        var Mail = document.getElementById("Mail");
        var Telefon = document.getElementById("Telefon");
        var Anrede = document.getElementById("Anrede");
        var Lieferart = document.getElementById("Lieferart");
        if (Anrede.value != "Herr" && Anrede.value != "Frau")
            Korrektur.push("Anrede \n");
        if (Vorname.validity.valid == false)
            Korrektur.push("Vorname \n");
        if (Nachname.validity.valid == false)
            Korrektur.push("Nachname \n");
        if (Strasse.validity.valid == false)
            Korrektur.push("Stra?e \n");
        if (PLZ.validity.valid == false)
            Korrektur.push("Postleitzahl \n");
        if (Ort.validity.valid == false)
            Korrektur.push("Ort \n");
        if (Mail.validity.valid == false)
            Korrektur.push("Email-Adresse \n");
        if (Telefon.validity.valid == false)
            Korrektur.push("Telefonnummer \n");
        if (Lieferart.value != "Lieferung" && Lieferart.value != "Selbstabholung")
            Korrektur.push("Lieferart \n");
        var Eiskugeln = 0;
        var behaelters = 0;
        for (var i = 0; i < inputsEis.length; i++) {
            if (parseInt(inputsEis[i].value) > 0)
                Eiskugeln += 1;
        }
        if (Eiskugeln == 0)
            Korrektur.push("Eissorten\n");
        for (var i = 0; i < InputsBehaelter.length; i++) {
            if (InputsBehaelter[i].checked)
                behaelters += 1;
        }
        if (behaelters == 0)
            Korrektur.push("Becher");
        if (Korrektur.length > 1) {
            for (var i = 0; i < Korrektur.length; i++)
                Korrektur.push;
            alert(Korrektur.join(""));
        }
        else {
            alert("Vielen Dank für Ihre Bestellung! Wie immer werden Sie ihr Eis blutig bekommen.");
            location.reload();
        }
    }
})(saveInput || (saveInput = {}));
//# sourceMappingURL=main.js.map