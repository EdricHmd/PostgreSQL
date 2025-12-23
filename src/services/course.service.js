import { prisma } from "../config/prisma/client.js";

// 1 tạo khóa học mới 
export const createCourse = async (course) => {
  return await prisma.course.create({
    data: course,
  });
}

// 2 Lấy tất cả khóa học
export const getAllCourses = async () => {
//   return await prisma.course.findMany();
//trả về cả sinh viên trong khóa học
  return await prisma.course.findMany({
    include: { User: true },
  });
}

// Đăng ký khóa học cho sinh viên (QUAN TRỌNG)
export const enrollStudentToCourse = async (userId, courseId) => {
  //kiểm tra sinh viên và khóa học có tồn tại không
  const student = await prisma.user.findUnique({ where: { id: Number(userId) } });
  const course = await prisma.course.findUnique({ where: { id: Number(courseId) } });
    if (!student) {
        const error = new Error(`User with id ${userId} not found`);
        error.code = 404;
        throw error;
    }
    if (!course) {
        const error = new Error(`Course with id ${courseId} not found`);
        error.code = 404;
        throw error;
    }
   
  return await prisma.user.update({
    // Kiểm tra xem người dùng có tồn tại không
    where: { id: Number(userId) },
    data: {
      courses: {
        connect: { id: Number(courseId) } // Keyword 'connect' của Prisma
      }
    },
    include: { courses: true } // Trả về luôn danh sách khóa học sau khi add
  });
};

// xóa khóa học by id
export const deleteCourse = async (courseId) => {
        // Kiểm tra xem khóa học có tồn tại không
    const existingCourse = await prisma.course.findUnique({
        // Convert id to integer
        where: { id: Number(courseId) },
    });
    if (!existingCourse) {
    //   throw new Error(`Course with id ${courseId} not found`);
    //return error code 404
        const error = new Error(`Course with id ${courseId} not found`);
        error.code = 404;
        throw error;
    }
  return await prisma.course.delete({
    where: { id: Number(courseId) },
    include: { students: true }, // Trả về luôn danh sách sinh viên sau khi remove
  });
};

// lấy tất cả sinh trong một khóa học
export const getStudentsInCourse = async (courseId) => {
  const courseWithStudents = await prisma.course.findUnique({
    where: { id: Number(courseId) },
    include: { User: true }, // Trả về luôn danh sách sinh viên sau khi remove
  });
  return courseWithStudents.User;
};