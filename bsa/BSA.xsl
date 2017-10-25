<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
  <xsl:template match="bsa">
    <html>
      <head>
        <script language="javascript">
          <![CDATA[
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
          ]]>
        </script>
        <style>
          .hidden {
             visibility: hidden;
             display: none;
          }

          .unhidden {
             visibility: visible;
          }

          textarea {
              border-style: none;
              border-color: Transparent;
              overflow: auto;
              resize: none;
              color: white;
              background-color: transparent;
              font-size: 13px;
          }

          #titlebar {
            height: 46px;
            background: #f1e4c2;
            border-top: solid 1px #8e877f;
            //line-height: 30px;
            font-size: 10px;
            clear: both;
            padding: 10px;
            color: darkgreen;
          }

          #selections {
              //background-color: red;
              display: table-row;
              padding: 10px;
          }

          #selections > div {
              display: table-cell;
              padding: 10px;
              width: 200px;
              clear: both;
          }

          #transcirpt {
              //background-color: red;
              display: table-row;
              padding: 10px;
          }

          #transcript > div {
              display: table-cell;
              padding: 10px;
              width: 300px;
              clear: both;
          }

          select {
            width: 100%;
          }

          table {
           width: 90%;
          }

          table > tr > td:last-child {
            text-align: right;
          }

          html, body
          {
              display: inline-block;
              margin: 0px auto;
              text-align: center;
              width: 640px;
              position: relative;
              padding: 0;
          }

          body
          {
              font: 13px Helvetica, Arial, sans-serif;
              background-color: #005696;
              color: white;
          }
        </style>
      </head>

      <body>

        <div id="titlebar">
          <h1 id="pagetitle">PONDER 09 : XSL - Scouting Data</h1>
        </div>

        <div id="selections">
          <!-- <h1 id="selectareatitle">Lookup Area</h1> -->
          <!-- Councils -->
          <div>
            <h2 id="selectcategory">Council</h2>
            <select name="councils" size="5">
              <xsl:for-each select="council">
                <option onClick="onCouncilSelect()"><xsl:value-of select="@name"/></option>
              </xsl:for-each>
            </select>
          </div>
          <!-- Troops -->
          <div>
            <h2 id="selectcategory">Troop</h2>
            <select name="troops" size="5">
              <xsl:for-each select="council/troop">
                <xsl:element name="option">
                  <xsl:attribute name="disabled"/>
                  <xsl:attribute name="onClick">
                    onTroopSelect()
                  </xsl:attribute>
                  <xsl:attribute name="council">
                    <xsl:value-of select="../@name"/>
                  </xsl:attribute>
                  <xsl:attribute name="value">
                    <xsl:value-of select="@unit_name"/>
                  </xsl:attribute>
                   (<xsl:value-of select="@troop_number"/>) <xsl:value-of select="@unit_name"/>
                </xsl:element>
              </xsl:for-each>
            </select>
          </div>
          <!-- Scouts -->
          <div>
            <h2 id="selectcategory">Scout</h2>
            <select name="scouts" size="5">
              <xsl:for-each select="council/troop/scout">
                <xsl:element name="option">
                  <xsl:attribute name="disabled"/>
                  <xsl:attribute name="onClick">
                    onScoutSelect()
                  </xsl:attribute>
                  <xsl:attribute name="council">
                    <xsl:value-of select="../../@name"/>
                  </xsl:attribute>
                  <xsl:attribute name="troop">
                    <xsl:value-of select="../@unit_name"/>
                  </xsl:attribute>
                  <xsl:attribute name="first_name">
                    <xsl:value-of select="first_name"/>
                  </xsl:attribute>
                  <xsl:attribute name="last_name">
                    <xsl:value-of select="last_name"/>
                  </xsl:attribute>
                  <xsl:attribute name="street">
                    <xsl:value-of select="address/street"/>
                  </xsl:attribute>
                  <xsl:attribute name="city">
                    <xsl:value-of select="address/city"/>
                  </xsl:attribute>
                  <xsl:attribute name="state">
                    <xsl:value-of select="address/state"/>
                  </xsl:attribute>
                  <xsl:attribute name="phone">
                    <xsl:value-of select="phone"/>
                  </xsl:attribute>

                  <xsl:attribute name="rank">
                    <xsl:for-each select="rank">
                      <xsl:value-of select="."/>:&#160;<xsl:value-of select="@date-earned"/>;
                    </xsl:for-each>
                  </xsl:attribute>

                  <xsl:attribute name="meritbadge">
                    <xsl:for-each select="meritbadge">
                      <xsl:value-of select="."/>:&#160;<xsl:value-of select="@date-earned"/>;
                    </xsl:for-each>
                  </xsl:attribute>

                  <xsl:value-of select="first_name"/>&#160;<xsl:value-of select="last_name"/>
                </xsl:element>
              </xsl:for-each>
            </select>
          </div>
        </div>

        <!-- Scout Informaiton -->
        <div id="scoutinfo" hidden="true">
          <h1 id="scoutname"/>
          <hr/>
          <h2 id="scoutphone"/>
          <div>
            <h2 id="addressheading">Address</h2>
            <textarea id="scoutaddress"/>
          </div>
          <br/>
          <div id="transcript">
            <div>
              <h2 id="rankslabel">Ranks</h2>
              <hr/>
              <table id="scoutranks"/>
            </div>
            <div>
              <h2 id="meritbadgeslabel">Merit Badges</h2>
              <hr/>
              <table id="scoutmeritbadges"/>
            </div>
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
