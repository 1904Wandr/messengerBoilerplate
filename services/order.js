/**
 * Copyright 2019-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Messenger For Original Coast Clothing
 * https://developers.facebook.com/docs/messenger-platform/getting-started/sample-apps/original-coast-clothing
 */

"use strict";

// Imports dependencies
const Response = require("./response"),
  i18n = require("../i18n.config"),
  config = require("./config"),
  axios = require("axios"),
  apiKey = require("../secrets");

module.exports = class Order {
  static handlePayload(payload) {
    let response;
    let event;
    let eventName;
    let eventSite;

    switch (payload) {
      case "ORDER_NUMBER":
        response = Response.genQuickReply(i18n.__("order.prompt"), [
          {
            title: i18n.__("order.account"),
            payload: "LINK_ORDER"
          }
          // {
          //   title: i18n.__("order.search"),
          //   payload: "SEARCH_ORDER"
          // },
          // {
          //   title: i18n.__("menu.help"),
          //   payload: "CARE_ORDER"
          // }
        ]);
        break;

      case "SEARCH_ORDER":
        response = Response.genText(i18n.__("order.number"));
        break;

      case "ORDER_NUMBER2":
        response = Response.genImageTemplate(
          `${config.appUrl}/order.png`,
          i18n.__("order.status")
        );
        break;

      case "LINK_ORDER":
      // eslint-disable-next-line no-inner-declarations
      async function getYelp() {
              const {data} = await axios.get(
          'https://api.yelp.com/v3/events?latitude=40.7128&longitude=-74.0060&radius=10000&sort_on=time_start&limit=10',
    {
      headers: {
        Authorization: `Bearer ${apiKey}`
      }
    }
  )
  // console.log("DATA: ", data)
  event = await data;
  eventName = event.events[0].name;
  eventSite = event.events[0].event_site_url;
  return data
};

 getYelp().then(results => {
   event = results;
   console.log("EVENT ", event)
   response.push(Response.genText(event.events[0].name));
 });


        response = [
          Response.genText(i18n.__('order.dialog')),
          Response.genText('Facebook New York Hackathon'),
          Response.genText('https://fbnyhackathon2019.devpost.com/')
          // Response.genImageTemplate(
          //   `${config.appUrl}/order.png`,
          //   i18n.__('order.status')
          // )
        ];
        break;
    }

    return response;
  }
};
