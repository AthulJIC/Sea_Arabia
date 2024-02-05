import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

// export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [item, setItem] = React.useState(null);
  const [list, setList] = React.useState(null);
  const [title, setTitle] = React.useState(null);
  const [details, setDetails] = React.useState(null);
  const [hour, setHour] = React.useState(null);
  const [date, setDate] = React.useState(null);
  const [hourRange, setHourRange] = useState(null);
  const [couponList, setCouponList] = useState(null);
  const [coupon, setCoupon] = useState(null);
  const [bestDeals, setBestDeals] = useState(null);
  const [paymentUrl, setPaymentUrl] = useState(null);
  const [notification, setNotification] = useState(null);
  const [bookingId, setBookingId] = useState(null);
  const [rating, setRating] = useState(null);
  const [ service, setService] = useState(null);

  const updateItem = (newItem) => {
    setItem(newItem);
  };

  const updateList = (newList) => {
     setList(newList);
  }
  const updateTitle = (newList) => {
    setTitle(newList);
  }
  const updateDetails = (newItem) => {
    setDetails(newItem);
  }
  const updateHour = (newItem) => {
    setHour(newItem);
  }
  const updateDate = (newItem) => {
    setDate(newItem);
  }
  const updateHourRange = (newItem) => {
    setHourRange(newItem);
  }
  const updateCouponList = (newItem) => {
    setCouponList(newItem);
  }
  const updateCoupon = (newItem) => {
    setCoupon(newItem);
  }
  const bestDealsItem = (newItem) => {
    setBestDeals(newItem);
  }
  const updateUrl = (newItem) => {
    setPaymentUrl(newItem);
  }
  const updateNotification = (newItem) => {
    setNotification(newItem);
  }
  const updateBookingId = (newItem) => {
    setBookingId(newItem);
  }
  const updateRating = (newItem) => {
    setRating(newItem);
  }
  const updateBookingService = (newItem) => {
    setService(newItem);
  }
  return (
    <AppContext.Provider
        value={{ item,
           updateItem, 
           list,
           updateList, 
           title, 
           updateTitle,
           details,
           updateDetails,
           hour,
           updateHour,
           date,
           updateDate,
           hourRange,
           updateHourRange,
           couponList,
           updateCouponList,
           coupon,
           updateCoupon,
           bestDeals,
           bestDealsItem,
           updateUrl,
           paymentUrl,
           notification,
           updateNotification,
           bookingId,
           updateBookingId,
           updateRating,
           rating,
           updateBookingService,
           service
           }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useItem must be used within an ItemProvider');
  }
  return context;
};
