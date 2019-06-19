import person from './lib';

const test = () => person.name.toUpperCase();
test();

function getPosts() {
  fetch('https://jsonplaceholder.typicode.com/posts').then(response => response.json()).then(data => data.reverse());
}

// getPosts().then(posts => console.log(posts));
getPosts();
// console.log('all logging is complete.');
