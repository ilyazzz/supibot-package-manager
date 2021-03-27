module.exports = {
	Name: "async-markov-experiment",
	Events: ["message"],
	Description: "Super experimental automatic async markov tester thing",
	Code: (async function asyncMarkovExperiment (context) {
		if (this.data.skipped) {
			return;
		}
		else if (!this.data.markov) {
			try {
				const Markov = require("async-markov");
				this.data.markov = new Markov();
			}
			catch (e) {
				console.warn("async markov experiment failed", { error: e });
				this.data.skipped = true;
				return;
			}
		}

		const { message, user } = context;
		if (message.includes("http:") || message.includes("https:")) {
			return;
		}
		else if (!user || user.Name.includes("bot")) {
			return;
		}

		const fixedMessage = message.replace(/\u{E0000}/gu, "");
		if (!/^(\p{Emoji}|[\w\s\d.-/:?!])+$/iu.test(fixedMessage)) {
			return;
		}

		this.data.markov.add(fixedMessage);
	}),
	Author: "supinic"
};