const express=require("express");
const app=express();
const fs=require("fs");
const fileUpload=require("express-fileupload");
const compare=require("./compare")
const append=require("./append")
const port=8000;

app.use(fileUpload())

let similarityHtml="<p>$ %</p>";

const html=fs.readFileSync(`${__dirname}/form.html`,{encoding:"utf8"});
app.get("/",(req,res)=>{
    res.writeHead(200,{"Content-Type":"text/html"});
    res.write(html);
    res.end();
})

app.post("/upload",function(req,res){
    // console.log(req.files.cv)
    const jobdescription=req.body.jobdescription
    const cvData=req.files.cv.data.toString()
    const similarty=compare.similarity(jobdescription,cvData)
    similarityHtml=similarityHtml.replace("$",similarty);
    res.writeHead(200,{"Content-Type":"text/html"});
    res.write(append.appendHTML(html,similarityHtml,"</form>"));
    res.end();
})

app.listen(port,()=>{
    console.log(`You application is running at http://localhost:${port}`)
})