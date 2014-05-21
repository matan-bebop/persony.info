'use strict';

var path = require('path');
var nodemailer = require("nodemailer");
var _ = require('lodash');
var async = require('async');

module.exports = function (app) {
    var mailConfig = app.config.mail,
        smtpTransport = nodemailer.createTransport("SMTP", mailConfig.transport),
        Contact = app.orm.getModel('Contact');

    return {
        index:    function (req, res) {
            res.render('index');
        },
        partials: function (req, res) {
            var stripped = req.url.split('.')[0];
            res.render(path.join('./', stripped), function (err, html) {
                if (err) {
                    res.render('index');
                } else {
                    res.send(html);
                }
            });
        },
        contact:  function (req, res) {
            var formName = req.params.formName,
                formData = req.body,
                body = "";

            _(formData).forEach(function (value, key) {
                body += [key, ": ", typeof value === "string" ? value : JSON.stringify(value), "\n"].join("");
            });


            async.parallel(
                [
                    function (callback) {
                        // sending email to project's support
                        var mailOptions = {
                            from:    [formData.name ||
                                          formData.email.split("@")[0], " <", formData.email, ">"].join(""),
                            to:      mailConfig.contacts[formName] || mailConfig.contacts.support,
                            subject: "persony.info contact form: " + formName,
                            text:    body
                        };

                        smtpTransport.sendMail(mailOptions, function (error, response) {
                            callback(error, response);
                        });
                    },
                    function (callback) {
                        // sending email to user himself
                        var mailOptions = {
                            from:    ["Persony.info", " <", mailConfig.contacts.support, ">"].join(""),
                            to:      formData.email,
                            subject: "Persony.info зворотній зв’язок",
                            text:    "Дякуємо за ваше звернення. Скоро з вами зв’яжуться"
                        };

                        smtpTransport.sendMail(mailOptions, function (error, response) {
                            // we do not want to fail if this particular email was not sent
                            callback(null, error);
                        });
                    },
                    function (callback) {
                        // save email data in database;
                        var data = _(formData).clone();
                        if (data.skills) {
                            data.skills = JSON.stringify(data.skills);
                        }
                        var entity = Contact.build(data);
                        entity.save().
                            error(function (error) {
                                console.log("Error saving Contact record to the database: ", error);
                            }).
                            success(function (result) {
                                console.log("Success saving Contact record to the database: ", result.id);
                            });
                        callback();
                    }
                ],
                function (error, results) {
                    if (error) {
                        console.log("Processing failed: ", error);
                        res.status(500);
                        res.send({error: error});
                    } else {
                        console.log("Processing succeed: " + results);
                        res.end("Message sent");
                    }
                }
            );
        },
        error404: function (req, res, next) {
            res.status(404);

            if (req.isApiRequest) {
                res.send({ error: 'Not found' });
                return;
            }

            // respond with html page
            if (req.accepts('html')) {
                //res.render('404', { url: req.url });
                res.render('index');
                return;
            }

            // default to plain-text. send()
            res.type('txt').send('Not found');
        },
        error500: function (err, req, res, next) {
            res.status(err.status || 500);

            if (req.isApiRequest) {
                res.send({ error: err });
                return;
            }

            res.render('500', { error: err });
        }
    };
};
