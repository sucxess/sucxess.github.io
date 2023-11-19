
const apps = [18501613,18031050,18030644,18030128];
let i = 0;

while (i < apps.length) {
    console.log(apps[i]);
    url="https://patentcenter.uspto.gov/retrieval/private/v2/applications/"+apps[i]+"/data"
    console.log(url);
    i++;
}