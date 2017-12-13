#!/usr/bin/env node --harmony
'use strict';

const program = require('commander');
const sftp = require('ssh2').Client;
const co = require('co');
const readline = require('readline');
const inquirer = require('inquirer');
// const prompt = require('co-prompt');
const prompt = require('prompt');
const conn = new sftp();

const rl = readline.createInterface({
	input:process.stdin,
	output:process.stdout
})
			

program
	.version('0.0.1')
	.name('installer')
	.option('-u, --username <username>','The user to authenticate as')
	.option('-h, --host <host>','The host to login')
	.option('-P, --port <port>','The port to login')
	// .option('-p, --password <password>','The user\'s password')

program
	.command('readDir [env]')
	.description('What about say something!')
	.action(async (env,options)=>{
		// co(async()=>{
			// prompt.start();
			// prompt.get(['host','port'],(err,result)=>{
			// 	if(err)throw err;
			// 	console.log(result.host)
			// 	console.log(result.port)
			// })
			//172.18.173.131:22
			// let host = yield prompt('host:');
			// let port = yield prompt('port:');
			// let username = yield prompt('username:');
			// let password = yield prompt.password('password:');
		// })

		// rl.question('Please tell me your password!',password=>{
			await inquirer.prompt([
					{
						type:'input',
						name:'host',
						message:'Enter your host:'
					},{
						type:'input',
						name:'port',
						message:'Enter your port:'
					},{
						type:'input',
						name:'username',
						message:'Enter your username:'
					},{
						type:'password',
						name:'password',
						mask:'*',
						message:'Enter your password:'
					}
				])
				.then(answers=>{
					conn.connect({
						host:answers.host,
						port:answers.port,
						username:answers.username,
						password:answers.password
					})
				})
			await conn.on('ready',()=>{
				console.log('Client::ready')
				conn.sftp((err,sftp)=>{
					if(err)throw err;
					sftp.readdir('./', (err,list)=>{
						if(err)console.log(err);
						let arr = [ new inquirer.Separator('== Select Options ==')];
						for(let i = 0;i<list.length;i++){
							arr.push({
								name:list[i].filename
							})
						}
						inquirer.prompt([
								{
									type:'rawlist',
									message:'Select your dir',
									name:'dir',
									choices:arr,
								}
							]).then(answers=>{
								sftp.opendir(answers.dir+'/',()=>{
									sftp.readdir('./',(err,list)=>{
										if(err)throw err;
										console.log(list)
									})
								})
							})
						// sftp.opendir(list[2].filename+'/',()=>{
						// 				sftp.readdir(list[2].filename,(err,list)=>{
						// 					if(err) throw err;
						// 					console.log(list)
						// 				}) 
						// 			})


						// await inquirer.prompt([
						// 		{
						// 			type:'input',
						// 			name:'dir',
						// 			message:'Enter your dir'
						// 		}
						// 	]).then(answers=>{
							
						// 		if(answers.dir){
									
						// 			sftp.opendir(list[2],()=>{
						// 				sftp.readdir(list[2],(err,list)=>{
						// 					if(err) throw err;
						// 					console.log(list)
						// 				})
						// 			})
						// 			// for(let i=0;i<list.length;i++){
						// 			// 	if(list[i].filename===answers.dir){
						// 			// 			console.log(answers.dir)
						// 					// conn.exec('cd tmp/',(err,stream)=>{
						// 					// 	if(err)throw err;
						// 					// 	stream.on('close',(code,signal)=>{
						// 					// 		console.log(console.log('stream::close::code'+code+'signal'+signal))
						// 					// 	})
						// 					// })
						// 					// inquirer.prompt([
						// 					// 		{
						// 					// 			type:'input',
						// 					// 			name:'dir',
						// 					// 			message:'Enter your dir'
						// 					// 		}
						// 					// 	]).then(answers=>{
						// 					// 		sftp.opendir(answers.dir,()=>{
						// 					// 			sftp.readdir(answers.dir,(err,list)=>{
						// 					// 				console.log(list)
						// 					// 			})
						// 					// 		})
						// 					// 	})
											
						// 				// }
						// 			// }
						// 		}
								
						// 	})
						// conn.end();
					})
				})
			})
			// conn.connect({
			// 	host:program.host,
			// 	port:Number(program.port),
			// 	username:program.username,
			// 	password:password
			// });

		// })

		// inquirer.prompt(['Hello world!'])
		// 	.then(answer=>{
		// 		console.log(answer)
		// 	})

		// inquirer
  // 			.prompt([
		//     	{
		// 	      type: 'password',
		// 	      mask: '*',			
		// 	      message: 'Enter a password',
		// 	      name: 'password'
		// 	    },{
		// 	    	message:'Enter username',
		// 	    	name:'username'
		// 	    }
		// 	  ])
		//     .then(answers => console.log(JSON.stringify(answers)));
	})


program.parse(process.argv);
