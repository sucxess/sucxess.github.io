const apps = [18501613,18031050,18030644,18030128];
let i = 0;

var blob = new Blob(["Hello, world!"], {type: "text/plain;charset=utf-8"});
//saveAs(blob, "hello world.txt");

var zip = new JSZip();
var count = 0;
var zipFilename = "AppColl.zip";
var urls = [];


function myFunction() {
fetch('https://patentcenter.uspto.gov/retrieval/private/v2/applications/18030128/data')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
    })
    .then(textContent => {
        // get the text.
        const result = textContent;
        console.log(textContent);
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });


while (i < apps.length) {
    url="https://patentcenter.uspto.gov/retrieval/private/v2/applications/"+apps[i]+"/data"
    console.log(url);
    urls.push(url);
    i++;
}


urls.forEach(function(url){
    var filename = "filename";
    // loading a file and add it in a zip file
    JSZipUtils.getBinaryContent(url, function (err, data) {
       if(err) {
          throw err; // or handle the error
       }
       zip.file(filename, data, {binary:true});
       count++;
       if (count == urls.length) {
         zip.generateAsync({type:'blob'}).then(function(content) {
            saveAs(content, zipFilename);
         });
      }
    });
  });
}