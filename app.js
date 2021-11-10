console.log(require("crypto")
  .createHash("sha256")
  .update("")
  .digest("hex"));

