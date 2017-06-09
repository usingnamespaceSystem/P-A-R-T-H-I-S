<?xml version="1.0" encoding="utf-8" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns="urn:schemas-microsoft-com:office:spreadsheet"
  xmlns:o="urn:schemas-microsoft-com:office:office" 
  xmlns:x="urn:schemas-microsoft-com:office:excel"
  xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
  <xsl:template match="/">
    <xsl:processing-instruction name="mso-application">
      <xsl:text>progid="Excel.Sheet"</xsl:text>
    </xsl:processing-instruction>
    <Workbook>
      <Styles>
        <Style ss:ID="Default" ss:Name="Normal">
          <Alignment ss:Vertical="Bottom" />
          <Borders />
          <Font />
          <Interior />
          <NumberFormat />
          <Protection />
        </Style>
      </Styles>
      <Worksheet ss:Name="GO Ostrich">
        <Table>
          <Row>
            <Cell>
              <Data ss:Type="String"></Data>
            </Cell>
            <Cell>
              <Data ss:Type="String"></Data>
            </Cell>
            <Cell>
              <Data ss:Type="String"></Data>
            </Cell>
	    <Cell>
              <Data ss:Type="String"></Data>
            </Cell>
	    <Cell>
              <Data ss:Type="String"></Data>
            </Cell>
	    <Cell>
              <Data ss:Type="String"></Data>
            </Cell>
          </Row>
        </Table>
      </Worksheet>
    </Workbook>
  </xsl:template>
</xsl:stylesheet>