const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.onclick = async (e) => {
  e.preventDefault(); // Prevents website refreshing when "logout" button clicked

  try {
    const res = await fetch(`http://localhost:3000/auth/logout`, {
      method: "POST", // POST to avoid caching and follow REST convention
      credentials: "include", // include the session cookie
    });

    if (!res.ok) {
      throw new Error("Logout request failed");
    }

    const data = await res.json();

    if (data.success) {
      window.location.href = data.redirect;
    } else {
      alert("Logout failed.");
    }
  } catch (err) {
    console.error("Fetch Failed : ", err);
  }
};
