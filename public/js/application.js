const form = document.forms.search;
const { login } = document.forms;
console.log(login);

const news = document.querySelector('.news');
const searchInput = document.getElementById('searching');
console.log(searchInput, form);
form?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(e.target));

  const response = await fetch('/', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (response.ok) {
    // window.location = '/';
    const res = await response.json();
    const arrNews = res
      .map(
        (el) => `<div class="my-5">
    <div class="card">
  <div class="card-body">
    <h5 class="card-title">${el.title}</h5>
    <p class="card-text">${el.description}</p>
    <a href=${el.link} class="btn btn-primary">Подробнее</a>
  </div>
</div>
</div>`
      )
      .join(' ');
    // console.log(res);
    news.innerHTML = '';
    news.insertAdjacentHTML('afterbegin', arrNews);
    console.log(res);
  }
});

login?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const loginData = Object.fromEntries(new FormData(login));
  console.log(loginData);
  if (loginData.loginEmail.trim() && loginData.loginPassword.trim()) {
    const resp = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });
    if (resp.ok) {
      window.location = '/';
    } else {
      alert('Вы ввели неверные данные!');
    }
  }
});
