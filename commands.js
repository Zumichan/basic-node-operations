const fs = require("fs");

 function done(output) {
     process.stdout.write(output);
     process.stdout.write('\nprompt > ');
 }

 function evaluateCmd(userInput) {
   const userInputArray = userInput.split(" ");
   const command = userInputArray[0];

   switch (command) {
     case "echo":
       commandLibrary.echo(userInputArray.slice(1).join(" "));
       break;
     case "cat":
       commandLibrary.cat(userInputArray.slice(1));
       break;
     case "head":
       commandLibrary.head(userInputArray.slice(1));
       break;
     case "tail":
       commandLibrary.tail(userInputArray.slice(1));
       break;
     default:
       commandLibrary.errorHandler();
   }
 }

 const commandLibrary = {
    "echo": function(userInput) {
        done(userInput);
    },
    "cat": function(fullPath) {
      const fileName = fullPath[0];
      fs.readFile(fileName, (err, data) => {
          if (err) throw err;
          done(data);
      });
    },
    //user will input a command such as "head bash.js 2"
    "head": function(fullPath) {
      const fileName = fullPath[0];
      const n = fullPath[1];
      fs.readFile(fileName, (err, data, n) => {
          if (err) throw err;
          //console.log(data);
          let splitArray = data.toString().split("\n");
          let firstNLines = splitArray.slice(0,n).join("\n");
          done(firstNLines);
      });
    },
    "tail": function(fullPath) {
      const fileName = fullPath[0];
      fs.readFile(fileName, (err, data, n) => {
          if (err) throw err;
          let splitArray = data.split('\n');
          let lastNLines = splitArray.slice(-n).join('\n');
          done(lastNLines);
      });
    },
    "errorHandler": function(userInput){
      console.log(`${userInput} is not a command`);
    }
 };

 module.exports.commandLibrary = commandLibrary;
 module.exports.evaluateCmd = evaluateCmd;
