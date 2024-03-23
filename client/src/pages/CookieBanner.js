import React, { useState } from "react";
import Cookies from "js-cookie";

const CookieBanner = () => {
  const [acceptedCookies, setAcceptedCookies] = useState(
    Cookies.get("cookiesAccepted")
  );

  const acceptCookies = () => {
    Cookies.set("cookiesAccepted", "true", { expires: 365 });
    setAcceptedCookies(true);
  };

  if (acceptedCookies) {
    return null;
  }

  return (
    <div className="cookie-banner">
      <p>
        Ce site utilise des cookies. Acceptez-vous l'utilisation des cookies ?
      </p>
      <button onClick={acceptCookies}>Accepter</button>
    </div>
  );
};

export default CookieBanner;
