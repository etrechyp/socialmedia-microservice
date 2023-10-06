import { response } from "express";
import sprintf from 'sprintf';


const checkStatus = async (req, res = response) => {
    console.log("status: ok");
    res.status(200).json({
        ok: true,
        message: "it's ok",
    });
};

const sendMessage = async (req, res = response) => {
    let { title, postID } = req.body;

    let message = sprintf(
        "🔥 %s 🔥\n\n👉🏼 %s",
        title,
        `https://www.fulldealsusa.com/product/${postID}`
    );
    fetch(`https://api.telegram.org/bot${process.env.TG_TOKEN}/sendMessage`, {
        method: "POST",
        headers: {
            accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            text: message,
            chat_id: process.env.TG_CHATID,
            parse_mode: "html",
        }),
    })
        .then((res) => res.json())
        .then((res) => console.log(res))
        .catch((e) => console.log(e));

    res.status(201).json({
        ok: true,
        message: "created successfuly",
        product: `https://www.fulldealsusa.com/product/${postID}`
    });
};

const sendPhoto = async (req, res = response) => {

    let { title, postID, imgURL } = req.body;

    let message = sprintf(
        "🔥 %s 🔥\n\n👉🏼 %s",
        title,
        `https://www.fulldealsusa.com/product/${postID}`
    );
    fetch(`https://api.telegram.org/bot${process.env.TG_TOKEN}/sendPhoto`, {
        method: "POST",
        headers: {
            accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            photo: imgURL,
            caption: message,
            chat_id: process.env.TG_CHATID,
            parse_mode: "html",
        }),
    })
        .then((res) => res.json())
        .then((res) => console.log(res))
        .catch((e) => console.log(e));

    res.status(201).json({
        ok: true,
        message: "image posted successfuly",
        product: `https://www.fulldealsusa.com/product/${postID}`
    });
};

export { checkStatus, sendMessage, sendPhoto };
