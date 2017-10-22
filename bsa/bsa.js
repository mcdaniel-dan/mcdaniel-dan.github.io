function onCouncilSelect() {
  document.getElementById("scoutinfo").hidden = true;
  clear("troops");
  disable("troops");
  clear("scouts");
  disable("scouts");

  var e = document.getElementsByName("councils")[0];
  var val = e.options[e.selectedIndex].value;
  //alert(val);

  var troops = document.getElementsByName("troops")[0];
  for (var i = 0; i < troops.options.length; i++) {
    if(troops.options[i].getAttribute("council") == val)
    troops.options[i].disabled = false;
    else {
      troops.options[i].disabled = true;
    }
  }
}

function onTroopSelect() {
  clear("scouts");
  disable("scouts");
  document.getElementById("scoutinfo").hidden = true;
  var e = document.getElementsByName("troops")[0];
  var val = e.options[e.selectedIndex].value;

  var selection = e.options[e.selectedIndex]

  //alert(selection.getAttribute("council"));

  var scouts = document.getElementsByName("scouts")[0];
  for (var i = 0; i < scouts.options.length; i++) {
    if(scouts.options[i].getAttribute("troop") == val
    && scouts.options[i].getAttribute("council") == selection.getAttribute("council"))
    scouts.options[i].disabled = false;
    else {
      scouts.options[i].disabled = true;
    }
  }
}

function onScoutSelect() {
  var scoutsbox = document.getElementsByName("scouts")[0];
  var options = scoutsbox.options;
  var index = scoutsbox.selectedIndex;
  var selected = options[index];
  var val = scoutsbox.options[index].value;
  //alert(val);
  var addressArray = [];

  document.getElementById("scoutname").innerHTML =
  selected.getAttribute("first_name") + " " +
  selected.getAttribute("last_name");


  document.getElementById("scoutphone").innerHTML = "Phone: " +
  selected.getAttribute("phone");

  addressArray.push(selected.getAttribute("street"));
  addressArray.push("\r\n");
  addressArray.push(selected.getAttribute("city"));
  addressArray.push(", ");
  addressArray.push(selected.getAttribute("state"));
  //alert(addressArray);
  document.getElementById("scoutaddress").innerHTML = addressArray.join("");


  document.getElementById("scoutinfo").hidden = false;

  document.getElementById("scoutranks").innerHTML =
  "<tr><th>Rank</th><th>Date Earned</th><tr>"

  document.getElementById("scoutmeritbadges").innerHTML =
  "<tr><th>Merit Badge</th><th>Date Earned</th><tr>"

  var ranks       = selected.getAttribute("rank").split(";");
  var meritbadges = selected.getAttribute("meritbadge").split(";");

  for (var i = 0; i < ranks.length - 1; i++) {
    var row = document.createElement("tr");
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    rankparts = ranks[i].split(":");
    td1.innerHTML = rankparts[0];
    td2.innerHTML = rankparts[1];
    row.append(td1);
    row.append(td2);
    //alert(row.innerHTML);
    document.getElementById("scoutranks").append(row);
  }

  for (var i = 0; i < meritbadges.length - 1; i++) {
    var row = document.createElement("tr");
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    mbparts = meritbadges[i].split(":");
    td1.innerHTML = mbparts[0];
    td2.innerHTML = mbparts[1];
    row.append(td1);
    row.append(td2);
    //alert(row.innerHTML);
    document.getElementById("scoutmeritbadges").append(row);
  }
}

function clear(select) {
    var elements = document.getElementsByName(select)[0].options;

    for(var i = 0; i < elements.length; i++){
      elements[i].selected = false;
    }
  }

  function disable(select) {
      var elements = document.getElementsByName(select)[0].options;

      for(var i = 0; i < elements.length; i++){
        elements[i].disabled = true;
      }
    }
