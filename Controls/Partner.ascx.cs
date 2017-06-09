public partial class Partner : System.Web.UI.UserControl
{
    private string amount;
    public string Amount
    {
        get
        {
            return Provider_amount.Text;
        }
        set
        {
            amount = value;
        }
    }
}