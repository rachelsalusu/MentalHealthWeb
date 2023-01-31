function getLoginFormData() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    return { username, password };
}

async function onSubmit() {
    const formData = getLoginFormData();
    const response = await fetch('http://localhost:3000/login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    });
    const { status } = await response.json();

    const loginForm = document.getElementById('loginForm');

    switch (status) {
        case 'logged-in': {
            const loginModal = document.getElementById('buttonClose');
            loginModal.click();
            document.getElementById('loginBtn').classList.add('d-none');
            document.getElementById('usernameDisplay').classList.remove('d-none');
            break;
        }

        case 'invalid-password': {
            loginForm.classList.add('was-validated');
            const password = document.getElementById('password');
            password.classList.add('is-invalid');
            password.setCustomValidity('Password salah');
            break
        }

        case 'no-username': {
            loginForm.classList.add('was-validated');
            const username = document.getElementById('username');
            username.classList.add('is-invalid');
            username.setCustomValidity('User tidak ditemukan');
            break
        }
    }
}