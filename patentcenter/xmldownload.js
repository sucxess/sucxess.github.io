
const apps = [18501613,18031050,18030644,18030128];
let i = 0;

var blob = new Blob(["Hello, world!"], {type: "text/plain;charset=utf-8"});
FileSaver.saveAs(blob, "hello world.txt");


while (i < apps.length) {
    console.log(apps[i]);
    url="https://patentcenter.uspto.gov/retrieval/private/v2/applications/"+apps[i]+"/data"
    console.log(url);
    i++;
}