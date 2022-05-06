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
  let promises = selfLinks.map((url) => axios.get(url));


  await Promise.allSettled(promises)
  .then((res) => {
    res.forEach((result) => {
      if(result.value.status == 200) {
        const book = result.value.data.volumeInfo;

        if(book.title !== undefined && book.description !== undefined) {
          results.push({
            title: book.title,
            authors: book.authors,
            description: book.description,
            isbn: book.industryIdentifiers,
            pages: book.pageCount,
            cover: book.imageLinks
          });
        }
      }
    })
  })
  .catch((error) => {});

  return results;
}

exports.browseBooks = async (req, res, next) => {
  const {search} = req.query;
  const selfLinks = await getSelfLinks(search, next);
  var results = await getBookResults(selfLinks, next);

  res.status(200).json({
    success: true,
    message: "Here are the results from the Google Books API",
    results: results
  });
}
