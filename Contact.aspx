<%@ Page Title="Контакты" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeFile="Contact.aspx.cs" Inherits="Contact" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <h2><%: Title %>.</h2>
    <h3>Контакты.</h3>
    <address>
        Калинина 13<br />
        Краснодар, 350000<br />
    </address>

    <address>
        <strong>Support:</strong>   <a href="mailto:faust_32@inbox.ru">faust_32@inbox.ru</a><br />
    </address>
</asp:Content>
