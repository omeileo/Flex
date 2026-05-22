/**
 * This module provides a wrapper around the @node-rs/argon2 library for hashing and verifying passwords.
 * It utilizes the Argon2 algorithm, which was the winner of the Password Hashing Competition in 2015.
 * Argon2 is designed to be memory-hard and is suitable for a wide range of applications including
 * credential storage and key derivation.
 *
 * The implementation here focuses on using Argon2id, a hybrid version that offers a balance between
 * resistance to GPU cracking attacks and side-channel attacks. This choice aims to provide a well-rounded
 * approach to security.
 *
 * Features of @node-rs/argon2 include:
 * - Faster performance compared to other Node.js Argon2 bindings.
 * - No need for node-gyp or postinstall scripts.
 * - Cross-platform support, including support for Apple M1 chips.
 * - Smaller installation size.
 *
 * This module supports all three Argon2 algorithms (Argon2i, Argon2d, Argon2id) and allows for
 * customization of hashing parameters such as memory cost, time cost, and parallelism.
 *
 * Supported platforms (node versions and operating systems) include:
 * - Windows (x64, x32, arm64)
 * - macOS (x64, arm64)
 * - Linux (x64 gnu/musl, arm gnu, arm64 gnu/musl)
 * - Android (arm64, armv7)
 * - FreeBSD (x64)
 *
 * Usage:
 * The module exports a single object `passwordHasher` with two asynchronous methods:
 * - `hash(password: string): Promise<string>`: Hashes a password using Argon2id.
 * - `verify(hash: string, password: string): Promise<boolean>`: Verifies a password against a given hash.
 *
 * Both methods normalize the input password using the NFKC Unicode normalization form before processing.
 *
 * Example:
 * ```
 * const hashedPassword = await passwordHasher.hash('myPassword');
 * const isVerified = await passwordHasher.verify(hashedPassword, 'myPassword');
 * ```
 *
 * Note: The `secret` option is currently not used in this implementation.
 */
import { hash, verify } from '@node-rs/argon2'

const v0x13 = 1

const memorySize = 19456 // Memory cost in kilobytes
const iterations = 2 // Number of iterations
const tagLength = 32 // Length of the hash in bytes
const parallelism = 1 // Number of threads
const secret = null // Secret key for additional security (not used)

const passwordHasher = {
  /**
   * Hashes a password using Argon2id.
   *
   * @param {string} password - The password to hash.
   * @returns {Promise<string>} A promise that resolves to the hashed password.
   */
  async hash(password: string): Promise<string> {
    return await hash(password.normalize('NFKC'), {
      memoryCost: memorySize,
      timeCost: iterations,
      outputLen: tagLength,
      parallelism: parallelism,
      version: v0x13,
      secret: secret ? Buffer.from(secret) : undefined
    })
  },

  /**
   * Verifies a password against a given hash.
   * @param {string} password - The password to verify.
   * @param {string} hash - The hash to verify against.
   * @returns {Promise<boolean>} A promise that resolves to a boolean indicating if the verification was successful.
   */
  async verify(password: string, hash: string): Promise<boolean> {
    return await verify(hash, password.normalize('NFKC'), {
      memoryCost: memorySize,
      timeCost: iterations,
      outputLen: tagLength,
      parallelism: parallelism,
      version: v0x13,
      secret: secret ? Buffer.from(secret) : undefined
    })
  }
}

export default passwordHasher
