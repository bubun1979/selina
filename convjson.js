var obj = {
	sess1conv1: {
		text: "Hello and welcome! I am Selina and I am your fitness guide. Do you want to continue our journey?",
		handlers: 2,
		yesHandle: {
			progressPath: 'sess1conv2'
		},
		noHandle: {
			progressPath: 'sess1conv3'
		}
	},
	sess1conv2: {
		text: "That's fantastic. Here I'll provide you step by step guide to live a healthy and wonderful life. First I'll ask you a series of questions. May I continue?",
		handlers: 2,
		yesHandle: {
			progressPath: 'sess1conv4'
		},
		noHandle: {
			progressPath: 'sess1conv5'
		}
	},
	sess1conv3: {
		text: "Don't worry! We may be friends though. As a friend, I'll provide you step by step guide to live a healthy and wonderful life. First I'll ask you a series of questions. May I continue?",
		handlers: 2,
		yesHandle: {
			progressPath: 'sess1conv4'
		},
		noHandle: {
			progressPath: 'sess1conv5'
		}
	},
	sess1conv4: {
		text: "Do you smoke?",
		handlers: 2,
		yesHandle: {
			progressPath: 'sess1conv6'
		},
		noHandle: {
			progressPath: 'sess1conv7'
		}
	},
	sess1conv5: {
		text: "Okey. It is your dicision and I respect that. Please come back whenever you want. Once a friend, always a friend. Good Buy",
		handlers: 0,
	},
	sess1conv6: {
		text: "How many cigerrates do you smoke in a day?",
		handlers: 0,
	},
	sess1conv7: {
		text: "Okay. Great!",
		handlers: 0,
	}
};

module.exports = obj;