import throttle from 'lodash.throttle';

const KEY = 'feedback-form-state';
let formData = JSON.parse(localStorage.getItem(KEY)) || {};

const form = document.querySelector('.feedback-form');
const input = document.querySelector('input');
const textarea = document.querySelector('textarea');

form.addEventListener('submit', formSubmit);
form.addEventListener('input', throttle(onInput, 500));

function formSubmit(event) {
  event.preventDefault();

  if (input.value.trim() === '' || textarea.value.trim() === '') {
    alert('заповніть всі поля');
    return;
  }
  console.log(formData);
  formData = {};
  localStorage.removeItem(KEY);
  event.currentTarget.reset();
}

function onInput(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem(KEY, JSON.stringify(formData));
}

populateForm();

function populateForm() {
  input.value = formData.email ?? '';
  textarea.value = formData.message ?? '';
}
