document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".remove-wishlist").forEach(button => {
        button.addEventListener("click", async (event) => {
            const bookId = event.currentTarget.getAttribute("data-id");

            if (!bookId) {
                showToast("Invalid book ID", true);
                return;
            }

            try {
                const response = await fetch(`/api/wishlist/remove/${bookId}`, {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include"  // Ensure session-based authentication works
                });

                const data = await response.json();
                console.log("Server Response:", data); // Log the server response

                if (data.success) {
                    showToast("Book removed from wishlist!");

                    // Remove the book card from the UI without reloading
                    const bookCard = event.currentTarget.closest(".book-card");
                    if (bookCard) {
                        bookCard.remove();
                    }

                    // Ensure UI updates properly if no books are left
                    setTimeout(() => {
                        if (document.querySelectorAll(".book-card").length === 0) {
                            document.getElementById("wishlist-books").innerHTML = `
                                <p class="empty-wishlist">No books in wishlist yet.</p>
                            `;
                        }
                    }, 300);
                } else {
                    showToast("Error: " + data.message, true);
                }
            } catch (error) {
                
                console.error("Error removing book:", error);
                showToast("book removed.", true);
                window.location.reload();
            }
        });
    });

    // Function to show toast notifications
    function showToast(message, isError = false) {
        let toast = document.getElementById("toast");
        toast.innerText = message;
        toast.style.backgroundColor = isError ? "#D32F2F" : "#4CAF50";
        toast.classList.add("show");

        setTimeout(() => {
            toast.classList.remove("show");
        }, 3000);
    }
});
