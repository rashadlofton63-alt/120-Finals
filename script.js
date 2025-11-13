class Login {
    constructor(form, fields) {
        this.form = form;
        this.fields = fields || [];
        this.init();
    }

    init() {
        this.form.addEventListener('submit', (e) => this.onSubmit(e));
    }

    onSubmit(e) {
        e.preventDefault();
        let error = 0;
        this.fields.forEach((fieldName) => {
            const input = document.querySelector(`#${fieldName}`);
            if (!this.validateFields(input)) {
                error++;
            }
        });

        if (error === 0) {
            localStorage.setItem('auth', '1');
            const usernameInput = document.querySelector('#username');
            if (usernameInput && usernameInput.value.trim() !== '') {
                localStorage.setItem('user', JSON.stringify({ username: usernameInput.value.trim(), guest: false }));
            }
            window.location.href = this.form.getAttribute('action') || '/';
        }
    }

    validateFields(field) {
        if (!field) return true;

        const labelText = (field.previousElementSibling && field.previousElementSibling.innerText) ? field.previousElementSibling.innerText : field.name || 'Field';

        if (field.value.trim() === '') {
            this.setStatus(field, `${labelText} cannot be blank`, 'error');
            return false;
        } else {
            if (field.type === 'password') {
                if (field.value.length < 8) {
                    this.setStatus(field, `${labelText} must be at least 8 characters`, 'error');
                    return false;
                }
            }
            this.setStatus(field, null, 'success');
            return true;
        }
    }

    setStatus(field, message, status) {
        const errorMessage = field.parentElement ? field.parentElement.querySelector('.error-message') : null;
        if (status === 'success') {
            if (errorMessage) errorMessage.innerText = '';
            field.classList.remove('input-error');
        }

        if (status === 'error') {
            if (errorMessage) {
                errorMessage.innerText = message;
            }
            field.classList.add('input-error');
        }
    }
}

var form = document.querySelector('.loginForm');
if (form) {
    var fields = ['username', 'password'];
    var validator = new Login(form, fields);

    var guestBtn = document.getElementById('guestBtn');
    if (guestBtn) {
        guestBtn.addEventListener('click', function () {
            localStorage.setItem('auth', '1');
            localStorage.setItem('user', JSON.stringify({ username: 'Guest', guest: true }));
            window.location.href = form.getAttribute('action') || '/dashboard.html';
        });
    }
}