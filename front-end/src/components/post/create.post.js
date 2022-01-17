import React from "react";
import Header from "../header/header";
import Footer from "../footer/footer";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { createPostAPI } from "../../services/postService";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "ckeditor-build-with-simple-upload-provider-strapi";
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ReactHtmlParser from "react-html-parser";
import axios from "axios";
require("dotenv").config();

class MyUploadAdapter {
  constructor(loader) {
    // The file loader instance to use during the upload.
    this.loader = loader;
  }

  // Starts the upload process.
  upload() {
    return this.loader.file.then(
      (file) =>
        new Promise((resolve, reject) => {
          this._initRequest();
          this._initListeners(resolve, reject, file);
          this._sendRequest(file);
        })
    );
  }

  // Aborts the upload process.
  abort() {
    if (this.xhr) {
      this.xhr.abort();
    }
  }

  // Initializes the XMLHttpRequest object using the URL passed to the constructor.
  _initRequest() {
    const xhr = (this.xhr = new XMLHttpRequest());

    // Note that your request may look different. It is up to you and your editor
    // integration to choose the right communication channel. This example uses
    // a POST request with JSON as a data structure but your configuration
    // could be different.
    xhr.open("POST", process.env.REACT_APP_SERVER_URL + "/upload", true);
    xhr.responseType = "json";
  }

  // Initializes XMLHttpRequest listeners.
  _initListeners(resolve, reject, file) {
    const xhr = this.xhr;
    const loader = this.loader;
    const genericErrorText = `Couldn't upload file: ${file.name}.`;

    xhr.addEventListener("error", () => reject(genericErrorText));
    xhr.addEventListener("abort", () => reject());
    xhr.addEventListener("load", () => {
      const response = xhr.response;
      // console.log(response.url)

      // This example assumes the XHR server's "response" object will come with
      // an "error" which has its own "message" that can be passed to reject()
      // in the upload promise.
      //
      // Your integration may handle upload errors in a different way so make sure
      // it is done properly. The reject() function must be called when the upload fails.
      if (!response || response.error) {
        return reject(
          response && response.error ? response.error.message : genericErrorText
        );
      }

      console.log("ok");
      console.log(response[0].url);

      // If the upload is successful, resolve the upload promise with an object containing
      // at least the "default" URL, pointing to the image on the server.
      // This URL will be used to display the image in the content. Learn more in the
      // UploadAdapter#upload documentation.
      resolve({
        default: process.env.REACT_APP_SERVER_URL + response[0].url,
      });
    });

    // Upload progress when it is supported. The file loader has the #uploadTotal and #uploaded
    // properties which are used e.g. to display the upload progress bar in the editor
    // user interface.
    if (xhr.upload) {
      xhr.upload.addEventListener("progress", (evt) => {
        if (evt.lengthComputable) {
          loader.uploadTotal = evt.total;
          loader.uploaded = evt.loaded;
        }
      });
    }
  }

  // Prepares the data and sends the request.
  _sendRequest(file) {
    // Prepare the form data.
    const data = new FormData();

    data.append("files", file);

    // Important note: This is the right place to implement security mechanisms
    // like authentication and CSRF protection. For instance, you can use
    // XMLHttpRequest.setRequestHeader() to set the request headers containing
    // the CSRF token generated earlier by your application.

    // Send the request.
    this.xhr.send(data);
  }
}

// ...

function MyCustomUploadAdapterPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    // Configure the URL to the upload script in your back-end here!
    return new MyUploadAdapter(loader);
  };
}

const custom_config = {
  extraPlugins: [MyCustomUploadAdapterPlugin],
  toolbar: {
    items: [
      "heading",
      "|",
      "bold",
      "italic",
      "link",
      "bulletedList",
      "numberedList",
      "|",
      "blockQuote",
      "mediaEmbed",
      // 'insertTable',
      "imageUpload",
      "undo",
      "redo",
    ],
  },
  // table: {
  //   contentToolbar: [ 'tableColumn', 'tableRow', 'mergeTableCells' ]
  // }
};

export default function CreatePost() {
  const [state, setState] = useState({
    title: "",
    content: "",
    overview: "",
  });
  const [formErrors, setFormErrors] = useState("");

  const customer_id = JSON.parse(localStorage.getItem("user-info"))?.id;

  const updateTitle = (e) => {
    setState((previousState) => {
      return { ...previousState, title: e.target.value };
    });
  };
  const updateContent = (e, editor) => {
    // console.log(editor.getData());
    // let data = editor.getData();
    // while (data.search(`src="/uploads`) !== -1){
    // 	data = data.replace(`src="/uploads`, `src="${process.env.REACT_APP_SERVER_URL}/uploads`);
    // }
    setState((previousState) => {
      return { ...previousState, content: editor.getData() };
    });

    console.log(state.content);
  };

  const updateOveriew = (e) => {
    setState((previousState) => {
      return { ...previousState, overview: e.target.value };
    });
  };

  const createPost = async (e) => {
    // console.log(state.title, state.content, state.image)
    if (!state.title) {
      e.preventDefault();
      setFormErrors("Title cannot be empty ");
      console.log(formErrors);
    } else if (!state.content) {
      e.preventDefault();
      setFormErrors("Content cannot be empty");
      console.log(formErrors);
    } else {
      setFormErrors("");
      let data = {
        title: state.title,
        content: state.content,
        overview: state.overview,
        customer_id: customer_id,
      };

      console.log(data);
      await createPostAPI(data).then((response) => {
        console.log(response);
      });
    }
  };

  return (
    // <div>
    <>
      <Header />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-md-offset-2">
            <h1 className="text-center my-4">Create a new post</h1>
            <form>
              <div className="form-group mb-4">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  onChange={updateTitle}
                />
              </div>

              <div className="form-group mb-4">
                <label htmlFor="description">Overview</label>
                <textarea
                  rows={5}
                  className="form-control"
                  defaultValue={""}
                  onChange={updateOveriew}
                />
              </div>

              <div>
                <article>Content</article>
                <CKEditor
                  editor={ClassicEditor}
                  // config={{
                  // 	simpleUpload: {
                  // 		uploadUrl:  process.env.REACT_APP_SERVER_URL + "/upload",
                  // 	},
                  // }}
                  // data={state.content}
                  config={custom_config}
                  onChange={updateContent}
                />

                {/* {ReactHtmlParser(state.content)} */}
              </div>

              <div className="form-group my-5 text-center">
                <p className="text-danger justify-content-center">
                  {" "}
                  {formErrors}{" "}
                </p>
                <Link
                  to="/blog"
                  type="submit"
                  className="btn btn-dark"
                  onClick={(e) => createPost(e)}
                >
                  Create post
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
