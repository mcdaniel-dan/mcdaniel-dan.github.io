function onCountrySelection() {
  var countries = document.getElementById("countriesSelect");

  var contents;

  var fileName = countries.options[countries.selectedIndex].value;
  var file = new XMLHttpRequest();
  file.open("GET", fileName, false);
  file.onreadystatechange = function () {
    if(file.readyState === 4) {
      if(file.status === 200 || file.status == 0) {
        contents = file.responseText;

        var lines = contents.split(/\r?\n/);
        //alert(lines);
        var tablecomponents;
        var citylines = [ "<tr><th>City</th><th>Population</th></tr>" ];

        var popTable = document.getElementById("populationTable");

        for (var i = 0; i < 4; i++) {
          var cityline = lines[i].replace(/\s{2,}/g, "~");
          citylines.push("<tr><td>" + cityline.split("~")[0]
                      + "</td><td>" + cityline.split("~")[1]
                      + "</td></tr>")
        }

        popTable.innerHTML = citylines.join("\n");
      }
    }
  }
  file.send(null);
}

function loadJSON(){
  var fileName = "/" + document.getElementById("JSONFile").value;
  var students = document.getElementById("studentinfo");

  var contents;

  var file = new XMLHttpRequest();
  file.open("GET", fileName, false);
  file.onreadystatechange = function () {
    if(file.readyState === 4) {
      if(file.status === 200 || file.status == 0) {
        var contents = file.responseText;

        var studentobject = JSON.parse(contents).students;

        students.innerHTML = "<tr><th>Name</th><th>Address</th><th>Major</th><th>GPA</th></tr>";

        for (var i = 0; i < studentobject.length; i++) {
          var c = studentobject[i];
          var tr = document.createElement("tr");
          var td1 = document.createElement("td");
          var td2 = document.createElement("td");
          var td3 = document.createElement("td");
          var td4 = document.createElement("td");

          td1.innerHTML = c.first + " " + c.last;
          td2.innerHTML = c.address.city + ", " +
                          c.address.state + " " +
                          c.address.zip;
          td3.innerHTML = c.major;
          td4.innerHTML = c.gpa;

          tr.appendChild(td1);
          tr.appendChild(td2);
          tr.appendChild(td3);
          tr.appendChild(td4);

          students.appendChild(tr);
        }
      }
    }
  }
  file.send(null);
}
