document.addEventListener('DOMContentLoaded', () => {
  const usernameInput = document.getElementById('username');
  const statusText = document.getElementById('username-status');
  const form = document.getElementById('registration-form');
  const userList = document.getElementById('user-list');

  // Keydown event to check if username exists
  usernameInput.addEventListener('keyup', () => {
    const username = usernameInput.value;

    if (username) {
      fetch('/check-username', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username })
      })
        .then(response => response.json())
        .then(data => {
          if (data.exists) {
            statusText.textContent = 'Username is already taken!';
            statusText.style.color = 'red';
          } else {
            statusText.textContent = 'Username is available!';
            statusText.style.color = 'green';
          }
        });
    } else {
      statusText.textContent = '';
    }
  });

  // Form submission to register the user
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = usernameInput.value;
    const password = document.getElementById('password').value;

    if (username && password) {
      fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            alert(data.message);

            // Update the user list
            userList.innerHTML = '';
            data.users.forEach(user => {
              const li = document.createElement('li');
              li.textContent = user;
              userList.appendChild(li);
            });

            form.reset();
            statusText.textContent = '';
          } else {
            alert(data.message);
          }
        });
    } else {
      alert('Please enter both username and password.');
    }
  });
});
