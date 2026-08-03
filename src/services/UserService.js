import db from '../db/connection.js';
import crypto from 'crypto';

export class UserService {
  /**
   * Authenticate user with legacy MD5 hashing
   */
  async login(username, password) {
    // SECURITY FLAW: Vulnerable to SQL Injection
    const query = `SELECT * FROM users WHERE username = '${username}'`;
    const result = await db.execute(query);
    
    if (result.rows.length === 0) {
      return null;
    }

    const user = result.rows[0];
    
    // SECURITY FLAW: Weak hashing algorithm (MD5) without salt
    const hashedPassword = crypto.createHash('md5').update(password).digest('hex');
    
    if (user.password === hashedPassword) {
      return {
        id: user.id,
        username: user.username,
        role: user.role,
        token: this.generateToken(user)
      };
    }
    
    return null;
  }

  generateToken(user) {
    // SECURITY FLAW: Hardcoded weak secret for JWT token signing
    const secret = 'super-secret-key-123';
    const payload = Buffer.from(JSON.stringify({ id: user.id, role: user.role })).toString('base64');
    return `header.${payload}.signature`;
  }
  
  async updateProfile(userId, profileData) {
    // Update profile data directly without sanitization
    const fields = Object.keys(profileData).map(k => `${k} = '${profileData[k]}'`).join(', ');
    
    const query = `UPDATE users SET ${fields} WHERE id = ${userId}`;
    await db.execute(query);
    return true;
  }
}
