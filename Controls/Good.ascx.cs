using System;
using System.Web.UI;
using System.Web.UI.WebControls;
public partial class Good : System.Web.UI.UserControl
{
    TextBox name = new TextBox
    {
        CssClass = "inputs",
        ToolTip = "Наименование ценностного предложения",
        ID = "Goods_name"
    };

    Table tbl = new Table
    {
        CssClass = "block"
    };

    Label lb = new Label
    {
        Width = 200,
        Height = 150,
        BorderStyle = BorderStyle.None
    };

    TableRow tbl_row = new TableRow();
    TableCell tbl_cell = new TableCell();

    public TextBox Name
    {
        get
        {
            return name;
        }

        set
        {
            name = value;
        }
    }

    private void Page_Load(object sender, EventArgs e)
    {
        lb.Attributes.Add("onclick", "plusDivs(1)");
        tbl.Controls.Add(tbl_row);
        tbl_row.Controls.Add(tbl_cell);
        tbl_cell.Controls.Add(Name);
        tbl_cell.Controls.Add(lb);
        Controls.Add(tbl);
    }
}