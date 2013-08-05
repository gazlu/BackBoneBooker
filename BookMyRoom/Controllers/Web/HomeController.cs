using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BookMyRoom.Controllers.Web
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult ManageRoom()
        {
            return PartialView("ManageRoom");
        }

        public ActionResult ValidForm()
        {
            return View();
        }
    }
}
