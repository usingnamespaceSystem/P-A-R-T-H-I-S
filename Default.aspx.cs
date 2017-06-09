using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.HtmlControls;
using System.IO;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using System.Text;

public partial class _Default : Page
{
    JObject organization = new JObject(

           new JProperty("Organization", new JArray(

               new JObject(
                   new JProperty("Markets", new JArray())))));

    public JObject Organization
    {
        get
        {
            return organization;
        }

        set
        {
            organization = value;
        }
    }

    void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            ViewState["JSON"] = JsonConvert.SerializeObject(Organization);
        }
        else
        {
            Organization = JObject.Parse(ViewState["JSON"] as string);
            if (Organization["Organization"][0]["Markets"].Count() <= 0)
            {
                (Organization["Organization"][0]["Markets"] as JArray).Add(
                    new JObject(
                       new JProperty("ID", string.Empty),
                       new JProperty("Name", string.Empty),
                       new JProperty("Amount", string.Empty),
                       new JProperty("Loyalty", string.Empty),
                       new JProperty("Channels", new JArray(

                           new JObject(
                               new JProperty("ID", string.Empty),
                               new JProperty("Name", string.Empty),
                               new JProperty("Goods", new JArray(

                                   new JObject(
                                       new JProperty("ID", string.Empty),
                                       new JProperty("Name", string.Empty),
                                       new JProperty("Margin", string.Empty),
                                       new JProperty("Frequency", string.Empty),
                                       new JProperty("Group", string.Empty),
                                       new JProperty("Providers", new JArray(

                                           new JObject(
                                               new JProperty("ID", string.Empty),
                                               new JProperty("Name", string.Empty),
                                               new JProperty("Amount", string.Empty),
                                               new JProperty("Price", string.Empty))))))),

                                        new JProperty("Resources", new JArray(
                                            new JObject(
                                                new JProperty("ID", string.Empty),
                                                new JProperty("Expenses", string.Empty),
                                                new JProperty("Cost", string.Empty))))))),
                      
                        new JProperty("Contestors", new JArray(
                            new JObject(
                                new JProperty("ID", string.Empty),
                                new JProperty("Name", string.Empty),
                                new JProperty("Loyalty", string.Empty),
                                new JProperty("Goods", new JArray(

                                   new JObject(
                                       new JProperty("ID", string.Empty),
                                       new JProperty("Name", string.Empty),
                                       new JProperty("Price", string.Empty))))
                            )))));
                ViewState["JSON"] = JsonConvert.SerializeObject(Organization);
            }
        }
    }
}
