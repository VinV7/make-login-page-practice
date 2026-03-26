const logoutBtn = document.getElementById("logoutBtn")

logoutBtn.onclick = async (e) => {
    e.preventDefault();

    try {
        const res = await fetch(`http://localhost:3000/auth/logout`, {
            method: 'POST',
            credentials: 'include'
        });

        const data = await res.json();
        console.log("Server response:", data);

        if (data.success) {
            window.location.href = data.redirect;
        };
    } catch(err) {
        console.error('Fetch Failed : ', err);
    }
}