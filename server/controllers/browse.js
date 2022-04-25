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
      if(item.data.volumeInfo.title !== undefined && item.data.volumeInfo.description !== undefined) {
        results.push({
          title: item.data.volumeInfo.title,
          authors: item.data.volumeInfo.authors,
          description: item.data.volumeInfo.description,
          isbn: item.data.volumeInfo.industryIdentifiers,
          pages: item.data.volumeInfo.pageCount,
          cover: item.data.volumeInfo.imageLinks
        });
      }
    });
  })
  .catch((error) => {
    return next(new ErrorResponse("Failed to get book results", 500));
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
