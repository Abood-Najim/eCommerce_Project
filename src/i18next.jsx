import React from "react";
import { createRoot } from 'react-dom/client';
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
i18n
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      en: {
        translation: {
          "Home": "Home",
          "Cart": "Cart",
          "Login": "Login",
          "Logout": "Logout",
          "Register": "Register",
          "Categories": "Categories",
          "Products": "Products",
          "Clear Cart":"Clear Cart",
          "Product Name":"Product Name",
          "Price":"Price",
          "Quantity":"Quantity",
          "Total":"Total",
          "Actions":"Actions",
          "Proceed To Checkout" : "Proceed To Checkout",
          "Continue Shopping" : "Continue Shopping",
          "Visa" : "Visa",
          "Cash" : "Cash",
          "Pay Now" : "Pay Now",
          "Payment Method" : "Payment Method",
        }
      },
      ar: {
        translation: {
          "Home": "الرئيسية",
          "Cart": "السلة",
          "Login": "تسجيل الدخول",
          "Logout": "تسجيل الخروج",
          "Register": "انشاء حساب",
          "Categories": "التصنيفات",
          "Products": "المنتجات",
          "Clear Cart":"حذف جميع السلة",
          "Product Name":"اسم المنتج",
          "Price":"السعر",
          "Quantity":"الكمية",
          "Total":"السعر الكلي",
          "Actions":"تعديلات",
          "Proceed To Checkout" : "الانتقال الى صفحة الدفع",
          "Continue Shopping" : "اكمل تصفح",
          "Visa" : "بطاقة بنك(فيزا)",
          "Cash" : "الدفع المباشر عند الوصول",
          "Pay Now" : "ادفع الان",
          "Payment Method" : "طريقة الدفع",
        }
      }
    },
    fallbackLng: "en",

  });
  export default i18n;