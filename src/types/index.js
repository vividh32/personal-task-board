
/**
 * @typedef {Object} User
 * @property {string} id - User ID
 * @property {string} email - User email
 * @property {string} [name] - Optional user name
 */

/**
 * @typedef {Object} Task
 * @property {string} id - Task ID
 * @property {string} title - Task title
 * @property {string} [description] - Optional task description
 * @property {boolean} completed - Whether the task is completed
 * @property {string} createdAt - Creation date as ISO string
 * @property {string} userId - ID of the user who created the task
 */

/**
 * @typedef {Object} AuthState
 * @property {User|null} user - Current user
 * @property {boolean} isAuthenticated - Whether user is authenticated
 */

// Export nothing - this file is just for JSDoc documentation
export {};
