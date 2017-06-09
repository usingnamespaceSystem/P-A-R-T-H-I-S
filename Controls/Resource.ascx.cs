using System;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Resource : System.Web.UI.UserControl
{

    TextBox workType = new TextBox
    {
        CssClass = "inputs",
        ToolTip = "Вид деятельности",
        ID = "Resource_workType"
    };

    TextBox expenses = new TextBox
    {
        CssClass = "inputs",
        ToolTip = "Статья затрат",
        ID = "Resource_expenses"
    };

    Table tbl = new Table
    {
        CssClass = "block"
    };

    TextBox cost = new TextBox
    {
        CssClass = "inputs",
        ToolTip = "Затраты",
        ID = "Resource_cost"
    };

    Label lb = new Label
    {
        Width = 200,
        Height = 150,
        BorderStyle = BorderStyle.None
    };

    TableRow tbl_row = new TableRow();
    TableCell tbl_cell = new TableCell();

    public TextBox WorkType
    {
        get
        {
            return workType;
        }

        set
        {
            workType = value;
        }
    }

    public TextBox Expenses
    {
        get
        {
            return expenses;
        }

        set
        {
            expenses = value;
        }
    }

    public TextBox Cost
    {
        get
        {
            return cost;
        }

        set
        {
            cost = value;
        }
    }

    private void Page_Load(object sender, EventArgs e)
    {
        lb.Attributes.Add("onclick", "plusDivs(1)");
        tbl.Controls.Add(tbl_row);
        tbl_row.Controls.Add(tbl_cell);
        tbl_cell.Controls.Add(WorkType);
        tbl_cell.Controls.Add(Expenses);
        tbl_cell.Controls.Add(Cost);
        tbl_cell.Controls.Add(lb);
        Controls.Add(tbl);
    }

}