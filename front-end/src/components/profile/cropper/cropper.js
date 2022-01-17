import React from "react";

import Cropper from "react-easy-crop";
import './cropper.css'
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
// import CancelIcon from "@material-ui/icons/Cancel";
import getCroppedImg, { generateDownload } from "../utils/cropImage";
import { dataURLtoFile } from "../utils/dataURLtoFile";
import { IconButton, makeStyles, TableBody } from "@material-ui/core";



import axios from "axios";

// const useStyles = makeStyles({
//     iconButton: {},
//     cancelIcon: {},
// })
const useStyles = makeStyles({
    iconButton: {
        position: "absolute",
        top: "20px",
        right: "20px",
    },
    cancelIcon: {
        color: "#00a3c8",
        fontSize: "50px",
        "&:hover": {
            color: "red",
        },
    },
});

export default function RenderCropper({ handleCropper }) {
    const classes = useStyles();


    const isAuth = () => {

        if (localStorage.getItem("user-info")) {
            return JSON.parse(localStorage.getItem("user-info"));
        } else {
            return false;
        }
    }
    const id = isAuth() ? isAuth().id : '';

    //   const [data, setData] = useState([]);

    //   useEffect(async () => {
    //     const result = await axios(
    //       process.env.REACT_APP_SERVER_URL + "/customers/" + id
    //     );
    //     setData(result.data);
    //   });

    //   const [state, setState] = useState({
    //     image: null,
    //   });

    // const classes = useStyles();

    const inputRef = React.useRef();

    const triggerFileSelectPopup = () => inputRef.current.click();

    // const setStateSnackbarContext = React.useContext(SnackbarContext);

    const [image, setImage] = React.useState(null);
    const [croppedArea, setCroppedArea] = React.useState(null);
    const [crop, setCrop] = React.useState({ x: 0, y: 0 });
    const [zoom, setZoom] = React.useState(1);
    const [formErrors, setFormErrors] = React.useState("");

    const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
        setCroppedArea(croppedAreaPixels);
    };

    const onSelectFile = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            const reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            reader.addEventListener("load", () => {
                setImage(reader.result);
            });
        }
    };

    const onDownload = () => {
        // if (!image)
        //     return setStateSnackbarContext(
        //         true,
        //         "Please select an image!",
        //         "warning"
        //     );

        generateDownload(image, croppedArea);
    };

    const onClear = () => {
        // if (!image)
        //     return setStateSnackbarContext(
        //         true,
        //         "Please select an image!",
        //         "warning"
        //     );

        setImage(null);
    };

    const onUpload = async () => {
        // if (!image)
        //     return setStateSnackbarContext(
        //         true,
        //         "Please select an image!",
        //         "warning"
        //     );

        const canvas = await getCroppedImg(image, croppedArea);
        const canvasDataUrl = canvas.toDataURL("image/jpeg");
        const convertedUrlToFile = dataURLtoFile(
            canvasDataUrl,
            "cropped-image.jpeg"
        );
        // console.log(convertedUrlToFile);
        try {
            const formData = new FormData();
            formData.append('files', convertedUrlToFile);
            let res;
            console.log(formData);
            await axios.post(process.env.REACT_APP_SERVER_URL + "/upload", formData)
                .then((response) => {
                    console.log(response);
                    res = response;
                });
            console.log(res?.data[0]._id);



            await axios.put(process.env.REACT_APP_SERVER_URL + "/customers/" + id, {
                avatar: res?.data[0]._id
            }).then((response) => {
                console.log(response);
            });
        } catch (err) {
            console.warn(err);
        }
    };

    return (
        <div className='container container-cropmain'>

            <button className={classes.iconButton}
                onClick={handleCropper}
                style={{ "marginTop": "100px", "textAlign": "right", "fontSize": "220%" }}>

                <i class="fas fa-window-close"></i>

            </button>

            <div className='container-cropper'>
                {image ? (
                    <>
                        <div className='cropper'>
                            <Cropper
                                image={image}
                                crop={crop}
                                zoom={zoom}
                                aspect={1}
                                onCropChange={setCrop}
                                onZoomChange={setZoom}
                                onCropComplete={onCropComplete}
                            />
                        </div>

                        <div className='slider'>
                            <Slider
                                min={1}
                                max={3}
                                step={0.1}
                                value={zoom}
                                onChange={(e, zoom) => setZoom(zoom)}
                            />
                        </div>
                    </>
                ) : null}
            </div>

            <div className='container-buttons'>

                <input
                    type='file'
                    accept='image/*'
                    ref={inputRef}
                    onChange={onSelectFile}
                    style={{ display: "none" }}
                />

                <Button
                    onClick={() => onClear()}
                    variant='contained'
                    // class="btn btn-success"
                    // color='primary' 
                    style={{ marginRight: "10px" }}
                >
                    <div style={{ 'marginRight': '13px' }}>
                        CLEAR
                    </div>
                </Button>
                <Button
                    variant='contained'
                    // color='primary'
                    onClick={triggerFileSelectPopup}
                    style={{ marginRight: "10px" }}
                >
                    <div style={{ 'marginRight': '15px' }}>
                        Choose
                    </div>
                </Button>
                <Button variant='contained'
                    //  color='secondary' 
                    onClick={onDownload} style={{ marginRight: "10px" }}>
                    <div style={{ 'marginRight': '13px' }}>
                        Download
                    </div>
                </Button>
                <Button variant='contained'
                    onClick={onUpload}
                // color='secondary'
                >
                    <div style={{ 'marginRight': '13px' }}>
                        UPLOAD
                    </div>
                </Button>

            </div>
        </div>
    );
}
