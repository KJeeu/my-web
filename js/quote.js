document.getElementById('quote').innerHTML = `
    <div id=quotes_list>
        <div id="quotes"></div>
        <div id="author"></div>
    </div>
`;

const quotesList = [
    {
        quote: 'I never dreamed about success, I worked for it',
        author: 'Estee Lauder'
    }, {
        quote: 'Do not try to be original, just try to be good.',
        author: 'Paul Rand'
    }, {
        quote: 'Do not be afraid to give up the good to go for the great',
        author: 'John D. Rockefeller'
    }, {
        quote: 'If you cannot fly then run. If you cannot run, then walk. And if you cannot wa' +
            'lk, then crawl, but whatever you do, you have to keep moving forward.',
        author: 'Martin Luther King Jr.'
    }, {
        quote: 'Our greatest weakness lies in giving up. The most certain way to succeed is al' +
            'ways to try just one more time.',
        author: 'Thomas Edison'
    }, {
        quote: 'The fastest way to change yourself is to hang out with people who are already ' +
            'the way you want to be',
        author: 'REid Hoffman'
    }, {
        quote: 'Money is like gasoline during a road trip. You do not want to run out of gas o' +
            'n your trip, but you are not doing a tour of gas stations',
        author: 'Tim O Reilly'
    }, {
        quote: 'Some people dream of success, while other people get up every morning and make' +
            ' it happen',
        author: 'Wayne Huizenga'
    }, {
        quote: 'The only thing worse than starting something and falling.. is not starting som' +
            'ething',
        author: 'SEth Godin'
    }, {
        quote: 'If you really want to do something, you will find a way. If you do not, you wi' +
            'll find an excuse.',
        author: 'Jim Rohn'
    }
];

const quote = document.querySelector('#quotes');
const author = document.querySelector('#author');

const today = quotesList[Math.floor(Math.random() * quotesList.length)];

quote.innerText = today.quote;
author.innerText = today.author;

