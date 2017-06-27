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
using MongoDB.Driver;
using MongoDB.Bson;
using MongoDB.Driver.Core;
using MongoDB.Driver.Builders;

public partial class _Default : Page
{
    protected static IMongoClient _client;
    protected static IMongoDatabase _database;
    protected static IMongoCollection<BsonDocument> _collection;
    protected List<BsonDocument> models;
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

    async void Page_Load(object sender, EventArgs e)
    {

        if (!IsPostBack)
        {
            ViewState["JSON"] = JsonConvert.SerializeObject(Organization);

            _client = new MongoClient("mongodb://localhost:27017");
            _database = _client.GetDatabase("Parthis");
            _collection = _database.GetCollection<BsonDocument>("Parthis");

            models = _collection.Find(x => true).ToList();

            select_model.Items.Clear();

            if (models.Count > 0)
            {
                var filter = new BsonDocument();
                using (var cursor = await _collection.FindAsync(filter))
                {
                    while (await cursor.MoveNextAsync())
                    {
                        var batch = cursor.Current;

                        foreach (var document in batch)
                        {
                            select_model.Items.Add(document[0].ToString());
                        }
                    }
                }
            }
            else
            {
                select_model.Items.Add("Нет созданных моделей");
                select_model.Enabled = false;
            }

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

            _client = new MongoClient("mongodb://localhost:27017");
            _database = _client.GetDatabase("Parthis");
            _collection = _database.GetCollection<BsonDocument>("Parthis");

            models = _collection.Find(x => true).ToList();

            select_model.Items.Clear();

            if (models.Count > 0)
            {
                var filter = new BsonDocument();

                using (var cursor = await _collection.FindAsync(filter))
                {
                    while (await cursor.MoveNextAsync())
                    {
                        var batch = cursor.Current;

                        foreach (var document in batch)
                        {
                            select_model.Items.Add(document[0].ToString());
                        }
                    }
                }
            }
            else
            {
                select_model.Items.Add("Нет созданных моделей");
                select_model.Enabled = false;
            }
        }


    }

    protected void save_model(object sender, EventArgs e)
    {
        if (_client == null)
        {
            _client = new MongoClient("mongodb://localhost:27017");
            _database = _client.GetDatabase("Parthis");
            _collection = _database.GetCollection<BsonDocument>("Parthis");
        }

        var json = JObject.Parse(LocalStore.Value);
        var jsonDoc = JsonConvert.SerializeObject(json);
        var bsonDoc = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonDocument>(jsonDoc);

        _collection.InsertOne(bsonDoc);

    }

    protected async void upload_model(object sender, EventArgs e)
    {
        if (_client == null)
        {
            _client = new MongoClient("mongodb://localhost:27017");
            _database = _client.GetDatabase("Parthis");
            _collection = _database.GetCollection<BsonDocument>("Parthis");

            var filter = new BsonDocument(new BsonElement("_id", select_model.SelectedValue));

            using (var cursor = await _collection.FindAsync(filter))
            {
                while (await cursor.MoveNextAsync())
                {
                    var batch = cursor.Current;
                    UploadStore.Value = batch.ToString();
                }
            }
        }
    }
}
