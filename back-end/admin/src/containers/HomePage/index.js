import React, { memo } from "react";
import { auth } from "strapi-helper-plugin";
import LOGO from "../../assets/images/logo.png";

const HomePage = ({ global: { plugins }, history: { push } }) => {
  const name = auth?.getUserInfo();

  return (
    <>
      {/* <Container className="container-fluid"> */}
      <div className="image col-12">
        <img
          // style={{ objectFit: "contain" }}
          src={LOGO}
          alt=""
        />
      </div>
      {/* </Container> */}
    </>
  );
};

export default memo(HomePage);
