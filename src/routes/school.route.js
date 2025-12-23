// src/routes/school.route.js
import express from "express";
import { 
  createCourseHandler, 
  enrollHandler,
  deleteCourseHandler,
  getAllCoursesHandler,
  getStudentsInCourseHandler
} from "../controllers/school.controller.js";

const router = express.Router();

/**
 * @swagger
 * /api/school/courses:
 *   post:
 *     summary: Create a new course
 *     description: Creates a new course in the system
 *     tags: [Courses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CourseInput'
 *     responses:
 *       201:
 *         description: Course created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/courses", createCourseHandler);

/**
 * @swagger
 * /api/school/enroll:
 *   post:
 *     summary: Enroll a student in a course
 *     description: Registers a student to a specific course by connecting their relationship
 *     tags: [Enrollment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EnrollmentInput'
 *     responses:
 *       200:
 *         description: Student enrolled successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EnrollmentResponse'
 *             example:
 *               message: "Enrolled successfully"
 *               student:
 *                 id: 1
 *                 name: "John Doe"
 *                 email: "john@example.com"
 *                 createdAt: "2025-12-23T10:00:00.000Z"
 *                 courses:
 *                   - id: 1
 *                     title: "Introduction to Computer Science"
 *                     code: "CS101"
 *                     description: "Basic CS concepts"
 *       404:
 *         description: Student or course not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             examples:
 *               studentNotFound:
 *                 value:
 *                   error: "User with id 999 not found"
 *               courseNotFound:
 *                 value:
 *                   error: "Course with id 999 not found"
 *       500:
 *         description: Internal server error - cannot enroll student
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Cannot enroll student"
 */
router.post("/enroll", enrollHandler);

/**
 * @swagger
 * /api/school/courses/{id}:
 *   delete:
 *     summary: Delete a course
 *     description: Deletes a course from the system by its ID
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The course ID to delete
 *         example: "1"
 *     responses:
 *       200:
 *         description: Course deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessMessage'
 *             example:
 *               message: "Course deleted successfully"
 *       404:
 *         description: Course not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Course not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete("/courses/:id", deleteCourseHandler);

/**
 * @swagger
 * /api/school/courses:
 *   get:
 *     summary: Get all courses
 *     description: Retrieves a list of all available courses
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: A list of courses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Course'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Internal server error"
 */
router.get("/courses", getAllCoursesHandler);

/**
 * @swagger
 * /api/school/courses/{id}:
 *   get:
 *     summary: Get all students in a course
 *     description: Retrieves a list of all students enrolled in a specific course
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The course ID to retrieve students for
 *         example: "1"
 *     responses:
 *       200:
 *         description: A list of students in the course
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Student'
 *       404:
 *         description: Course not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Course not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "Internal server error"
 */
router.get("/courses/:courseId", getStudentsInCourseHandler);

export default router;