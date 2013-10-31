using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SpaPhoneGap.Controllers
{

    public class File
    {
        public string Name { get; set; }

        public string Location { get; set; }
    }


    public class FilesController : ApiController
    {
        public static List<File> Files = new List<File>(){new File(){Name = "FirstFile",Location = "First Location"},new File(){Name = "SecondFile",Location = "SecondLocation"}};  

        // GET api/files
        [Authorize]
        public List<File> Get()
        {
            return new List<File>() { new File() { Name = "FirstFile" + DateTime.Now, Location = "First Location" }, new File() { Name = "SecondFile" + DateTime.Now, Location = "SecondLocation" } }; ;
        }

        // GET api/files/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/files
        public void Post([FromBody]string value)
        {
        }

        // PUT api/files/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/files/5
        public void Delete(int id)
        {
        }
    }
}
