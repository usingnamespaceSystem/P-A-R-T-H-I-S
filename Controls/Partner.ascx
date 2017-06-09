<%@ Control Language="C#" AutoEventWireup="true" CodeFile="Partner.ascx.cs" Inherits="Partner" %>
<asp:Table CssClass="block" runat="server"> 
    <asp:TableRow>
        <asp:TableCell>
            <asp:TextBox runat="server" CssClass="inputs" ToolTip="Количество поставляемого товара" ID="Provider_amount" placeholder="Количество поставляемого товара"></asp:TextBox>
        </asp:TableCell>
    </asp:TableRow>
</asp:Table>