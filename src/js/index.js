import person from './lib';

const test = () => console.log(person.name);
test();

function getPosts() {
  fetch('https://jsonplaceholder.typicode.com/posts').then(response => response.json()).then(data => console.log(data));
}

// getPosts().then(posts => console.log(posts));
getPosts();
console.log('all logging is complete.');
