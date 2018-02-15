/*-----------------------------------------------------------------------------
A simple echo bot for the Microsoft Bot Framework. 
-----------------------------------------------------------------------------*/

var restify = require('restify');
var builder = require('botbuilder');
var botbuilder_azure = require("botbuilder-azure");
var selinaConv = require('./convjson');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 7985, function () {
   console.log('%s listening to %s', server.name, server.url); 
});
  
// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword,
    openIdMetadata: process.env.BotOpenIdMetadata 
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());

/*----------------------------------------------------------------------------------------
* Bot Storage: This is a great spot to register the private state storage for your bot. 
* We provide adapters for Azure Table, CosmosDb, SQL Azure, or you can implement your own!
* For samples and documentation, see: https://github.com/Microsoft/BotBuilder-Azure
* ---------------------------------------------------------------------------------------- */

var tableName = 'botdata';
var azureTableClient = new botbuilder_azure.AzureTableClient(tableName, process.env['AzureWebJobsStorage']);
var tableStorage = new botbuilder_azure.AzureBotStorage({ gzipData: false }, azureTableClient);

// Create your bot with a function to receive messages from the user
var bot = new builder.UniversalBot(connector);
bot.set('storage', tableStorage);

// Make sure you add code to validate these fields
var luisAppId = process.env.LuisAppId;
var luisAPIKey = process.env.LuisAPIKey;
var luisAPIHostName = process.env.LuisAPIHostName || 'westus.api.cognitive.microsoft.com';

const LuisModelUrl = 'https://' + luisAPIHostName + '/luis/v1/application?id=' + luisAppId + '&subscription-key=' + luisAPIKey;

// Main dialog with LUIS
var recognizer = new builder.LuisRecognizer(LuisModelUrl);
var intents = new builder.IntentDialog({ recognizers: [recognizer] });
bot.dialog('/', intents);

intents.matches('Greeting', (session) => {
	if(!session.dialogData.progress){
		var msg = selinaConv['sess1conv1']['text'];
		session.dialogData.progress = 'sess1conv1';
		session.send(msg);
	}else{
		session.send('You reached Greeting intent, you said \'%s\'.', session.message.text);
	}
    
});

intents.matches('YesHandler', (session) => {
	if(session.dialogData.progress){
		//getting the yes progress section
		var baseProgress = session.dialogData.progress;
		var nextProgress = selinaConv[baseProgress]['yesHandle']['progressPath'];
		session.dialogData.progress = nextProgress;
		var msg = selinaConv[baseProgress]['text'];
		builder.Prompts.text(session, msg);
	}else{
		session.send('Sorry, I did not understand \'%s\'.', session.message.text);
	}
});

intents.matches('noHandler', (session) => {
	if(session.dialogData.progress){
		//getting the yes progress section
		var baseProgress = session.dialogData.progress;
		var nextProgress = selinaConv[baseProgress]['noHandle']['progressPath'];
		session.dialogData.progress = nextProgress;
		var msg = selinaConv[baseProgress]['text'];
		builder.Prompts.text(session, msg);
	}else{
		session.send('Sorry, I did not understand \'%s\'.', session.message.text);
	}
});

intents.matches('Help', (session) => {
    session.send('You reached Help intent, you said \'%s\'.', session.message.text);
});

intents.onDefault((session) => {
    session.send('Sorry, I did not understand \'%s\'.', session.message.text);
});

/*var intents = new builder.IntentDialog({ recognizers: [recognizer] })
.matches('Greeting', (session) => {
    session.send('You reached Greeting intent, you said \'%s\'.', session.message.text);
})
.matches('Help', (session) => {
    session.send('You reached Help intent, you said \'%s\'.', session.message.text);
})
.matches('Cancel', (session) => {
    session.send('You reached Cancel intent, you said \'%s\'.', session.message.text);
})
.onDefault((session) => {
    session.send('Sorry, I did not understand \'%s\'.', session.message.text);
});

bot.dialog('/', intents);*/    

