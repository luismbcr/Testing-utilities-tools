import request from 'request';
import cheerio from 'cheerio';

module.exports = {
    getHtml: (url = '',id='html',method = 'all',cb)=>{
        request(url, (error, response, body)=> {
            let content = {};
            if(error){
                content = {status:0,content:`ERROR ${error.errno} code: with ${url}`};
            }
            else if(response.statusCode == 200){
                let $ = cheerio.load(body);
                
                switch (method){
                    case 'text':
                        content = {status:1,content: $(id).text()};
                        break;
                    case 'html':
                        content = {status:1,content: $(id).html()};
                    default:
                        content = {status:1,content: body};
                }
            }
            cb(content);
        });
    },
    checkHtml: (html, cb)=>{
        if( html.status == 0){
            console.log(html.content);
        }
        else
        {
            cb(html.content);
        }      
    }
}