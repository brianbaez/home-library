const axios = require("axios");
const ErrorResponse = require("../utils/ErrorResponse");

const getSelfLinks = async (search, next) => {
  const selfLinks = []

  const options = {
    header: {
      "Content-Type": "application/json"
    },
    url: `https://www.googleapis.com/books/v1/volumes?q=${search}&key=${process.env.GOOGLE_BOOKS_API}`
  };

  // Get all self links from GoogleBooks API
  await axios(options)
  .then((res) => {
    res.data.items.forEach(item => {
      selfLinks.push({
        selfLink: item.selfLink
      });
    });
  })
  .catch((error) => {
    return next(new ErrorResponse("Failed to get self links", 500));
  });

  return selfLinks;
}

const getBookResults = async () => {

}

exports.browseBooks = async (req, res, next) => {
  const {search} = req.query;
  const results = [];
  const selfLinks = await getSelfLinks(search, next);

  // await axios(item.selfLink)
  // .then((res) => {
  //   console.log(res.data.volumeInfo.title);
  // })
  // .catch((error) => {
  //   return next(new ErrorResponse("Failed to get book results", 500));
  // })

  // try {
  //   selfLinks.forEach(item => {
  //
  //   });
  // }
  // catch(error) {
  //   return next(new ErrorResponse("Failed to get book results", 500));
  // }

  // await axios(options)
  // .then((res) => {
  //   res.data.items.forEach(item => {
  //     results.push({
  //       title: item.volumeInfo.title,
  //       author: item.volumeInfo.authors,
  //       pages: item.volumeInfo.printedPageCount,
  //       description: item.volumeInfo.description,
  //       isbn: item.volumeInfo.industryIdentifiers,
  //       cover: ""
  //     });
  //   });
  // })
  // .catch((error) => {
  //   return next(new ErrorResponse("Failed to get book results", 500));
  // });

  res.status(200).json({
    success: true,
    message: "Here are the results from the Google Books API",
    selfLinks: selfLinks
  });
}
