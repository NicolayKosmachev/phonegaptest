using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Microsoft.AspNet.Identity;

namespace SpaPhoneGap.Controllers
{

    public class File
    {
        public string Name { get; set; }

        public string Date { get; set; }
    }


    public class FilesController : ApiController
    {
        public static List<File> Files = new List<File>() { new File() { Name = "FirstFile", Date = DateTime.Now.ToShortDateString() }, new File() { Name = "SecondFile", Date = DateTime.Now.ToShortDateString() } };  

        // GET api/files
        [Authorize]
        public List<File> GetFiles()
        {
            var identity = User.Identity.GetUserName();

            return new List<File>() { new File() { Name = "FirstFile" + DateTime.Now + identity, Date = DateTime.Now.ToShortDateString() }, new File() { Name = "SecondFile" + DateTime.Now, Date = DateTime.Now.ToShortDateString() } }; ;
        }
    }
}
