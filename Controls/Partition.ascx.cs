using System;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;

public partial class Partition : UserControl
{
    public JObject Organization { get; set; }

    Table market = new Table
    {
        ID = "Market" + DateTime.Now
    };

    TableRow first_row = new TableRow();
    TableRow second_row = new TableRow();

    TableCell first_cell_of_first_row = new TableCell
    {
        ColumnSpan = 2
    };

    TableCell first_cell_of_second_row = new TableCell();

    TableCell second_cell_of_second_row = new TableCell();

    TextBox name = new TextBox
    {
        CssClass = "inputs",
        ToolTip = "Наименование сегмента рынка",
        ID = "Market_name" + DateTime.Now,
        AutoPostBack = true
    };

    TextBox amount = new TextBox
    {
        CssClass = "inputs",
        ToolTip = "Объем сегмента рынка",
        ID = "Market_amount" + DateTime.Now,
        AutoPostBack = true
    };

    TextBox loyalty = new TextBox
    {
        CssClass = "inputs",
        ToolTip = "Количество лояльных клиентов",
        ID = "Market_loyalty" + DateTime.Now,
        AutoPostBack = true
    };

    HtmlGenericControl channels = new HtmlGenericControl("input");
    HtmlGenericControl contestors = new HtmlGenericControl("input");

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

    public TextBox Amount
    {
        get
        {
            return amount;
        }

        set
        {
            amount = value;
        }
    }

    public TextBox Loyalty
    {
        get
        {
            return loyalty;
        }

        set
        {
            loyalty = value;
        }
    }

    private void Page_Load(object sender, EventArgs e)
    {
        name.TextChanged += Market_TextChanged;
        amount.TextChanged += Market_TextChanged;
        loyalty.TextChanged += Market_TextChanged;

        market.Controls.Add(first_row);
        market.Controls.Add(second_row);

        first_row.Controls.Add(first_cell_of_first_row);
        second_row.Controls.Add(first_cell_of_second_row);
        second_row.Controls.Add(second_cell_of_second_row);

        first_cell_of_first_row.Controls.Add(Name);
        first_cell_of_first_row.Controls.Add(Amount);
        first_cell_of_first_row.Controls.Add(Loyalty);

        first_cell_of_second_row.Controls.Add(channels);
        second_cell_of_second_row.Controls.Add(contestors);

        channels.Attributes.Add("ID", "Channels_extend" + DateTime.Now);
        channels.Attributes.Add("type", "text");
        channels.Attributes.Add("readonly","");
        channels.Attributes.Add("class", "inputs");
        channels.Attributes.Add("value", "Каналы сбыта");
        channels.Attributes.Add("onclick", "NextBlock(1)");

        contestors.Attributes.Add("ID", "Contestors_extend" + DateTime.Now);
        contestors.Attributes.Add("type", "text");
        contestors.Attributes.Add("readonly", "");
        contestors.Attributes.Add("class", "inputs");
        contestors.Attributes.Add("value", "Конкуренты");
        contestors.Attributes.Add("onclick", "NextBlock(2)");

        Controls.Add(market);
    }

    protected void Market_TextChanged(object sender, EventArgs e)
    {
        foreach (JObject JO in Organization["Organization"][0]["Markets"] as JArray)
        {
            if (JO["ID"].Value<string>() == (sender as TextBox).Parent.Parent.Parent.ID)
            {
                if ((sender as TextBox).ID.Contains("Market_Name"))
                    JO["Name"] = (sender as TextBox).Text;
                else if ((sender as TextBox).ID.Contains("Market_Amount"))
                    JO["Amount"] = (sender as TextBox).Text;
                else if ((sender as TextBox).ID.Contains("Market_loayalty"))
                    JO["Loyalty"] = (sender as TextBox).Text;
                break;
            }
        }

        ViewState["JSON"] = JsonConvert.SerializeObject(Organization);
        Response.Write(ViewState["JSON"].ToString());
    }
}