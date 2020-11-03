let loadPicture = function(event) {
	let image = document.getElementById('output');
	image.src = URL.createObjectURL(event.target.files[0]);
};

// class orderInfo {
// 	constructor(Size, Amount, basePrice, addonPrice, shippingPrice, totalPrice, firstName, lastName, Adress, Ort, Postcode, Email, Mobile) {
// 		Size;
// 		Amount;
// 		basePrice;
// 		addonPrice;
// 		shippingPrice;
// 		totalPrice;

// 		firstName;
// 		lastName;
// 		Adress;
// 		Ort;
// 		Postcode;
// 		Email;
// 		Mobile;
// 	}
// 	subject() {
// 		"En beställning har blivit gjord!"
// 	}
// 	html() { 
// 		`<h1>En order har gjorts!</h1>` +
// 		`<h3>en order har blivit gjord och uppgifterna hittar du nedanför!</h3>` +
// 		`<br />` +
// 		`<p>Storlek: ${Size}</p>` +
// 		`<p>Antal: ${Amount}</p>` +
// 		`<p>Baspris: ${basePrice}</p>` +
// 		`<p>Tillägg pris: ${addonPrice}</p>` +
// 		`<p>Frakt pris: ${shippingPrice}</p>` +
// 		`<h3>Total Summa: ${totalPrice}</h3>` +
// 		`<br />` +
// 		`<p>Förnamn: ${firstName}</p>` +
// 		`<p>Efternamn: ${lastName}</p>` +
// 		`<p>Adress: ${Adress}</p>` +
// 		`<p>Ort: ${Ort}</p>` +
// 		`<p>Postnummer: ${Postcode}</p>` +
// 		`<p>E-post: ${Email}</p>` +
// 		`<p>Mobilnummer: ${Mobile}</p>`
// 	}

// }


function sendInfo() {
	let widthAndHeight = document.getElementById("widthHeightRadio");
	let diameter = document.getElementById("diameterInput").value;

	let bredd = document.getElementById("widthInput").value;
	let hojd = document.getElementById("hightInput").value;

	let theAmount = document.getElementById("addAmountInput").value;
	
	let shippingOption = document.getElementById("shippingOption").value;
	bredd = replaceComma(bredd);
	hojd = replaceComma(hojd)
	
	let theSize = bredd + hojd;
	theSize = theSize/2
	console.log(theSize)

	if (!widthAndHeight.checked) {
		theSize = diameter;
	}


	let priceOfSize = getPriceFromArray(theSize, theAmount);
	let addonPrice = calculateAddons(priceOfSize);
	let shippingPrice = checkShippingPrice(shippingOption);

	console.log(priceOfSize)
	console.log(addonPrice)
	console.log(shippingPrice)

	let thePrice = priceOfSize + addonPrice;
	thePrice = thePrice * theAmount;
	thePrice = thePrice + shippingPrice;

	// alert(`the price is ${thePrice}:-`);

	displayTheResultInPopup(theSize, theAmount, priceOfSize, shippingPrice, addonPrice, thePrice, bredd, hojd, diameter)
}

function replaceComma(size) {

	let str = size.toString();
	let sizeFixed = str.replace(/,/g, ".");	
	console.log(sizeFixed)
	return sizeFixed;
}

function getPriceFromArray(size, amount) {
	let priceOfSize;

	if (size < 40) {
		alert("Numret måste vara högre än 40")
		priceOfSize = 0;
	}
	if (size == 40) {
		priceOfSize = brodyrPrice[0];
	}
	if (size == 50) {
		priceOfSize = brodyrPrice[1];
	}
	if (size == 60) {
		priceOfSize = brodyrPrice[2];
	}
	if (size == 70) {
		priceOfSize = brodyrPrice[3];
	}
	if (size == 80) {
		priceOfSize = brodyrPrice[4];
	}
	if (size == 90) {
		priceOfSize = brodyrPrice[5];
	}
	if (size == 100) {
		priceOfSize = brodyrPrice[6];
	}
	if (size == 110) {
		priceOfSize = brodyrPrice[7];
	}
	if (size >= 120) {
		priceOfSize = brodyrPrice[8];
	}


	if (amount < 50) {
		alert("please add 50 or more")
		priceOfSize = 0;
	}

	if (amount >= 50 && amount < 100) {
		priceOfSize = priceOfSize[0]
	}
	if (amount >= 100 && amount < 200) {
		priceOfSize = priceOfSize[1]
	}
	if (amount >= 200 && amount < 300) {
		priceOfSize = priceOfSize[2]
	}
	if (amount >= 300 && amount < 500) {
		priceOfSize = priceOfSize[3]
	}
	if (amount >= 500 && amount < 1000) {
		priceOfSize = priceOfSize[4]
	}
	if (amount >= 1000) {
		priceOfSize = priceOfSize[5]
	}

	return priceOfSize;
}

function calculateAddons(price) {

	let price1 = 0;
	let price2 = 0;
	let price3 = 0;
	let price4 = 0;
	let price5 = 0;

	let heatBack = document.getElementById("heatBackBox").checked;
	let kardborre = document.getElementById("kardborreBox").checked;
	let selfAttach = document.getElementById("selfAttachBox").checked;
	let specialThread = document.getElementById("specialThreadBox").checked;
	let wholeBrodyr = document.getElementById("wholeBrodyrBox").checked;

	if (heatBack) {
		price1 = heatBackPrice;
	}
	if (kardborre) {
		price2 = kardborrePrice;
	}
	if (selfAttach) {
		price3 = selfAttachPrice;
	}
	if (specialThread) {
		price4 = price * specialThreadPrice;
		price4 = price4 - price;
	}
	if (wholeBrodyr) {
		price5 = price * wholeBrodyrPrice;
		price5 = price5 - price;
	}
	// console.log(price + " before addons")

	let addonPrice = price1 + price2 + price3 + price4 + price5;
	price = price + addonPrice;

	// console.log(addonPrice)
	// console.log(price + " after addons")

	return price;
}

function checkShippingPrice(shipping) {

	if (shipping == "standard") {
		shipping = standardPrice;
	}
	if (shipping == "express") {
		shipping = expressPrice
	}
	if (shipping == "superExpress") {
		shipping = superExpressPrice
	}

	return shipping;
}

function removePopup() {
	document.getElementById("theOrderPopup").style.display = "none"
}

function displayTheResultInPopup(theSize, theAmount, priceOfSize, shippingPrice, addonPrice, thePrice, bredd, hojd, diameter) {

	document.getElementById("theOrderPopup").style.display = "flex"

	let widthAndHeight = document.getElementById("widthHeightRadio");

	let userFirstName = document.getElementById("userFirstName").value;
	let userLastName = document.getElementById("userLastName").value;
	let userAdress = document.getElementById("userAdress").value;
	let userOrt = document.getElementById("userOrt").value;
	let userPostcode = document.getElementById("userPostcode").value;
	let userEmail = document.getElementById("userEmail").value;
	let userMobile = document.getElementById("userMobile").value;


	document.getElementById("sizeOutput").innerHTML = "Bredd: " + bredd + ", " + "Höjd: " + hojd;
	document.getElementById("amountOutput").innerHTML = theAmount + ":-";
	document.getElementById("basepriceOutput").innerHTML = priceOfSize + ":-";
	document.getElementById("delieveryPriceOutput").innerHTML = shippingPrice + ":-";
	document.getElementById("addonPriceOutput").innerHTML = addonPrice + ":-";
	document.getElementById("totalPriceOutput").innerHTML = thePrice + ":-";
	document.getElementById("firstNameOutput").innerHTML = userFirstName;
	document.getElementById("lastNameOutput").innerHTML = userLastName;
	document.getElementById("adressOutput").innerHTML = userAdress;
	document.getElementById("ortOutput").innerHTML = userOrt;
	document.getElementById("postnumberOutput").innerHTML = userPostcode;
	document.getElementById("emailOutput").innerHTML = userEmail;
	document.getElementById("mobileOutput").innerHTML = userMobile;

	if (!widthAndHeight.checked) {
		document.getElementById("sizeOutput").innerHTML = "Diameter: " + diameter;
	}

}


function changeSizeInput() {
	let widthAndHeight = document.getElementById("widthHeightRadio");

	let sizeDiv = document.getElementById("sizeDiv");
	let diameterDiv = document.getElementById("diameterDiv");

	if  (widthAndHeight.checked) {
		sizeDiv.style.display = "flex"
		diameterDiv.style.display = "none"
	}
	else {
		sizeDiv.style.display = "none"
		diameterDiv.style.display = "flex"
	}
}