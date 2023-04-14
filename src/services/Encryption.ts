import crypto from 'crypto';
import jwt from 'jsonwebtoken';

import { JWT_SECRET, CRYPTO_ALGORITHM, CRYPTO_IV_KEY, CRYPTO_PASSWORD, HASH_ALGORITHM, HASH_SECRET } from '../config';

export default class Encryption {

	private iv = Buffer.from(CRYPTO_IV_KEY, 'hex');
	private key = Buffer.from(CRYPTO_PASSWORD, 'hex');
	private cryptoAlgorithm = CRYPTO_ALGORITHM;
	private hashAlgorithm = HASH_ALGORITHM;
	private hashSecret = HASH_SECRET;
	private jwtSecret: jwt.Secret = JWT_SECRET as string;

	public hashPassword(password: string): string {
		const hash = crypto.createHmac(this.hashAlgorithm, this.hashSecret);

		return hash.update(password).digest('hex');
	}

	public generateToken(payload: object, expiration: string = '7d') {
		const token = jwt.sign(payload, this.jwtSecret, { expiresIn: expiration });

		return token;
	}

	/**
	 * Decode the incomming token
	 * @error if it is an invalid token
	 */
	public decodeToken(token: string): DisruptiveJWT {
		return jwt.verify(token, this.jwtSecret) as DisruptiveJWT;
	}

	public decrypt(text: string) {
		let encryptedText = Buffer.from(text, 'hex');
		const decipher = crypto.createDecipheriv(this.cryptoAlgorithm, this.key, this.iv);

		let decrypted = decipher.update(encryptedText);
		decrypted = Buffer.concat([decrypted, decipher.final()]);

		// returns data after decryption 
		return decrypted.toString();
	}

}