import axios from "axios";
import CryptoJS from "crypto-js";
import SDKClient from "@lalamove/lalamove-js";

const LalamoveApi = {
  baseUrl: "https://rest.sandbox.lalamove.com",
  apiKey: "pk_test_57763f10d1551363c1f2d817ad592d9a",
  secret:
    "sk_test_k+9yCKYHFfgX3wPv5wbVWWUDyD2z+4EY1Dm4kANmV6BI8Bg6JLeribyYsxCadY1O",

  async createQuotation(long, lat, address) {
    const serviceType = "MOTORCYCLE"; // Adjust based on your needs (e.g., CAR, VAN)
    const specialRequests = ["THERMAL_BAG_1"]; // Optional - adjust if needed
    const item = {
      quantity: "12",
      weight: "LESS_THAN_3_KG",
      categories: ["FOOD_DELIVERY", "OFFICE_ITEM"],
      handlingInstructions: ["KEEP_UPRIGHT"],
    };

    const data = {
      data: {
        // scheduleAt: null, // Optional - set a scheduled delivery time if needed
        serviceType: "MOTORCYCLE",
        specialRequests: ["THERMAL_BAG_1"], // optional
        language: "en_PH",
        stops: [
          {
            coordinates: {
              lat: "14.599512", // Latitude of Ortigas Center, Pasig City
              lng: "121.018872", // Longitude of Ortigas Center, Pasig City
            },
            address: "Ortigas Center, Pasig City",
          },

          {
            coordinates: {
              lat: "14.604133", // Latitude of SM Mall of Asia, Pasay City
              lng: "121.006311", // Longitude of SM Mall of Asia, Pasay City
            },
            address: "SM Mall of Asia, Pasay City",
          },
        ],
        isRouteOptimized: false, // Optional - set to true for optimized route
        item: {
          quantity: "12",
          weight: "LESS_THAN_3_KG",
          categories: ["FOOD_DELIVERY", "OFFICE_ITEM"],
          handlingInstructions: ["KEEP_UPRIGHT"],
        },
      },
    };

    const body = {
      data: {
        // scheduleAt: null, // Optional - set a scheduled delivery time if needed
        serviceType: "MOTORCYCLE",
        specialRequests: ["THERMAL_BAG_1"], // optional
        language: "en_PH",
        stops: [
          {
            coordinates: {
              lat: "13.7962681", // Latitude of Ortigas Center, Pasig City
              lng: "120.9761599", // Longitude of Ortigas Center, Pasig City
            },
            address: "Bauan Batangas Region IV-A",
          },

          {
            coordinates: {
              lat: lat.toString(), // Latitude of SM Mall of Asia, Pasay City
              lng: long.toString(), // Longitude of SM Mall of Asia, Pasay City
            },
            address: address,
          },
        ],
        isRouteOptimized: false, // Optional - set to true for optimized route
        item: {
          quantity: "12",
          weight: "LESS_THAN_3_KG",
          categories: ["FOOD_DELIVERY", "OFFICE_ITEM"],
          handlingInstructions: ["KEEP_UPRIGHT"],
        },
      },
    };
    const time = new Date().getTime().toString();

    const datas = JSON.stringify(body);

    const method = "POST";
    const url = "/v3/quotations";
    const signatureString = `${time}\r\n${method}\r\n${url}\r\n\r\n${datas}`;

    const signature = CryptoJS.HmacSHA256(
      signatureString,
      this.secret
    ).toString();

    const TOKEN = `${this.apiKey}:${time}:${signature}`;

    let headers = {
      ContentType: "application/json",
      Authorization: `hmac ${TOKEN}`,
      Market: "PH",
      // RequestID: "",
    };

    // try {
    //   const response = await axios.post(`${this.baseUrl}/v3/quotations`, body, {
    //     headers: {
    //       "Content-Type": "application/json; charset=utf-8",
    //       Authorization: `hmac ${TOKEN}`,
    //       Accept: "application/json",
    //       Market: "PH",
    //     },
    //   });
    //   return response;
    // } catch (error) {
    //   console.error("Error creating quotation:", error);
    //   // Handle errors appropriately (e.g., throw exception, display error message)
    //   throw error; // Re-throw for further handling if needed
    // }

    try {
      const response = await axios.post(
        `https://cors-anywhere.herokuapp.com/${this.baseUrl}/v3/quotations`,
        //  `https://test.cors.workers.dev/?${this.baseUrl}/v3/quotations`,

        //! watch out here for deployment baka mag kaerror
        body,
        {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            Market: "PH",
            Authorization: `hmac ${TOKEN}`,
            Accept: "application/json",
            //  "Access-Control-Allow-Headers": true,
            // "Access-Control-Allow-Origin": true,

            //  crossorigin: true,
          },
        }
      );
      return response;

      // const response = fetch(
      //   `https://test.cors.workers.dev/?${this.baseUrl}/v3/quotations`,
      //   {
      //     method: "post",
      //     headers: {
      //       "x-foo": "bar",
      //       "x-bar": "foo",
      //       "x-cors-headers": JSON.stringify({
      //         // allows to send forbidden headers
      //         // https://developer.mozilla.org/en-US/docs/Glossary/Forbidden_header_name
      //         cookies: "x=123",
      //       }),
      //       "Content-Type": "application/json; charset=utf-8",
      //       Market: "PH",
      //       Authorization: `hmac ${TOKEN}`,
      //       Accept: "application/json",
      //     },
      //   }
      // )
      //   .then((res) => {
      //     // allows to read all headers (even forbidden headers like set-cookies)
      //     const headers = JSON.parse(res.headers.get("cors-received-headers"));
      //     console.log(headers);
      //     return res.json();
      //   })
      //   .then(console.log);

      // console.log(response);

      // try {
      //   const response = await fetch(`${this.baseUrl}/v3/quotations`, {
      //     method: "POST",
      //     mode: "no-cors",
      //     headers: {
      //       Authorization: `hmac ${TOKEN}`,
      //       "Content-Type": "application/json",
      //       Market: "PH",
      //       Accept: "application/json",
      //     },
      //     body: JSON.stringify({
      //       data: {
      //         serviceType: "MOTORCYCLE",
      //         specialRequests: ["THERMAL_BAG_1"],
      //         language: "en_PH",
      //         stops: [
      //           {
      //             coordinates: {
      //               lat: "14.599512",
      //               lng: "121.018872",
      //             },
      //             address: "Ortigas Center, Pasig City",
      //           },
      //           {
      //             coordinates: {
      //               lat: "14.604133",
      //               lng: "121.006311",
      //             },
      //             address: "SM Mall of Asia, Pasay City",
      //           },
      //         ],
      //         isRouteOptimized: false,
      //         item: {
      //           quantity: "12",
      //           weight: "LESS_THAN_3_KG",
      //           categories: ["FOOD_DELIVERY", "OFFICE_ITEM"],
      //           handlingInstructions: ["KEEP_UPRIGHT"],
      //         },
      //       },
      //     }),
      //   })
      //     .then((response) => {
      //       if (!response.ok) {
      //         //   console.log(response.json());
      //         console.log(response);
      //         throw new Error("Network response was not ok");
      //       }
      //       return response.json();
      //     })
      //     .then((data) => console.log(data))
      //     .catch((error) => console.error("Error:", error));
      //   console.log(response.json());
      //   console.log(response);
      //   return response;
      // } catch (error) {
      //   console.log(error);
      // }

      // const sdkClient = new SDKClient.ClientModule(
      //   new SDKClient.Config("public_key", "secret_key", "sandbox")
      // );

      //!
      // try {
      //   const response = await fetch(
      //     // `${this.baseUrl}/v3/quotations`,
      //     `https://corsproxy.io/${this.baseUrl}/v3/quotations`,
      //     {
      //       method: "POST",
      //       mode: "no-cors",
      //       headers: {
      //         Authorization: `hmac ${TOKEN}`,
      //         "Content-Type": "application/json",
      //         Market: "PH",
      //         //Accept: "application/json",
      //       },
      //       body: JSON.stringify({
      //         data: {
      //           // "scheduleAt": "2022-04-01T14:30:00.00Z", // optional
      //           serviceType: "MOTORCYCLE",
      //           specialRequests: ["THERMAL_BAG_1"], // optional
      //           language: "en_PH",
      //           stops: [
      //             {
      //               coordinates: {
      //                 lat: "14.599512", // Latitude of Ortigas Center, Pasig City
      //                 lng: "121.018872", // Longitude of Ortigas Center, Pasig City
      //               },
      //               address: "Ortigas Center, Pasig City",
      //             },

      //             {
      //               coordinates: {
      //                 lat: "14.604133", // Latitude of SM Mall of Asia, Pasay City
      //                 lng: "121.006311", // Longitude of SM Mall of Asia, Pasay City
      //               },
      //               address: "SM Mall of Asia, Pasay City",
      //             },
      //           ],
      //           isRouteOptimized: false, // optional only for quotations
      //           item: {
      //             quantity: "12",
      //             weight: "LESS_THAN_3_KG",
      //             categories: ["FOOD_DELIVERY", "OFFICE_ITEM"],
      //             handlingInstructions: ["KEEP_UPRIGHT"],
      //           },
      //         },
      //       }),
      //     }
      //   )
      //     .then((response) => {
      //       if (!response.ok) {
      //         console.log(response);
      //         throw new Error(`Network response was not ok: ${response}`);
      //       }
      //       return response.json();
      //     })

      //     .then((data) => console.log(data))
      //     .catch((error) => console.error("Error:", error));

      //   console.log(response);
      //   // console.log(response.json());

      //   return response;
      // } catch (error) {
      //   console.log(error);
      // }
    } catch (error) {
      console.error("Error creating quotation:", error);

      // Handle errors appropriately (e.g., throw exception, display error message)
      throw error; // Re-throw for further handling if needed
    }
  },

  async getQuotes(pickupLocation, deliveryLocation, goods) {
    const params = {
      pickup: pickupLocation,
      delivery: deliveryLocation,
      goods: goods,
    };
    const response = await axios.get(`${this.baseUrl}/quotations`, {
      params,
      headers: {
        Authorization: `Basic ${btoa(this.apiKey + ":")}`, // Base64 encode API key
      },
    });
    return response.data;
  },

  async createOrder(quotationID, custPhoneNum, name, remark, stop1, stop2) {
    // const response = await axios.post(`${this.baseUrl}/orders`, orderDetails, {
    //   headers: {
    //     Authorization: `Basic ${btoa(this.apiKey + ":")}`,
    //   },
    // });
    // return response.data;

    const body = {
      data: {
        quotationId: quotationID,
        sender: {
          stopId: stop1,
          name: "Nutrify Me",
          phone: "+639171561080",
        },

        recipients: [
          {
            stopId: stop2,
            name: name,
            phone: custPhoneNum,
            remarks: remark, // optional
          },
        ],
        isPODEnabled: true, // optional
        isRecipientSMSEnabled: true, // optional
        paymentMethod: "CASH",
        partner: "Lalamove Partner 1", // optional
      },
    };
    const time = new Date().getTime().toString();

    const datas = JSON.stringify(body);

    const method = "POST";
    const url = "/v3/orders";
    const signatureString = `${time}\r\n${method}\r\n${url}\r\n\r\n${datas}`;

    const signature = CryptoJS.HmacSHA256(
      signatureString,
      this.secret
    ).toString();

    const TOKEN = `${this.apiKey}:${time}:${signature}`;

    let headers = {
      ContentType: "application/json",
      Authorization: `hmac ${TOKEN}`,
      Market: "PH",
      // RequestID: "",
    };

    try {
      const response = await axios.post(
        `https://cors-anywhere.herokuapp.com/${this.baseUrl}/v3/orders`,
        //  `https://test.cors.workers.dev/?${this.baseUrl}/v3/quotations`,

        //! watch out here for deployment baka mag kaerror
        body,
        {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            Market: "PH",
            Authorization: `hmac ${TOKEN}`,
            Accept: "application/json",
            //  "Access-Control-Allow-Headers": true,
            // "Access-Control-Allow-Origin": true,

            //  crossorigin: true,
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Error creating quotation:", error);

      // Handle errors appropriately (e.g., throw exception, display error message)
      throw error; // Re-throw for further handling if needed
    }
  },

  async trackOrder(orderId) {
    const response = await axios.get(
      `<span class="math-inline">\{this\.baseUrl\}/orders/</span>{orderId}`,
      {
        headers: {
          Authorization: `Basic ${btoa(this.apiKey + ":")}`,
        },
      }
    );
    return response.data;
  },
};

export default LalamoveApi;
