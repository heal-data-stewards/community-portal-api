"use strict";

/**
 * Read the documentation () to implement custom controller functions
 */

module.exports = {
  /**
   * Sends an email to the recipient in the body of the request
   */
  confirm: async (ctx) => {
    const body = ctx.request.body;
    const sendTo = body.email;
    strapi.log.debug(`Trying to send an email to ${sendTo}`);
    console.log(ctx)
    console.log(ctx.body)
    try {
      const emailOptions = {
        to: sendTo,
        subject: "Welcome to the HEAL Data FAIR ",
        html: `<p>Hello, </p><p>Your request to access the HEAL Data FAIR has been approved. You can now log in at <a href="https://www.healdatafair.org/account" target="_blank">HEALdataFAIR.org/account.</a> </p><p>Best, </p><p>The HEAL Stewards</p>`,
      };
      await strapi.plugins["email"].services.email.send(emailOptions);
      strapi.log.debug(`Email sent to ${sendTo}`);
      ctx.send({ message: "Email sent" });
    } catch (err) {
      strapi.log.error(`Error sending email to ${sendTo}`, err);
      ctx.send({ error: "Error sending email" });
    }
  },
  reject: async (ctx) => {
    const body = ctx.request.body;
    const sendTo = body.email;
    strapi.log.debug(`Trying to send an email to ${sendTo}`);

    try {
      const emailOptions = {
        to: sendTo,
        subject: "Moderation notification for the HEAL Data FAIR website  ",
        html: `<h1>Hello, </h1><p>We are not able to approve your request for access to the HEAL Data FAIR. Currently, log-in access is available to members of the HEAL Collective Board, Working Groups, and Tiger Teams. If you believe this decision was made in error - or would like to learn more about joining one of these groups - please email us at HEALStewards@renci.org. </p><p>Best, </p><p>The HEAL Stewards</p>`,
      };
      await strapi.plugins["email"].services.email.send(emailOptions);
      strapi.log.debug(`Email sent to ${sendTo}`);
      ctx.send({ message: "Email sent" });
    } catch (err) {
      strapi.log.error(`Error sending email to ${sendTo}`, err);
      ctx.send({ error: "Error sending email" });
    }
  },
  admin: async (ctx) => {
    const body = ctx.request.body;
    const sendTo = body.email;
    strapi.log.debug(`Trying to send an email to ${sendTo}`);

    try {
      const emailOptions = {
        to: sendTo,
        subject: "Moderation request for HEAL Data FAIR",
        html: `<p>Hello, </p><p>a new user has requested access to the HEAL Data FAIR. Please moderate. </p>`,
      };
      await strapi.plugins["email"].services.email.send(emailOptions);
      strapi.log.debug(`Email sent to ${sendTo}`);
      ctx.send({ message: "Email sent" });
    } catch (err) {
      strapi.log.error(`Error sending email to ${sendTo}`, err);
      ctx.send({ error: "Error sending email" });
    }
  },
};


