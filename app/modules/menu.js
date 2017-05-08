
import menu from 'console-menu';
import readline from 'readline';
import compare from './compare';
import links from './links';
import configFile from '../config';

module.exports = {
    start: ()=>{
        menu([
            { hotkey: '1', title: 'Compare Content (website vs localhost)', selected: true },
            { hotkey: '2', title: 'Links Testing' },
            { hotkey: '3', title: 'Exit' }
        ], {
            header: 'Testing Tools',
            border: true,
        }).then(item => {
            if (item) {
                switch  (item.hotkey){
                    case '1': 
                        module.exports.compareContent();
                        break;
                    case '2': 
                        module.exports.linksMenu();
                        break;
                    default:
                        console.log('Exit :)');
                }
            } else {
                console.log('You cancelled the menu.');
            }
        });
    },
    compareContent: ()=>{
        menu([
            { hotkey: '1', title: 'Compare current domains', selected: true },
            { hotkey: '2', title: 'Update domains' },
            { hotkey: '3', title: 'Exit' }
        ], {
            header: 'Testing Tools',
            border: true,
        }).then(item => {
            if (item) {
                switch  (item.hotkey){
                    case '1': 
                        module.exports.comparePages();
                        break;
                    case '2': 
                        module.exports.comparePages(true);
                        break;
                    default:
                        console.log('Exit :)');
                }
            } else {
                console.log('You cancelled the menu.');
            }
        });
    },
    comparePages: (urls=false)=>{
        const askId = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            terminal:false
        });
        if(urls){
            askId.question('Enter production url:(with http/https): ', (url1) => {
                askId.question('Enter the localhost url:(with http/https): ', (url2)=>{
                    askId.question('Enter the ID or Class of the content you want yo update: ', (id) => {
                        compare.pages([url1,url2],id);
                        askId.close();
                    });
                });
            });
        }else{
            configFile.urls;



            askId.question('Enter the ID or Class of the content you want yo update: ', (id) => {
                id = id.length == 0 ? 'html' : id; 
                compare.pages(configFile.urls,id);
                askId.close();
            });
        }   
    },
    linksMenu: ()=>{
        menu([
            { hotkey: '1', title: 'Check links from a URLS', selected: true },
            { hotkey: '2', title: 'Check Target of URL (_blank : Specially for emails)' },
            { hotkey: '3', title: 'Exit' }
        ], {
            header: 'Links Testing',
            border: true,
        }).then(item => {
            if (item) {
                const askId = readline.createInterface({
                    input: process.stdin,
                    output: process.stdout,
                    terminal:false
                });
                switch  (item.hotkey){
                    case '1': 
                            askId.question('Please enter the url: ',(url)=>{
                                links.testUrl(url);
                            });
                        break;
                    case '2': 
                        askId.question('Please enter the url: ',(url)=>{
                            links.checkTarget(url);
                        });
                      
                        break;
                    default:
                        console.log('Exit :)');
                }
            } else {
                console.log('You cancelled the menu.');
            }
        }); 
    }
   

}