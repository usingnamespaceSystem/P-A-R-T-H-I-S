using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.HtmlControls;

public partial class Tecnology : System.Web.UI.UserControl
{
    Label Name = new Label();

    protected void Page_Load(object sender, EventArgs e)
    {
        Name.CssClass = "tabel-header h-custom2";
        Name.ID = "TecnologyName" + DateTime.Now.Minute + DateTime.Now.Second;

        Controls.Add(Name);
        Controls.Add(new HtmlGenericControl("p"));
    }

    public double Loyals
    {
        get
        {
            return Convert.ToDouble(Name.Text);
        }
        set
        {
            Name.Text = value.ToString();
        }
    }
}