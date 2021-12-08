const { clear } = require('console');
const https = require('https')
const chalk = require(`chalk`)
const prompt = require("prompt-sync")();
console.clear()
console.log(chalk.magentaBright(`
		▄▄▌              ▄ •▄ ▄• ▄▌ ▄▄▄·     ▄▄·       ▄▄▄  ·▄▄▄▄  
		██•  ▪     ▪     █▌▄▌▪█▪██▌▐█ ▄█    ▐█ ▌▪▪     ▀▄ █·██▪ ██ 
		██▪   ▄█▀▄  ▄█▀▄ ▐▀▀▄·█▌▐█▌ ██▀·    ██ ▄▄ ▄█▀▄ ▐▀▀▄ ▐█· ▐█▌
		▐█▌▐▌▐█▌.▐▌▐█▌.▐▌▐█.█▌▐█▄█▌▐█▪·•    ▐███▌▐█▌.▐▌▐█•█▌██. ██ 
		.▀▀▀  ▀█▄▀▪ ▀█▄▀▪·▀  ▀ ▀▀▀ .▀       ·▀▀▀  ▀█▄▀▪.▀  ▀▀▀▀▀▀• 
		`))
const token = "" //TOKEN HERE 

if (!token) {
	console.log(chalk.red("[ERR] Please put your token to line 13"))
	return
}
console.clear()
console.log(chalk.magentaBright(`
		▄▄▌              ▄ •▄ ▄• ▄▌ ▄▄▄·     ▄▄·       ▄▄▄  ·▄▄▄▄  
		██•  ▪     ▪     █▌▄▌▪█▪██▌▐█ ▄█    ▐█ ▌▪▪     ▀▄ █·██▪ ██ 
		██▪   ▄█▀▄  ▄█▀▄ ▐▀▀▄·█▌▐█▌ ██▀·    ██ ▄▄ ▄█▀▄ ▐▀▀▄ ▐█· ▐█▌
		▐█▌▐▌▐█▌.▐▌▐█▌.▐▌▐█.█▌▐█▄█▌▐█▪·•    ▐███▌▐█▌.▐▌▐█•█▌██. ██ 
		.▀▀▀  ▀█▄▀▪ ▀█▄▀▪·▀  ▀ ▀▀▀ .▀       ·▀▀▀  ▀█▄▀▪.▀  ▀▀▀▀▀▀• 
		`))
const id = prompt("Enter An ID ");
const Snowflake = require("./discord/Snowflake");




if (!id) {
	console.log(chalk.red("[ERR] Write an id"))
	return
}
async function getData(id) { 
	const gd = () => {
		return new Promise((resolve, reject) => {
			const options = {
				hostname: 'discord.com',
				port: 443,
				path: '/api/v8/users/' + id,
				headers: {'Authorization': 'Bot ' + token},
				method: 'GET'
			}

			const req = https.request(options, (res) => {

				
				  res.on('data', d => {
					  try {
						  resolve(JSON.parse(d))
					  }
					  catch {
						  console.log(chalk.red("[ERR] This user has non ascii username."))
						  return
						  
					  }
				  })
				})

				req.on('error', error => {
				  console.error(error)
				})
			req.end()

		})
	}
	return await gd()
}



	async function main() {
		var creation = new Date(Snowflake.deconstruct(id).timestamp)
		var data = await getData(id)
		var username = "╔════════════════════════════════════╗" + "\n║ID: "+ data.id + "\n║Username: " + data.username + "\n║Discriminator: " + data.discriminator + "\n╚════════════════════════════════════╝\n"
		var userprofile = "╔════════════════════════════════════╗" + "\n║Avatar: " + data.avatar + "\n║Avatar url: https://cdn.discordapp.com/avatars/" + data.id + "/" + data.avatar + ".webp?size=128" + "\n╚════════════════════════════════════╝\n"
		var otherinfo =  "╔════════════════════════════════════╗" + "\n║Public Flags: " + data.public_flags + "\n║Date of Creation: " + creation + "\n╚════════════════════════════════════╝\n"
		console.clear()
		console.log(chalk.magentaBright(`
		▄▄▌              ▄ •▄ ▄• ▄▌ ▄▄▄·     ▄▄·       ▄▄▄  ·▄▄▄▄  
		██•  ▪     ▪     █▌▄▌▪█▪██▌▐█ ▄█    ▐█ ▌▪▪     ▀▄ █·██▪ ██ 
		██▪   ▄█▀▄  ▄█▀▄ ▐▀▀▄·█▌▐█▌ ██▀·    ██ ▄▄ ▄█▀▄ ▐▀▀▄ ▐█· ▐█▌
		▐█▌▐▌▐█▌.▐▌▐█▌.▐▌▐█.█▌▐█▄█▌▐█▪·•    ▐███▌▐█▌.▐▌▐█•█▌██. ██ 
		.▀▀▀  ▀█▄▀▪ ▀█▄▀▪·▀  ▀ ▀▀▀ .▀       ·▀▀▀  ▀█▄▀▪.▀  ▀▀▀▀▀▀• `))
		console.log(chalk.magenta(username))
		console.log(chalk.blueBright(userprofile))
		console.log(chalk.cyan(otherinfo))
	}
main() 	
process.on('unhandledRejection', error => {
	console.error(chalk.red('\n\n[ERR] Unhandled promise rejection error:\n', error));
});	
