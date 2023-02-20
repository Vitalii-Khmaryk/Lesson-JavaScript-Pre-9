const getS = (selector: string): HTMLElement =>
  document.querySelector(selector) as HTMLElement;
const loginRegExp: RegExp = /^\w{4,16}$/i;
const passRegExp: RegExp = /(?<inputPass>^(\w-*_*\.*){4,16}$)/;
const emailRegExp: RegExp = /(?<inputEmail>^\w+-*\.*\w+@\w+\.\w+$)/;

interface IUser {
  login: string;
  password: string;
  email: string;
}

let login: any;
let pass: any;
let email: any;
let check: boolean = true;
let user: IUser;
let userMass: IUser[] = [];
let userIndex: number;
let edit: IUser;

getS(".user-login").oninput = function (this: HTMLInputElement) {
  login = loginRegExp.test(this.value);
  getS(".user-btn").classList.remove("activ");
  if (login) {
    this.classList.add("focus");
    this.classList.remove("error");
    btn();
  } else {
    this.classList.add("error");
  }
};

getS(".user-password").oninput = function (this: HTMLInputElement) {
  pass = passRegExp.test(this.value);
  if (pass) {
    this.classList.add("focus");
    this.classList.remove("error");
    btn();
  } else {
    this.classList.add("error");
  }
};

getS(".user-email").oninput = function (this: HTMLInputElement) {
  email = emailRegExp.test(this.value);
  if (email) {
    this.classList.add("focus");
    this.classList.remove("error");
    btn();
  } else {
    this.classList.add("error");
  }
};

getS(".user-login").onblur = function (this: HTMLInputElement) {
  this.classList.remove("focus");
};

getS(".user-password").onblur = function (this: HTMLInputElement) {
  this.classList.remove("focus");
};

getS(".user-email").onblur = function (this: HTMLInputElement) {
  this.classList.remove("focus");
};

getS(".user-btn").onclick = function addUser(this: HTMLInputElement) {
  if (check) {
    this.classList.add("activ");
    (getS(".user-btn") as HTMLButtonElement).disabled = true;
  }
  user = {
    login: (getS(".user-login") as HTMLInputElement).value,
    password: (getS(".user-password") as HTMLInputElement).value,
    email: (getS(".user-email") as HTMLInputElement).value,
  };
  userMass.push(user);
  render();
  (document.forms[0] as HTMLFormElement).reset();
};

function render() {
  document.querySelector("tbody")!.innerHTML = "";
  for (let i = 0; i < userMass.length; i++) {
    let row = document.createElement("tr");
    row.innerHTML = `
        <td>${i + 1}</td>
        <td>${userMass[i].login}</td>
        <td>${userMass[i].password}</td>
        <td>${userMass[i].email}</td>
        <td><input type='button' class = 'edit-btn btn'  name = 'edit' value = 'Edit'></td>
        <td><input type='button' class = 'delete-btn btn'  name = 'delete' value = 'Delete'></td>`;
    getS(".user-list").append(row);
  }
}

getS("tbody").onclick = (event: MouseEvent) =>
  (event.target as HTMLElement).classList.contains("edit-btn")
    ? editUser(event)
    : (event.target as HTMLElement).classList.contains("delete-btn")
    ? deleteUser(event)
    : 0;

function deleteUser(event: MouseEvent) {
  let index: number =
    parseInt(
      (event.target as HTMLElement).parentElement?.parentElement
        ?.firstElementChild?.textContent
    ) - 1;
  if (!isNaN(index)) {
    userMass.splice(index, 1);
    render();
  }
}

getS(".user-edit-btn").onclick = function saveEditUser(event: MouseEvent) {
  if (login && pass && email) {
    btn();
    edit.login = (getS(".user-login") as HTMLInputElement).value;
    edit.password = (getS(".user-password") as HTMLInputElement).value;
    edit.email = (getS(".user-email") as HTMLInputElement).value;
    getS(".user-btn").hidden = false;
    getS(".user-edit-btn").hidden = true;
    render();
    (document.forms[0] as HTMLFormElement).reset();
  }
};

function editUser(event: MouseEvent) {
  userIndex =
    parseInt(
      (event.target as HTMLElement).parentElement.parentElement
        .firstElementChild.textContent
    ) - 1;
  edit = userMass[userIndex];
  (getS(".user-login") as HTMLInputElement).value = edit.login;
  (getS(".user-password") as HTMLInputElement).value = edit.password;
  (getS(".user-email") as HTMLInputElement).value = edit.email;
  getS(".user-btn").hidden = true;
  getS(".user-edit-btn").hidden = false;
  (getS(".edit-btn") as HTMLButtonElement).disabled = true;
  (getS(".delete-btn") as HTMLButtonElement).disabled = true;
}

function btn() {
  if (login && pass && email) {
    (getS(".user-btn") as HTMLButtonElement).disabled = false;
    (getS(".user-edit-btn") as HTMLButtonElement).disabled = false;
  }
}
