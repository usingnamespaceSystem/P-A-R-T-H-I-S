using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.HtmlControls;

public partial class Work : System.Web.UI.UserControl
{
    TextBox Name = new TextBox();

    protected void Page_Load(object sender, EventArgs e)
    {
        Name.CssClass = "tabel-header h-custom2";
        Name.ID = "WorkName" + DateTime.Now.Minute + DateTime.Now.Second;

        Controls.Add(Name);
        Controls.Add(new HtmlGenericControl("p"));
    }

    public string WorkName
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
}