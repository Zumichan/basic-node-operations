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
       console.log("command cannot be found")
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
    "head": function(fullPath) {
      const fileName = fullPath[0];
      fs.readFile(fileName, (err, data, n) => {
          if (err) throw err;
          let splitArray = data.split("\n");
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
          done(data);
      });
    },
 };

 module.exports.commandLibrary = commandLibrary;
 module.exports.evaluateCmd = evaluateCmd;
