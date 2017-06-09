<%@ Page Title="Go Ostrich" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="_Default" Debug="true" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="MainContent" runat="server">
    <div class="jumbotron" runat="server" id="jumbotron">

        <div id="editor">

            <%--Потребительские сегменты--%>
            <asp:Panel runat="server" ID="Markets_place" CssClass="flex">
                <asp:Panel class="center" runat="server" ID="Markets">
                    <p class="Main_title">Потребительские сегменты</p>
                    <div class="block" id="Markets_add_place">
                        <a href="#" id="add_market" class="add" onclick="Build('Market')">+</a>
                    </div>
                </asp:Panel>

            </asp:Panel>

            <%--Каналы сбыта--%>
            <asp:Panel runat="server" ID="Channels_place" CssClass="flex">
                <asp:Panel class="center" runat="server" ID="Channels">
                    <p class="Main_title">Каналы сбыта</p>
                    <div class="block" id="Channels_add_place">
                        <a href="#" id="add_channel" class="add" onclick="Build('Channel')">+</a>
                    </div>
                </asp:Panel>

            </asp:Panel>

            <%--Процессы--%>
            <asp:Panel runat="server" ID="Processes_place" CssClass="flex">
                <asp:Panel class="center" runat="server" ID="Processes">
                    <p class="Main_title">Процессы</p>
                    <div class="block" id="processes_add_place">
                        <a href="#" id="add_process" class="add" onclick="Build('Processes')">+</a>
                    </div>
                </asp:Panel>

            </asp:Panel>

            <%--Функции--%>
            <asp:Panel runat="server" ID="Functions_place" CssClass="flex">
                <asp:Panel class="center" runat="server" ID="Functions">
                    <p class="Main_title">Функции</p>
                    <div class="block" id="function_add_place">
                        <a href="#" id="add_functions" class="add" onclick="Build('Functions')">+</a>
                    </div>
                </asp:Panel>

            </asp:Panel>

            <%--Операции--%>
            <asp:Panel runat="server" ID="Operations_place" CssClass="flex">
                <asp:Panel class="center" runat="server" ID="Operations">
                    <p class="Main_title">Операции</p>
                    <div class="block" id="operations_add_place">
                        <a href="#" id="add_operation" class="add" onclick="Build('Operations')">+</a>
                    </div>
                </asp:Panel>

            </asp:Panel>

            <%--Ценностные предложения--%>
            <asp:Panel runat="server" ID="Goods_place" CssClass="flex">
                <asp:Panel class="center" runat="server" ID="Goods">
                    <p class="Main_title">Ценностные предложения</p>
                    <div class="block" id="Goods_add_place">
                        <a href="#" id="add_goods" class="add" onclick="Build('Goods')">+</a>
                    </div>
                </asp:Panel>

            </asp:Panel>

            <%--Поставщики--%>
            <asp:Panel runat="server" ID="Providers_place" CssClass="flex">
                <asp:Panel class="center" runat="server" ID="Providers">
                    <p class="Main_title">Поставщики</p>
                    <div class="block" id="Providers_add_place">
                        <a href="#" id="add_provider" class="add" onclick="Build('Provider')">+</a>
                    </div>
                </asp:Panel>

            </asp:Panel>

            <%--Ресурсы--%>
            <asp:Panel runat="server" ID="Res_place" CssClass="flex">
                <asp:Panel class="center" runat="server" ID="Res">
                    <p class="Main_title">Ресурсы</p>
                    <div class="block" id="Res_add_place">
                    </div>
                </asp:Panel>
            </asp:Panel>

            <%--Основные средства--%>
            <asp:Panel runat="server" ID="fixed_assets_place" CssClass="flex">
                <asp:Panel class="center" runat="server" ID="fixed_assets">
                    <p class="Main_title">Основные средства</p>
                    <div class="block" id="fixed_assets_add_place">
                        <a href="#" id="add_assets" class="add" onclick="Build('Assets')">+</a>
                    </div>
                </asp:Panel>

            </asp:Panel>

            <%--Должности--%>
            <asp:Panel runat="server" ID="position_place" CssClass="flex">
                <asp:Panel class="center" runat="server" ID="position">
                    <p class="Main_title">Должности</p>
                    <div class="block" id="position_add_place">
                        <a href="#" id="add_position" class="add" onclick="Build('Positions')">+</a>
                    </div>
                </asp:Panel>

            </asp:Panel>

            <%--МБП--%>
            <asp:Panel runat="server" ID="mbp_place" CssClass="flex">
                <asp:Panel class="center" runat="server" ID="mbp">
                    <p class="Main_title">Малоценные и быстроизнашивающиеся предметы</p>
                    <div class="block" id="mbp_add_place">
                        <a href="#" id="add_mbp" class="add" onclick="Build('MBP')">+</a>
                    </div>
                </asp:Panel>

            </asp:Panel>

            <%--Электроника--%>
            <asp:Panel runat="server" ID="electricity_place" CssClass="flex">
                <asp:Panel class="center" runat="server" ID="electricity">
                    <p class="Main_title">Энергопортребляющее оборудование</p>
                    <div class="block" id="electricity_add_place">
                        <a href="#" id="add_elect" class="add" onclick="Build('Electricity')">+</a>
                    </div>
                </asp:Panel>

            </asp:Panel>

            <%--Аренда--%>
            <asp:Panel runat="server" ID="rent_place" CssClass="flex">
                <asp:Panel class="center" runat="server" ID="rent">
                    <p class="Main_title">Арендуемые объекты</p>
                    <div class="block" id="rent_add_place">
                        <a href="#" id="add_rent" class="add" onclick="Build('Rent')">+</a>
                    </div>
                </asp:Panel>

            </asp:Panel>

            <%--Конкуренты--%>
            <asp:Panel runat="server" ID="Contestors_place" CssClass="flex">
                <asp:Panel class="center" runat="server" ID="Contestors">
                    <p class="Main_title">Конкуренты</p>
                    <div class="block" id="Contestors_add_place">
                        <a href="#" id="add_contestor" class="add" onclick="Build('Contestor')">+</a>
                    </div>
                </asp:Panel>

            </asp:Panel>

            <%--Ценностные предложения конкурентов--%>
            <asp:Panel runat="server" ID="Cont_goods_place" CssClass="flex">
                <asp:Panel class="center" runat="server" ID="Cont_goods">
                    <p class="Main_title">Ценностные предложения конкурента</p>
                    <div class="block" id="Cont_goods_add_place">
                        <a href="#" id="add_cont_goods" class="add" onclick="Build('Cont_goods')">+</a>
                    </div>
                </asp:Panel>

            </asp:Panel>

        </div>

        <div id="table" class="center">
            <table class="results">
                <tr>
                    <td id="provider" class="bigcell">
                        <span>Партнеры</span>
                    </td>

                    <td id="resources" rowspan="2" class="bigcell">
                        <span>Ресурсы</span>
                    </td>

                    <td id="good" rowspan="2" class="bigcell">
                        <span>Ценностные предложения</span>
                    </td>

                    <td id="routes" rowspan="2" class="bigcell">
                        <span>Каналы сбыта</span>
                    </td>

                    <td id="market" rowspan="2" class="bigcell">
                        <span>Потребительские сегменты</span>
                    </td>
                </tr>

                <tr>
                    <td id="contestors" class="bigcell">
                        <span>Конкуренты</span>
                    </td>

                    

                </tr>

                <tr>
                    <td colspan="3" class="bigcell">
                        <span>Расходы</span>
                    </td>
                    <td colspan="2" class="bigcell">
                        <span>Доходы</span>
                    </td>
                </tr>
            </table>
        </div>
        <a href="#" id="finish" class="finish" onclick="finish(2)">Готово</a>
    </div>

    <script type="text/javascript">
        localStorage.setItem( "JSON", JSON.stringify(<%= Organization %> ) );
    </script>

    <asp:PlaceHolder runat="server">
        <%: Scripts.Render("~/Scripts/Build.js") %>
    </asp:PlaceHolder>
</asp:Content>
