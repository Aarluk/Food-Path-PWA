const axios = require("axios");
const router = require("express").Router();

let API_KEY = process.env.YELP_API_KEY;

let yelpREST = axios.create({
	baseURL: "https://api.yelp.com/v3/",
	headers: {
		Authorization: `Bearer ${API_KEY}`,
		"Content-type": "application/json",
	},
});

let priceToNum = (price) => {
	if (+price <= 25) return 1;
	else if (+price <= 50) return 2;
	else if (+price <= 75) return 3;
	else return 4;
};

//adding another route to get more business details from Yelp
//   api/yelp/search/businesses/id
router.get("/search/businesses/:id", async (req, res, next) => {
	try {
		const { data } = await yelpREST(`/businesses/${req.params.id}`);
		try {
			const reviewsResponse = await yelpREST(
				`/businesses/${req.params.id}/reviews`
			);
			data.reviews = reviewsResponse.data.reviews;
		} catch (error) {
			data.reviews = [];
		}
		res.send(data);
	} catch (error) {
		next(error);
	}
});


router.post("/search", async (req, res, next) => {
	try {
		let price = String(req.body.price.map((str) => str.length))
		const { data } = await yelpREST("/businesses/search", {
			params: {
				location: req.body.location,
				term: req.body.term,
				sort_by: "rating",
				limit: 10,
				price: price,
				categories: req.body.categories.join(","),
				// open_now: true,
			},
		});

		let { businesses } = data;
		res.send(businesses);
	} catch (error) {
		next(error);
	}
});



module.exports = router;
