import React, { Component } from "react";
import CardInfo from "./card.info";
import Infor from "./infor";
import ChangePassword from "./change.password";
import MyOrder from "./viewOrder";
import ChangeInfo from "./change.info";
import { useEffect, useState } from "react";
import Header from "../header/header";
import Footer from "../footer/footer";
import axios from "axios";

import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
// import CameraAltIcon from "@material-ui/icons/CameraAlt";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import RenderCropper from "./cropper/cropper";

import { getUserInfo } from "../../services/customerService";

const useStyles = makeStyles((theme) => ({

  root: {
    display: "flex",
  },
  paper: {
    marginRight: theme.spacing(2),
  },
  cameraIcon: {
    height: "60px",
    fontSize: "25px",
    position: "relative",
    marginLeft: "75%",
    marginTop: "-50%",
    backgroundColor: "white",
    borderRadius: "50%",
    width: "30px",
    "&:hover": {
      backgroundColor: "white",
    },
  },

  queen: {

    height: "50px",
    fontSize: "25px",

    position: "relative",
    marginLeft: "45%",
    fontSize: "300%",
    transform: "rotate(37deg)",
    color: "yellow",
  }
}));

export default function Profile(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const [avatar, setAvatar] = React.useState("");

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const [showCropper, setShowCropper] = React.useState(false);
  const handleCropper = () => setShowCropper((prevValue) => !prevValue);

  const [status, setStatus] = useState(0);

  const displayCheck = () => {
    if (status === 0) {
      return <Infor />;
    } else if (status === 1) {
      return <ChangeInfo />;
    } else if (status == 2) {
      return <ChangePassword />;
    } else {
      return <MyOrder />;
    }
  };
  const isAuth = () => {
    if (localStorage.getItem("user-info")) {
      return JSON.parse(localStorage.getItem("user-info"));
    } else {
      return false;
    }
  };
  const id = isAuth() ? isAuth().id : "";
  const [loyal, setLoyal] = useState(false);
  useEffect(async () => {
    const result = await axios(
      process.env.REACT_APP_SERVER_URL + "/customers/getLoyal/" + id
    );
    console.log("loyal" + result.data);
    setLoyal(result.data, () => { console.log(loyal) });
    console.log("loyal" + loyal);
  }, []);

  const [data, setData] = useState([]);

  useEffect(async () => {

    // const resultt = await axios(
    //   process.env.REACT_APP_SERVER_URL + "/customers/getLoyal/" + id
    // );
    // console.log("loyal" + resultt.data);
    // setLoyal(resultt.data);

    const result = await axios(
      process.env.REACT_APP_SERVER_URL + "/customers/" + id
    );
    setData(result.data);
  }, [data]);


  const handleRemoveAvatar = async () => {

    try {
      await axios.delete(process.env.REACT_APP_SERVER_URL + "/upload/files/" + data.avatar._id).then((response) => {
        console.log(response);
      });
    } catch (err) {
      console.warn(err);
    }
  };

  if (loyal) {
    return (
      <div>
        <Header />
        <div className="profile">
          <div className="row justify-content-center">
            <div className="col-md-3 col-sm-6 col-xs-12 card-info">
              <div>
                <div className={classes.queen}>
                  <i class="fas fa-crown"></i>
                </div>
                <div className="avatar">
                  <img
                    className="card-avatar rounded-circle mb-4"
                    src={
                      data?.avatar?.url
                        ? process.env.REACT_APP_SERVER_URL + data?.avatar?.url
                        : (isAuth().gender == "Male" ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZWD0TQ9XGBl9RL_wGTfib6U7S4pAz6I98MyySh59epBK7xv_h0yBscGKzk4OD9_sUaJc&usqp=CAU" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz4K_mIw-8wEuEdqQ88J9qfamhXsHovW_qZkB8TzlRmNxp1O6H6J9W84LU-gr1nImZiOc&usqp=CAU")
                    }
                    alt="Card_image"
                    style={{ width: "100%" }}
                  />
                </div>

                <Button
                  className={classes.cameraIcon}
                  ref={anchorRef}
                  aria-controls={open ? "menu-list-grow" : undefined}
                  aria-haspopup="true"
                  onClick={handleToggle}
                >
                  <i class="fas fa-camera" style={{ "top": "25%", "fontSize": "120%", "marginRight": "-4px" }}></i>
                </Button>

                <Popper
                  open={open}
                  anchorEl={anchorRef.current}
                  role={undefined}
                  transition
                  disablePortal
                >
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      style={{
                        transformOrigin:
                          placement === "bottom"
                            ? "center top"
                            : "center bottom",
                      }}
                    >
                      <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                          <MenuList
                            autoFocusItem={open}
                            id="menu-list-grow"
                            onKeyDown={handleListKeyDown}
                          >

                            <MenuItem
                              onClick={(event) => {
                                handleCropper();
                                handleClose(event);
                              }}
                            >
                              Change
                            </MenuItem>
                            <MenuItem onClick={handleRemoveAvatar}>Remove</MenuItem>
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>

                <h4 className="text-center">{isAuth().username}</h4>
              </div>
              <div className="card-body">
                <div className="row list-change">
                  <li>
                    {/* <i className="fas fa-user-edit" />{" "} */}
                    <a href="#!" onClick={() => setStatus(1)}>
                      {" "}
                      Change information{" "}
                    </a>{" "}
                  </li>
                  <li>
                    {/* <i className="fas fa-lock"> </i>{" "} */}
                    <a href="#" onClick={() => setStatus(2)}>
                      {" "}
                      Change password{" "}
                    </a>{" "}
                  </li>
                  <li>
                    {/* <i className="fas fa-file-alt" />{" "} */}
                    <a href="#!" onClick={() => setStatus(3)}>
                      {" "}
                      My orders{" "}
                    </a>{" "}
                  </li>
                </div>
              </div>
            </div>
            <div className="col-1 vertical-line"></div>

            {displayCheck()}
          </div>
        </div>
        {showCropper && (
          <RenderCropper handleCropper={handleCropper} setAvatar={setAvatar} />
        )}

        <Footer />
      </div>
    );
  } else {
    return (
      <div>
        <Header />
        <div className="profile">
          <div className="row justify-content-center">
            <div className="col-md-3 col-sm-6 col-xs-12 card-info">
              <div>
                <div className="avatar">
                  <img
                    className="card-avatar rounded-circle mb-4"
                    src={
                      data?.avatar?.url
                        ? process.env.REACT_APP_SERVER_URL + data?.avatar?.url
                        : (isAuth().gender == "Male" ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZWD0TQ9XGBl9RL_wGTfib6U7S4pAz6I98MyySh59epBK7xv_h0yBscGKzk4OD9_sUaJc&usqp=CAU" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz4K_mIw-8wEuEdqQ88J9qfamhXsHovW_qZkB8TzlRmNxp1O6H6J9W84LU-gr1nImZiOc&usqp=CAU")
                    }
                    alt="Card_image"
                    style={{ width: "100%" }}
                  />
                </div>
                <Button
                  className={classes.cameraIcon}
                  ref={anchorRef}
                  aria-controls={open ? "menu-list-grow" : undefined}
                  aria-haspopup="true"
                  onClick={handleToggle}
                >
                  <i class="fas fa-camera" style={{ "top": "25%", "fontSize": "120%", "marginRight": "-4px" }}></i>
                </Button>
                <Popper
                  open={open}
                  anchorEl={anchorRef.current}
                  role={undefined}
                  transition
                  disablePortal
                >
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      style={{
                        transformOrigin:
                          placement === "bottom"
                            ? "center top"
                            : "center bottom",
                      }}
                    >
                      <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                          <MenuList
                            autoFocusItem={open}
                            id="menu-list-grow"
                            onKeyDown={handleListKeyDown}
                          >
                            <MenuItem
                              onClick={(event) => {
                                handleCropper();
                                handleClose(event);
                              }}
                            >
                              Change
                            </MenuItem>
                            <MenuItem onClick={handleRemoveAvatar}>Remove</MenuItem>
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>

                <h4 className="text-center">{isAuth().username}</h4>
              </div>
              <div className="card-body">
                <div className="row list-change">
                  <li>
                    {/* <i className="fas fa-user-edit" />{" "} */}
                    <a href="#!" onClick={() => setStatus(1)}>
                      {" "}
                      Change information{" "}
                    </a>{" "}
                  </li>
                  <li>
                    {/* <i className="fas fa-lock"> </i>{" "} */}
                    <a href="#" onClick={() => setStatus(2)}>
                      {" "}
                      Change password{" "}
                    </a>{" "}
                  </li>
                  <li>
                    {/* <i className="fas fa-file-alt" />{" "} */}
                    <a href="#!" onClick={() => setStatus(3)}>
                      {" "}
                      My orders{" "}
                    </a>{" "}
                  </li>
                </div>
              </div>
            </div>
            <div className="col-1 vertical-line"></div>

            {displayCheck()}
          </div>
        </div>
        {showCropper && (
          <RenderCropper handleCropper={handleCropper} setAvatar={setAvatar} />
        )}

        <Footer />
      </div>
    );
  }
}
