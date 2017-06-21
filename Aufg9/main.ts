namespace saveInput {

    /*
Aufgabe: 9
Name: Metzger, Ron
Matrikel: 254878
Datum: 11.06.2017
    
Hiermit versichere ich, dass ich diesen Code selbst geschrieben habe. Er wurde nicht kopiert und auch nicht diktiert.
*/

    window.addEventListener("load", start);

    let sorts = ["Erdbeer", "Himbeer", "Erdbeere"];
    let Eissorten: HTMLElement;
    let Toppings: HTMLElement;
    let Behaelter: HTMLElement;
    let toppings: string[] = ["Schokosoße", "Erdbeersoße"];
    let inputsEis: HTMLInputElement[] = [];
    let inputsTopping: HTMLInputElement[] = [];
    let behaelters: string[] = ["Waffel", "Becher"];
    let InputsBehaelter: HTMLInputElement[] = [];
    let Warenkorb: HTMLElement;
    let Bestellung: HTMLElement;


    function start(): void {
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

    function createProduktauswahl(): void {
        for (let i: number = 0; i < sorts.length; i++) {
            createInput(sorts[i]);
        }
        for (let i: number = 0; i < toppings.length; i++) {
            createCheckbox(toppings[i]);
        }
        for (let i: number = 0; i < behaelters.length; i++) {
            createRadio(behaelters[i]);
        }
    }
  
    
    function createInput(_sort: string): void {
        let label: HTMLLabelElement = document.createElement("label");
        let input: HTMLInputElement = document.createElement("input");

        label.innerText = _sort;
        label.appendChild(input);
        input.type = "number";
        input.min = "0";
        input.value = "0";
        label.id = _sort;

        Eissorten.appendChild(label);
        inputsEis.push(input);
    }

    function createCheckbox(_topping: string): void {
        let label: HTMLLabelElement = document.createElement("label");
        let input: HTMLInputElement = document.createElement("input");

        label.innerText = _topping;
        label.appendChild(input);
        input.type = "checkbox";
        label.id = _topping;

        Toppings.appendChild(label);
        inputsTopping.push(input);
    }

    function createRadio(_behaelters: string): void {
        let label: HTMLLabelElement = document.createElement("label");
        let input: HTMLInputElement = document.createElement("input");

        label.innerText = _behaelters;
        label.appendChild(input);
        input.type = "radio";
        input.name = "behaelters";
        input.required = true;
        label.id = _behaelters;

        Behaelter.appendChild(label);
        InputsBehaelter.push(input);
    }

    function change(): void {
        let sum: number = 0;
        for (let i: number = 0; i < inputsEis.length; i++) {
            sum += parseInt(inputsEis[i].value);
        }
        for (let i: number = 0; i < inputsTopping.length; i++) {
            if (inputsTopping[i].checked)
            { sum += 2; }
        }
        for (let i: number = 0; i < InputsBehaelter.length; i++) {
            if (InputsBehaelter[i].checked)
            { sum += 1.5; }
        }

        changeWarenkorb(sum);

    }

    function changeWarenkorb(_sum: number): void {

        let Warenliste: HTMLElement = document.getElementById("Warenliste");
        Warenliste.innerText = "";

        for (let i: number = 0; i < inputsEis.length; i++) {
            if (parseInt(inputsEis[i].value) > 0) {
                Warenliste.innerText += sorts[i] + " " + (parseInt(inputsEis[i].value) * 1) + "€" + "\n";
            }
        }
        for (let i: number = 0; i < inputsTopping.length; i++) {
            if (inputsTopping[i].checked) {
                Warenliste.innerText += toppings[i] + " 2€" + "\n";
            }
        }
        for (let i: number = 0; i < InputsBehaelter.length; i++) {
            if (InputsBehaelter[i].checked) {
                Warenliste.innerText += behaelters[i] + " 1,5€" + "\n";
            }
        }
        let summeHtml: HTMLElement = document.getElementById("Summe");
        summeHtml.innerText = _sum.toString() + " €";
    }

    function sendOrder(): void {

        let Korrektur: string[] = ["Hast du folgendes auch wirklich ausgefülllt? \n"];
        let Vorname: HTMLInputElement = <HTMLInputElement>document.getElementById("Vorname");
        let Nachname: HTMLInputElement = <HTMLInputElement>document.getElementById("Nachname");
        let Strasse: HTMLInputElement = <HTMLInputElement>document.getElementById("Strasse");
        let PLZ: HTMLInputElement = <HTMLInputElement>document.getElementById("PLZ");
        let Ort: HTMLInputElement = <HTMLInputElement>document.getElementById("Ort");
        let Mail: HTMLInputElement = <HTMLInputElement>document.getElementById("Mail");
        let Telefon: HTMLInputElement = <HTMLInputElement>document.getElementById("Telefon");
        let Anrede: HTMLInputElement = <HTMLInputElement>document.getElementById("Anrede");
        let Lieferart: HTMLInputElement = <HTMLInputElement>document.getElementById("Lieferart");

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

        let Eiskugeln: number = 0;
        let behaelters: number = 0;
        for (let i: number = 0; i < inputsEis.length; i++) {
            if (parseInt(inputsEis[i].value) > 0)
                Eiskugeln += 1;
        }
        if (Eiskugeln == 0)
            Korrektur.push("Eissorten\n");
        for (let i: number = 0; i < InputsBehaelter.length; i++) {
            if (InputsBehaelter[i].checked)
                behaelters += 1;
        }
        if (behaelters == 0)
            Korrektur.push("Becher");

        if (Korrektur.length > 1) {
            for (let i: number = 0; i < Korrektur.length; i++)
                Korrektur.push
            alert(Korrektur.join(""));
        }
        else {
            alert("Vielen Dank für Ihre Bestellung! Wie immer werden Sie ihr Eis blutig bekommen.");
            location.reload();
        }
    }



}