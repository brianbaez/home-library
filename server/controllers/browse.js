const axios = require("axios");
const ErrorResponse = require("../utils/ErrorResponse");

const getSelfLinks = async (search, next) => {
  const selfLinks = [];

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
      selfLinks.push(item.selfLink);
    });
  })
  .catch((error) => {
    return next(new ErrorResponse("Failed to get self links", 500));
  });

  return selfLinks;
}

const getBookResults = async (selfLinks, next) => {
  const results = [];

  // Get all book results from GoogleBooks API
  await Promise.all(selfLinks.map((url) => axios.get(url)))
  .then((res) => {
    res.forEach((item) => {
      results.push({
        title: item.data.volumeInfo.title,
        authors: item.data.volumeInfo.authors,
        description: item.data.volumeInfo.description,
        isbn: item.data.volumeInfo.industryIdentifiers,
        pages: item.data.volumeInfo.pageCount,
        cover: item.data.volumeInfo.imageLinks
      });
    });
  })
  .catch((error) => {
    return next(new ErrorResponse("Failed to get book results", 500));
  });

  return results;
}

const getBookCovers = async (results, next) => {
  // Set endpoints
  let endpoints = [];

  results.forEach(item => {
    endpoints.push("https://bookcoverapi.herokuapp.com/getBookCover?bookTitle=" + item.title + "&authorName=" + item.authors[0]);
  });

  // Get all book covers
  // Using: https://github.com/w3slley/bookcover-api
  await Promise.all(endpoints.map((url) => axios.get(url)))
  .then((res) => {
    res.forEach((item, index) => {
      if(item.data.bookCoverUrl !== undefined) {
        if(item.data.bookCoverUrl.startsWith("https://i.gr-assets.com/images/")) {
          results[index].cover = item.data.bookCoverUrl;
        }
      }
    });
  })
  .catch((error) => {
    return next(new ErrorResponse("Failed to get book covers", 500));
  });

  return results;
}

exports.browseBooks = async (req, res, next) => {
  const {search} = req.query;
  const selfLinks = await getSelfLinks(search, next);
  var results = await getBookResults(selfLinks, next);
  results = await getBookCovers(results, next);

  res.status(200).json({
    success: true,
    message: "Here are the results from the Google Books API",
    results: results
  });
}