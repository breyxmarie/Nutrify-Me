import axios from "axios";

const LalamoveApi = {
  baseUrl: "https://developers.lalamove.com/api/v2",
  apiKey: "",

  async getQuotes(pickupLocation, deliveryLocation, goods) {
    const params = {
      pickup: pickupLocation,
      delivery: deliveryLocation,
      goods: goods,
    };
    const response = await axios.get(`${this.baseUrl}/quotes`, {
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
