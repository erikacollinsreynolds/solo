const secrets = document.querySelector('#secrets');

fetch('/home') //what is this for... adding usernames and login to database?
  .then((res) => res.json())
  .then((data) => {
    const users = data.users;
    users.forEach((user) => {
      const userListItem = document.createElement('li');
      userListItem.appendChild(document.createTextNode(`${user.username}: ${user.password}`));
      secrets.appendChild(userListItem);
    });
  });