"use strict";

/**
 * User.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const fetch = require("node-fetch");

const { sanitizeEntity, getAbsoluteServerUrl } = require("strapi-utils");

module.exports = {
  async sendConfirmationEmail(user) {
    const userPermissionService =
      strapi.plugins["users-permissions"].services.userspermissions;
    const pluginStore = await strapi.store({
      environment: "",
      type: "plugin",
      name: "users-permissions",
    });

    const settings = await pluginStore
      .get({ key: "email" })
      .then((storeEmail) => storeEmail["email_confirmation"].options);

    const userInfo = sanitizeEntity(user, {
      model: strapi.query("user", "users-permissions").model,
    });
    console.log("testing when sending user confirmation email");
    const confirmationToken = crypto.randomBytes(20).toString("hex");
    await this.edit({ id: user.id }, { confirmationToken });

    settings.message = await userPermissionService.template(settings.message, {
      URL: `${getAbsoluteServerUrl(strapi.config)}/auth/email-confirmation`,
      USER: userInfo,
      CODE: confirmationToken,
    });

    settings.object = await userPermissionService.template(settings.object, {
      USER: userInfo,
    });

    // Send an email to the user.
    await strapi.plugins["email"].services.email.send({
      to: user.email,
      from:
        settings.from.email && settings.from.name
          ? `${settings.from.name} <${settings.from.email}>`
          : undefined,
      replyTo: settings.response_email,
      subject: settings.object,
      text: settings.message,
      html: settings.message,
    });
    async function postData() {
      const response = await fetch(
        "https://api.healdatafair.org/account-requested",
        {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          // mode: 'cors', // no-cors, *cors, same-origin
          // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          // credentials: "same-origin", // include, *same-origin, omit
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          // redirect: 'follow', // manual, *follow, error
          // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: JSON.stringify({ email: "mattwatt@gmail.com" }), // body data type must match "Content-Type" header
        }
      );
      return response.json();
    }
    postData().then((data) => {
      console.log(data); // JSON data parsed by `data.json()` call
    });
  },
};
