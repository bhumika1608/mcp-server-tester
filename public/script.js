document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("mcp-form");
    const resultDiv = document.getElementById("result");
    const loadingDiv = document.getElementById("loading");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const hostname = document.getElementById("hostname").value.trim();
        const port = document.getElementById("port").value.trim();

        if (!hostname || !port) {
            resultDiv.innerHTML = `<p class="error">❌ Please enter both hostname and port.</p>`;
            return;
        }

        resultDiv.innerHTML = "";
        loadingDiv.classList.remove("hidden");

        try {
            const response = await fetch("http://localhost:5000/test-mcp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ hostname, port }),
            });

            const data = await response.json();
            loadingDiv.classList.add("hidden");

            if (data.status === "Success") {
                resultDiv.innerHTML = `<p class="success">✅ ${data.message}</p>`;
            } else {
                resultDiv.innerHTML = `<p class="error">❌ ${data.message}</p>`;
            }
        } catch (error) {
            loadingDiv.classList.add("hidden");
            resultDiv.innerHTML = `<p class="error">❌ Error: ${error.message}</p>`;
        }
    });
});
