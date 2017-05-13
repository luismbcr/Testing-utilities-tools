import 'colors';
import * as jsDiff from 'diff';
import request from 'request';
import cheerio from 'cheerio';

module.exports = {
   
    textDiff: (a,b)=>{
        let diff = jsDiff.diffWords(a, b);
        console.log('--- Content Comparison Result ---'.bgBlue.white);
        console.log('   Additions'.green + ' Common'.white + ' Deletions'.red);
        console.log('---------------------------------'.bgBlue.white+'\n');
        diff.forEach(function(part){
            // green for additions, red for deletions
            // white for common parts
            let color = part.added ? 'green' :
                part.removed ? 'red' : 'white';
            process.stderr.write(part.value[color]);
        });
        process.stderr.write('\n');
    },
    getHtml: (url = '',id,cb)=>{
        request(url, (error, response, body)=> {
            let content = {};
            if(error){
                content = {status:0,content:`ERROR ${error.errno} code: with ${url}`};
            }
            else if(response.statusCode == 200){
                let $ = cheerio.load(body);
                content = {status:1,content: $(id).text()};
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
    },
    pages : (urls,id='html')=>{
         let content=[];
         module.exports.getHtml(urls[0],id, (html)=>{
             module.exports.checkHtml(html,(html)=>{
                 content.push(html);
                module.exports.getHtml(urls[0],id, (html)=>{
                    module.exports.checkHtml(html,(html)=>{
                        content.push(html);
                        module.exports.textDiff(content[0], content[1]);
                    });
                });
             });
         });
      
         
      
    }
}