import 'colors';
import request from 'request';
import cheerio from 'cheerio';
import htmlHandler from './html';
module.exports = {
    testUrl: (url)=>{       
        htmlHandler.getHtml(url,'a','',(links)=>{
            let $ = cheerio.load(links.content),
                $all = $('a');
            //get all links of the site
            console.log('--- Links Testing ---'.bgBlue.white+'\n');
            $all.each((i,e)=>{
                let $link = $(e).attr('href');
                request($link, (error, response, body)=> {
                    if(error){
                        console.log($link.red+ ' - Fail'.red);
                    }
                    else if(response.statusCode == 200){
                        console.log($link+ ' - Success'.white);
                    }else{
                        console.log($link.red+ ' - Fail'.red);
                    }
                });
            });
        });
    },
    checkTarget: (url)=>{
        htmlHandler.getHtml(url,'a','',(links)=>{
            let $ = cheerio.load(links.content),
                $all = $('a');
                 console.log('--- Links Target Testing ---'.bgBlue.white+'\n');
                 $all.each(function(i,e) {
                    let $link = $(this);
                    if($link.attr('target') == undefined){
                        console.log($link.attr('href').red+' - Needs Target _blank'.red);
                    }
                });
        });
    }
}