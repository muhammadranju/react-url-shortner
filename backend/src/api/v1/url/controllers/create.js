const moment = require("moment/moment");
const ShortURL = require("../../../../models/url.model/url.model");
const shortid = require("shortid");

const create = async (req, res) => {
  try {
    const URL_REGEX =
      /^(https?:\/\/)?((([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,})|localhost)(:[0-9]{1,5})?(\/[^\s]*)?$/;
    const MAX_LINKS = 10;

    let { originalUrl, icon } = req.body;

    console.log(req.user);
    if (!originalUrl) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Please provide a valid URL",
      });
    }

    // Remove trailing slash if it exists
    originalUrl = originalUrl.replace(/\/+$/, "");

    const allLinks = await ShortURL.find().sort({ _id: -1 }).limit(MAX_LINKS);

    if (!URL_REGEX.test(originalUrl.trim())) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Please enter a valid URL",
      });
    }

    const formattedCreatedAt = moment(allLinks.createdAt).format(
      "DD-MM-YYYY, HH:mm:ss"
    );

    const existingURL = await ShortURL.find({ originalUrl });

    // console.log(existingURL.user.toString() === req.user.id);
    // console.log(req.user.id);
    // console.log(existingURL);

    // if (existingURL && existingURL.user.toString() === req.user.id) {
    //   return res.status(400).json({
    //     status: 400,
    //     success: false,
    //     message: "You can't shorten the same URL again",
    //     existingLink: {
    //       url: existingURL.shortUrl,
    //       success: true,
    //     },
    //   });
    // }

    const isOwnedByUser = existingURL.some(
      (url) => url.user.toString() === req.user.id
    );

    if (isOwnedByUser) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "You can't shorten the same URL again",
        existingLink: {
          // url: existingURL.find((url) => url.user.toString() === req.user.id).shortUrl,
          url: existingURL.find((url) => url.user.toString() === req.user.id)
            .shotLink,
          success: true,
        },
      });
    }

    const shortLink = shortid.generate().toLowerCase();

    const newLongURL = `https://${req.hostname}/${shortLink}`;

    const links = new ShortURL({
      originalUrl,
      shotLink: shortLink,
      shortUrl: newLongURL,
      dateTime: formattedCreatedAt,
      icon,
      user: req.user.id,
    });
    await links.save();

    // console.log(links);

    return res.status(201).json({
      status: 201,
      success: true,
      allLinks,
      newLongURL,
      links,
      message: "Successfully created",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating short URL" });
  }
};

module.exports = create;
