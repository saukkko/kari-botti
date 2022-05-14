import { createPublicKey, verify } from "crypto";

const importJWK = (
  pubKeyString: string,
  enc?: BufferEncoding,
  crv?: string
) => {
  return createPublicKey({
    format: "jwk",
    key: {
      crv: crv || "Ed25519",
      kty: "OKP",
      x: Buffer.from(pubKeyString, enc || "hex").toString("base64"),
    },
  });
};

export const verifyToken = async (
  body: string,
  timestamp: string,
  signature: string,
  pubKeyString: string,
  opts?: { dataEnc?: BufferEncoding; signatureEnc?: BufferEncoding }
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    verify(
      null,
      Buffer.from(timestamp.concat(body), opts?.dataEnc || "utf-8"),
      importJWK(pubKeyString),
      Buffer.from(signature, opts?.signatureEnc || "hex"),
      (err, result) => {
        err ? reject(err) : resolve(result);
      }
    );
  });
};
