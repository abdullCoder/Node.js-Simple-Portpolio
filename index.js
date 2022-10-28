const http = require("http");
const fs = require("fs");
const path = require("path");
const port =3000;

const server = http.createServer((req, res) => {
  let filePath = path.join(
    __dirname,
    "pages",
    req.url === "/" ? "home.html" : "about.html" || "contact.html"
  );
  let emptyPage = path.join(__dirname, "pages", 'not_found.html');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        if (err.code === 'ENOENT') {
            fs.readFile(emptyPage, 'utf8', (err,data) => {
                res.writeHead(200, {"Content-Type" : "text/html"})
                res.end(data)
            })
        }else{
            res.writeHead(500)
            res.end('This is a server error ')
        }
    }if (!err) {
        res.writeHead(200, {"Content-Type" : "text/html"})
        res.end(data)
    }
  })
});

server.listen(port, () => {
  console.log(`Server Listening on port ${port}`);
});
