document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".remove-wishlist").forEach(button => {
        button.addEventListener("click", async () => {
            const bookId = button.getAttribute("data-id");

            try {
                const response = await fetch(`/api/wishlist/remove/${bookId}`, {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" }
                });

                const data = await response.json();
                if (data.success) {
                    alert("Book removed from wishlist!");
                    window.location.reload();
                } else {
                    alert("Error: " + data.error);
                }
            } catch (error) {
                console.error("Error removing book:", error);
            }
        });
    });
});
