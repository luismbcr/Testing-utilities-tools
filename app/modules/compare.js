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
    pages : (urls,id='html')=>{
         let content=[];
        request(urls[0], (error, response, body)=> {
            if(response.statusCode == 200){
                let $ = cheerio.load(body);
                content.push($(id).text());
            };
            request(urls[1], (error, response, body)=> {
                if(response.statusCode == 200){
                    let $ = cheerio.load(body);
                    content.push($(id).text());
                }
                module.exports.textDiff(content[0], content[1]);
            });
            
        });
        
    }
}