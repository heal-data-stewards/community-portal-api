module.exports = ({ env }) => ({
  upload: {
    provider: "aws-s3",
    providerOptions: {
      accessKeyId: env("AWS_ACCESS_KEY_ID"),
      secretAccessKey: env("AWS_ACCESS_SECRET"),
      region: env("AWS_REGION"),
      params: {
        Bucket: env("AWS_BUCKET_NAME"),
      },
    },
  },
  email: {
    provider: "sendmail",
    providerOptions: {
      dkim: {
        privateKey: "../dkim-private.pem",
        keySelector: "abcd", // the same as the one set in DNS txt record, use online dns lookup tools to be sure that is retreivable
      },
    },
    settings: {
      defaultFrom: "srocha@renci.org",
      defaultReplyTo: "srocha@renci.org",
    },
  },
});
