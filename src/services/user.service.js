// src/services/user.service.js
import { prisma } from "../config/prisma/client.js";

/**
 * Tạo người dùng mới trong database.
 * @param {object} user - Đối tượng người dùng { name, email }.
 */
export const createUser = async (user) => {
  return await prisma.user.create({
    data: user,
  });
};

/**
 * Lấy tất cả người dùng từ database.
 */
export const getAllUsers = async () => {
  return await prisma.user.findMany();
};

// delete student by id
export const deleteUserById = async (id) => {
    // Kiểm tra xem người dùng có tồn tại không
    const existingUser = await prisma.user.findUnique({
        // Chuyển đổi id thành số nguyên
        // Convert id to integer
        where: { id: parseInt(id) },
    });
    if (!existingUser) {
    //   throw new Error(`User with id ${id} not found`);
    //return error code 404
      const error = new Error(`User with id ${id} not found`);
      error.code = 404;
      throw error;
    }
  return await prisma.user.delete({
        // Convert id to integer
        where: { id: parseInt(id) },
  });
};