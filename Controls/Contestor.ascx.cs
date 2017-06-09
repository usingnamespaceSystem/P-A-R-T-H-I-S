using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.HtmlControls;

public partial class Contestor : UserControl
{
    TextBox Name = new TextBox();
    TextBox Volume = new TextBox();

    protected void Page_Load(object sender, EventArgs e)
    {
        Name.Attributes.Add("runat", "server");
        Name.CssClass = "tabel-header h-custom2";
        Volume.CssClass = "tabel-header h-custom-little";
        Name.ID = "ContestorName" + DateTime.Now.Minute + DateTime.Now.Second;
        Volume.ID = "ContestorVolume" + DateTime.Now.Minute + DateTime.Now.Second;

        
    }

    protected void add(object sender, EventArgs e)
    {
        place.Controls.Add(Name);
        place.Controls.Add(Volume);
        place.Controls.Add(new HtmlGenericControl("p"));
    }

    public string ContestorName
    {
        get
        {
            return Name.Text;
        }
        set
        {
            Name.Text = value;
        }
    }

    public double ContestorVolume
    {
        get
        {
            return Convert.ToDouble(Volume.Text);
        }
        set
        {
            Volume.Text = value.ToString();
        }
    }
}