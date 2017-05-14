import 'colors';
import * as jsDiff from 'diff';
import htmlHandler from './html';
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
         htmlHandler.getHtml(urls[0],id,'text', (html)=>{
             htmlHandler.checkHtml(html,(html)=>{
                 content.push(html);
                htmlHandler.getHtml(urls[0],id,'text', (html)=>{
                    htmlHandler.checkHtml(html,(html)=>{
                        content.push(html);
                        module.exports.textDiff(content[0], content[1]);
                    });
                });
             });
         });
    }
}