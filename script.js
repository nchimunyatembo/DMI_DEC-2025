//Handle registration form if it exists
const registerForm = document.getElementById('frm-register');
if(registerForm) {
    registerForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value; 
        const email = document.getElementById('email').value; 
        const password = document.getElementById('password').value; 

        try {
            // Use /api/auth/register for Vercel deployment
            const apiEndpoint = window.location.hostname === 'localhost' ? '/auth/register' : '/api/auth/register';
            
            const response = await fetch(apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({ name, email, password })
            });

            const data = await response.json();
            alert(data.message);

            //Clear form if successful
            if(response.ok) {
                registerForm.reset();
            }
        } catch(error) {
            alert('Error: ' + error.message);
        }
    });
}

//Handle login form if it exists
const loginForm = document.getElementById('frm-login');
if(loginForm) {
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const email = document.getElementById('email').value; 
        const password = document.getElementById('password').value; 

        try {
            // Use /api/auth/login for Vercel deployment
            const apiEndpoint = window.location.hostname === 'localhost' ? '/auth/login' : '/api/auth/login';
            
            const response = await fetch(apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if(response.ok && data.name && data.email) {
                // Save user info to localStorage
                localStorage.setItem('user', JSON.stringify({ name: data.name, email: data.email }));
                alert(data.message + ' Welcome ' + data.name + ' of email address: ' + data.email);
                loginForm.reset();
                // Redirect to leave page after 1 second
                setTimeout(() => { window.location.href = '/Leave'; }, 1000);
            } else {
                alert(data.message);
            }
        } catch(error) {
            alert('Error: ' + error.message);
        }
    });
}