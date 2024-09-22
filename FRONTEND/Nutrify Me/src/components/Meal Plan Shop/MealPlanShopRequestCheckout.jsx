import { useState, useRef, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import * as React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { NavLink, Link, useLocation, useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import ReactDOM from "react-dom";
import { Modal, Tab, Tabs } from "@mui/material";
import AxiosInstance from "../forms/AxiosInstance";
import { useLoggedInUser } from "../LoggedInUserContext";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import dotenv from "dotenv";
import axios from "axios";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import {
  PayPalCardFieldsProvider,
  PayPalNameField,
  PayPalNumberField,
  PayPalExpiryField,
  PayPalCVVField,
  usePayPalCardFields,
} from "@paypal/react-paypal-js";
import PayPalPayment from "./PayPalPayment";
import LalamoveApi from "./LalamoveApi";
import {
  APIProvider,
  Map,
  //MapCameraChangedEvent,
  Marker,
} from "@vis.gl/react-google-maps";
import SDKClient from "@lalamove/lalamove-js";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import Autocomplete from "react-google-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import ScriptLoader from "@s-ui/react-script-loader";
import PlacesAutocomplete, {
  geocodeByAddress,
  // getLatLng,
} from "react-places-autocomplete";
import {
  regions,
  provinces,
  cities,
  barangays,
} from "select-philippines-address";

function MealPlanShopRequestCheckout() {
  const { cartId } = useParams();
  const navigate = useNavigate();

  const location = useLocation();
  const { datas } = location.state || {};
  const { cartItems } = location.state || {};
  const { loggedInUser, setLoggedInUser } = useLoggedInUser(); // * to get the details of the log in user
  const [selectedAddress, setSelectedAddress] = useState(0);
  const [notes, setNotes] = useState("n/a");
  const [payment, setPayment] = useState("");
  const [shipping, setShipping] = useState("");
  const [selectedLong, setSelectedLong] = useState(0);
  const [selectedLat, setSelectedLat] = useState(0);
  const [shippingDetails, setShippingDetails] = useState([]);
  const API_KEY = "AIzaSyBOMdigs7wUPHJpS_WKReoXSuSXXprE8D0";

  //! get Address Data
  //changeAddress(0);
  const addressDatas = () => {};
  const [addressValue, setAddressValue] = useState("");

  const handleChangeAddress = (event) => {
    setAddressValue(event.target.value);
  };

  const [addressData, setAddressData] = useState([]);

  const getAddressData = async () => {
    try {
      const response = await AxiosInstance.get(`address`);
      const filteredData = response.data.filter(
        (item) => item.user_id === loggedInUser.user_id
      );
      setAddressData(filteredData);
      console.log(response);
      // getMealData();

      setTimeout(async () => {
        try {
          const quotationData = await LalamoveApi.createQuotation(
            filteredData[0].lang,
            filteredData[0].longi,
            filteredData[0].address
          );
          console.log(quotationData);
          setShippingPrice(
            quotationData?.data?.data?.priceBreakdown?.totalExcludePriorityFee
          );
          // const tempPrice = calculateSubTotalPrice();
          // setTotalOrderPrice(
          //   parseInt(location.state.request.price) +
          //     parseInt(
          //       quotationData?.data?.data?.priceBreakdown
          //         ?.totalExcludePriorityFee
          //     )
          // );

          setSubTotalPrices(location.state.request.price);
          setTotalOrderPrice(
            parseInt(location.state.request.price) +
              parseInt(
                quotationData?.data?.data?.priceBreakdown
                  ?.totalExcludePriorityFee
              )
          );

          // console.log(tempPrice);
          setShippingDetails(quotationData);
          // setTotalOrderPrice(
          //   parseInt(subTotalPrices) + parseInt(shippingPrice)
          // );
        } catch (error) {
          console.error("Error creating quotation:", error.message);
        }
      }, 2000); // Simulate a 2-second delay
    } catch (error) {
      console.error("Error fetching address data:", error);
    }
  };

  const addAddress = async () => {
    try {
      AxiosInstance.post(`address/`, {
        user_id: loggedInUser.user_id,
        phone:  "+639345678901",
        address: "asdfasfdsfd random lorem ipsum",
        name: "random namessssssss",
        default: false,
      }).then((res) => {
        console.log(res, res.data);
        getCartData();
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleReset = () => {
    reset(); // Call reset function to clear form state and errors
  };
  //!

  //! usePlaces
  const [searchOriginLatitude, setSearchOriginLatitude] = useState(56);
  const [searchOriginLongtitude, setSearchOriginLongtitude] = useState(23);

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    apiKey: "AIzaSyBOMdigs7wUPHJpS_WKReoXSuSXXprE8D0",
    callbackName: "AIzaSyBOMdigs7wUPHJpS_WKReoXSuSXXprE8D0",
    requestOptions: { componentRestrictions: { country: "ph" } },
    debounce: 300,
  });

  const ref = useOnclickOutside(() => {
    clearSuggestions();
  });

  const handleInput = (e) => {
    setValue(e.target.value);
  };
  const handleSelect =
    ({ description }) =>
    () => {
      setValue(description, false);
      clearSuggestions();

      console.log(description, false);

      getGeocode({ address: description }).then((results) => {
        const { lat, lng } = getLatLng(results[0]);
        console.log("Coordinate: ", lat, lng);
        setSearchOriginLatitude(lat);
        setSearchOriginLongtitude(lng);
      });
    };

  useEffect(() => {

    console.log(data);
    if (searchOriginLatitude && searchOriginLongtitude) {
      console.log(
        `Retrieved ${searchOriginLatitude} and ${searchOriginLongtitude}`
      );
    }
  }, [searchOriginLatitude, searchOriginLongtitude]);

  useEffect(() => {
    console.log(location.state, "hi");
    getAddressData();
  }, []);

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li cl key={place_id} onClick={handleSelect(suggestion)}>
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });

  //!
  //? address
  const [regionData, setRegion] = useState([]);
  const [provinceData, setProvince] = useState([]);
  const [cityData, setCity] = useState([]);
  const [barangayData, setBarangay] = useState([]);

  const [regionAddr, setRegionAddr] = useState("");
  const [provinceAddr, setProvinceAddr] = useState("");
  const [cityAddr, setCityAddr] = useState("");
  const [barangayAddr, setBarangayAddr] = useState("");

  const region = () => {
    regions().then((response) => {
      setRegion(response);
    });
  };

  const province = (e) => {
    setRegionAddr(e.target.selectedOptions[0].text);
    provinces(e.target.value).then((response) => {
      setProvince(response);
      setCity([]);
      setBarangay([]);
    });
  };

  const city = (e) => {
    setProvinceAddr(e.target.selectedOptions[0].text);
    cities(e.target.value).then((response) => {
      setCity(response);
    });
  };

  const barangay = (e) => {
    setCityAddr(e.target.selectedOptions[0].text);

    const temp =
      addressValue +
      " " +
      regionAddr +
      " " +
      provinceAddr +
      " " +
      e.target.selectedOptions[0].text;
    //e.target.selectedOptions[0].text;

    setValue(temp);
    console.log(
      getGeocode({ address: temp }).then((results) => {
        const { lat, lng } = getLatLng(results[0]);
        console.log("Coordinate: ", lat, lng);
        setSearchOriginLatitude(lat);
        setSearchOriginLongtitude(lng);
      })
    );
    barangays(e.target.value).then((response) => {
      setBarangay(response);
    });
  };

  const brgy = (e) => {
    setBarangayAddr(e.target.selectedOptions[0].text);

    const temp =
      addressValue + " " + regionAddr + " " + provinceAddr + " " + cityAddr;
    //e.target.selectedOptions[0].text;

    setValue(temp);
    console.log(
      getGeocode({ address: temp }).then((results) => {
        const { lat, lng } = getLatLng(results[0]);
        console.log("Coordinate: ", lat, lng);
        setSearchOriginLatitude(lat);
        setSearchOriginLongtitude(lng);
      })
    );
  };

  useEffect(() => {
    region();
    console.log(addressData);
    console.log("try");
    getCartData();
  }, []);

  //?

  //! get Cart data

  const [cartData, setCartData] = useState([]);
  const [shopMeal, setShopMeal] = useState([]);
  const [cartMeal, setCartMeal] = useState([]);

  const getCartData = async () => {
    const temp = location.state;
    setSubTotalPrices(location.state.request.price);
    setTotalOrderPrice(
      parseInt(location.state.request.price) + parseInt(shippingPrice)
    );

    console.log(
      parseInt(location.state.request.price) + parseInt(shippingPrice)
    );
    // try {
    //   const response = await AxiosInstance.get(`cart`);
    //   const filteredData = response.data.filter(
    //     (item) => item.user_id === loggedInUser.user_id
    //   );
    //   setCartData(filteredData);

    //   // getMealData();
    // } catch (error) {
    //   console.error("Error fetching cart data:", error);
    // }
  };

  const getMealData = async () => {
    try {
      const response = await AxiosInstance.get(`shopmealplan`);

      // const filteredData = response.data;
      // filteredData.filter(
      //   (item) => item.mealplan_id == cartData[0].orders
      // );
      const filteredItems = new Set();
      const filteredData = response.data.filter((item) => {
        // Check if item.mealplan_id is present in cartData[0].orders
        if (
          cartData[0].orders &&
          cartData[0].orders.includes(item.shop_mealplan_id)
        ) {
          filteredItems.add(item); // Add item to the set
        }

        return true; // Include all items in the filtered data
      });

      // Update shopMeal state with the filtered items after the filter completes
      setShopMeal(Array.from(filteredItems));

      // setShopMeal(filteredData);
    } catch (error) {
      console.error("Error fetching meal data:", error);
    }

    // const response = await AxiosInstance.get(`shopmeal`);
    // const filteredData = response.data;

    // setShopMeal(filteredData);
    // console.log(shopMeal);
    // AxiosInstance.get(`shopmeal`).then((res) => {
    //   setShopMeal(res.data);
    //   // setShopMeal(res.data.filter((item) => item.mealplan_id == );
    // });

    // // {
    // //   cartData[0].map((item, index) => console.log(item));
    // // }
  };

  const getCartMealData = () => {};
  //!
  const setAddress = () => {
    handleClose();
  };
  //! error handling for form
  const handleChange = (event) => {
    setPayment(event.target.value);
  };

  const handleChangeShipping = (event) => {
    setShipping(event.target.value);

    switch (event.target.value) {
      case "Lalamove":
        setShippingPrice(45);
        setTotalOrderPrice(() => subTotalPrices + 45);
        return;
      case "Grab Delivery":
        setShippingPrice(105);
        setTotalOrderPrice(() => subTotalPrices + 105);
        return;
      case "Move It":
        setShippingPrice(105);
        setTotalOrderPrice(() => subTotalPrices + 105);
        return;
    }
  };

  const schema = yup.object().shape({
    //  .integer("Please enter an integer value"),
    // Other fields

    // password: yup.string().min(8).max(32).required(),

    name: yup.string().required("Name is required"),
    phone: yup.string().required("Phone is required"),
    //  street: yup.string().required("Street is required"),
    // address2: yup.string().required("Address is required"),
    postalcode: yup.string().required("Postal Code is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = async (data) => {
    try {
      AxiosInstance.post(`address/`, {
        user_id: loggedInUser.user_id,
        phone: data.phone,
        address: value,
        name: data.name,
        default: false,
        postalcode: data.postalcode,
        longi: searchOriginLatitude,
        lang: searchOriginLongtitude,

        // setSearchOriginLatitude(lat);
        // setSearchOriginLongtitude(lng);
      }).then((res) => {
        getAddressData();
        handleReset();
        setActiveTab(0);
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  const secondschema = yup.object().shape({
    payment: yup.string().required("Payment Method is required"),

    //shipping: yup.string().required("Shipping is required"),
    // .integer("Please enter an integer value"),
    // Other fields

    // password: yup.string().min(8).max(32).required(),
  });
  const {
    register: register1,
    formState: { errors: errors1 },
    handleSubmit: handleSubmit1,
    reset1,
  } = useForm({
    resolver: yupResolver(secondschema),
  });

  const onSubmitHandler1 = async (data) => {
    if (payment === "Paypal") {
      const datas = {
        user_id: loggedInUser.user_id,
        // orders: cartData[0].orders,
        date: dayjs().format("YYYY-MM-DD"),
        status: "Ordered",
        address_id: selectedAddress,
        payment: payment,
        shipping: "Lalamove",
        notes: notes,
        totalprice: parseInt(totalOrderPrice),
        shipping_price: shippingPrice,
      };

      try {
        //  const response = AxiosInstance.delete(`cart/${cartData[0].cart_id}`);

        const state = location.state;
        navigate("/paypal-payment-request", {
          state: { state, datas },
        });
      } catch (error) {
        console.log(error);
      }

      //  navigate("/paypal-payment", { state: datas });
    } else {
      let orders;
      try {
        console.log(location.state.meal.meal);
        AxiosInstance.post(`shopmealplan/`, {
          name: location.state.meal.name,
          image: location.state.meal.meal[0].meals[0].details.recipe.image,
          description: "Generated Meal",
          start_week: dayjs("2019-10-25").format("YYYY-MM-DD"),
          end_week: dayjs("2019-10-31").format("YYYY-MM-DD"),
          price: location.state.request.price,
          // shippingPrice
        }).then((res) => {
          console.log(res);
          try {
            AxiosInstance.post(`order/`, {
              user_id: loggedInUser.user_id,
              orders: [res.data.id],
              date: dayjs().format("YYYY-MM-DD"),
              status: "Ordered",
              address_id: addressData[selectedAddress].address_id,
              payment: payment,
              shipping: "Lalamove",
              notes: notes,
              totalprice: parseInt(totalOrderPrice),
              shipping_price: parseInt(shippingPrice),
              payment_details: ["Cash on Delivery", "Cash on Delivery"],
              schedule_date: [
                dayjs().startOf("week").add(1, "day").format("YYYY-MM-DD"),
                dayjs().startOf("week").add(5, "day").format("YYYY-MM-DD"),
              ],
              // shippingPrice
            }).then((res) => {
              //   try {
              console.log(res);

              // const response = AxiosInstance.delete(
              //   `cart/${cartData[0].cart_id}`
              // );//
              // navigate("/meal-plan-shop-home");
              //   } catch (error) {
              //   console.log(error);
              //    }
              //   // getAddressData();
              //   // handleReset();
              //   // setActiveTab(0);
            });

            location.state.meal.meal.map((item) =>
              item.meals.map((items) =>
                //console.log(item.Day.substring(4))

                AxiosInstance.post(`shopmeal/`, {
                  mealplan_id: res.data.id,
                  type: items.Meal,
                  calories: Math.floor(items.details.recipe.calories),
                  fat: Math.floor(items.details.recipe.digest[0].daily),
                  protein: Math.floor(items.details.recipe.digest[2].daily),
                  carbs: Math.floor(items.details.recipe.digest[1].daily),
                  food: items.details.recipe.label,
                  image: items.details.recipe.image,
                  day: item.Day.substring(4),
                  // shippingPrice
                }).then((res) => {
                  console.log(res);
                })
              )
            );
            console.log(location.state.request.request_id);
            AxiosInstance.delete(
              `requestedmeals/${location.state.request.request_id}`
            ).then((res) => {
              console.log(res);
            });
            navigate("/meal-plan-shop-home");
          } catch (error) {
            console.log(error);
          }
        });
      } catch (error) {
        console.log(error);
      }
    }

    // console.log(payment);
    // navigate(
    //   data.payment === "Paypal"
    //     ? "/user-home"
    //     : data.payment === "GCash"
    //     ? "/user-home"
    //     : "/meal-plan-shop-home"
    // );
  };

  //!
  // cartItems.map((item) => console.log(item));
  const listAddress = [
    {
      fullName: "lorem ipsum",
      address: "full randomsss addressqwe123",
      phoneNumber: "0123456",
    },
    {
      fullName: "lorem ipsum",
      address: "full random address",
      phoneNumber: "0123456",
    },
  ];

  function calculateSubTotalPrice() {
    const newTotal = shopMeal.reduce((acc, item) => acc + item.price, 0);
    return newTotal;
  }

  const [shippingPrice, setShippingPrice] = useState(0);
  // const subTotalPrices = calculateSubTotalPrice(); // Calculate total price here
  const [subTotalPrices, setSubTotalPrices] = useState(0);
  const [totalOrderPrice, setTotalOrderPrice] = useState(
    parseInt(subTotalPrices) + parseInt(shippingPrice) ||
      parseInt(subTotalPrices) + parseInt(shippingPrice)
  );

  const handleShippingChange = (event) => {
    switch (event.target.value) {
      case "Lalamove":
        setShippingPrice(45);
        setTotalOrderPrice(() => subTotalPrices + 45);
        return;
      case "Grab Delivery":
        setShippingPrice(105);
        setTotalOrderPrice(() => subTotalPrices + 105);
        return;
      case "Move It":
        setShippingPrice(105);
        setTotalOrderPrice(() => subTotalPrices + 105);
        return;
    }
    setSelectedShipping(event.target.value); // Update state on radio button change
    // Optionally, calculate and update shipping price based on selectedShipping here
  };

  // modal codes open list address
  const style = {
    maxHeight: "calc(100vh - 100px)", // Adjust padding as needed
    overflowY: "auto",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    bgcolor: "background.paper",
    border: "0",
    boxShadow: 24,
    p: 4,
    background: "#E66253",
    borderRadius: 3,
    color: "#ffffff",
  };

  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleTabChange = (event, newActiveTab) => {
    setActiveTab(newActiveTab);
  };

  useEffect(() => {
    // addNewObject();

    getCartData();
    //getAddressData();
    const tempPrice = calculateSubTotalPrice();
    // setTotalOrderPrice(parseInt(tempPrice) + parseInt(shippingPrice));
  }, []);

  useEffect(() => {
    // addNewObject();

    const tempPrice = calculateSubTotalPrice();
    // setTotalOrderPrice(parseInt(tempPrice) + parseInt(shippingPrice));
  }, [shippingPrice]);

  useEffect(() => {
    if (cartData.length > 0 && shopMeal.length === 0) {
      getMealData();
    }
  }, [cartData]);

  const tabContent = [
    {
      title: "Choose Address",
      content: (
        <div>
          <br />
          <Grid container spacing={2} sx={{ ml: 5 }}>
            <Grid xs={3}>
              <img src="/images/location white.png" />
            </Grid>
            <Grid xs={8}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Address Selection
              </Typography>
            </Grid>
          </Grid>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>

          <FormControl sx={{ ml: 15, mb: 3 }}>
            <FormLabel id="demo-radio-buttons-group-label"></FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
              {addressData.map((item, index) => (
                <FormControlLabel
                  //  onChange={() => setSelectedAddress(index)}

                  onChange={() => changeAddress(index)}
                  // onChange={() =>
                  //   setSelectedAddress(console.log(item.address_id))
                  // }
                  value={item.address}
                  control={<Radio />}
                  label={(item.Name, item.address)}
                  // onChange=
                />
              ))}
            </RadioGroup>
          </FormControl>
          <center>
            <Button
              sx={{
                background: "#ffffff",
                color: "#E66253",
                ml: 2,
                height: "100%",
                px: 2,
                borderRadius: 5,
                fontSize: "15px",
                "&:hover": {
                  backgroundColor: "#E66253",
                  color: "#ffffff",
                  border: 1,
                },
              }}
              onClick={setAddress}
            >
              CHOOSE ADDRESS
            </Button>
          </center>
        </div>
      ),
    },
    {
      title: "ADD ADDRESS",
      content: (
        <div>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <br />
            <Grid container spacing={2} sx={{ ml: 5 }}>
              <Grid xs={3}>
                <img src="/images/location white.png" />
              </Grid>
              <Grid xs={8}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Add New Address
                </Typography>
              </Grid>
            </Grid>
            <br />
            <Grid container spacing={2}>
              <Grid xs={6}>
                Full Name <br />
                <TextField
                  id="name"
                  name="name"
                  label="Full Name"
                  fullWidth
                  margin="dense"
                  {...register("name")}
                  error={errors.name ? true : false}
                />
                <Typography variant="inherit" color="textSecondary">
                  {errors.name?.message}
                </Typography>
              </Grid>
              <Grid xs={5} sx={{ ml: 4 }}>
                Phone <br />
                <TextField
                  id="phone"
                  name="phone"
                  label="Phone"
                  fullWidth
                  margin="dense"
                  {...register("phone")}
                  error={errors.phone ? true : false}
                />
                <Typography variant="inherit" color="textSecondary">
                  {errors.phone?.message}
                </Typography>
              </Grid>
            </Grid>
            <select onChange={province} onSelect={region}>
              <option disabled>Select Region</option>
              {regionData &&
                regionData.length > 0 &&
                regionData.map((item) => (
                  <option key={item.region_code} value={item.region_code}>
                    {item.region_name}
                  </option>
                ))}
            </select>
            <br />
            <select onChange={city}>
              <option disabled>Select Province</option>
              {provinceData &&
                provinceData.length > 0 &&
                provinceData.map((item) => (
                  <option key={item.province_code} value={item.province_code}>
                    {item.province_name}
                  </option>
                ))}
            </select>
            <br />
            <select onChange={barangay}>
              <option disabled>Select City</option>
              {cityData &&
                cityData.length > 0 &&
                cityData.map((item) => (
                  <option key={item.city_code} value={item.city_code}>
                    {item.city_name}
                  </option>
                ))}
            </select>
            <br />
            <select onChange={brgy}>
              <option disabled>Select Barangay</option>
              {barangayData &&
                barangayData.length > 0 &&
                barangayData.map((item) => (
                  <option key={item.brgy_code} value={item.brgy_code}>
                    {item.brgy_name}
                  </option>
                ))}
            </select>
            <Typography>Address</Typography>

            <TextField
              id="street"
              name="street"
              value={addressValue}
              onChange={handleChangeAddress}
              label="Food Street Name, Building, House No."
              placeholder="Street Name, Building, House No."
              fullWidth
              margin="dense"
              //   {...register("street")}
              // error={errors.street ? true : false}
            />
            <Typography variant="inherit" color="textSecondary">
              {errors.street?.message}
            </Typography>
            <br />
            <br />

            <APIProvider
              apiKey={API_KEY}
              onLoad={() => console.log("Maps API has loaded.")}
            >
              <div style={{ height: "400px" }}>
                {/* <Map
            defaultCenter={{ lat: 53.54992, lng: 10.00678 }}
            defaultZoom={10}
          /> */}
                <Map
                  defaultZoom={13}
                  //  defaultCenter={{ lat: 53.54992, lng: 10.00678 }}
                  center={{
                    lat: searchOriginLatitude,
                    lng: searchOriginLongtitude,
                  }}

                  // onCameraChanged={(ev: MapCameraChangedEvent) =>
                  //   console.log(
                  //     "camera changed:",
                  //     ev.detail.center,
                  //     "zoom:",
                  //     ev.detail.zoom
                  //   )
                  // }
                >
                  <Marker
                    position={{
                      lat: searchOriginLatitude,
                      lng: searchOriginLongtitude,
                    }}
                  />
                </Map>
              </div>
            </APIProvider>

            {/* <TextField
              id="address2"
              name="address2"
              label="Barangay, City"
              placeholder="Barangay, City"
              fullWidth
              margin="dense"
              {...register("address2")}
              error={errors.address2 ? true : false}
            /> */}
            {/* <Typography variant="inherit" color="textSecondary">
              {errors.address2?.message}
            </Typography> */}
            <br />
            <br />
            <TextField
              id="postalcode"
              name="postalcode"
              label="Postal Code"
              placeholder="Postal Code"
              fullWidth
              margin="dense"
              {...register("postalcode")}
              error={errors.postalcode ? true : false}
            />
            <Typography variant="inherit" color="textSecondary">
              {errors.postalcode?.message}
            </Typography>
            <br />
            <br />
            <center>
              <Button
                type="submit"
                sx={{
                  background: "#ffffff",
                  color: "#E66253",
                  ml: 2,
                  height: "100%",
                  px: 2,
                  borderRadius: 5,
                  fontSize: "15px",
                  "&:hover": {
                    backgroundColor: "#E66253",
                    color: "#ffffff",
                    border: 1,
                  },
                }}
              >
                SUBMIT
              </Button>
            </center>
          </form>
        </div>
      ),
    },
  ];

  //! paypal codes
  //TODO figure out here how yun mga nasa cart malilink to paypal I give up na muna sayo

  const clientID =
    "AXRvhS2MV7tg97f_voPhdPAUfM9_L22vwboBIZVMGsUlZQdVR4XFUT-Jk3PwhFbvkhdKK1F1_v8QYf6d";
  const clientSecret =
    "ECq1HNxPasGMTi0RCU-ei7FNK4BgKM2bnSaManCsX2XH5x3UQ8ijEQLjH46mFQRNEb_YiXYFVYjdOHrZ";
  const baseURL = "https://api-m.sandbox.paypal.com";
  const initialOptions = {
    //   clientId:
    //     "AXRvhS2MV7tg97f_voPhdPAUfM9_L22vwboBIZVMGsUlZQdVR4XFUT-Jk3PwhFbvkhdKK1F1_v8QYf6d",
    clientId:
      "AUcMPBLNq5ZPvQzgd-YTAwdx3xBdlt3HeoWHSSBkzmXpPD-SMWHxM6MYnXEFTyFmdwzLRB35Csq-rNua",
    currency: "PHP",
    intent: "capture",
  };

  async function generateAccessToken() {
    const response = await axios({
      url: baseURL + "/v1/oauth2/token",
      method: "post",
      data: "grant_type=client_credentials",
      auth: {
        username: clientID,
        password: clientSecret,
      },
    });

    return response.data.access_token;
  }

  const serverUrl = "http://localhost:5173/";
  const createOrder = async (data, actions) => {
    // console.log(process.env.BASE_URL);
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: "PHP",
            value: "0.01",
          },
        },
      ],
    });
    // return fetch(`${serverUrl}/my-server/create-paypal-order`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   // use the "body" param to optionally pass additional order information
    //   // like product skus and quantities
    //   body: JSON.stringify({
    //     product: {
    //       description: "Wood Candy Sofa",
    //       cost: "399.0",
    //     },
    //   }),
    // })
    //   .then((response) => response.json())
    //   .then((order) => order.id);
  };

  const capturePayment = async (orderId) => {};

  const onApprove = async (data, actions) => {
    // return fetch(`${serverUrl}/my-server/capture-paypal-order`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     orderID: data.orderID,
    //   }),
    // }).then((response) => response.json());

    // return actions.order.capture().then(function (details) {
    //   alert("Transaction completed by: " + "me");
    // });

    const order = await actions.order.capture();
  };

  const SubmitPayment = () => {
    const { cardFields, fields } = usePayPalCardFields();

    function submitHandler() {
      if (typeof cardFields.submit !== "function") return; // validate that `submit()` exists before using it

      cardFields
        .submit()
        .then(() => {
          // submit successful
        })
        .catch(() => {
          // submission error
        });
    }
    return <button onClick={submitHandler}>Pay</button>;
  };

  function onError() {
    // merchant code
  }
  //!

  //! lalamove test
  const [pickupLocation, setPickupLocation] = useState({});
  const [deliveryLocation, setDeliveryLocation] = useState({});
  const [goods, setGoods] = useState([]); // Array of items
  const [quotes, setQuotes] = useState([]);
  const [orderId, setOrderId] = useState(null);

  const handleGetQuotes = async () => {
    const pickupLocations = {
      latitude: 14.599512,
      longitude: 121.018872,
      // ... other pickup location details
    };

    const deliveryLocations = {
      latitude: 14.67609,
      longitude: 121.017222,
      // ... other delivery location details
    };

    const goodss = {
      description: "Documents",
      quantity: 1,
      weight: 0.5,
      // ... other goods details
    };

    setTimeout(async () => {
      try {
        const quotationData = await LalamoveApi.createQuotation(
          5,
          6,
          "fsdsdffd"
        );
      } catch (error) {
        console.error("Error creating quotation:", error.message);
      }
    }, 2000); // Simulate a 2-second delay
    // const fetchedQuotes = await LalamoveApi.getQuotes(
    //   pickupLocations,
    //   deliveryLocations,
    //   goodss
    // );
    // setQuotes(fetchedQuotes);
  };

  const handleCreateOrder = async (selectedQuote) => {
    const orderDetails = {
      // ... construct order details based on selected quote and additional information
    };
    const createdOrder = await LalamoveApi.createOrder(orderDetails);
    setOrderId(createdOrder.id);
  };

  const handleTrackOrder = async () => {
    if (orderId) {
      const orderStatus = await LalamoveApi.trackOrder(orderId);
      // Update UI based on order status
    }
  };

  // const Lalamove = require("lalamovesdks");

  // // Replace with your Lalamove API credentials for sandbox or production
  // const apiKey = "YOUR_API_KEY";
  // const apiSecret = "YOUR_API_SECRET";

  // const client = new Lalamove.Client({
  //   apiKey,
  //   apiSecret,
  //   sandbox: true, // Set to true for sandbox environment
  // });

  // const quotationData = {
  //   serviceType: "MOTORCYCLE", // Adjust based on your needs (e.g., CAR, VAN)
  //   specialRequests: ["THERMAL_BAG_1"], // Optional - adjust if needed
  //   language: "en_PH",
  //   stops: [
  //     {
  //       coordinates: {
  //         lat: 14.599512, // Latitude of Ortigas Center, Pasig City
  //         lng: 121.018872, // Longitude of Ortigas Center, Pasig City
  //       },
  //       address: "Ortigas Center, Pasig City",
  //     },
  //     {
  //       coordinates: {
  //         lat: 14.604133, // Latitude of SM Mall of Asia, Pasay City
  //         lng: 121.006311, // Longitude of SM Mall of Asia, Pasay City
  //       },
  //       address: "SM Mall of Asia, Pasay City",
  //     },
  //   ],
  //   item: {
  //     quantity: "12",
  //     weight: "LESS_THAN_3_KG",
  //     categories: ["FOOD_DELIVERY", "OFFICE_ITEM"],
  //     handlingInstructions: ["KEEP_UPRIGHT"],
  //   },
  // };

  // async function createQuotation() {
  //   try {
  //     const quotation = await client.quotations.create(quotationData);
  //     console.log("Quotation created successfully:", quotation);
  //   } catch (error) {
  //     console.error("Error creating quotation:", error);
  //   }
  // }

  // createQuotation();
  //!

  // TODO lalamove api

  const handleMapsApiLoad = () => {
    // This function will be called when the library is loaded
    console.log("Google Maps Places API loaded successfully!");
    // You can perform additional setup here if needed
  };

  const [addresss, setAddresss] = React.useState("");

  const handleChanges = (value) => {
    setAddresss(value);
  };

  const handleSelects = (value) => {
    setAddress(value);
  };

  useEffect(() => {
    // changeAddress(0);
  }, []);

  const changeAddress = (index) => {
    setSelectedAddress(index);
    setSelectedLong(addressData[index].lang);
    setSelectedLat(addressData[index].longi);

    setTimeout(async () => {
      try {
        const quotationData = await LalamoveApi.createQuotation(
          addressData[index].lang,
          addressData[index].longi,
          addressData[index].address
        );
        console.log(quotationData);
        setShippingPrice(
          quotationData?.data?.data?.priceBreakdown?.totalExcludePriorityFee
        );
        const tempPrice = calculateSubTotalPrice();
        setTotalOrderPrice(
          parseInt(tempPrice) +
            parseInt(
              quotationData?.data?.data?.priceBreakdown?.totalExcludePriorityFee
            )
        );
        setShippingDetails(quotationData);
      } catch (error) {
        console.error("Error creating quotation:", error.message);
      }
    }, 2000); // Simulate a 2-second delay
  };
  // changeAddress(1);
  return (
    <div
      className="content"
      style={{
        paddingBottom: "40px",
        marginTop: "80px",
        fontFamily: "Poppins",
        color: "#000000",
      }}
    >
      {/* <Autocomplete
        apiKey={"AIzaSyBOMdigs7wUPHJpS_WKReoXSuSXXprE8D0"}
        onPlaceSelected={(place) => {
          console.log(place);
        }}
      />
      <Autocomplete
        apiKey={"AIzaSyBOMdigs7wUPHJpS_WKReoXSuSXXprE8D0"}
        style={{ width: "90%" }}
        onPlaceSelected={(place) => {
          console.log(place);
        }}
        options={{
          types: ["(regions)"],
          componentRestrictions: { country: "ru" },
        }}
        defaultValue="Amsterdam"
      /> */}
      {/* <script
        defer
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBOMdigs7wUPHJpS_WKReoXSuSXXprE8D0&libraries=places&callback=handleMapsApiLoad"
      >
        {" "}
      </script> */}
      {/* <ScriptLoader
        src={
          "https://maps.googleapis.com/maps/api/js?key=AIzaSyBOMdigs7wUPHJpS_WKReoXSuSXXprE8D0&libraries=places&callback=handleMapsApiLoad"
        }
        verifier={() => true}
        isAsync={false}
        render={() => "Ready to render!"}
      /> */}
      {/* <input type="text" defaultValue="try" /> */}
      {/* <div ref={ref}>
        <input
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="Your Origin"
        />

        {status === "OK" && <ul>{renderSuggestions()}</ul>}
      </div> */}
      {/* <div ref={ref}>
        <input
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="Where are you going?"
        />

        {status === "OK" && <ul>{renderSuggestions()}</ul>}
      </div> */}
      {/* <div>
        <PlacesAutocomplete
          value={addresss}
          onChange={handleChanges}
          onSelect={handleSelects}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => (
            <div>
              <input
                {...getInputProps({
                  placeholder: "Enter Address...",
                })}
              />
              <div>
                {loading && <div>Loading...</div>}
                {suggestions.map((suggestion) => {
                  const style = suggestion.active
                    ? { backgroundColor: "#a83232", cursor: "pointer" }
                    : { backgroundColor: "#ffffff", cursor: "pointer" };

                  return (
                    <div {...getSuggestionItemProps(suggestion, { style })}>
                      {suggestion.description}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
      </div> */}
      {/* <APIProvider
        apiKey={API_KEY}
        onLoad={() => console.log("Maps API has loaded.")}
      >
        <div style={{ height: "400px" }}>
          <Map
            defaultCenter={{ lat: 53.54992, lng: 10.00678 }}
            defaultZoom={10}
          />
          <Map
            defaultZoom={13}
            //  defaultCenter={{ lat: 53.54992, lng: 10.00678 }}
            center={{
              lat: searchOriginLatitude,
              lng: searchOriginLongtitude,
            }}

            // onCameraChanged={(ev: MapCameraChangedEvent) =>
            //   console.log(
            //     "camera changed:",
            //     ev.detail.center,
            //     "zoom:",
            //     ev.detail.zoom
            //   )
            // }
          >
            <Marker
              position={{
                lat: searchOriginLatitude,
                lng: searchOriginLongtitude,
              }}
            />
          </Map>
        </div>
      </APIProvider> */}
      {/* <p>Address</p>
      {barangayAddr}, {cityAddr}, {provinceAddr}, {regionAddr}
      //! test google maps //! */}
      {/* //? */}
      <div>
        {/* ... input fields for pickup, delivery, goods */}
        <button onClick={handleGetQuotes}>Get Quotes</button>
        {quotes.length > 0 && (
          <div>
            {/* Display available quote options */}
            <button onClick={() => handleCreateOrder(selectedQuote)}>
              Create Order
            </button>
          </div>
        )}
        {orderId && (
          <div>
            <button onClick={handleTrackOrder}>Track Order</button>
            {orderStatus && (
              <div>
                {/* Display order status information here */}
                {/* Example: Show estimated delivery time, tracking URL, etc. */}
              </div>
            )}
          </div>
        )}
      </div>
      {/* //! */}
      <form onSubmit={handleSubmit1(onSubmitHandler1)}>
        <Typography
          sx={{ color: "#99756E", fontSize: "30px", fontWeight: "bold", m: 5 }}
        >
          CHECKOUT
        </Typography>

        <Box sx={{ borderRadius: 0, border: 1, mx: 20 }}>
          <Grid container spacing={2} sx={{ my: "20px", mx: "20px" }}>
            <Grid xs={2}>
              <img src="/images/location.png" />
            </Grid>
            <Grid
              xs={8}
              sx={{
                textAlign: "left",
                color: "#99756E",
                fontWeight: "bold",
              }}
            >
              Delivery Address
              {addressData.length === 0 ? (
                <Typography sx={{ color: "#000000" }}>Loading...</Typography>
              ) : (
                <>
                  <Typography sx={{ color: "#000000" }}>
                    {addressData[selectedAddress]?.name} |{" "}
                    {addressData[selectedAddress]?.phone} <br />
                    {addressData[selectedAddress]?.address}
                  </Typography>

                  <APIProvider
                    apiKey={API_KEY}
                    onLoad={() => console.log("Maps API has loaded.")}
                  >
                    <div style={{ height: "100px" }}>
                      {/* <Map
            defaultCenter={{ lat: 53.54992, lng: 10.00678 }}
            defaultZoom={10}
          /> */}
                      <Map
                        defaultZoom={13}
                        //  defaultCenter={{ lat: 53.54992, lng: 10.00678 }}
                        center={{
                          // lat: addressData[selectedAddress].lang,
                          // lng: addressData[selectedAddress].longi,
                          lng: addressData[selectedAddress]?.lang,
                          lat: addressData[selectedAddress]?.longi,
                        }}

                        // onCameraChanged={(ev: MapCameraChangedEvent) =>
                        //   console.log(
                        //     "camera changed:",
                        //     ev.detail.center,
                        //     "zoom:",
                        //     ev.detail.zoom
                        //   )
                        // }
                      >
                          <Marker
                              position={{
                                lng: addressData[selectedAddress]?.lang,
                                lat: addressData[selectedAddress]?.longi,
                              }}
                            />
                      </Map>
                    </div>
                  </APIProvider>
                </>
              )}
              {/* <Typography sx={{ color: "#000000" }}>
                {addressData[0].name} |{addressData[0].phone} <br />
                {addressData[0].address}
              </Typography> */}
              {/* {addressData.slice(1).map((item, index) => (
                <Typography sx={{ color: "#000000" }}>
                  {item.name} |{item.phone} <br />
                  {item.address}
                </Typography>
              ))} */}
            </Grid>

            <Grid xs={2}>
              {" "}
              <Button onClick={handleOpen}>
                <img src="/images/right outline arrow.png" />
              </Button>
              <Modal
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
              >
                <Box sx={style}>
                  <Button sx={{ float: "right" }} onClick={handleClose}>
                    <img src="/images/close.png" height="10" weight="10" />
                  </Button>
                  <Tabs
                    value={activeTab}
                    style={{
                      color: "#f00", // Change text color to red
                      fontSize: "18px", // Increase font size
                      fontWeight: "bold", // Make text bold
                    }}
                    onChange={handleTabChange}
                    indicatorColor="primary"
                    centered
                  >
                    {tabContent.map((tab, index) => (
                      <Tab
                        key={index}
                        label={tab.title}
                        style={{
                          color: "#ffffff", // Change text color to red
                          fontSize: "14px", // Increase font size
                          //fontWeight: "bold", // Make text bold
                        }}
                      />
                    ))}
                  </Tabs>
                  {tabContent.map((tab, index) => (
                    <Box key={index} hidden={activeTab !== index}>
                      {tab.content}
                    </Box>
                  ))}
                </Box>
              </Modal>
            </Grid>
          </Grid>
        </Box>
        <br />
        <Box sx={{ border: 1, borderRadius: 3, mx: 20 }}>
          {console.log(location.state)}
          <Grid container spacing={2} sx={{ mt: "20px" }}>
        <Grid xs={12} md={4}>
                    {" "}
                    <img src = {location.state.meal.meal[0].meals[0].image} width="50%" height="80%" />
                  </Grid>
                  <Grid xs={12} md={4} sx={{ textAlign: "center" }}>
                    <Typography sx={{ color: "#99756E", mt: 3 }}>
                    {location.state.meal.name}
                    </Typography>
                    <Typography sx={{ color: "#E66253", mt: "2%" }}>
                      {" "}
                      Php  {location.state.request.price}
                    </Typography>
                  </Grid>
                  <Grid xs={12} md={4} sx={{ mt: "5%" }}>
                    {/* x {item.quantity} */}
                  </Grid>
                  </Grid>
       

         
          {/* {shopMeal.map((item, index) => (
            <Grid container spacing={2} sx={{ mt: "20px" }}>
              <Grid xs={4}>
                {" "}
                <img src={item.image} width="150" height="180" />
              </Grid>
              <Grid xs={4} sx={{ textAlign: "left" }}>
                <Typography sx={{ color: "#99756E", mt: 3 }}>
                  {item.name}
                </Typography>
                <Typography sx={{ color: "#E66253", mt: "12%" }}>
                  {" "}
                  Php {item.price}
                </Typography>
              </Grid>
              <Grid xs={4} sx={{ mt: "5%" }}>
                x {item.quantity}
              </Grid>
            </Grid>
          ))} */}
          <br />
          <br />

          <Box sx={{ mx: 5 }}>
            <Typography sx={{ textAlign: "left", color: "#99756E" }}>
              Order Notes (Optional)
            </Typography>
            <TextField
              id="outlined-multiline-flexible"
              sx={{ width: "100%", background: "#ffffff", borderRadius: 2 }}
              multiline
              rows={4}
              placeholder="Type message here"
              onChange={(event) => setNotes(event.target.value)}
            />
          </Box>
        </Box>

        <br />

        <Box sx={{ textAlign: "left", border: 1, mx: 20, color: "#99756E" }}>
          <Typography
            sx={{ ml: 5, mt: 5, color: "#99756E", fontWeight: "bold" }}
          >
            PAYMENT OPTION{" "}
          </Typography>
          <br />
          {/* <PayPalScriptProvider options={initialOptions}>
            <PayPalPayment /> 
          </PayPalScriptProvider>   clientId:
      "AXRvhS2MV7tg97f_voPhdPAUfM9_L22vwboBIZVMGsUlZQdVR4XFUT-Jk3PwhFbvkhdKK1F1_v8QYf6d",
    */}

          <PayPalScriptProvider options={initialOptions}>
            <PayPalButtons
              createOrder={(data, actions) => createOrder(data, actions)}
              onApprove={(data, actions) => onApprove(data, actions)}
            />
          </PayPalScriptProvider>

          {/* <PayPalScriptProvider
            options={{
              clientId:
                "AXRvhS2MV7tg97f_voPhdPAUfM9_L22vwboBIZVMGsUlZQdVR4XFUT-Jk3PwhFbvkhdKK1F1_v8QYf6d",
              components: "card-fields",
            }}
          >
            {" "}
            <PayPalCardFieldsProvider
              createOrder={createOrder}
              onApprove={onApprove}
              onError={onError}
            >
              <PayPalNameField />
              <PayPalNumberField />
              <PayPalExpiryField />
              <PayPalCVVField />

              <SubmitPayment />
            </PayPalCardFieldsProvider>
          </PayPalScriptProvider> */}
          <FormControl sx={{ ml: 15, mb: 3 }}>
            <FormLabel id="demo-radio-buttons-group-label">
              Payment Method
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="payment"
              value={payment} // Use the state variable for value
              onChange={handleChange}
              error={errors1.payment ? true : false}
            >
              <FormControlLabel
                value="Cash on Delivery"
                control={<Radio />}
                label="Cash on Delivery"
                onChange={handleChange}
                {...register1("payment")} // Pass register to each Radio button
                error={errors1.payment ? true : false}
              />
              <FormControlLabel
                value="Paypal"
                control={<Radio />}
                label="Paypal"
                onChange={handleChange}
                {...register1("payment")}
                error={errors1.payment ? true : false}
              />
              {/* <FormControlLabel
                value="GCash"
                control={<Radio />}
                label="GCash"
                onChange={handleChange}
                {...register1("payment")}
                error={errors1.payment ? true : false}
              /> */}
            </RadioGroup>
            <Typography variant="inherit" color="textSecondary">
              {errors1.payment?.message}
            </Typography>
          </FormControl>
          <Button type="submit">Submit</Button>
        </Box>
        <br />
        <br />
        <Box sx={{ border: 1, mx: 20, color: "#99756E", fontSize: "20px" }}>
          <Typography
            sx={{
              color: "#99756E",
              fontWeight: "bold",
              my: 5,
              fontSize: "30px",
            }}
          >
            PAYMENT DETAILS
          </Typography>
          <hr />
          <br />
          <Grid container spacing={2} sx={{ my: 5 }}>
            {" "}
            <Grid xs={6}>ORDER SUBTOTAL</Grid>
            <Grid xs={6}>Php {subTotalPrices}</Grid>
          </Grid>

          <hr />
          <br />
          <Grid container spacing={2} sx={{ my: 5 }}>
            {" "}
            <Grid xs={6}>
              SHIPPING DETAILS <br />
              Courier: Lalamove
            </Grid>
            <Grid xs={6}>
              Base Rate: {shippingDetails?.data?.data?.priceBreakdown?.base}
              <br />
              Extra Mileage:{" "}
              {shippingDetails?.data?.data?.priceBreakdown?.extraMileage}
              <br />
              Total:{" "}
              {
                shippingDetails?.data?.data?.priceBreakdown
                  ?.totalExcludePriorityFee
              }
              {/* <FormControl sx={{ ml: 15, mb: 3 }}>
                <FormLabel id="demo-radio-buttons-group-label">
                  Shipping/Delivery
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="shipping"
                  value={shipping} // Use the state variable for value
                  onChange={handleChangeShipping}
                  error={errors1.shipping ? true : false}
                >
                  <FormControlLabel
                    value="Grab Delivery"
                    control={<Radio />}
                    label="Grab Delivery"
                    onChange={handleChangeShipping}
                    {...register1("shipping")}
                    error={errors1.shipping ? true : false}
                  />
                  <FormControlLabel
                    value="Lalamove"
                    control={<Radio />}
                    label="Lalamove"
                    onChange={handleChangeShipping}
                    {...register1("shipping")}
                    error={errors1.shipping ? true : false}
                  />
                  <FormControlLabel
                    value="Move It"
                    control={<Radio />}
                    label="Move It"
                    onChange={handleChangeShipping}
                    {...register1("shipping")}
                    error={errors1.shipping ? true : false}
                  />
                </RadioGroup>
                <Typography variant="inherit" color="textSecondary">
                  {errors1.shipping?.message}
                </Typography>
              </FormControl> */}
            </Grid>
          </Grid>
          <hr />
          <br />
          <Grid container spacing={2} sx={{ my: 5 }}>
            {" "}
            <Grid xs={6}>SHIPPING FEE</Grid>
            <Grid xs={6}>Php {shippingPrice}</Grid>
          </Grid>
          <br />

          <Grid container spacing={2}>
            {" "}
            <Grid xs={6}>TOTAL</Grid>
            <Grid xs={6}>Php {totalOrderPrice}</Grid>
          </Grid>
        </Box>
        <br />
        <br />

        {/* <Link to={"/meal-plan-shop-home"}> */}
        <Button
          // onClick={() => placeOrder()}
          type="submit"
          sx={{
            background: "#E66253",
            color: "#ffffff",
            ml: 2,
            height: "100%",
            px: 2,
            fontSize: "15px",
            "&:hover": {
              backgroundColor: "#ffffff",
              color: "#E66253",
              border: 1,
            },
          }}
        >
          {" "}
          PLACE ORDER
        </Button>
        {/* </Link> */}
      </form>
    </div>
  );
}

export default MealPlanShopRequestCheckout;
