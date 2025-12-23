// src/controllers/school.controller.js
import * as service from "../services/course.service.js";

// Tạo Course
export const createCourseHandler = async (req, res) => {
  try {
    const result = await service.createCourse(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Đăng ký học phần (Enroll)
export const enrollHandler = async (req, res) => {
  try {
    const { userId, courseId } = req.body;
    const result = await service.enrollStudentToCourse(userId, courseId);
    res.json({ message: "Enrolled successfully", student: result });
  } catch (error) {
    if (error.code === 404) {
      return res.status(404).json({ error: error.message });
    }
    console.error(error);
    res.status(500).json({ error: "Cannot enroll student" });
  }
};

//Xóa khóa học
export const deleteCourseHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await service.deleteCourse(id);
    if (!result) return res.status(404).json({ error: "Course not found" });
    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy tất cả khóa học
export const getAllCoursesHandler = async (req, res) => {
  try {
    const courses = await service.getAllCourses();
    res.json(courses);
  } catch (error) {
    console.log("🚀 ~ getAllCoursesHandler ~ error:", error)
    res.status(500).json({ error: error.message });
  }
};

// Lấy tất cả sinh viên trong một khóa học
export const getStudentsInCourseHandler = async (req, res) => {
  try {
    const { courseId } = req.params;
    const users = await service.getStudentsInCourse(courseId);
    res.json(users);
  } catch (error) {
    console.log("🚀 ~ getStudentsInCourseHandler ~ error:", error)
    res.status(500).json({ error: error.message });
  }
};