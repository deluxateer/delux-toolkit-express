import person from './lib';

const test = () => person.name.toUpperCase();
test();

function getPosts() {
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(data => data.forEach((dataItem) => {
      const tempEl = document.createElement('p');
      tempEl.textContent = dataItem.title;
      document.body.append(tempEl);
    }));
}

// getPosts().then(posts => console.log(posts));
getPosts();
// console.log('all logging is complete.');
