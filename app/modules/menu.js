
import menu from 'console-menu';
import readline from 'readline';
import compare from './compare';

module.exports = {
    start: ()=>{
        menu([
            { hotkey: '1', title: 'Compare Content (website vs localhost)', selected: true },
            { hotkey: '2', title: 'Exit' }
        ], {
            header: 'Testing Tools',
            border: true,
        }).then(item => {
            if (item) {
                switch  (item.hotkey){
                    case '1': 
                        module.exports.compareContent();
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
                    default:
                        console.log('Exit :)');
                }
            } else {
                console.log('You cancelled the menu.');
            }
        });
    },
    comparePages: ()=>{
        let urls = [
        'https://painter-projects-71848.netlify.com/',
        'http://localhost:3000/'];

        const askId = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal:false
        });

        askId.question('Enter the ID or Class of the content you want yo update: ', (id) => {
        compare.pages(urls,id);
        askId.close();
        });
    }
   

}