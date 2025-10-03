import { Injectable } from '@nestjs/common';
import { Role } from 'src/database/models/security/role.model';
import { User } from 'src/database/models/security/user.model';

@Injectable()
export class UsersService {
  /**
   * Finds a user by their email address.
   *
   * @param email - The email address to search for.
   * @returns A promise that resolves to the found {@link User} instance with its associated {@link Role}, or `null` if no user is found.
   */
  async findByEmail(email: string): Promise<User | null> {
    return User.findOne({
      where: { email },
      include: [{ association: 'role' }],
    });
  }

  /**
   * Finds a user by their unique identifier.
   *
   * @param id - The unique identifier of the user.
   * @returns A promise that resolves to the user instance with associated roles, or `null` if not found.
   */
  async findById(id: string): Promise<User | null> {
    return User.findByPk(id, { include: [Role] });
  }

   /**
   * Sets or clears the hashed refresh token for a user.
   *
   * @param userId - The ID of the user.
   * @param refreshToken - The refresh token hash to save, or `null` to clear it.
   */
  async setRefreshToken(userId: string, refreshToken: string | null) {
    const user = await User.findByPk(userId);
    if (!user) throw new Error('Usuario no encontrado');

    user.refreshToken = refreshToken;
    await user.save();
  }
}
