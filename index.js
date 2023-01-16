const fs = require('fs/promises')
const http = require("http")

const createFile = async(fileName, fileContent) =>{
    try{
        await fs.writeFile(fileName, fileContent)
    }catch(err){
        console.log(err)
    }
}

const updateFile = async(fileName, fileContent)=>{
    try{
        await fs.appendFile(fileName, fileContent)
    }catch(err){
        console.log(err)
    }
}

const readFile = async(fileName) =>{
    try{
        const data = await fs.readFile(fileName, "utf-8")
        return data
    }catch(err){
        console.log(err)
    }
}

const startServer = async() =>{
    
    createFile("index.html","<h1> Hello World </h1>")
    updateFile("index.html","\n<p> This is Apurba </p>")

    const htmlContent = await readFile("./index.html")

    const server = http.createServer((req, res)=>{
    res.writeHead(200, {
        "Content-Type": "text/html"
    })
    res.write(htmlContent)
    res.end()
    })
    server.listen(5000, ()=> console.log("server started"))
}

startServer()