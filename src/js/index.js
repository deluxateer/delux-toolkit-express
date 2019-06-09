import { person } from './lib';

let test = () => console.log(person.name);
test();

function getPosts() {
  const data = fetch('https://jsonplaceholder.typicode.com/posts').then(response => response.json()).then(data => console.log(data));
  // return data;
}

// getPosts().then(posts => console.log(posts));
getPosts();