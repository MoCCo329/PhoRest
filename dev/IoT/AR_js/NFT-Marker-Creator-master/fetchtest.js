var https = require("https");
var fs = require("fs");

const post_id = 0;
const url = `https://phorest-ssafy.s3.ap-northeast-2.amazonaws.com/photogroup/${post_id}/FramePlusImg.png`;
download(url, "img.png");

function download(url, dest){
  const file = fs.createWriteStream(dest);
  console.log("hello");
  https.get(url, function (response) {
    //console.log(response);
    response.pipe(file);
  });
};


var cmd = require('node-cmd');


setTimeout(function(){
  cmd.run("node app.js -i ./img.png",function(error,success,stderr){
    if(error){
      console.log("ERROR!!!",error);
    }else{
      console.log("SUCCESS!!!",success);
    }
  })
},1000);

setTimeout(function(){
  // request 요청
  
},180000);
