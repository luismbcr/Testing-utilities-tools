import 'colors';
import request from 'request';
import cheerio from 'cheerio';

module.exports = {
    testUrl: (url)=>{
        request(url, (error, response, body)=> {
            if(response.statusCode == 200){
                let $ = cheerio.load(body),
                    $all = $('a');
                //get all links of the site
                console.log('--- Links Testing ---'.bgBlue.white+'\n');
                $all.each(function() {
                    let $link = $(this).attr('href');
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
            } 
        });
    },
    checkTarget: (url)=>{
        request(url, (error, response, body)=> {
            if(response.statusCode == 200){
                let $ = cheerio.load(body),
                    $all = $('a');
                //get all links of the site
                console.log('--- Links Target Testing ---'.bgBlue.white+'\n');
                $all.each(function() {
                    let $link = $(this);
                    if($link.attr('target') == undefined){
                        console.log($link.attr('href').red+' - Needs Target _blank'.red);
                    }
                });                
            }
            
        });
    }
}