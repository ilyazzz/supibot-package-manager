module.exports = {
	Name: "randomdoctordisrespect",
	Aliases: ["rdd"],
	Author: "supinic",
	Cooldown: 10000,
	Description: "Posts a Markov chain-generated tweet from Dr. Disrespect.",
	Flags: ["pipe"],
	Params: null,
	Whitelist_Response: null,
	Static_Data: null,
	Code: (async function randomDoctorDisrespect (context, input) {
		if (!this.data.model) {
			const data = await sb.Cache.getByPrefix("markov-random-guy-beahm");
			if (!data) {
				return {
					success: false,
					reply: `Markov model has not been set up! Add the provided JSON file into sb.Cache as "markov-random-guy-beahm"`
				};
			}

			const Markov = require("async-markov");
			this.data.model = new Markov();
			this.data.model.load(data);
		}

		const inputNumber = Number(input);
		const words = (sb.Utils.isValidInteger(inputNumber, 1))
			? inputNumber
			: 25;

		if (words > 500) {
			return {
				success: false,
				reply: `Too many words provided!`
			};
		}

		const result = this.data.model.generateWords(words);
		const emote = await context.getBestAvailableEmote(["forsenCD"], "💿");

		return {
			reply: `${emote} ✌ ${result}`
		};
	}),
	Dynamic_Description: null
};
