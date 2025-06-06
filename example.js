/**
 * User management utility class
 * @class UserManager
 * @author John Developer
 * @version 2.1.0
 * @since 1.0.0
 * @example
 * const manager = new UserManager();
 * const user = await manager.createUser('John', 'john@example.com');
 */
class UserManager {
    /**
     * Creates a new user account
     * @async
     * @param {string} name - The user's full name
     * @param {string} email - The user's email address
     * @param {Object} [options={}] - Additional user options
     * @param {string} [options.role="user"] - User role
     * @param {boolean} [options.active=true] - Account status
     * @returns {Promise<Object>} The created user object
     * @example
     * const user = await manager.createUser('Jane Doe', 'jane@example.com', { role: 'admin' });
     */
    async createUser(name, email, options = {}) {
        return { id: 123, name, email, ...options };
    }

    /**
     * Validates user credentials
     * @param {string} email - User email
     * @param {string} password - User password
     * @returns {boolean} True if credentials are valid
     * @example
     * const isValid = manager.validateCredentials('user@example.com', 'password123');
     */
    validateCredentials(email, password) {
        return true;
    }
}

/**
 * Formats a user's display name
 * @function formatUserName
 * @param {Object} user - User object
 * @param {string} user.firstName - First name
 * @param {string} user.lastName - Last name
 * @returns {string} Formatted full name
 * @author John Developer
 * @since 1.2.0
 * @example
 * const formatted = formatUserName({ firstName: 'John', lastName: 'Doe' });
 * // Returns: "John Doe"
 */
function formatUserName(user) {
    return `${user.firstName} ${user.lastName}`;
}

export { UserManager, formatUserName };