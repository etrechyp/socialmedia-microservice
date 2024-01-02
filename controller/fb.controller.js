import { response } from "express";
import sprintf from "sprintf";

const checkStatus = async (req, res = response) => {
    console.log("status: ok");
    res.status(200).json({
        ok: true,
        message: "it's ok",
    });
};

const sendMessage = async (req, res = response) => {
    let { title, postID } = req.body;

    let message = sprintf("%s \n", title);
    let link = `https://thecouponhive.vercel.app/product/${postID}`;

    fetch(
        `https://graph.facebook.com/v18.0/${process.env.FB_PAGEID}/feed?message=${message}&link=${link}&access_token=${process.env.FB_TOKEN}`,
        {
            method: "POST",
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
            },
        }
    )
        .then((res) => res.json())
        .then((res) => console.log(res))
        .catch((e) => console.log(e));

    res.status(201).json({
        ok: true,
        message: "created successfuly",
        dest: 'fb'
    });
};
const sendPhoto = async (req, res = response) => {
    let { title, postID, imgURL } = req.body;

    let link = `https://thecouponhive.vercel.app/product/${postID}`;
    let message = sprintf("%s \n%s", title, link);

    fetch(
        `https://graph.facebook.com/v18.0/${process.env.FB_PAGEID}/photos?message=${message}&url=${imgURL}&access_token=${process.env.FB_TOKEN}`,
        {
            method: "POST",
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
            },
        }
    )
        .then((res) => res.json())
        .then((res) => console.log(res))
        .catch((e) => console.log(e));

    res.status(201).json({
        ok: true,
        message: "image posted successfuly",
        img: imgURL,
        dest: 'fb'
    });
};

export { checkStatus, sendMessage, sendPhoto };
