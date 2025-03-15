document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".remove-wishlist").forEach(button => {
        button.addEventListener("click", async (event) => {
            const bookId = event.currentTarget.getAttribute("data-id");

            // Debugging: Log the bookId
            console.log("Book ID clicked:", bookId);

            if (!bookId) {
                alert("Invalid book ID");
                return;
            }

            try {
                const response = await fetch(`/api/wishlist/remove/${bookId}`, {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                });

                const data = await response.json();

                if (data.success) {
                    alert("Book removed from wishlist!");
                    // Reload the page to reflect the changes
                    window.location.reload();
                } else {
                    alert("Error: " + data.error);
                }
            } catch (error) {
                console.error("Error removing book:", error);
                alert("An error occurred while removing the book.");
            }
        });
    });
});