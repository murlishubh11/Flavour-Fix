import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import Header from "./components/Header";
import Chef from "./components/Chef";
import Cashier from "./components/Cashier";
import ReviewForm from "./components/ReviewForm";
import "./index.css";
import Newchef from "./components/Newchef";
import heroImage from "./img/hero.png";
import backgroundImage from "./img/bg-hero.jpg";
import Image from "./img/image.png";

export default function App() {
  const { isLoggedIn } = useAuth();

  return (
    <div className="App p-0">
      <Header />
      <div>
        <Router>
          <Switch>
            <Route path="/givereview">
              <ReviewForm />
            </Route>
          </Switch>
        </Router>
      </div>

      {isLoggedIn ? <LoggedInText /> : <LoggedOutText />}
    </div>
  );
}

const LoggedInText = () => {
  const { account } = useAuth();

  return (
    <div className="p-0">
      {account.role === "admin" && <Cashier />}
      {account.role === "user" ? (
        <Newchef cookstyle={account.cookstyle} />
      ) : null}
      {/* {account.role === 'user' ? <Chef /> : null} */}
    </div>
  );
};
const LoggedOutText = () => {
  return (
    <>
      <head>
        {/* <Cashier/> */}
      </head>
      <body className="bg-gray-100">
      
        <section
          className="relative overflow-hidde bg-cover bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div class="absolute inset-0 bg-slate-900 opacity-90 z-10 shadow-md"></div>
          <div class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
            <div class="lg:flex-grow md:w-1/2 relative z-10 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
              <h1 class="title-font sm:text-4xl text-3xl text-left font-bold mb-4 font-medium text-white font-sans ">
              Seamless collaboration 
                <br class="hidden lg:inline-block" />
                <div class="text-white text-3xl font-semibold">
                Best dining experience ever
                </div>
              </h1>
              <p class="mb-8 leading-relaxed text-white">
                Pick your forks and get ready 
              </p>

              <div class="flex justify-center">
                <button class="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                  Button
                </button>
                {/* <button class="ml-4 inline-flex text-gray-400 bg-gray-800 border-0 py-2 px-6 focus:outline-none hover:bg-gray-700 hover:text-white rounded text-lg"> */}
                  {/* Button */}
                {/* </button> */}
              </div>
            </div>
            <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
              <img
                className=" px-11 relative object-cover object-center rounded z-10   "
                alt="hero"
                src={heroImage}
              />
            </div>
          </div>
        </section>
      </body>
    </>
  );
};
