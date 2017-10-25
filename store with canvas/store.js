//Catalog Items
var items = [
  [33, 22, 13, 275.00, "http://images.monoprice.com/productlargeimages/122771.jpg"],
  [33, 22, 17, 210.00, "http://images.monoprice.com/productlargeimages/122791.jpg"],
  [26, 20, 14, 206.42, "http://images.monoprice.com/productlargeimages/121841.jpg"],
  [25, 19, 11, 186.49, "http://images.monoprice.com/productlargeimages/121831.jpg"],
  [47, 16,  6, 146.00, "http://images.monoprice.com/productlargeimages/121811.jpg"],
  [22, 14, 10, 134.99, "http://images.monoprice.com/productlargeimages/121391.jpg"],
  [19, 16,  8,  69.99, "http://images.monoprice.com/productlargeimages/106221.jpg"],
  [22, 14,  8,  75.99, "http://images.monoprice.com/productlargeimages/121821.jpg"],
  [19, 16,  6,  66.99, "http://images.monoprice.com/productlargeimages/106211.jpg"],
  [16, 13,  8,  66.82, "http://images.monoprice.com/productlargeimages/121381.jpg"],
  [14, 16,  8,  55.99, "http://images.monoprice.com/productlargeimages/126841.jpg"],
  [13, 12,  6,  34.99, "http://images.monoprice.com/productlargeimages/126831.jpg"],
  [12, 10,  8,  33.99, "http://images.monoprice.com/productlargeimages/126821.jpg"],
  [12, 10,  6,  26.99, "http://images.monoprice.com/productlargeimages/126811.jpg"],
  [10,  9,  7,  24.99, "http://images.monoprice.com/productlargeimages/106201.jpg"],
  [10,  8,  4,  22.99, "http://images.monoprice.com/productlargeimages/126801.jpg"],
  [11,  8, 10,  22.08, "http://images.monoprice.com/productlargeimages/106231.jpg"],
  [ 8,  7,  4,  19.99, "http://images.monoprice.com/productlargeimages/126781.jpg"],
  [ 8,  7,  6,  16.99, "http://images.monoprice.com/productlargeimages/126791.jpg"],
  [ 7,  6,  2,  13.29, "http://images.monoprice.com/productlargeimages/121801.jpg"]
];

function onLoad() {
  createItemView();
  createForm();
  createCart();
}

function createCart(){
  var invoicediv = document.getElementById("div4");
  invoicediv.innerHTML = "";

  //add div title
  var title = document.createElement("h1");
  title.innerHTML = "Invoice";
  invoicediv.appendChild(title);

  //create table
  var table   = document.createElement("table");
  table.id = "invoice";
  var header  = document.createElement("tr");
  var desc    = document.createElement("td");
  desc.innerHTML  = "Description";
  header.appendChild(desc);
  var price    = document.createElement("td");
  price.innerHTML = "Unit Price";
  header.appendChild(price);
  table.appendChild(header);
  invoicediv.appendChild(table);

  var total = document.createElement("label");
  total.innerHTML = "Total: $0.00";
  total.className = "total";
  total.id = "total";
  invoicediv.appendChild(total);
}

function createForm(){
  var formdiv = document.getElementById("div3");

  //div title and subtitle...
  var title = document.createElement("h1");
  title.innerHTML = "Customer Details";
  formdiv.appendChild(title);

  //create Form...
	formdiv.className = "form";
	var form = document.createElement("form");
  form.id = "form";
	form.setAttribute("action", "review.php");
	form.setAttribute("method", "post");
	form.setAttribute("name", "form");
  form.setAttribute("onreset",  "onReset()");
  form.setAttribute("onsubmit", "onSubmit()");

  //create set of inputs
	var fields = document.createElement("fieldset");
  fields.id = "fields";

	//name label
	var nameL = document.createElement("label");
	nameL.innerHTML = "Name: ";
	fields.appendChild(nameL);
	fields.appendChild(document.createElement('br'));
	//name field
	var nameTF = document.createElement("input");
	nameTF.setAttribute("type", "text");
	nameTF.setAttribute("name", "fullname");
  nameTF.setAttribute("onblur", "valName(this.value, this)");
	fields.appendChild(nameTF);
	fields.appendChild(document.createElement('br'));

  //address label
	var addressL = document.createElement("label");
	addressL.innerHTML = "Address: ";
	fields.appendChild(addressL);
	fields.appendChild(document.createElement('br'));
	//address field
	var addressTF = document.createElement("input");
	addressTF.setAttribute("type", "text");
	addressTF.setAttribute("name", "address");
  addressTF.setAttribute("onblur", "valName(this.value, this)");
	fields.appendChild(addressTF);
  fields.appendChild(document.createElement('br'));

  //city label
  var cityL = document.createElement("label");
  cityL.innerHTML = "City: ";
  fields.appendChild(cityL);
  fields.appendChild(document.createElement('br'));
  //address field
  var cityTF = document.createElement("input");
  cityTF.setAttribute("type", "text");
  cityTF.setAttribute("name", "city");
  cityTF.setAttribute("onblur", "valName(this.value, this)");
  fields.appendChild(cityTF);
  fields.appendChild(document.createElement('br'));

  //state label
  var stateL = document.createElement("label");
  stateL.innerHTML = "State: ";
  fields.appendChild(stateL);
  fields.appendChild(document.createElement('br'));
  //address field
  var stateTF = document.createElement("input");
  stateTF.setAttribute("type", "text");
  stateTF.setAttribute("name", "state");
  stateTF.setAttribute("onkeyup", "valState(this.value, this)");
  fields.appendChild(stateTF);
  fields.appendChild(document.createElement('br'));

  //zip label
  var zipL = document.createElement("label");
  zipL.innerHTML = "ZIP Code: ";
  fields.appendChild(zipL);
  fields.appendChild(document.createElement('br'));
  //address field
  var zipTF = document.createElement("input");
  zipTF.setAttribute("type", "text");
  zipTF.setAttribute("name", "zip");
  zipTF.setAttribute("onkeyup", "valZIP(this.value, this)");
  fields.appendChild(zipTF);
  fields.appendChild(document.createElement('br'));

  //phone label
	var phoneL = document.createElement("label");
	phoneL.innerHTML = "Phone:";
	fields.appendChild(phoneL);
	fields.appendChild(document.createElement('br'));
	//phone field
	var phoneTF = document.createElement("input");
	phoneTF.setAttribute("type", "text");
	phoneTF.setAttribute("name", "phone");
  phoneTF.setAttribute("onkeyup", "valPhone(this.value, this)");
	fields.appendChild(phoneTF);
	fields.appendChild(document.createElement('br'));

  //ccn label -- a regex can disnguish between cart types
	var ccnL = document.createElement("label");
	ccnL.innerHTML = "Credit Card Number: ";
	fields.appendChild(ccnL);
	fields.appendChild(document.createElement('br'));
	//phone field
	var ccnTF = document.createElement("input");
	ccnTF.setAttribute("type", "text");
	ccnTF.setAttribute("name", "ccn");
  ccnTF.setAttribute("onkeyup", "valCCN(this.value, this)");
	fields.appendChild(ccnTF);
	fields.appendChild(document.createElement('br'));

  //expiration label
  var expirationL = document.createElement("label");
  expirationL.innerHTML = "Expiration Date: ";
  fields.appendChild(expirationL);
  fields.appendChild(document.createElement('br'));
  //expiration field
  var expirationTF = document.createElement("input");
  expirationTF.setAttribute("type", "text");
  expirationTF.setAttribute("name", "exp");
  expirationTF.setAttribute("onkeyup", "valDate(this.value, this)");
  fields.appendChild(expirationTF);
	fields.appendChild(document.createElement('br'));

  //add fieldset to form
  form.appendChild(fields)

  //form buttons
  //submit
  var submitB = document.createElement("input");
  submitB.className = "submit";
  submitB.setAttribute("type", "submit");
  submitB.value = "Checkout";
  form.appendChild(submitB);

  //reset
  var resetB = document.createElement("input");
  resetB.className = "reset";
  resetB.setAttribute("type", "reset");
  resetB.value = "Clear";
  form.appendChild(resetB);

  //add buttons to form
	formdiv.appendChild(form);

	//confirm.setAttribute("onclick", "onConfirm()");
}

function createItemView() {
    var    itemdiv = document.getElementById("div2");

    //div title
    var title = document.createElement("h1");
    title.innerHTML = "The Box Shop";
    itemdiv.appendChild(title);

    //add image
    var img = document.createElement("img");
    img.name  = "image";
    img.setAttribute("src", "http://images.monoprice.com/productlargeimages/106221.jpg");
    itemdiv.appendChild(img);

    //add canvas
    var canvas = document.createElement("canvas");
    canvas.id = "schematic";
    itemdiv.appendChild(canvas);
    canvas.getContext("2d").scale(3,3);

    //add label
    var l = document.createElement("label");
    l.innerHTML = "Box Size: ";
    itemdiv.appendChild(l);

    //add list...
    var selectlist = document.createElement("select");
    selectlist.id = "itemSelectList";
    for (var i = 0; i < items.length; i++) {
      var o = document.createElement("option");
      o.text  = items[i][0]+"x"+items[i][1]+"x"+items[i][2];
      o.value = items[i][3];
      selectlist.options.add(o);
    }
    selectlist.setAttribute("onchange", "updatePrice(this.value); updateImage(); updateCanvas();");
    itemdiv.appendChild(selectlist);

    //add a label for price
    var price = document.createElement("label");
    price.id = "price";
    price.className = "price";
    itemdiv.appendChild(price);

    updatePrice(selectlist.options[selectlist.selectedIndex].value);
    updateImage();
    updateCanvas();

    //add a button to add items to the cart...
    var add = document.createElement("button");
    add.className = "add";
    add.innerHTML = "+";
    add.setAttribute("onclick", "addToCart()");
    itemdiv.appendChild(add);

    var p = document.createElement("p");
    p.className = "footnote";
    p.innerHTML = "*This is America.  All sizes are in inches.";
    itemdiv.appendChild(p);
  }

  function updatePrice(price) {
    document.getElementById("price").innerHTML = "$" + parseFloat(price).toFixed(2);
  }

  function updateImage(){
    var item  = document.getElementById("itemSelectList");
    document.image.src = items[item.selectedIndex][4];
  }

  function addToCart() {
    var item  = document.getElementById("itemSelectList");
    var desc  = item.options[item.selectedIndex].text;
    var price = item.options[item.selectedIndex].value;

    var invoice = document.getElementById("invoice");
    var row     = document.createElement("tr");
    var tdesc   = document.createElement("td");
    var tprice  = document.createElement("td");
    tdesc.innerHTML  = desc;
    tprice.innerHTML = "$" + parseFloat(price).toFixed(2);
    tprice.setAttribute("align","right");

    row.appendChild(tdesc);
    row.appendChild(tprice);
    invoice.appendChild(row);


    var total = document.getElementById("total");
    var curval = parseFloat(total.innerHTML.slice(8));
    var newval = parseFloat(curval) + parseFloat(price);

    total.innerHTML = "Total: $" + parseFloat(newval).toFixed(2);
  }

  function updateCanvas(){
    //get selected item
    var item  = document.getElementById("itemSelectList");
    var w = items[item.selectedIndex][0];
    var h = items[item.selectedIndex][1];
    var d = items[item.selectedIndex][2];

    //get canvas
    var canvas = document.getElementById("schematic");
    var context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.lineWidth=.3;
    context.strokeRect(20, 6, w, h);
    context.strokeRect(20 + w + 2, 6, d, h);
    context.strokeRect(20, 6 + h + 2, w, d);
  }

  function onReset() {
    createCart();
  }

  function onSubmit() {
    var invoice = document.getElementById("invoice");
    var form    = document.getElementById("form");
    var fields  = document.getElementById("fields");
    var total   = document.getElementById("total");

    var hiddenTF = document.createElement("input")
    hiddenTF.setAttribute("type", "text");
    hiddenTF.setAttribute("name", "cart");
    hiddenTF.setAttribute("value", invoice.innerHTML);
    fields.appendChild(hiddenTF);

    var totalHI = document.createElement("input")
    totalHI.setAttribute("type", "text");
    totalHI.setAttribute("name", "total");
    totalHI.setAttribute("value", total.innerHTML);
    fields.appendChild(totalHI);

    document.getElementsByClassName("sale").innerHTML = "Thank you!";
  }
