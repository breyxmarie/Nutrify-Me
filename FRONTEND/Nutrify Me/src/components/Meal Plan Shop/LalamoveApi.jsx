import axios from "axios";
import * as CryptoJS from "crypto-js";

const LalamoveApi = {
  baseUrl: "https://rest.sandbox.lalamove.com",
  apiKey: "pk_test_57763f10d1551363c1f2d817ad592d9a",
  secret:
    "sk_test_k+9yCKYHFfgX3wPv5wbVWWUDyD2z+4EY1Dm4kANmV6BI8Bg6JLeribyYsxCadY1O",

  async createQuotation() {
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

    const body = JSON.stringify({
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
    });
    const time = new Date().getTime().toString();
    const method = "POST";
    const url = "/v3/quotations";
    const signatureString = `${time}\r\n${method}\r\n${url}\r\n\r\n${body}`;
    const signature = CryptoJS.HmacSHA256(
      signatureString,
      this.secret
    ).toString();

    const TOKEN = `${this.apiKey}:${time}:${signature}`;
    console.log(TOKEN);
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
      const response = await axios.post(`${this.baseUrl}/v3/quotations`, body, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",

          Authorization: `hmac ${TOKEN}`,
          Accept: "application/json",
          // Market: "PH",
        },
      });
      return response;
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

  async createOrder(orderDetails) {
    const response = await axios.post(`${this.baseUrl}/orders`, orderDetails, {
      headers: {
        Authorization: `Basic ${btoa(this.apiKey + ":")}`,
      },
    });
    return response.data;
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
