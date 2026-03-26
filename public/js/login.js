const form = document.getElementById("loginForm");

// Login form submit
form.onsubmit = async (e) => {
  e.preventDefault(); // Prevents website refreshing when "login" button clicked

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch(`http://localhost:3000/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (data.success) {
      window.location.href = data.redirect;
    }
  } catch (error) {
    console.error("Fetch Failed : ", error);
  }
};
