using Hogword_University__Web_Design.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Hogword_University__Web_Design.Controllers
{
    [HandleError(ExceptionType = typeof(Exception), View = "Error")]
    public class RegisterController : Controller
    {
        private DBModel db = new DBModel();

        public ActionResult Index()
        {
            return View();
        }

        public JsonResult SaveStudentData(Student model)
        {
            try
            {
                db.Students.Add(model);
                db.SaveChanges();
                return Json("Registration Successfully", JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json($"Error during registration: {ex.Message}", JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult CheckValidUser(Student model)
        {
            try
            {
                string result = "Fail";
                var DataItem = db.Students
                    .Where(x => x.RegNo == model.RegNo && x.Password == model.Password)
                    .SingleOrDefault();
                if (DataItem != null)
                {
                    Session["ID"] = DataItem.StudentID.ToString();
                    Session["Username"] = DataItem.UserName;
                    Session["Class"] = DataItem.Class;
                    Session["LostLogin"] = DataItem.LastLogin;

                    DataItem.LastLogin = DateTime.Now;
                    db.SaveChanges();
                    result = "Success";

                }
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json($"Error during login:{ex.Message}", JsonRequestBehavior.AllowGet);
            }

        }
        public JsonResult CheckValidUsers(Teacher model)
        {
            try
            {
                string result = "Fail";
                var DataItem = db.Teachers
                    .Where(x => x.Email == model.Email && x.Password == model.Password)
                    .SingleOrDefault();
                if (DataItem != null)
                {
                    Session["ID"] = DataItem.TeacherID.ToString();
                    Session["Username"] = DataItem.UserName;
                    Session["LostLogin"] = DataItem.LastLogin;

                    DataItem.LastLogin = DateTime.Now;
                    db.SaveChanges();
                    result = "Success";

                }
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json($"Error during login:{ex.Message}", JsonRequestBehavior.AllowGet);
            }

        }

        public JsonResult SaveTeacherData(Teacher model)
        {
            try
            {
                db.Teachers.Add(model);
                db.SaveChanges();
                return Json("Registration Successfully", JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json($"Error during registration: {ex.Message}", JsonRequestBehavior.AllowGet);
            }
        }



        public ActionResult AfterLogin()
        {
            if (Session["ID"] != null)
            {
                int userId = Convert.ToInt32(Session["ID"]);

                if (Session["Class"] != null)
                {
                    // Student is logged in
                    Student student = db.Students.Find(userId);

                    if (student != null)
                    {
                        ViewBag.UserType = "Student";
                        ViewBag.UserName = student.UserName;
                        ViewBag.RegNo = student.RegNo;
                        ViewBag.Class = student.Class;
                        ViewBag.LastLogin = student.LastLogin;
                    }
                }
                else
                {
                    // Teacher is logged in
                    Teacher teacher = db.Teachers.Find(userId);

                    if (teacher != null)
                    {
                        ViewBag.UserType = "Teacher";
                        ViewBag.UserName = teacher.UserName;
                        ViewBag.Subjects = teacher.Subjects;
                        ViewBag.Class = teacher.Class;
                        ViewBag.LastLogin = teacher.LastLogin;
                    }
                }

                return View();
            }
            else
            {
                return RedirectToAction("Index");
            }
        }



        public ActionResult Logout()
        {
            Session.Clear();
            Session.Abandon();
            return RedirectToAction("Index");
        }
        public ActionResult StudentResult()
        {
            return View();
        }

        public ActionResult TeacherView()
        {
            var students = db.Students.ToList();
            return View(students);
        }
    }
}
