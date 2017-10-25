<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
  <xsl:template match="bsa">
    <html>
      <head>
        <script type="text/javascript" src="bsa.js"/>
        <link rel="stylesheet" type="text/css" href="bsa.css"/>
      </head>
      <body>
        <select name="councils" size="5">
          <xsl:for-each select="council">
            <option onClick="onCouncilSelect()"><xsl:value-of select="@name"/></option>
          </xsl:for-each>
        </select>

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

              <xsl:value-of select="@unit_name"/>

            </xsl:element>

          </xsl:for-each>
        </select>

        <!--option onClick="onScoutSelect()"><xsl:value-of select="first_name"/>&#160;<xsl:value-of select="last_name"/></option-->
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

              <xsl:value-of select="first_name"/>&#160;<xsl:value-of select="last_name"/>

              <xsl:attribute name="first_name">
                <xsl:value-of select="first_name"/>
              </xsl:attribute>

              <xsl:attribute name="last_name">
                <xsl:value-of select="last_name"/>
              </xsl:attribute>

              <xsl:attribute name="street">
                <xsl:value-of select="street"/>
              </xsl:attribute>

              <xsl:attribute name="city">
                <xsl:value-of select="city"/>
              </xsl:attribute>

              <xsl:attribute name="state">
                <xsl:value-of select="state"/>
              </xsl:attribute>

              <xsl:attribute name="phone">
                <xsl:value-of select="phone"/>
              </xsl:attribute>

              <xsl:attribute name="rank">
                <xsl:value-of select="rank"/>
              </xsl:attribute>

              <xsl:attribute name="meritbadge">
                <xsl:value-of select="meritbadge"/>
              </xsl:attribute>

            </xsl:element>

          </xsl:for-each>
        </select>

        <h1 id="scoutname"/>
        <h2 id="scoutaddress"/>
        <h2 id="scoutphone"/>
        <table id="scoutranks"/>
        <table id="scoutmertbadges"/>

        <table border="1">
          <tr bgcolor="#da1111">
            <th>Name</th>
            <th>Size</th>
            <th>Type</th>
          </tr>

          <xsl:for-each select="file">
            <tr>
              <td><xsl:value-of select="@name"/></td>
              <td><xsl:value-of select="@size"/></td>
              <td><xsl:value-of select="@type"/></td>
            </tr>

          </xsl:for-each>
        </table>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
