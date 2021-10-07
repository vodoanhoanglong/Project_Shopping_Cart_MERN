import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import instagram from "../../assets/instagram.png";
import founder from "../../assets/founder.png";
import overlap from "../../assets/overlap.png";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
}));

const Information = () => {
  const classes = useStyles();

  return (
    <div className="container-contact">
      <div className="contact-info animate__animated animate__fadeInLeft animate__delay-1s">
        <div>
          <h1 className="info-shop animate__animated animate__fadeInLeft">
            Thank you for visited my shop
          </h1>
        </div>
        <br />
        <div className="social-contact">
          <h2 className="animate__animated animate__jackInTheBox">
            Contact Us:
          </h2>
          <a
            href="https://www.facebook.com/hoanglong.vodoan"
            className="info-social animate__animated animate__fadeInRightBig"
            target="_blank"
            rel="noreferrer noopener"
          >
            <img
              src="https://uploads-ssl.webflow.com/5f8e599accd4f6d790fd26f9/5f9bed3e3680650b13534e44_facebook-2.svg"
              alt=""
            />
          </a>
          <a
            href="https://www.instagram.com/vdhglg/"
            className="info-social animate__animated animate__fadeInRightBig"
            target="_blank"
            rel="noreferrer noopener"
          >
            <img src={instagram} alt="" />
          </a>
          <a
            href="https://twitter.com/HoangLongUTX2"
            className="info-social animate__animated animate__fadeInRightBig"
            target="_blank"
            rel="noreferrer noopener"
          >
            <img
              src="https://uploads-ssl.webflow.com/5f8e599accd4f6d790fd26f9/609e33fd2d73c211f18d27ac_twitter.svg"
              alt=""
            />
          </a>
          <a
            href="https://www.linkedin.com/in/v%C3%B5-%C4%91o%C3%A0n-ho%C3%A0ng-long-795107215/"
            className="info-social animate__animated animate__fadeInRightBig"
            target="_blank"
            rel="noreferrer noopener"
          >
            <img
              src="https://uploads-ssl.webflow.com/5f8e599accd4f6d790fd26f9/5f9bed3ea3ae890bf4bf081d_linkedin-2.svg"
              alt=""
            />
          </a>
        </div>
      </div>
      <div className="founder">
        <div className="founder-info">
          <img
            src={overlap}
            alt=""
            className="blob-img animate__animated animate__rotateIn"
          />
          <img
            alt=""
            src={founder}
            style={{ animationDelay: "1s", animationDuration: "1.5s" }}
            className="img-founder animate__animated animate__bounceInUp"
          />
          <h3 className="animate__animated animate__zoomIn">
            <b style={{ lineHeight: "2" }}>Founder</b>
            <p>Hoang Long</p>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Information;
