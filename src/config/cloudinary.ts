import * as cloundinary from "cloudinary";

const cloudStorage = cloundinary.v2.config({
    cloud_name: "string",
    api_key: "string",
    api_secret: "string",
    sign_url: true,
    long_url_signature: false,
});

export { cloudStorage, cloundinary }
